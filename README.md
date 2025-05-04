# 📇 Contact Manager API (Node.js + Express)

Sistem manajemen kontak sederhana dengan autentikasi JWT dan akses berbasis role (admin/user). Cocok untuk backend aplikasi atau kebutuhan freelance API.

## 🔧 Teknologi
- Node.js + Express
- MySQL
- JWT Authentication
- Bcrypt (hashing password)
- Role-based Access (admin/user)
- MVC Structure
- Postman (API Testing)

## 📌 Fitur

✅ Register & Login (JWT Token)  
✅ CRUD Kontak (hanya admin)  
✅ Middleware Auth + Admin  
✅ Struktur rapi (MVC + Router)  
✅ Error handling & status code tepat

## 🚀 Instalasi

```bash
git clone https://github.com/username/contact-manager-api.git
cd contact-manager-api
npm install
```

Buat file `.env`:

```
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=contact_db
JWT_SECRET=RAHASIA-BERSAMA
PORT=3000
```

Lalu:

```bash
npm start
```

## 🔐 Endpoint Utama

| Method | Endpoint        | Keterangan                     |
|--------|------------------|--------------------------------|
| POST   | `/register`      | Register user                  |
| POST   | `/login`         | Login dan dapatkan JWT token   |
| GET    | `/contact`       | (admin only) Get semua kontak  |
| POST   | `/contact`       | (admin only) Tambah kontak     |
| PUT    | `/contact/:id`   | (admin only) Edit kontak       |
| DELETE | `/contact/:id`   | (admin only) Hapus kontak      |

## 🔑 Header Authorization

Setiap endpoint (kecuali login/register) membutuhkan token:

```
Authorization: Bearer <token>
```

## 🧪 Contoh Uji Coba via Postman

1. **Login sebagai user biasa** → akses `/contact` → ❌ 403 Forbidden  
2. **Login sebagai admin** → akses `/contact` → ✅ tampil data

## 📂 Struktur Folder

```
.
├── config/
├── controllers/
├── middleware/
├── routes/
├── index.js
└── README.md
```

## 👨‍💻 Author

Wahyu Azhari  
📫 Email: skinepik86@gmail.com  
