import database_models
from database import SessionMaker
from sqlalchemy.orm import Session
from models import Product

def get_db():
    db = SessionMaker()
    try:
        yield db
    finally:
        db.close()

def get_product(db: Session):
    db_product = db.query(database_models.Product).all()
    if not db_product:
        return "Cart is Empty"
    return db_product

def create_product(product:Product, db: Session):
    db_product = database_models.Product(**product.model_dump(exclude={"id"}))
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def update_product(product:Product, product_id: int, db: Session):
    db_product = db.query(database_models.Product).filter(database_models.Product.id == product_id).first()
    if db_product:
        db_product.name = product.name
        db_product.description = product.description
        db_product.price = product.price
        db_product.quantity = product.quantity
        db.commit()
        db.refresh(db_product)
        return db_product
    else:
        return "Product not found"

def delete_product(product_id:int, db: Session):
    db_product = db.query(database_models.Product).filter(database_models.Product.id == product_id).first()
    if db_product:
        db.delete(db_product)
        db.commit()
        return db_product
    else:
        return "product not found"

