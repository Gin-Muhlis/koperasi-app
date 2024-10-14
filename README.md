# Zie Koperasi - Frontend

**Zie Koperasi** is a cooperative management platform that provides tools for both administrators and members to manage and monitor savings, loans, and installment payments. The frontend of Zie Koperasi is built using **Next.js 13** with **TypeScript** and **Tailwind CSS** for a modern, fast, and responsive user experience.

## Features

### Admin Features

The admin interface allows administrators to efficiently manage all aspects of cooperative operations. Key features include:

1. **Savings and Loan Management**
   - Admins can manage categories for savings and loans.
   - Easily add or update savings and loan records, either individually or in bulk.
2. **Profile and Member Management**
   - Manage app profiles, cooperative members, and products offered by the cooperative.
3. **Installment Payment Handling**

   - Admins can process installment payments for loans, ensuring clear and accurate records.

4. **Invoice Management**
   - Create invoices with multiple savings or loan entries for various members in a single transaction.

### User Features

The user interface is designed for cooperative members to access and view their financial data. Key features include:

1. **View Savings and Loans**

   - Members can track their individual savings and loan balances within the cooperative.

2. **Installment Payments**
   - Members can view their payment history and upcoming installment dues.

## Tech Stack

- **Next.js 13**: React-based framework for building server-rendered applications with optimized performance.
- **TypeScript**: Strongly-typed JavaScript for better maintainability and development experience.
- **Tailwind CSS**: Utility-first CSS framework for efficient and responsive UI design.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/zie-koperasi-frontend.git

   ```

2. Install dependencies:

   ```bash
   npm install

   ```

3. Atur file environment:

   ```bash
   - Duplikat file .env.example menjadi .env.local
   - Ubah detail konfigurasi di file .env sesuai dengan pengaturan database dan konfigurasi lainnya.

   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Backend API
The backend for Zie Koperasi is available at the following repository:
[Zie Koperasi Backend API](https://github.com/Gin-Muhlis/koperasi-api)

Make sure to clone and set up the backend to fully integrate the frontend with the API.
