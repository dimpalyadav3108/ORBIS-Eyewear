import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { useApp } from "../context/AppContext";

export default function Support() {
  const { user } = useApp();
  const [done, setDone] = useState(null);
  const [err, setErr] = useState("");
  const [tickets, setTickets] = useState([]);

  const load = () => user && api("/support/mine").then(setTickets).catch(() => {});

  useEffect(() => {
    load();
  }, [user]);

  async function submit(e) {
    e.preventDefault();
    try {
      const r = await api("/support", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))),
      });
      setDone(r);
      load();
    } catch (e) {
      setErr(e.message);
    }
  }

  async function reply(id, e) {
    e.preventDefault();
    await api(`/support/${id}/reply`, {
      method: "POST",
      body: JSON.stringify({ message: new FormData(e.currentTarget).get("message") }),
    });
    e.currentTarget.reset();
    load();
  }

  return (
    <section className="supportPage">
      <div>
        <small>WE'RE HERE TO HELP</small>
        <h1>Support,<br/><em>without the fuss.</em></h1>
        <p>Ask about an order, prescription, return or anything else ORBIS.</p>
        <div className="faq">
          {[
            ["How do I add my prescription?", "Enter it during customization, upload it, use a saved prescription, or choose submit later."],
            ["Can I return my order?", "Eligible orders can start a return or exchange from your account."],
            ["How do I track an order?", "Use My Orders when signed in, or guest tracking with order number and checkout contact."]
          ].map(x => <details key={x[0]}><summary>{x[0]}</summary><p>{x[1]}</p></details>)}
        </div>
        {user && <div className="dataList">
          <h3>My tickets</h3>
          {tickets.map(t => <article key={t._id}>
            <b>{t.ticketNo} · {t.status}</b>
            <p>{t.message}</p>
            {t.replies?.map((r,i) => <p key={i}><b>{r.by}:</b> {r.message}</p>)}
            <form className="inlineForm" onSubmit={e => reply(t._id,e)}>
              <input name="message" required placeholder="Reply"/>
              <button>Send</button>
            </form>
          </article>)}
        </div>}
      </div>
      <form className="supportCard" onSubmit={submit}>
        <h2>{done ? `Created ${done.ticketNo}` : "Send a request"}</h2>
        <input name="email" type="email" defaultValue={user?.email || ""} required placeholder="Email"/>
        <input name="orderNumber" placeholder="Order number (optional)"/>
        <select name="type">
          <option>Order help</option>
          <option>Prescription</option>
          <option>Return / exchange</option>
          <option>Product question</option>
        </select>
        <textarea name="message" required placeholder="How can we help?"/>
        <button className="primary">Create ticket</button>
        {err && <p className="error">{err}</p>}
      </form>
    </section>
  );
}
