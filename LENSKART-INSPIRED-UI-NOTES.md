# ORBIS Eyewear — Storefront UI Update

This update keeps ORBIS branding and application logic while adopting common
eyewear-marketplace UX patterns visible on the current Lenskart storefront.

Updated:
- two-level ecommerce header and category navigation
- large searchable header
- dropdown category menus
- category-first home page
- hero promotions and offer code presentation
- 42 demo products across eyewear/contact-lens categories
- desktop filter sidebar and sorting toolbar
- richer product cards with MRP, discount, rating, wishlist, compare and try-on entry
- shape discovery section
- virtual try-on / eye-test / locator / home-trial service cards
- lens guide section
- expanded footer
- responsive desktop/tablet/mobile styling
- MongoDB seed synchronized with the expanded catalog

Existing project flows are retained, including customization, prescription,
cart/checkout, orders, returns, account, support, reviews and admin surfaces.

Important:
- The design is ORBIS-branded and inspired by current eyewear-commerce patterns.
  It does not copy Lenskart proprietary artwork, logos or product photos.
- Demo product visuals are original ORBIS SVG artwork.
- Provider-dependent features (Razorpay, SMS/WhatsApp, courier, production AR)
  still require valid client credentials/services.

Run after replacing:
1. npm install
2. npm run install:all
3. npm --prefix backend run seed
4. npm run dev
