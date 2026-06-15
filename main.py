from fastapi import FastAPI, Depends
from typing import List
from models import Product
from database import engine
import database_models
from sqlalchemy.orm import Session
from crud import get_db, get_product, create_product, update_product, delete_product
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

database_models.Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def welcome():
    return {"message": "Welcome in Product Manager site!"}


@app.get("/products/", response_model=List[Product])
def get_products(db: Session = Depends(get_db)):
    return get_product(db)


@app.post("/products/create/", response_model=Product)
def create_products(product: Product, db: Session = Depends(get_db)):
    return create_product(product, db)


@app.put("/products/{product_id}", response_model=Product)
def update_products(product_id: int, product: Product, db: Session = Depends(get_db)):
    return update_product(product, product_id, db)


@app.delete("/products/{product_id}", response_model=Product)
def delete_products(product_id: int, db: Session = Depends(get_db)):
    return delete_product(product_id, db)