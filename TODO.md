# P3-Challenge-2 (Next.js Project)

## W2D1

### Setup Project: Tema Aplikasi

Silahkan setup project aplikasi kamu:

- [x] Pilih tema sesuai kesepakatan bersama instructor, tuliskan dalam README github kamu
- [x] Membuat layout aplikasi sesuai tema yang dipilih
- [x] Membuat initial data/seeder sesuai struktur data yang ditentukan (Kalian bisa check `db.json` sebagai referensi atau bisa digunakan sebagai data awal)
  - [x] Halaman auth
    - [x] Register
    - [x] Login
  - [x] Halaman home
    - [x] Komponen Banner
    - [x] Komponen Detail info Ecommerce
    - [x] Komponen Featured Product (50-10 product) + “see-all”
  - [x] Halaman product
    - [x] Komponen List Product
    - [x] Komponen Search
    - [x] Komponen Pagination
    - [x] Komponen Add to wishlist
  - [x] Halaman detail product
    - [x] Komponen Add to wishlist
  - [x] Halaman Wishlist
    - [x] Komponen list Wishlist (bisa menggunakan card yang sama dengan halaman list product)
    - [x] Komponen Remove Wishlist

## W2D2

### NEXT.js Intro

- [x] Setup NEXT.js project yang menggunakan typescript
- [x] Convert halaman-halaman dan komponen-komponen yang dibuat sebelumnya menjadi pages dan components pada NEXT.js:
  - [x] Halaman register: /register
  - [x] Halaman login: /login
  - [x] Halaman home: /
    - [x] Komponen Banner
    - [x] Komponen Detail info Ecommerce
    - [x] Komponen Featured Product (5-10 product) + “see-all”
  - [x] Halaman product: /products
    - [x] Komponen List Product
    - [x] Komponen Search
    - [x] Komponent Pagination
    - [x] Komponen Add to wishlist
  - [x] Halaman detail product: /products/:slug
    - [x] Komponen Add to wishlist
  - [x] Halaman wishlist: /wishlist
    - [x] Komponen List Wishlist (bisa menggunakan card yang sama dengan halaman list product)
    - [x] Komponen Remove Wishlist

> Catatan: Kamu bisa menambahkan halaman sesuai kebutuhan aplikasi kamu

### NEXT.js CSR & SSR

Implementasikan CSR dan SSR pada pada halaman-halaman dan komponen-komponen yang sudah dibuat dengan detail sebagai berikut:

- [x] Halaman register: /register
- [x] Halaman login: /login
- [x] Halaman home: / (SSR)
- [x] Halaman product: /products (CSR)
  - [x] Komponen List Product (CSR)
  - [x] Komponen Search (CSR)
  - [x] Komponen Pagination (CSR)
  - [x] Komponen Add to Wishlist (CSR)
- [x] Halaman detail product: /products/:slug (SSR)
  - [x] Komponen Add to Wishlist (CSR)
- [x] Halaman wishlist: /wishlist
  - [x] Komponen List Wishlist (CSR)
  - [x] Komponen Remove Wishlist (CSR)

> Catatan: Disini belum perlu melakukan fetching atau request data

## W2D3

### NEXT.js Route Handler

- [x] Install MongoDB database pada komputer kamu atau menggunakan MongoDB Atlas
- [x] Lakukan wiring dan validasi terhadap halaman-halaman dan komponen-komponen yang sudah dibuat.
  - [x] Halaman register: /register
    - [x] username:string (validation: required, unique)
    - [x] email:string (validation: required, unique, email format)
    - [x] password:string (validation: required, length min 5)
  - [x] Halaman login: /login
    - [x] email:string (validation: required, email format)
    - [x] password:string (validation: required)
  - [x] Halaman home: / (SSR)
    - [x] Halaman product: /products
    - [x] Fitur List Product
    - [x] Fitur Search
    - [x] Fitur Pagination
    - [x] Untuk menerapakan infinite scroll salah satu package yang bisa digunakan: react-infinite-scroll
  - [x] Fitur Add to Wishlist
    - [x] userId: ObjectId (validation: required)
    - [x] productId: ObjectId (validation: required)
  - [x] Halaman detail product: /products/:slug
    - [x] Fitur Add to Wishlist
      - [x] userId: ObjectId (validation: required)
      - [x] productId: ObjectId (validation: required)
  - [x] Halaman Wishlist
    - [x] Fitur List Wishlist
    - [x] Fitur Remove to Wishlist
      - [x] userId: ObjectId (validation: required)
      - [x] productId: ObjectId (validation: required)

### NEXT.js Auth

Implementasikan autentikasi pada aplikasi NEXT.js yang sudah dibuat dengan detail sebagai berikut:

- [x] Hanya user yang sudah login yang bisa menambahkan wishlist produk
- [x] Hanya user yang sudah login yang bisa menghapus wishlist produk

## W2D4

### Deploy Project

Lakukan deployment pada project ini agar aplikasi bisa dilihat oleh user lain

- [x] Deploy client

## Day 5 - 6

### Buddy Session

- [x] Silahkan cek tugas/aplikasi yang kamu buat ke instruktur/buddy untuk memastikan aplikasi yang dibuat sudah sesuai requirement.
