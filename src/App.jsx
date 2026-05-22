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

export default function App() {
  const [tab, setTab] = useState("home");
  const [showAuth, setShowAuth] = useState(false);

  const TABS = ["home", "browse", "list", "messages", "profile", "plans"];

  return (
    <div style={S.app}>
      <header style={S.header}>
        <div style={S.headerInner}>
          <div onClick={() => setTab("home")}>Kohao</div>

          <button onClick={() => setShowAuth(true)}>Sign In</button>
        </div>

        <div>
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)}>
              {t}
            </button>
          ))}
        </div>
      </header>

      <main style={S.main}>
  {tab === "list" && (
  <div>
    <h1>Share something</h1>

    <p style={{ color: "#555" }}>
      What would you like to offer or ask for?
    </p>

    <div style={{ marginTop: 20 }}>
      <input placeholder="Title (e.g. Homemade bread, Lawn mowing help)" style={{ width: "100%", padding: 10 }} />
    </div>

    <div style={{ marginTop: 10 }}>
      <textarea placeholder="Describe what you’re offering or looking for" style={{ width: "100%", padding: 10 }} />
    </div>

    <div style={{ marginTop: 20 }}>
      <label>Type</label>
      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        <button>Exchange</button>
        <button>Koha</button>
        <button>Price</button>
      </div>
    </div>

    <div style={{ marginTop: 20 }}>
      <input placeholder="What would you like in return? (optional)" style={{ width: "100%", padding: 10 }} />
    </div>

    <button style={{ marginTop: 20 }}>
      Post to community
    </button>
  </div>
)}
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

  {tab === "browse" && <h1>Explore what people are sharing</h1>}
  {tab === "list" && <h1>Share something with the community</h1>}
  {tab === "messages" && <h1>Your conversations</h1>}
  {tab === "profile" && <h1>Your space</h1>}
  {tab === "plans" && <h1>Support Kohao</h1>}
</main>

      <nav style={S.bottomNav}>
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </nav>

      {showAuth && (
        <Modal onClose={() => setShowAuth(false)}>
          <div>Auth Modal</div>
        </Modal>
      )}
    </div>
  );
}
