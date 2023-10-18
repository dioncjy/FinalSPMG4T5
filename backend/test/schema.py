from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class AccessControl(Base):
    __tablename__ = 'Access_Control'

    Access_ID = Column(Integer, primary_key=True)
    Access_Control_Name = Column(String(20), unique=True)

    roles = relationship("Role")
    
class Skill(Base):
    __tablename__ = 'Skill'

    Skill_Name = Column(String(50), primary_key=True)
    Skill_Desc = Column(Text)

    
class Role(Base):
    __tablename__ = 'Role'

    Role_Name = Column(String(20), unique=True, nullable=False)
    Role_Desc = Column(Text)


class Staff(Base):
    __tablename__ = 'Staff'

    Staff_ID = Column(Integer, primary_key=True)
    Staff_FName = Column(String(50), nullable=False)
    Staff_LName = Column(String(50), nullable=False)
    Dept = Column(String(50), nullable=False)
    Country = Column(String(50), nullable=False)
    Email = Column(String(50), nullable=False)
    Role = Column(Integer, ForeignKey('Access_Control.Access_ID'), nullable=False)

class RoleSkill(Base):
    __tablename__ = 'Role_Skill'

    Role_Name = Column(String(20), ForeignKey('Role.Role_Name'), primary_key=True)
    Skill_Name = Column(String(50), ForeignKey('Skill.Skill_Name'), primary_key=True)


class StaffSkill(Base):
    __tablename__ = 'Staff_Skill'

    Staff_ID = Column(Integer, ForeignKey('Staff.Staff_ID'), primary_key=True)
    Skill_Name = Column(String(20), ForeignKey('Skill.Skill_Name'), primary_key=True)




