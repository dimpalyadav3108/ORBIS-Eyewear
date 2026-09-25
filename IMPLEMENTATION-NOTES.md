# ORBIS Eyewear — implementation notes

This build strengthens the PRD/FRD customer-store experience and operational workflows while preserving the existing Node/Express/MongoDB architecture.

## Store improvements in this build
- Catalog now loads MongoDB products first, with a local visual fallback for development.
- Store filters include category, shape, brand, material, search and sorting.
- Product pages support database IDs, stock alerts, live published reviews, delivery checks, wishlist, lens customization and similar products.
- Seed data now contains six store products rather than three.
- Lens customization can use saved prescriptions or manual SPH/CYL/Axis/PD details and retains submit-later behavior.
- Cart pricing is quoted by the backend, including coupons, shipping and GST.
- My Orders is presented as a real order workspace with tracking, invoice, reorder, cancellation and delivered-order return entry points.
- Saved addresses and prescriptions have add/delete controls and prescription attachment support.

## Return / exchange improvements
- Redesigned ORBIS Care UI with return/exchange choice, reason selection, photos, request history and progress display.
- Backend enforces delivered-order eligibility, configurable return-window days, one active request per order, image-only attachments and a controlled status workflow.
- Staff can move a request through requested → approved → pickup scheduled → picked up → received → inspected → complete, or reject it.
- Refund, pickup, inspection, resolution and history fields are available in the return model.

## Existing PRD surfaces retained
Authentication/OTP/password reset, account, wishlist, support tickets/replies, reviews/moderation, orders/tracking/invoice, admin dashboard, products, coupons, content, reports/CSV, staff roles, settings, notifications and Phase-4 experience request screens remain in the project.

## Production boundaries
Razorpay, email/SMS/WhatsApp, courier services, real camera AR, real store inventory/booking, rewards settlement and EMI authorization require client/provider accounts and credentials. The repository contains application-side adapters/demo behavior; those services cannot be made production-live without the selected providers.

## Security
No `.env` file is included in the distributable ZIP. Copy each `.env.example` to `.env` locally and add your own credentials. Never commit real secrets.
