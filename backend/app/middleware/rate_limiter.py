from fastapi import Request, HTTPException, status
from fastapi.responses import JSONResponse
from collections import defaultdict, deque
from datetime import datetime, timedelta
import time
from app.utils.config import settings

class RateLimiterMiddleware:
    """Rate limiting middleware to prevent API abuse"""
    
    def __init__(self):
        self.requests_per_minute = defaultdict(deque)
        self.requests_per_hour = defaultdict(deque)
    
    async def __call__(self, request: Request, call_next):
        """Process request with rate limiting"""
        # Get client identifier (IP address or user ID)
        client_id = self._get_client_id(request)
        
        # Check rate limits
        if not self._check_rate_limits(client_id):
            return JSONResponse(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                content={
                    "error": "Rate limit exceeded",
                    "message": "Too many requests. Please try again later.",
                    "retry_after": 60  # seconds
                }
            )
        
        # Process request
        response = await call_next(request)
        return response
    
    def _get_client_id(self, request: Request) -> str:
        """Get client identifier for rate limiting"""
        # Try to get user ID from token if available
        # For now, use IP address
        client_ip = request.client.host if request.client else "unknown"
        return f"ip:{client_ip}"
    
    def _check_rate_limits(self, client_id: str) -> bool:
        """Check if client has exceeded rate limits"""
        now = datetime.utcnow()
        
        # Clean old entries
        self._clean_old_entries(client_id, now)
        
        # Check per-minute limit
        if len(self.requests_per_minute[client_id]) >= settings.RATE_LIMIT_PER_MINUTE:
            return False
        
        # Check per-hour limit
        if len(self.requests_per_hour[client_id]) >= settings.RATE_LIMIT_PER_HOUR:
            return False
        
        # Add current request
        self.requests_per_minute[client_id].append(now)
        self.requests_per_hour[client_id].append(now)
        
        return True
    
    def _clean_old_entries(self, client_id: str, now: datetime):
        """Remove old entries from rate limiting queues"""
        # Clean per-minute queue (keep only last minute)
        minute_ago = now - timedelta(minutes=1)
        while (self.requests_per_minute[client_id] and 
               self.requests_per_minute[client_id][0] < minute_ago):
            self.requests_per_minute[client_id].popleft()
        
        # Clean per-hour queue (keep only last hour)
        hour_ago = now - timedelta(hours=1)
        while (self.requests_per_hour[client_id] and 
               self.requests_per_hour[client_id][0] < hour_ago):
            self.requests_per_hour[client_id].popleft()
