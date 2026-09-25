import React,{useState}from"react";
import{api}from"../services/api";import{useApp}from"../context/AppContext";import{useNavigate,useSearchParams,Link}from"react-router-dom";import{Eye,EyeOff,ArrowRight,ShieldCheck,RotateCcw,Glasses}from"lucide-react";
export default function Auth(){const[sp]=useSearchParams(),[mode,setMode]=useState(sp.get("mode")==="register"?"register":"login"),[f,setF]=useState({name:"",email:"",password:""}),[msg,setMsg]=useState(""),[show,setShow]=useState(false),{setUser}=useApp(),nav=useNavigate();
async function go(e){e.preventDefault();setMsg("");try{const r=await api("/auth/"+mode,{method:"POST",body:JSON.stringify(f)});setUser(r.user);nav("/home")}catch(e){setMsg(e.message)}}
return <section className="authWelcome authHomeMatch">
  <div className="authArt">
    <Link className="authEyebrow" to="/home">ORBIS / YOUR VISION</Link>
    <h1>Find the pair<br/>that feels <em>like you.</em></h1>
    <p>Explore everyday frames, screen glasses, sunglasses and prescription-ready eyewear with a clean ORBIS shopping experience.</p>
    <div className="authTrust"><span><ShieldCheck/> Secure account</span><span><Glasses/> Prescription ready</span><span><RotateCcw/> Easy returns</span></div>
    <div className="authShowcase" aria-hidden="true"><div className="lens left"/><i/><div className="lens right"/></div>
  </div>
  <form className="authCard" onSubmit={go}><div className="authFormInner">
    <Link className="logo" to="/home">OR<span>BIS</span></Link>
    <small>{mode==="login"?"WELCOME BACK":"JOIN ORBIS"}</small>
    <h2>{mode==="login"?<>Sign in to <em>ORBIS.</em></>:<>Create your <em>account.</em></>}</h2>
    <p className="authIntro">{mode==="login"?"Access orders, prescriptions, wishlist and returns.":"Save your prescription, wishlist and orders in one place."}</p>
    {mode==="register"&&<label>Full name<input required placeholder="Your name" value={f.name} onChange={e=>setF({...f,name:e.target.value})}/></label>}
    <label>Email address<input required placeholder="you@example.com" type="email" value={f.email} onChange={e=>setF({...f,email:e.target.value})}/></label>
    <label>Password<div className="password"><input required minLength="6" placeholder="Minimum 6 characters" type={show?"text":"password"} value={f.password} onChange={e=>setF({...f,password:e.target.value})}/><button type="button" aria-label={show?"Hide password":"Show password"} onClick={()=>setShow(!show)}>{show?<EyeOff/>:<Eye/>}</button></div></label>
    {msg&&<p className="error">{msg}</p>}
    <button className="primary full">{mode==="login"?"Sign in":"Create account"}<ArrowRight size={18}/></button>
    {mode==="login"&&<button type="button" className="forgot" onClick={async()=>{if(!f.email)return setMsg("Enter your email first.");try{const r=await api("/auth/forgot-password",{method:"POST",body:JSON.stringify({email:f.email})});setMsg(r.message)}catch(e){setMsg(e.message)}}}>Forgot password?</button>}
    <div className="authDivider"><span>or</span></div>
    <button type="button" className="guestBtn" onClick={()=>nav("/home")}>Continue as guest</button>
    <p className="authSwitch">{mode==="login"?"New to ORBIS? ":"Already a member? "}<button type="button" className="textBtn" onClick={()=>{setMode(mode==="login"?"register":"login");setMsg("")}}>{mode==="login"?"Create account":"Sign in"}</button></p>
  </div></form>
</section>}
