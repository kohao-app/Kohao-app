import { useState } from "react";

const CATEGORIES = [
  { id: "food", label: "Kai & Food", icon: "Food", desc: "Homemade meals, preserves, baked goods, produce" },
  { id: "clothing", label: "Clothing", icon: "Clothing", desc: "Handmade, upcycled, vintage, alterations" },
  { id: "services", label: "Services", icon: "Services", desc: "Skills, trades, repairs, tutoring, wellness" },
  { id: "crafts", label: "Crafts & Art", icon: "Crafts", desc: "Handmade goods, artwork, jewellery" },
  { id: "garden", label: "Home & Garden", icon: "Garden", desc: "Plants, tools, furniture, home goods" },
  { id: "goods", label: "Goods & Tech", icon: "Goods", desc: "New or used items, electronics, books" }
];

const REGIONS = [
  "Auckland","Wellington","Canterbury","Bay of Plenty","Otago",
  "Hawke's Bay","Waikato","Marlborough","Southland","Manawatu-Whanganui",
  "Taranaki","Northland","Gisborne","West Coast","Nelson","Tasman"
];

const PLANS = [
  {
    id: "free",
    name: "Korero",
    price: 0,
    period: "forever",
    desc: "Get started and explore",
    features: ["3 active listings", "Browse offers", "Basic messaging", "Community board"]
  },
  {
    id: "tuhono",
    name: "Tuhono",
    price: 4.90,
    period: "month",
    desc: "For active traders and makers",
    highlight: true,
    features: ["Unlimited listings", "Priority placement", "Verified badge", "10 photos per listing", "Transaction history"]
  },
  {
    id: "pakihi",
    name: "Pakihi",
    price: 9.90,
    period: "month",
    desc: "Small businesses and collectives",
    features: ["Business profile", "Featured listings", "Analytics dashboard", "Priority support"]
  }
];

const S = {
  app: { fontFamily: "Georgia, serif", background: "#f4ede0", minHeight: "100vh", color: "#1e150a" },
  header: { background: "#1a0f05", borderBottom: "3px solid #c8842a", padding: "0 20px", position: "sticky", top: 0, zIndex: 300 },
  headerInner: { maxWidth: 960, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 },
  main: { maxWidth: 960, margin: "0 auto", padding: "0 16px 100px" },
  bottomNav: { position: "fixed", bottom: 0, left: 0, right: 0, background: "#1a0f05", borderTop: "2px solid #c8842a", display: "flex", zIndex: 200 },
  card: { background: "#fffbf3", border: "1px solid #ddd0b0" },
  input: { width: "100%", padding: "11px 14px", border: "1px solid #ddd0b0", background: "#fffbf3", fontSize: 14 }
};

function Modal({ onClose, children }) {
  return (
    <div onClick={e => e.target === e.currentTarget && onClose()}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", padding: 24, maxWidth: 500, width: "100%" }}>
        <button onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
}

function EmptyState({ title, desc, action, onAction }) {
  return (
    <div style={{ textAlign: "center", padding: 40 }}>
      <div style={{ fontSize: 20, fontWeight: 700 }}>{title}</div>
      <div style={{ marginTop: 10 }}>{desc}</div>
      {action && <button onClick={onAction}>{action}</button>}
    </div>
  );
}

function CardHover({ children, onClick }) {
  return (
    <div onClick={onClick} style={{ padding: 16, border: "1px solid #ccc" }}>
      {children}
    </div>
  );
}

/* ================= ROOT APP ================= */

const S = {
  app: { padding: 20 },
  header: { padding: 10, borderBottom: "1px solid #ccc" },
  headerInner: { display: "flex", justifyContent: "space-between" },
  main: { padding: 20 },
  bottomNav: { display: "flex", justifyContent: "space-around" }
};

export default function App() {
export default function App() {
  const [tab, setTab] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [showAuth, setShowAuth] = useState(null);

  const addListing = (l) =>
    setListings(prev => [{ ...l, userId: user?.id }, ...prev]);

  const TABS = [
    { id: "home", label: "Home" },
    { id: "browse", label: "Browse" },
    { id: "list", label: "List" },
    { id: "messages", label: "Messages" },
    { id: "profile", label: "Profile" },
    { id: "plans", label: "Plans" }
  ];

  return (
  <div style={S.app}>

    <header style={S.header}>
      <div style={S.headerInner}>
        <div onClick={() => setTab("home")}>Kohao</div>

        {!isLoggedIn ? (
          <>
            <button onClick={() => setShowAuth("login")}>Sign In</button>
            <button onClick={() => setShowAuth("signup")}>Join</button>
          </>
        ) : (
          <div onClick={() => setTab("profile")}>
            {user?.name || "Profile"}
          </div>
        )}
      </div>

      <div style={{ display: "flex" }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
    </header>

    <main style={S.main}>
      {tab === "home" && <div>Home</div>}
      {tab === "browse" && <div>Browse</div>}
      {tab === "list" && <div>List</div>}
      {tab === "messages" && <div>Messages</div>}
      {tab === "profile" && <div>Profile</div>}
      {tab === "plans" && <div>Plans</div>}
    </main>

    <nav style={S.bottomNav}>
      {TABS.map(t => (
        <button key={t.id} onClick={() => setTab(t.id)}>
          {t.label}
        </button>
      ))}
    </nav>

    {showAuth && (
      <Modal onClose={() => setShowAuth(null)}>
        <div>Auth</div>
      </Modal>
    )}

    {selectedListing && (
      <Modal onClose={() => setSelectedListing(null)}>
        <div>Listing</div>
      </Modal>
    )}

  </div>
);
}
