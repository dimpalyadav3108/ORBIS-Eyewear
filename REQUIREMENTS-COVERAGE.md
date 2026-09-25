# ORBIS Eyewear — FRD / Scope Coverage

This final package implements the complete application flow described in the supplied FRD as a working local/full-stack reference implementation. Provider-dependent features use a real-provider adapter when credentials are configured and a safe local demo/queue fallback otherwise.

## FP-01–FP-13 Catalog / discovery / product
Implemented: home collections, category/brand/collection discovery, listing, filters, sorting, pagination API, search suggestions, compare, recently viewed storage, similar recommendations, product gallery UI, color/size selection, size/face guide, pincode delivery check, stock/notify flow, ratings/review model and moderation.

## FP-14–FP-25 Customization / prescription
Implemented: frame/color/size, lens type/package/add-ons, power step, dynamic price, editable step summary, both-eye power, prescription upload storage, saved prescriptions, submit-later option, required-field validation and admin order/power status workflow.

## FP-26–FP-34 Cart / checkout
Implemented: quantity/remove, coupons, shipping/GST quote API, guest checkout, saved-address account support, Razorpay order adapter (real when keys exist; demo order when absent), COD, retry-safe checkout behavior and order confirmation/notification queue.

## FP-35–FP-41 Orders
Implemented: unique order number, status history with staff/date/reason, courier adapter/tracking data, downloadable HTML invoice, pre-dispatch cancellation, reorder, and verified guest tracking by order number + checkout contact.

## FP-42–FP-47 Returns / exchanges / refunds
Implemented: return/exchange request, reason + up to three image uploads, admin approval/status handling, pickup/inspection/refund fields and customer-visible request/refund status.

## FP-48–FP-53 Account
Implemented: email/password signup/login, OTP generation/verification with provider-ready email delivery and development OTP fallback, forgot/reset password tokens, profile/address/prescription management, wishlist, and persistent guest cart. Cart is stored locally and remains available through authentication.

## FP-54–FP-59 Support / reviews
Implemented: support ticket creation, customer ticket list/replies/status model, contact/FAQ UI, photo-capable review endpoint, customer review records and admin approval.

## FP-60–FP-72 Admin
Implemented backend CRUD/management APIs for products/variants/stock, JSON bulk import, customer/order/return/review/support management, coupons, content, reports + CSV export, staff roles/permissions, settings and activity model. Admin Studio connects core operational modules to those APIs.

## FP-73–FP-76 Notifications
Implemented notification persistence plus email adapter. SMS/WhatsApp service adapters are provider-ready and return queued/demo results until client provider credentials are supplied. Order/return/account events have application hooks for these channels.

## Scope optional add-ons
The supplied UI includes the Phase-4 experience surfaces (virtual try-on demo, membership, store/eye-test, home trial, refer & earn and corporate account request flows). Camera AR, real store inventory/booking, real rewards settlement and EMI authorization require the selected commercial/provider services to become production-live.

## Important production boundary
No repository can make Razorpay, SMS, WhatsApp, courier, SMTP, camera-AR or other third-party services live without valid client accounts/keys. This package therefore completes their application-side flows and adapters, while `.env.example` documents the credentials to add. No real secrets are included in this ZIP.
