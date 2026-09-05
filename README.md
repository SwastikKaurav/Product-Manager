# 🛍️ Product Manager — Full Stack Learning Project

This is my first full stack application, built from scratch while learning FastAPI, PostgreSQL, and React. Every line of code in this project was written with the goal of understanding **why** things work, not just **how** to make them work.

---

## What I Built

A full stack product management app where authenticated users can manage their own product inventory. Users register, log in, and get access to a personal dashboard where they can create, view, update, and delete products.

---

## Features

- **JWT Authentication** — register, login, and logout with stateless token-based auth
- **Password Hashing** — bcrypt via passlib, passwords never stored in plain text
- **Protected Routes** — only authenticated users can create, update, or delete products
- **Full CRUD** — GET, POST, PUT, DELETE on products
- **Relational Database** — products are linked to users via a foreign key
- **Pydantic Validation** — all inputs and outputs are validated with type safety
- **Alembic Migrations** — database schema changes without dropping tables
- **Error Handling** — proper HTTP status codes and error messages throughout
- **React Frontend** — full UI with a stats bar showing total products, total stock, and average price

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Vite, JavaScript |
| Backend | FastAPI, Python |
| Database | PostgreSQL |
| ORM | SQLAlchemy |
| Validation | Pydantic |
| Auth | JWT (python-jose), bcrypt (passlib) |
| Migrations | Alembic |
| Environment | python-dotenv |

---

## Project Structure

```
product-manager/
├── main.py              # FastAPI app, product routes
├── auth_routes.py       # Register and login routes
├── auth.py              # JWT utilities — hash, verify, create token, get current user
├── crud.py              # All database operations
├── database.py          # PostgreSQL connection, engine, SessionMaker
├── database_models.py   # SQLAlchemy table definitions
├── models.py            # Pydantic validation models
├── .env                 # DATABASE_URL, SECRET_KEY
├── migrations/          # Alembic migration files
│   ├── env.py
│   └── versions/
└── product-manager-frontend/
    └── src/
        ├── App.jsx
        └── components/
```

---

## What I Learned

### Backend
- How FastAPI handles routing, dependency injection with `Depends()`, and request validation
- How SQLAlchemy acts as an ORM — writing Python classes that map to PostgreSQL tables
- How JWT authentication actually works under the hood — Header, Payload, Signature, and why the server never needs to store tokens
- Why `yield` is used instead of `return` in `get_db()` — to guarantee the database session closes even if the route crashes
- How Alembic tracks and applies database schema changes without losing data
- The difference between `db.add()`, `db.commit()`, and `db.refresh()` and why all three are needed
- Why `autocommit=False` gives you control over when data is actually saved
- How `OAuth2PasswordBearer` extracts tokens from the Authorization header automatically
- The difference between 401 Unauthorized and 403 Forbidden

### Database Design
- Designing relational schemas with foreign keys — products linked to users via `user_id`
- Why `create_all()` only creates new tables and never modifies existing ones — and why Alembic exists to solve that
- Using `filter().first()` instead of `filter().all()` for existence checks — performance matters

### Security
- Passwords must always be hashed — bcrypt is a one-way function, you can never reverse it
- JWT tokens are verified using a SECRET_KEY — the math proves the token came from your server
- `response_model=` in FastAPI acts as a security filter — fields like `hashed_password` never appear in responses
- Generic error messages on auth failures — never reveal whether an email exists or not

### Frontend
- Consuming a REST API from React using async fetch
- Managing state across CRUD operations
- Handling errors from the backend gracefully in the UI

---

## Key Architecture Decisions

**Why JWT over sessions?**
Sessions require the server to store state in a database. JWT is stateless — the server only needs a SECRET_KEY to verify any token. This scales better and requires no session storage.

**Why SQLAlchemy over raw SQL?**
Writing raw SQL inside Python strings is messy and error-prone. SQLAlchemy lets you work in Python objects and handles the SQL translation. The ORM pattern also makes the codebase easier to read and maintain.

**Why Alembic?**
Once a table exists in production with real data, you cannot just drop it and recreate it. Alembic generates migration files that modify existing tables safely — the same way Git tracks code changes.

---

## This Project Was My Foundation

Building this taught me everything I needed to start building production-grade backend systems. The concepts learned here — JWT auth, relational database design, dependency injection, migration management — form the foundation of every backend project I build going forward.

---


