from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.utils.config import settings
import uuid

# Create async engine
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
    pool_pre_ping=True,
    pool_recycle=300
)

# Create async session factory
AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# Create base class for models
Base = declarative_base()

# Database models
class ApprovedRegistration(Base):
    """Table for approved registration numbers"""
    __tablename__ = "approved_registrations"
    
    id = Column(Integer, primary_key=True, index=True)
    registration_number = Column(String(50), unique=True, index=True, nullable=False)
    student_name = Column(String(100), nullable=False)
    is_paid = Column(Boolean, default=False, nullable=False)
    payment_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    # Remove the circular relationship
    # user = relationship("User", back_populates="approved_registration")

class User(Base):
    """Table for user accounts"""
    __tablename__ = "users"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=True)
    registration_number = Column(String(50), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    is_activated = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    # Foreign key to approved registration
    approved_registration_id = Column(Integer, ForeignKey("approved_registrations.id"), nullable=False)
    
    # Relationships
    approved_registration = relationship("ApprovedRegistration")
    sessions = relationship("UserSession", back_populates="user", cascade="all, delete-orphan")
    device_logs = relationship("DeviceLog", back_populates="user", cascade="all, delete-orphan")

class UserSession(Base):
    """Table for active user sessions"""
    __tablename__ = "user_sessions"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    device_id = Column(String(255), nullable=False)
    device_name = Column(String(100), nullable=True)
    device_type = Column(String(50), nullable=True)  # android, ios, web
    access_token = Column(Text, nullable=False)
    refresh_token = Column(Text, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    last_activity = Column(DateTime, default=func.now(), onupdate=func.now())
    created_at = Column(DateTime, default=func.now())
    expires_at = Column(DateTime, nullable=False)
    
    # Relationships
    user = relationship("User", back_populates="sessions")

class DeviceLog(Base):
    """Table for device login/logout audit trail"""
    __tablename__ = "device_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    device_id = Column(String(255), nullable=False)
    device_name = Column(String(100), nullable=True)
    device_type = Column(String(50), nullable=True)
    action = Column(String(50), nullable=False)  # login, logout, device_change
    ip_address = Column(String(45), nullable=True)  # IPv4 or IPv6
    user_agent = Column(Text, nullable=True)
    created_at = Column(DateTime, default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="device_logs")

# Database dependency
async def get_db() -> AsyncSession:
    """Get database session"""
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
