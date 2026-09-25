import React, { useEffect, useState } from "react";
import { api, API_BASE } from "../services/api";
import { useApp } from "../context/AppContext";

const modules = [
  "Dashboard",
  "Products & variants",
  "Stock",
  "Orders",
  "Prescription review",
  "Returns & exchanges",
  "Customers",
  "Coupons & offers",
  "Banners & content",
  "Reviews",
  "Support tickets",
  "Reports & export",
  "Staff & roles",
  "Settings",
  "Activity log",
];

const permissionForModule = {
  Dashboard: "orders",
  "Products & variants": "catalog",
  Stock: "catalog",
  Orders: "orders",
  "Prescription review": "orders",
  "Returns & exchanges": "orders",
  Customers: "orders",
  "Support tickets": "support",
  "Reports & export": "orders",
};

const endpointForTab = {
  Orders: "orders",
  "Returns & exchanges": "returns",
  Customers: "customers",
  "Coupons & offers": "coupons",
  "Banners & content": "content",
  Reviews: "reviews",
  "Support tickets": "support",
  "Staff & roles": "staff",
  "Activity log": "activity",
};

export default function Admin() {
  const { user } = useApp();
  const [tab, setTab] = useState("Dashboard");
  const [data, setData] = useState([]);
  const [dash, setDash] = useState({});
  const [msg, setMsg] = useState("");

  const visibleModules =
    user?.role === "admin"
      ? modules
      : modules.filter((name) => {
          const permission = permissionForModule[name];
          return permission && user?.permissions?.includes(permission);
        });

  const endpoint = endpointForTab[tab];

  async function load() {
    setMsg("");
    try {
      if (tab === "Dashboard") {
        setDash(await api("/admin/dashboard"));
        return;
      }

      if (
        tab === "Products & variants" ||
        tab === "Stock" ||
        tab === "Prescription review"
      ) {
        const result = await api("/products?limit=60");
        setData(result.items || []);
        return;
      }

      if (tab === "Reports & export") {
        setData([await api("/admin/reports")]);
        return;
      }

      if (tab === "Settings") {
        const result = await api("/admin/settings");
        setData(Array.isArray(result) ? result : []);
        return;
      }

      if (endpoint) {
        const result = await api(
          endpoint === "support" ? "/support" : `/admin/${endpoint}`
        );
        setData(Array.isArray(result) ? result : result?.items || []);
        return;
      }

      setData([]);
    } catch (error) {
      setMsg(error.message);
      setData([]);
    }
  }

  useEffect(() => {
    load();
  }, [tab]);

  async function orderStatus(id, status) {
    try {
      await api(`/orders/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      await load();
    } catch (error) {
      setMsg(error.message);
    }
  }

  async function returnStatus(id, status) {
    try {
      await api(`/returns/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          status,
          refundStatus: status === "complete" ? "completed" : "processing",
        }),
      });
      await load();
    } catch (error) {
      setMsg(error.message);
    }
  }

  async function approve(id) {
    try {
      await api(`/reviews/${id}/approve`, { method: "PATCH" });
      await load();
    } catch (error) {
      setMsg(error.message);
    }
  }

  async function create() {
    setMsg("");

    try {
      if (tab === "Coupons & offers") {
        const code = prompt("Coupon code");
        if (code) {
          await api("/admin/coupons", {
            method: "POST",
            body: JSON.stringify({
              code,
              type: "percent",
              value: 10,
              active: true,
            }),
          });
        }
      } else if (tab === "Settings") {
        const key = prompt(
          "Setting key (shipping/tax/returnWindow/paymentKeys)"
        );
        const value = prompt("Value");

        if (key) {
          await api("/admin/settings", {
            method: "POST",
            body: JSON.stringify({ key, value }),
          });
        }
      } else if (tab === "Staff & roles") {
        const name = prompt("Staff name");
        const email = prompt("Email");
        const password = prompt("Temporary password");

        if (name && email && password) {
          await api("/admin/staff", {
            method: "POST",
            body: JSON.stringify({
              name,
              email,
              password,
              permissions: ["orders", "catalog", "support"],
            }),
          });
        }
      } else if (tab === "Banners & content") {
        const title = prompt("Page/banner title");
        const slug = prompt("Slug");

        if (title && slug) {
          await api("/admin/content", {
            method: "POST",
            body: JSON.stringify({
              title,
              slug,
              type: "page",
              body: "Edit this content from the API/admin workspace.",
            }),
          });
        }
      } else if (tab === "Products & variants") {
        const name = prompt("Product name");
        const price = Number(prompt("Price"));

        if (name && price) {
          await api("/products", {
            method: "POST",
            body: JSON.stringify({
              name,
              price,
              stock: 0,
              category: "Eyeglasses",
              brand: "ORBIS",
              slug: name.toLowerCase().trim().replace(/\s+/g, "-"),
            }),
          });
        }
      }

      await load();
    } catch (error) {
      setMsg(error.message);
    }
  }

  return (
    <div className="admin">
      <aside>
        <div className="logo">
          OR<span>BIS</span>
        </div>
        <small>ADMIN STUDIO</small>

        {visibleModules.map((name) => (
          <button
            key={name}
            className={tab === name ? "on" : ""}
            onClick={() => setTab(name)}
          >
            {name}
          </button>
        ))}
      </aside>

      <section>
        <div className="adminTop">
          <div>
            <small>CONTROL CENTER</small>
            <h1>{tab}</h1>
          </div>

          {[
            "Products & variants",
            "Coupons & offers",
            "Banners & content",
            "Staff & roles",
            "Settings",
          ].includes(tab) && (
            <button className="primary" onClick={create}>
              + New
            </button>
          )}
        </div>

        {msg && <p className="error">{msg}</p>}

        {tab === "Dashboard" ? (
          <div className="stats">
            {[
              [`₹${dash.revenue || 0}`, "Sales"],
              [dash.orders || 0, "Orders"],
              [dash.customers || 0, "Customers"],
              [dash.returns || 0, "Open returns"],
              [dash.tickets || 0, "Open tickets"],
              [dash.stock || 0, "Units in stock"],
            ].map(([value, label]) => (
              <div key={label}>
                <h2>{value}</h2>
                <p>{label}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="panel wide">
            <div className="tableHead">
              <b>{tab}</b>

              {tab === "Reports & export" && (
                <a className="primary" href={`${API_BASE}/admin/reports.csv`}>
                  Export CSV
                </a>
              )}
            </div>

            {data.length ? (
              data.map((x, i) => (
                <div className="tableRow" key={x._id || x.key || i}>
                  <span>
                    <b>
                      {x.name ||
                        x.orderNumber ||
                        x.code ||
                        x.title ||
                        x.ticketNo ||
                        x.key ||
                        x.action ||
                        x._id ||
                        "Report"}
                    </b>
                    <small>
                      {x.email || x.category || x.status || x.type || ""}
                    </small>
                  </span>

                  <span>
                    {x.price !== undefined
                      ? `₹${x.price}`
                      : x.total !== undefined
                        ? `₹${x.total}`
                        : x.value !== undefined
                          ? String(x.value)
                          : x.rating || ""}
                  </span>

                  <span>
                    {x.stock !== undefined
                      ? `${x.stock} stock`
                      : x.refundStatus || x.role || x.entity || ""}
                  </span>

                  <span>
                    {x.createdAt
                      ? new Date(x.createdAt).toLocaleDateString()
                      : ""}
                  </span>

                  <span>
                    {tab === "Orders" && (
                      <select
                        value={x.status || ""}
                        onChange={(e) => orderStatus(x._id, e.target.value)}
                      >
                        {[
                          "Order received",
                          "Payment confirmed",
                          "Power verified",
                          "Lens fitting",
                          "Quality check",
                          "Packed",
                          "Shipped",
                          "Delivered",
                          "On hold",
                          "Cancelled",
                        ].map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    )}

                    {tab === "Returns & exchanges" && (
                      <select
                        value={x.status || "requested"}
                        onChange={(e) => returnStatus(x._id, e.target.value)}
                      >
                        {[
                          "requested",
                          "approved",
                          "rejected",
                          "pickup_scheduled",
                          "picked_up",
                          "received",
                          "inspected",
                          "complete",
                        ].map((status) => (
                          <option key={status} value={status}>
                            {status.replaceAll("_", " ")}
                          </option>
                        ))}
                      </select>
                    )}

                    {tab === "Reviews" && !x.approved && (
                      <button onClick={() => approve(x._id)}>Approve</button>
                    )}
                  </span>
                </div>
              ))
            ) : (
              <p>No records yet.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
