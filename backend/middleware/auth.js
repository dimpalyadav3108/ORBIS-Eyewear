import jwt from"jsonwebtoken";import User from"../models/User.js";
export async function optionalAuth(req,res,next){try{const t=req.cookies?.orbis_token;if(t){const d=jwt.verify(t,process.env.JWT_SECRET);req.user=await User.findById(d.id).select("-passwordHash")}}catch{}next()}
export async function protect(req,res,next){try{const t=req.cookies?.orbis_token;if(!t)return res.status(401).json({message:"Please sign in"});const d=jwt.verify(t,process.env.JWT_SECRET);req.user=await User.findById(d.id).select("-passwordHash");if(!req.user)return res.status(401).json({message:"Session is no longer valid"});next()}catch{return res.status(401).json({message:"Session expired. Please sign in again."})}}
export const allow=(...roles)=>(req,res,next)=>roles.includes(req.user?.role)?next():res.status(403).json({message:"Access denied"});
export const permission=p=>(req,res,next)=>req.user?.role==="admin"||req.user?.permissions?.includes(p)?next():res.status(403).json({message:"Permission denied"});
