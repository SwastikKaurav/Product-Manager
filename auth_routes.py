from fastapi import APIRouter, Depends, HTTPException
from auth import hash_password, verify_password, create_access_token
from models import UserRegister, UserLogin, UserResponse
from crud import get_db, create_user, get_user_by_email
from sqlalchemy.orm import Session

                
router = APIRouter()


@router.post("/auth/register", response_model=UserResponse)
def create_users(userRegister: UserRegister, db: Session = Depends(get_db)):
    hashed_password = hash_password(userRegister.password)
    return create_user(userRegister.email, hashed_password, db)

@router.post("/auth/login")
def login_users(userLogin: UserLogin, db: Session = Depends(get_db)):
    db_user = get_user_by_email(userLogin.email, db)
    stored_hash = db_user.hashed_password
    if verify_password(userLogin.password, stored_hash):
        return create_access_token(db_user.id, db_user.email)
    else:
        raise HTTPException(status_code=401, detail="Incorrect password")
