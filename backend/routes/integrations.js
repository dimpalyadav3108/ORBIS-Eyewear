import{Router}from"express";import{paymentConfig,createPaymentOrder,verifyPayment}from"../services/payment.js";import{trackCourier}from"../services/courier.js";const r=Router();
r.get("/payment",(_,res)=>res.json(paymentConfig()));
r.post("/payment/order",async(req,res,next)=>{try{res.json(await createPaymentOrder(req.body.amount,req.body.receipt))}catch(e){next(e)}});
r.post("/payment/verify",(req,res)=>{const result=verifyPayment(req.body);res.status(result.verified?200:400).json(result)});
r.get("/courier/:tracking",async(req,res,next)=>{try{res.json(await trackCourier(req.params.tracking))}catch(e){next(e)}});
r.get("/delivery/:pincode",(req,res)=>{const ok=/^\d{6}$/.test(req.params.pincode);res.json({pincode:req.params.pincode,serviceable:ok,estimate:ok?"3–5 business days":null})});export default r;
