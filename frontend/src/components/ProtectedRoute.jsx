import React from "react";
import {Navigate,useLocation} from "react-router-dom";
import {useApp} from "../context/AppContext";
export default function ProtectedRoute({children,roles}){const {user,authReady}=useApp();const loc=useLocation();if(!authReady)return <div className="pageLoader">ORBIS</div>;if(!user)return <Navigate to="/login" replace state={{from:loc.pathname}}/>;if(roles&&!roles.includes(user.role))return <Navigate to="/account" replace/>;return children}
