import React from "react";
import {Link} from "react-router-dom";
import {ArrowRight, Sparkles, Eye, Palette, Droplets, PackageOpen, ShieldCheck, CircleDot} from "lucide-react";
import {lensTypes,lensPackages,addons} from "../data/catalog";

const groups=[
 {title:"Clear Contact Lenses",sub:"Everyday vision correction",icon:Eye,items:[
  ["Distance Power","Single-vision contact lenses","From ₹319"],
  ["Toric / Cylindrical","For astigmatism correction","From ₹379"],
  ["Multi-Focal","Near and distance support","From ₹799"],
  ["Daily Disposable","Fresh pair for every day","From ₹399"]]},
 {title:"Color Contact Lenses",sub:"Natural-looking colour options",icon:Palette,items:[
  ["Zero Power","Colour-only lenses","From ₹189"],
  ["With Power","Colour with vision correction","From ₹199"],
  ["Natural Hazel","Warm everyday colour","From ₹249"],
  ["Color Combos","Multi-pack colour sets","From ₹699"]]},
 {title:"Solution & Accessories",sub:"Care for lenses every day",icon:Droplets,items:[
  ["Lens Solution","Cleaning and storage care","From ₹149"],
  ["Lens Cases","Compact hygienic storage","From ₹99"],
  ["Travel Kit","Solution bottle + case","From ₹199"],
  ["Accessories","Lens care essentials","From ₹159"]]}
];

const colors=["#dff7ff","#fff0d8","#e7f7ee","#f0eaff"];

export default function Lenses(){return <section className="lensPage lensStore">
 <div className="lensHero">
  <small><Sparkles size={14}/> ORBIS LENS LAB</small>
  <h1>Clear vision.<br/><em>More choices.</em></h1>
  <p>Prescription lenses, contact lenses, colour lenses and everyday lens-care essentials in one place.</p>
  <div className="lensHeroBtns"><Link className="primary" to="/shop">Choose a frame <ArrowRight size={17}/></Link><a className="ghost" href="#contacts">Shop contact lenses</a></div>
  <div className="contactLensVisual" aria-hidden="true"><i/><i/><i/></div>
 </div>

 <div className="section lensVision">
  <div className="sectionHead"><div><small>01 / PRESCRIPTION LENSES</small><h2>Choose your lens type</h2><p>Pick the vision correction that fits your prescription.</p></div></div>
  <div className="lensTypeGrid">{lensTypes.map((x,i)=><article key={x.name}><span>{x.icon}</span><small>0{i+1}</small><h3>{x.name}</h3><p>{x.desc}</p><b>{x.price?`+ ₹${x.price}`:"Included"}</b></article>)}</div>

  <div className="sectionHead lensPackagesHead"><div><small>02 / FINISH</small><h2>Upgrade the experience</h2><p>Add comfort, clarity and protection to your lenses.</p></div></div>
  <div className="packageGrid">{lensPackages.map((x,i)=><article key={x.name}><div className="packageIcon"><ShieldCheck/></div><small>PACKAGE 0{i+1}</small><h3>{x.name}</h3><p>{x.desc}</p><b>{x.price?`+ ₹${x.price}`:"Included"}</b></article>)}</div>
  <div className="addonRibbon">{addons.map(x=><span key={x.name}>✦ {x.name} +₹{x.price}</span>)}</div>
 </div>

 <section className="contactStore section" id="contacts">
  <div className="sectionHead contactHead"><div><small>03 / CONTACT LENSES</small><h2>Contacts for every kind of day.</h2><p>Clear, coloured and care essentials arranged for quick discovery.</p></div><Link to="/shop?cat=Contact+Lenses">View contact-lens products <ArrowRight size={16}/></Link></div>
  <div className="contactColumns">{groups.map((g,gi)=><article className="contactGroup" key={g.title}>
    <div className="contactGroupTop"><div><small>{g.sub}</small><h3>{g.title}</h3></div><div className="contactArt" style={{background:colors[gi]}}><g.icon/><i/><i/></div></div>
    <div className="contactItems">{g.items.map(([name,desc,price],i)=><Link to="/shop?cat=Contact+Lenses" className="contactItem" key={name}>
      <div className="miniLens" style={{background:colors[(gi+i)%colors.length]}}><CircleDot/></div>
      <div><b>{name}</b><small>{desc}</small><strong>{price}</strong></div><ArrowRight/>
    </Link>)}</div>
  </article>)}</div>
 </section>

 <section className="lensCareBand">
   <div><PackageOpen/><span><b>Easy reorder</b><small>Repeat contact-lens purchases from your account.</small></span></div>
   <div><ShieldCheck/><span><b>Prescription ready</b><small>Manual power, upload, saved prescription or submit later.</small></span></div>
   <div><Droplets/><span><b>Lens care</b><small>Solutions, cases and daily-care accessories.</small></span></div>
 </section>
 </section>}
