import React, { useState } from "react";

const DATA = {
  "Buying Guide": {
    eyebrow: "FIND YOUR ORBIS",
    intro: "A simple guide to choosing frames and lenses that suit your everyday needs.",
    cards: [
      ["01", "Choose your frame", "Start with a shape and style you enjoy. Use the product filters to explore round, square, rectangle, cat-eye and more."],
      ["02", "Check the fit", "Use the frame measurements and size guide to compare lens width, bridge width and temple length before ordering."],
      ["03", "Choose your lenses", "Select zero power, single vision, bifocal or progressive lenses, then choose the lens package that fits your needs."],
      ["04", "Add your prescription", "Enter your power manually, use a saved prescription, upload it, or choose to provide it later where available."],
    ],
  },
  "Frame Size Guide": {
    eyebrow: "FIND YOUR FIT",
    intro: "Understand the three key measurements used to describe an eyewear frame.",
    cards: [
      ["01", "Lens width", "The horizontal width of one lens. This is usually the first number shown in a frame-size measurement."],
      ["02", "Bridge width", "The distance between the two lenses. A comfortable bridge helps the frame sit securely on your nose."],
      ["03", "Temple length", "The length of the side arm from the hinge toward your ear. Compare it with a pair that already fits you well."],
      ["TIP", "Compare a current pair", "Check the numbers printed inside the temple of glasses that fit you comfortably and compare them with the ORBIS product details."],
    ],
  },
  Policies: {
    eyebrow: "SHOP WITH CLARITY",
    intro: "Key ORBIS shopping policies in one place. Final eligibility depends on the order and product details shown during checkout.",
    cards: [
      ["01", "Orders", "Review your product, lens, prescription, address and payment information carefully before placing an order."],
      ["02", "Returns & exchanges", "Eligible orders can start a return or exchange from the account area. The request is reviewed before the next return step."],
      ["03", "Refunds", "Approved refunds follow the available refund flow and may depend on the original payment method and return status."],
      ["04", "Prescription products", "Prescription details should be accurate. Orders may be held for verification when additional confirmation is required."],
    ],
  },
};

export default function Utility({ type = "Support" }) {
  const [sent, setSent] = useState(false);
  const page = DATA[type] || DATA["Buying Guide"];

  function submit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section className="utilityPage">
      <div className="utilityHero">
        <small>ORBIS CARE</small>
        <span className="utilityEyebrow">{page.eyebrow}</span>
        <h1>{type}</h1>
        <p>{page.intro}</p>
      </div>

      <div className="utilityGrid">
        {page.cards.map(([number, title, copy]) => (
          <article className="utilityInfoCard" key={title}>
            <span>{number}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </div>

      <div className="utilityHelp">
        <div className="utilityHelpCopy">
          <small>NEED MORE HELP?</small>
          <h2>Ask ORBIS Care.</h2>
          <p>
            Send an order-related question or attach a photo and our support
            workspace will keep the request together.
          </p>
        </div>

        <form className="utilityForm" onSubmit={submit}>
          {sent ? (
            <div className="utilitySuccess">
              <span>✓</span>
              <div>
                <h3>Request received</h3>
                <p>Your request has been recorded.</p>
              </div>
              <button type="button" onClick={() => setSent(false)}>
                Send another
              </button>
            </div>
          ) : (
            <>
              <div className="utilityField">
                <label>Order number</label>
                <input placeholder="Optional" />
              </div>

              <div className="utilityField">
                <label>Request type</label>
                <select defaultValue="General enquiry">
                  <option>General enquiry</option>
                  <option>Order support</option>
                  <option>Return</option>
                  <option>Exchange</option>
                  <option>Refund</option>
                </select>
              </div>

              <div className="utilityField utilityMessage">
                <label>How can we help?</label>
                <textarea required placeholder="Tell us about your request…" />
              </div>

              <label className="utilityUpload">
                <span>Attach photo</span>
                <input type="file" accept="image/*" />
              </label>

              <button className="utilitySubmit" type="submit">
                Submit request
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
