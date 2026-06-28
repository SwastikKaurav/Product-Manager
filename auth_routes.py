from fastapi import APIRouter, Depends
from auth import hash_password, verify_password, create_access_token, verify_token
from models import UserRegister, UserLogin, UserResponse
from crud import get_db, create_user
from sqlalchemy.orm import Session


router = APIRouter()


@router.post("/auth/register", response_model=UserResponse)
def create_users(userRegister: UserRegister, db: Session = Depends(get_db)):
    hashed_password = hash_password(userRegister.password)
    return create_user(userRegister.email, hashed_password, db)