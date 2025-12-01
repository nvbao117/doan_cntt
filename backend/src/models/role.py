from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from backend.src.db.base import Base

class Role(Base):
    __tablename__="roles"

    role_id = Column(Integer, primary_key=True, autoincrement = True)
    role_name = Column(String(50), unique= True, nullable = False)
    
    #Realationship
    users= relationship("User", back_populates="role")