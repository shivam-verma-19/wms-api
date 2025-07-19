# 📦 WMS API (Warehouse Management System)

A RESTful API built with Node.js, Express, and MongoDB to manage **Inventory** and **Orders**.

## 🚀 Tech Stack

- Node.js / Express
- MongoDB (Mongoose)
- express-validator (input validation)
- Morgan (logging)

## 📌 Endpoints

| Module    | Method | Endpoint           | Description     |
| --------- | ------ | ------------------ | --------------- |
| Inventory | GET    | /api/inventory     | List all items  |
| Inventory | POST   | /api/inventory     | Create new item |
| Inventory | GET    | /api/inventory/:id | Get one item    |
| Inventory | PUT    | /api/inventory/:id | Update item     |
| Inventory | DELETE | /api/inventory/:id | Delete item     |
| Orders    | GET    | /api/orders        | List all orders |
| Orders    | POST   | /api/orders        | Create order    |
| Orders    | GET    | /api/orders/:id    | Get one order   |
| Orders    | PUT    | /api/orders/:id    | Update order    |
| Orders    | DELETE | /api/orders/:id    | Delete order    |

## ⚡ Running locally

```bash
git clone https://github.com/shivam-verma-19/wms-api.git
cd wms-api
npm install
npm run dev
```
