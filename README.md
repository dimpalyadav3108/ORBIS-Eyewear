# ORBIS Eyewear — Updated Interactive Build

## Start locally (Windows / PowerShell)
1. Start MongoDB.
2. From the project root run `npm install`.
3. Run `npm run install:all`.
4. Seed local demo users: `npm --prefix backend run seed`.
5. Run `npm run dev`.
6. Open the Vite URL shown in the terminal (normally http://localhost:5173).

The first screen is the ORBIS sign-in/create-account experience. **Continue as guest** preserves the FRD guest-shopping flow.

## Implemented interactive surfaces
- Authentication using hashed passwords, JWT HttpOnly cookie, protected customer/admin/staff routes and role middleware.
- Search overlay, catalog search/filter/sort, wishlist, compare, product detail, pincode check and cart actions.
- Frame → lens type → package/add-ons → prescription → summary customization with dynamic price.
- Cart, coupon, shipping/GST calculation, guest/authenticated checkout, COD and payment integration surface.
- Orders, tracking, cancellation API, invoice data API, return/exchange workflow API, support tickets and reviews.
- Account navigation, orders, saved prescriptions, addresses, wishlist, returns, support, referral/membership experience flows.
- Admin API surfaces for dashboard, orders, returns, reviews, customers, staff, reports and settings, plus catalog CRUD.
- Unified animated ORBIS visual system across home, shop, lenses, experiences, product, customization, account and auth.

## External-provider boundary
Razorpay live payment, email/SMS/WhatsApp delivery, courier live tracking and camera-grade virtual try-on require real provider accounts/keys. The app contains integration surfaces but no fabricated third-party credentials. Product imagery in this package is self-contained illustrated SVG artwork so the UI does not depend on copyrighted marketplace images.

## Production note
Replace the development JWT secret and demo credentials, configure HTTPS and real provider keys, and run acceptance/security testing before public launch.
