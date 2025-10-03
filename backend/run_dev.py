#!/usr/bin/env python3
"""
Development runner script for Gohub Backend
Run this to start the development server
"""

import uvicorn
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

if __name__ == "__main__":
    print("🚀 Starting Gohub Backend Development Server...")
    print("📱 API will be available at: http://localhost:8000")
    print("📚 Interactive docs at: http://localhost:8000/docs")
    print("🔍 Health check at: http://localhost:8000/health")
    print("\nPress Ctrl+C to stop the server")
    print("-" * 50)
    
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
