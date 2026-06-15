from fastapi import FastAPI, Depends
from models import Product
from database import SessionMaker, engine
import database_models
from sqlalchemy.orm import Session
from crud import get_db, get_product, create_product, update_product, delete_product

app = FastAPI()

database_models.Base.metadata.create_all(bind=engine)

@app.get("/")
def welcome():
    return "Welcome in Product Manager site!"

@app.get("/products/")
def get_products(db: Session = Depends(get_db)):
    return get_product(db)

@app.post("/products/create/")
def create_products(product:Product, db: Session = Depends(get_db)):
    return create_product(product,db)

@app.put("/products/update/")
def update_products(product:Product, product_id:int, db: Session = Depends(get_db)):
    return update_product(product, product_id, db)

@app.delete("/products/delete/")
def delete_products(product_id:int, db: Session = Depends(get_db)):
    return delete_product(product_id, db)