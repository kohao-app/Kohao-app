import { useState } from "react";

const S = {
  app: { padding: 20, fontFamily: "sans-serif" },
  header: { padding: 10, borderBottom: "1px solid #ccc" },
  headerInner: { display: "flex", justifyContent: "space-between" },
  main: { padding: 20 },
  bottomNav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "space-around",
    borderTop: "1px solid #ccc",
    background: "#fff",
    padding: 10
  }
};

function Modal({ onClose, children }) {
  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div style={{ background: "#fff", padding: 24 }}>
        <button onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
}

export default function App() 

const [tab, setTab] = useState("home");
const [showAuth, setShowAuth] = useState(false);

const [listings, setListings] = useState([
  {
    id: 1,
    title: "Fresh sourdough bread",
    desc: "Baked this morning. Happy to trade.",
    type: "exchange"
  },
  {
    id: 2,
    title: "Free kids clothes",
    desc: "Size 4–6, good condition",
    type: "koha"
  }
]);

const [form, setForm] = useState({
  title: "",
  desc: "",
  type: "exchange",
  return: ""
});

      <main style={S.main}>
 {tab === "home" && (
  <div style={{ padding: 20 }}>
    <h1 style={{ fontSize: 32, marginBottom: 10 }}>
      Welcome to Kohao 🧡
    </h1>

    <p style={{ marginBottom: 20 }}>
      Connect. Grow. Belong.
    </p>

    <div style={{ display: "grid", gap: 12 }}>
      {listings.length === 0 ? (
        <div style={{ opacity: 0.6 }}>
          No listings yet — be the first to share something ✨
        </div>
      ) : (
        listings.map((item, i) => (
          <div key={i} style={{
            padding: 12,
            border: "1px solid #ddd",
            borderRadius: 8
          }}>
            <strong>{item.title}</strong>
            <div>{item.desc}</div>
          </div>
        ))
      )}
    </div>
  </div>
)}
        
  <div>
    <h1>Share something</h1>

    <input
      placeholder="Title"
      value={form.title}
      onChange={(e) => setForm({ ...form, title: e.target.value })}
      style={{ width: "100%", padding: 10, marginTop: 10 }}
    />

    <textarea
      placeholder="Description"
      value={form.desc}
      onChange={(e) => setForm({ ...form, desc: e.target.value })}
      style={{ width: "100%", padding: 10, marginTop: 10 }}
    />

    <div style={{ marginTop: 10 }}>
      <select
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      >
        <option value="exchange">Exchange</option>
        <option value="koha">Koha</option>
        <option value="price">Price</option>
      </select>
    </div>

    <button
      style={{ marginTop: 15 }}
      <button onClick={onClose} style={{ float: "right" }}>
  Close
</button>
    
        setListings([
          { ...form, id: Date.now() },
          ...listings
        ]);

        setForm({ title: "", desc: "", type: "exchange", return: "" });
        setTab("browse");
      }}
    >
      Post
    </button>
  </div>
)})}
        
      {/* COMMUNITY FLOW */}
      <div style={{ marginTop: 40 }}>
        <h3>How it works</h3>

        <div style={{ marginTop: 10 }}>
          <p><strong>1.</strong> Share something you have</p>
          <p><strong>2.</strong> Ask for what you need</p>
          <p><strong>3.</strong> Connect and exchange</p>
        </div>
      </div>

      {/* CATEGORIES */}
      <div style={{ marginTop: 40 }}>
        <h3>Explore</h3>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 10 }}>
          <button>Kai & Food</button>
          <button>Clothing</button>
          <button>Services</button>
          <button>Crafts</button>
          <button>Home & Garden</button>
          <button>Goods</button>
        </div>
      </div>

      {/* COMMUNITY TONE */}
      <div style={{ marginTop: 40, padding: 15, background: "#f7f7f7" }}>
        <p style={{ margin: 0 }}>
          Built on trust, generosity, and community — everyone has something to offer.
        </p>
      </div>

    </div>
  )}

  {tab === "browse" && (
  <div>
    <h1>Community Feed</h1>

    <div style={{ marginTop: 20 }}>
      {listings.map((item) => (
        <div
          key={item.id}
          style={{
            padding: 15,
            borderBottom: "1px solid #ddd"
          }}
        >
          <strong>{item.title}</strong>

          <p style={{ marginTop: 5 }}>{item.desc}</p>

          <div style={{ marginTop: 5, fontSize: 12, color: "#666" }}>
            {item.type === "exchange" && "🤝 Open to trade"}
            {item.type === "koha" && "🎁 Koha / Free"}
            {item.type === "price" && "💰 Open to offers"}
          </div>
        </div>
      ))}
    </div>
  </div>
)}

      <nav style={S.bottomNav}>
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </nav>

      {showAuth && (
  <Modal onClose={() => setShowAuth(false)}>
    <div>
      <h2>Welcome</h2>
      <p style={{ marginTop: 10 }}>
        Sign in or join the community
      </p>

      <input
        placeholder="Your name"
        style={{ width: "100%", padding: 10, marginTop: 10 }}
      />

      <button style={{ marginTop: 15, width: "100%" }}>
        Continue
      </button>
    </div>
  </Modal>
)}
