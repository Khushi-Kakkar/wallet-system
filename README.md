# Digital Wallet System

A secure, backend-only digital wallet system with user authentication, cash operations, transaction history, fraud detection, and admin analytics — all containerized using Docker.

---

## Tech Stack

- Node.js + Express.js
- MongoDB (via Docker)
- Mongoose ODM
- JWT Authentication
- Swagger + Postman for API docs
- Cron Jobs for daily fraud scans

---

## Features

###  Auth
- User registration and login with JWT
- Secure password hashing via bcrypt

### Wallet
- Deposit, Withdraw, Transfer funds
- Maintains per-user transaction history
- Real-time validation and balance updates

### Fraud Detection
- Flags high-frequency transfers (3+ within 1 min)
- Flags withdrawals > ₹5000
- Daily fraud scan via `node-cron`

### Admin APIs
- View fraud flags
- View top wallet users
- Total system balance summary

---
### How to Use Protected Routes in Swagger
1. Call `/api/auth/login` and copy the returned token
2. Click the 🔓 Authorize button (top right)
3. Paste your token and hit Authorize
4. Now you can test all `/wallet` and `/admin` routes!

## Swagger Document Link
-http://localhost:5000/api-docs

---
##  Run with Docker 

```bash
docker-compose up --build
