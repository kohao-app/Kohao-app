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
       {tab === "home" && <h1>Welcome to Kohao 🧡</h1>}
       {tab === "browse" && <h1>Browse Listings</h1>}
       {tab === "list" && <h1>Create a Listing</h1>}
       {tab === "messages" && <h1>Your Messages</h1>}
       {tab === "profile" && <h1>Your Profile</h1>}
       {tab === "plans" && <h1>Plans & Pricing</h1>}
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
