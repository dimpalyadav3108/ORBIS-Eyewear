# ORBIS Eyewear — Final FRD Build

## Install
1. Copy `backend/.env.example` to `backend/.env`.
2. Set `MONGODB_URI` and a strong `JWT_SECRET`.
3. Optional production integrations: add Razorpay, SMTP, SMS/WhatsApp and courier credentials.
4. Run `npm install` in the project root, then `npm run install:all`.
5. Run `npm --prefix backend run seed`.
6. Run `npm run dev`.

Frontend: http://localhost:5173
API health: http://localhost:5000/api/health

Demo accounts after seeding:
- Admin: admin@orbis.local / Admin@12345
- Staff: staff@orbis.local / Staff@12345
- Customer: customer@orbis.local / Customer@12345

Use demo accounts only for local testing. Change/remove them before deployment.

See `REQUIREMENTS-COVERAGE.md` for the FRD mapping and provider boundary.
