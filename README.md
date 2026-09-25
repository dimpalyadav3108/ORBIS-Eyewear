# 👓 ORBIS Eyewear

**ORBIS Eyewear** is a full-stack eyewear e-commerce web application designed for browsing, customizing, and purchasing eyewear online.

The platform includes a modern customer storefront along with a role-based management system for **Customers, Admins, and Staff**.

---

## 🌟 Project Overview

ORBIS provides an end-to-end eyewear shopping experience, including:

- Eyeglasses
- Sunglasses
- Contact lenses
- Product search and filtering
- Frame and lens selection
- Prescription management
- Shopping cart
- Coupons and offers
- Checkout and order management
- Returns and exchanges
- Customer support
- Product reviews
- Admin dashboard
- Staff role management

The application is built using the **MERN-style stack** and deployed using **AWS EC2, Nginx, PM2, and MongoDB Atlas**.

---

## 🚀 Live Website

```text
http://32.195.68.116
```

> The current deployment uses the EC2 public IP. HTTPS and a custom domain can be configured separately.

---

## 🛠️ Technologies Used

**Frontend:** React, Vite, JavaScript, HTML, CSS, Lucide React  
**Backend:** Node.js, Express.js  
**Database:** MongoDB Atlas, Mongoose  
**Authentication:** JWT Authentication  
**Deployment:** AWS EC2, Ubuntu, Nginx, PM2  
**Version Control:** Git, GitHub

---

## 👥 User Roles

### 👤 Guest

Guest users can:

- Browse eyewear products
- Search products
- Filter products
- View product details
- Explore categories
- Continue shopping without an account

### 🛍️ Customer

Registered customers can:

- Create an account
- Login securely
- Manage profile information
- Browse products
- Add products to wishlist
- Add products to cart
- Manage prescriptions
- Apply coupons
- Place orders
- View order history
- Track order status
- Request returns/exchanges
- Create support tickets
- Submit product reviews

### 🛡️ Admin

Admins have access to the ORBIS Control Center and can manage:

- Dashboard
- Products & variants
- Stock
- Orders
- Prescription review
- Returns & exchanges
- Customers
- Coupons & offers
- Banners & content
- Reviews
- Support tickets
- Reports & exports
- Staff & roles
- Settings
- Activity logs

### 👨‍💼 Staff

Staff members receive restricted access based on assigned permissions.

Examples include:

- Orders
- Catalog
- Support
- Stock
- Prescription review
- Returns

---

# 🛒 Customer Shopping Flow

```text
Home Page
    ↓
Browse / Search Products
    ↓
Filter Products
    ↓
Product Details
    ↓
Select Frame / Product Options
    ↓
Select Lens Options
    ↓
Add Prescription (if required)
    ↓
Add to Cart
    ↓
Apply Coupon
    ↓
Login / Create Account
    ↓
Checkout
    ↓
Place Order
    ↓
Order Confirmation
    ↓
Admin / Staff Processing
    ↓
Order Status Update
    ↓
Delivery
    ↓
Review / Support / Return
```

---

# 🔄 Return & Exchange Flow

```text
Customer Order
      ↓
Request Return / Exchange
      ↓
Select Item & Reason
      ↓
Submit Request
      ↓
Admin Reviews Request
      ↓
Approve / Reject
      ↓
Status Updated
      ↓
Customer Views Updated Status
```

---

# 🎫 Support Ticket Flow

```text
Customer
    ↓
Create Support Ticket
    ↓
Ticket Stored in Database
    ↓
Admin / Staff Dashboard
    ↓
Ticket Reviewed
    ↓
Status Updated
    ↓
Customer Views Update
```

---

# ⭐ Review Flow

```text
Customer
    ↓
Submit Product Review
    ↓
Admin Review
    ↓
Approve Review
    ↓
Approved Review Available to Storefront
```

---

# 🏗️ System Architecture

```text
                    INTERNET
                       │
                       ▼
                 AWS EC2 Server
                       │
                       ▼
                     NGINX
                    /     \
                   /       \
                  ▼         ▼
        React Frontend     /api
                              │
                              ▼
                       Node.js + Express
                              │
                              ▼
                        MongoDB Atlas
```

---

## 🖥️ Frontend

The frontend is developed using:

- React
- Vite
- JavaScript
- CSS
- Lucide React

The production build is generated inside:

```text
frontend/dist
```

Nginx serves these production files to users.

---

## ⚙️ Backend

The backend is built using:

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication

The backend handles:

- Authentication
- Products
- Customers
- Orders
- Prescriptions
- Returns
- Reviews
- Support tickets
- Coupons
- Admin operations
- Staff permissions

---

# 🗄️ Database

The application uses:

**MongoDB Atlas**

MongoDB stores application data such as:

```text
Users
Products
Orders
Prescriptions
Returns
Reviews
Support Tickets
Coupons
Content
Settings
```

---

# ☁️ AWS Deployment

ORBIS is deployed on an **AWS EC2 Ubuntu server**.

Deployment architecture:

```text
GitHub
   ↓
AWS EC2
   ↓
Node.js
   ↓
PM2
   ↓
Nginx
   ↓
Internet
```

---

## 🔄 PM2 Process Management

PM2 keeps the backend API running continuously.

Example:

```bash
pm2 status
```

Save running applications:

```bash
pm2 save
```

PM2 is configured to restore the application after a server reboot.

---

# 🌐 Nginx

Nginx is used as both:

- Static frontend server
- Reverse proxy for the backend API

Request flow:

```text
http://SERVER-IP/
        ↓
React Frontend

http://SERVER-IP/api/
        ↓
Nginx
        ↓
Node.js Backend
```

---

# ❤️ API Health Check

The backend provides a health endpoint:

```text
/api/health
```

A successful response looks like:

```json
{
  "ok": true,
  "service": "ORBIS API"
}
```

---

# 📂 Project Structure

```text
ORBIS-Eyewear/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── assets/
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── package.json
├── .gitignore
└── README.md
```

> The exact folders may vary as development continues.

---

# 💻 Local Installation

## 1. Clone Repository

```bash
git clone <your-repository-url>
```

Move into the project:

```bash
cd ORBIS-Eyewear
```

---

## 2. Install Dependencies

From the project root:

```bash
npm run install:all
```

Or install separately.

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

# 🔐 Environment Variables

Create:

```text
backend/.env
```

Add your own configuration values for items such as:

```env
PORT=5000
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_SECURE_JWT_SECRET
CLIENT_URL=YOUR_FRONTEND_URL
```

For local frontend development, create:

```text
frontend/.env
```

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

For the current Nginx production deployment:

```env
VITE_API_URL=/api
```

### ⚠️ Important

Never upload `.env` files containing real credentials to GitHub.

Do not expose:

- MongoDB passwords
- JWT secrets
- Payment secrets
- API keys
- Private credentials

---

# ▶️ Run Project Locally

From the project root:

```bash
npm run dev
```

The frontend and backend development servers will start using the scripts configured in the project.

---

# 🏗️ Build Frontend for Production

Go to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Build:

```bash
npm run build
```

Production files will be generated inside:

```text
frontend/dist
```

---

# 🔒 Security

ORBIS follows important security practices including:

- JWT-based authentication
- Password protection
- Role-based access control
- Admin/staff permission separation
- Environment variables for secrets
- MongoDB Atlas access control
- Restricted SSH access
- Backend authorization

Recommended `.gitignore`:

```gitignore
node_modules/
.env
.env.*
!.env.example
dist/
```

---

# ✅ Tested Core Features

The following core flows have been tested during development and deployment:

- ✅ Guest access
- ✅ Customer registration
- ✅ Customer login
- ✅ Admin login
- ✅ Staff login
- ✅ Role-based access
- ✅ Product shopping flow
- ✅ Frontend-to-backend API connection
- ✅ MongoDB Atlas connection
- ✅ Order creation
- ✅ Admin order status updates
- ✅ Customer order status updates
- ✅ Return/exchange request
- ✅ Admin return management
- ✅ Support ticket creation
- ✅ Admin support management
- ✅ Product review submission
- ✅ Admin review approval
- ✅ Coupon creation
- ✅ Coupon application
- ✅ Production frontend build
- ✅ PM2 backend process
- ✅ Nginx frontend hosting
- ✅ Nginx `/api` reverse proxy
- ✅ AWS EC2 deployment

---

# 🔌 Production Integrations

Some features require separate production credentials or third-party services before they can be considered fully live.

These may include:

- Payment gateway production credentials
- Email notifications
- SMS notifications
- WhatsApp notifications
- Courier/tracking provider
- HTTPS/SSL certificate
- Custom domain
- Real camera-based Virtual Try-On provider

---

# 🔮 Future Improvements

Potential future improvements include:

- Virtual Try-On
- Store locator
- Eye-test booking
- Home trial
- Membership program
- Referral system
- EMI support
- Advanced analytics
- Additional payment integrations
- Automated shipping/tracking

---

# 📖 ORBIS Flow Summary

```text
Visitor
   ↓
Browse Eyewear
   ↓
Search / Filter
   ↓
Product Details
   ↓
Customize
   ↓
Prescription
   ↓
Cart
   ↓
Checkout
   ↓
Order
   ↓
Admin / Staff Processing
   ↓
Delivery
   ↓
Review / Support / Return
```

---

## 👓 ORBIS Eyewear

**Modern Eyewear. Simple Shopping. Complete Management.**

Built using React, Node.js, Express, MongoDB and AWS.
