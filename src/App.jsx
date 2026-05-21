import { useState } from "react";

// â”€â”€ CONSTANTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const CATEGORIES = [
  { id: "food", label: "Kai & Food", icon: "ðŸ¥—", desc: "Homemade meals, preserves, baked goods, produce" },
  { id: "clothing", label: "Clothing", icon: "ðŸ§µ", desc: "Handmade, upcycled, vintage, alterations" },
  { id: "services", label: "Services", icon: "ðŸ”§", desc: "Skills, trades, repairs, tutoring, wellness" },
  { id: "crafts", label: "Crafts & Art", icon: "ðŸŽ¨", desc: "Handmade goods, artwork, jewellery" },
  { id: "garden", label: "Home & Garden", icon: "ðŸŒ¿", desc: "Plants, tools, furniture, home goods" },
  { id: "goods", label: "Goods & Tech", icon: "ðŸ“¦", desc: "New or used items, electronics, books" },
];

const REGIONS = [
  "Auckland","Wellington","Canterbury","Bay of Plenty","Otago",
  "Hawke's Bay","Waikato","Marlborough","Southland","ManawatÅ«-Whanganui",
  "Taranaki","Northland","Gisborne","West Coast","Nelson","Tasman"
];

const PLANS = [
  {
    id: "free", name: "KÅrero", price: 0, period: "forever",
    desc: "Get started & explore",
    features: ["3 active listings", "Browse all offers", "Basic messaging", "Community board"],
  },
  {
    id: "tuhono", name: "TÅ«hono", price: 4.90, period: "month",
    desc: "For active traders & makers", highlight: true,
    features: ["Unlimited listings", "Priority placement", "Verified badge", "10 photos per listing", "Transaction history", "NZ-wide reach"],
  },
  {
    id: "pakihi", name: "Pakihi", price: 9.90, period: "month",
    desc: "Small businesses & collectives",
    features: ["Everything in TÅ«hono", "Business profile page", "Featured listings", "Analytics dashboard", "Priority support"],
  },
];

// â”€â”€ STYLES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const S = {
  app: { fontFamily: "'Georgia',serif", background: "#f4ede0", minHeight: "100vh", color: "#1e150a" },
  header: { background: "#1a0f05", borderBottom: "3px solid #c8842a", padding: "0 20px", position: "sticky", top: 0, zIndex: 300 },
  headerInner: { maxWidth: 960, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 },
  main: { maxWidth: 960, margin: "0 auto", padding: "0 16px 100px" },
  bottomNav: { position: "fixed", bottom: 0, left: 0, right: 0, background: "#1a0f05", borderTop: "2px solid #c8842a", display: "flex", zIndex: 200 },
  card: { background: "#fffbf3", border: "1px solid #ddd0b0", position: "relative", overflow: "hidden", transition: "all 0.2s" },
  input: { width: "100%", padding: "11px 14px", border: "1.5px solid #ddd0b0", background: "#fffbf3", fontFamily: "'Source Sans 3',sans-serif", fontSize: 14, color: "#1e150a", outline: "none", transition: "border-color 0.2s" },
  btn: (bg, color, border) => ({ background: bg, color: color, border: border || "none", padding: "11px 24px", fontFamily: "'Source Sans 3',sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: "0.04em", cursor: "pointer", transition: "all 0.2s" }),
  tag: (c, bg, bc) => ({ display: "inline-block", fontFamily: "'Source Sans 3',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 9px", color: c, background: bg, border: `1px solid ${bc}` }),
  label: { fontFamily: "'Source Sans 3',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 6, color: "#1e150a" },
};

// â”€â”€ SHARED COMPONENTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function Modal({ onClose, children, wide }) {
  return (
    <div onClick={e => e.target === e.currentTarget && onClose()}
      style={{ position: "fixed", inset: 0, background: "rgba(26,15,5,0.82)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#f4ede0", border: "2px solid #ddd0b0", maxWidth: wide ? 680 : 500, width: "100%", maxHeight: "92vh", overflowY: "auto", position: "relative", padding: 32 }}>
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 18, background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#7a6040", lineHeight: 1 }}>âœ•</button>
        {children}
      </div>
    </div>
  );
}

function EmptyState({ icon, title, desc, action, onAction }) {
  return (
    <div style={{ textAlign: "center", padding: "64px 20px" }}>
      <div style={{ fontSize: 52, marginBottom: 16 }}>{icon}</div>
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{title}</div>
      <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 14, color: "#7a6040", marginBottom: 24, lineHeight: 1.7, maxWidth: 340, margin: "0 auto 24px" }}>{desc}</div>
      {action && <button style={S.btn("#c8842a", "#fff")} onClick={onAction}>{action}</button>}
    </div>
  );
}

function CardHover({ children, style, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...S.card, ...style,
        cursor: onClick ? "pointer" : "default",
        transform: hovered && onClick ? "translateY(-2px)" : "none",
        boxShadow: hovered && onClick ? "0 6px 24px rgba(200,132,42,0.15)" : "none",
        borderColor: hovered && onClick ? "#c8842a" : "#ddd0b0",
      }}>
      {children}
    </div>
  );
}

// â”€â”€ SCREENS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function HomeScreen({ setTab, isLoggedIn, setShowAuth }) {
  return (
    <div>
      {/* Hero */}
      <div style={{ margin: "0 -16px", padding: "56px 24px 48px", textAlign: "center", background: "linear-gradient(160deg,#1a0f05 0%,#2d1a08 60%,#3d2510 100%)", borderBottom: "3px solid #c8842a" }}>
        <div style={{ ...S.tag("#c8842a", "rgba(200,132,42,0.15)", "#c8842a"), marginBottom: 20 }}>ðŸŒ Global Barter Â· MÄori Heart</div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(32px,6vw,62px)", fontWeight: 900, color: "#f4ede0", lineHeight: 1.08, marginBottom: 18 }}>
          Trade What You Have.<br /><span style={{ color: "#c8842a" }}>Get What You Need.</span>
        </h1>
        <p style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 16, color: "#c8b090", maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.8 }}>
          KÅhao connects individuals, small businesses and makers to swap goods, skills and homemade treasures â€” no cash required.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button style={S.btn("#c8842a", "#fff")} onClick={() => isLoggedIn ? setTab("browse") : setShowAuth("signup")}>
            Start Swapping Free
          </button>
          <button style={{ ...S.btn("transparent", "#f4ede0"), border: "2px solid rgba(244,237,224,0.4)" }} onClick={() => setTab("browse")}>
            Browse Offers
          </button>
        </div>
      </div>

      {/* How it works */}
      <div style={{ padding: "40px 0 0" }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, marginBottom: 6 }}>How KÅhao Works</h2>
        <p style={{ fontFamily: "'Source Sans 3',sans-serif", color: "#7a6040", marginBottom: 24, fontSize: 14 }}>Simple, honest, community-led</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 16 }}>
          {[
            ["01", "ðŸ“", "List your offer", "Post what you have â€” goods, homemade kai or a skill."],
            ["02", "ðŸ”", "Browse & match", "Find something you need and see what they're seeking."],
            ["03", "ðŸ’¬", "Message & agree", "Chat directly and agree on swap terms together."],
            ["04", "ðŸ¤", "Complete the swap", "Meet up, post or deliver â€” sorted!"],
          ].map(([n, icon, title, desc]) => (
            <div key={n} style={{ borderTop: "3px solid #c8842a", paddingTop: 16 }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 11, color: "#c8842a", fontWeight: 900, letterSpacing: "0.12em", marginBottom: 8 }}>{n}</div>
              <div style={{ fontSize: 26, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{title}</div>
              <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 13, color: "#7a6040", lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div style={{ padding: "40px 0 0" }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, marginBottom: 6 }}>What can you swap?</h2>
        <p style={{ fontFamily: "'Source Sans 3',sans-serif", color: "#7a6040", marginBottom: 20, fontSize: 14 }}>From homemade kai to skilled trades â€” everything's fair game</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 12 }}>
          {CATEGORIES.map(cat => (
            <CardHover key={cat.id} style={{ padding: "20px 16px", textAlign: "center" }} onClick={() => setTab("browse")}>
              <div style={{ fontSize: 30, marginBottom: 10 }}>{cat.icon}</div>
              <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 13, fontWeight: 700 }}>{cat.label}</div>
              <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 11, color: "#7a6040", marginTop: 4, lineHeight: 1.5 }}>{cat.desc}</div>
            </CardHover>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ margin: "40px 0 0", background: "#2d5a1b", padding: "36px 28px", textAlign: "center" }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, color: "#f4ede0", marginBottom: 8 }}>Ready to start swapping?</div>
        <div style={{ fontFamily: "'Source Sans 3',sans-serif", color: "#c8f5a0", marginBottom: 20, fontSize: 14 }}>Join the community. Free to start, no credit card needed.</div>
        <button style={S.btn("#c8842a", "#fff")} onClick={() => setShowAuth("signup")}>Create Free Account</button>
      </div>
    </div>
  );
}

function BrowseScreen({ setTab, isLoggedIn, setShowAuth, listings, setSelectedListing }) {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("all");
  const [region, setRegion] = useState("Everywhere");

  const filtered = listings.filter(l => {
    const catOk = cat === "all" || l.category === cat;
    const regionOk = region === "Everywhere" || l.region === region;
    const searchOk = !search || l.title.toLowerCase().includes(search.toLowerCase()) || l.seeking.toLowerCase().includes(search.toLowerCase());
    return catOk && regionOk && searchOk;
  });

  return (
    <div style={{ paddingTop: 28 }}>
      <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, marginBottom: 4 }}>Browse Offers</h2>
      <p style={{ fontFamily: "'Source Sans 3',sans-serif", color: "#7a6040", marginBottom: 20, fontSize: 14 }}>Find something worth swapping for</p>

      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        <input style={{ ...S.input, flex: 2, minWidth: 160 }} placeholder="ðŸ”  Search listings..." value={search} onChange={e => setSearch(e.target.value)} />
        <select style={{ ...S.input, flex: 1, minWidth: 130, cursor: "pointer" }} value={region} onChange={e => setRegion(e.target.value)}>
          <option>Everywhere</option>
          {REGIONS.map(r => <option key={r}>{r}</option>)}
        </select>
      </div>

      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 10, marginBottom: 20 }}>
        {[{ id: "all", label: "All", icon: "âœ¦" }, ...CATEGORIES].map(c => (
          <button key={c.id} onClick={() => setCat(c.id)}
            style={{ padding: "7px 16px", border: `1.5px solid ${cat === c.id ? "#2d5a1b" : "#ddd0b0"}`, background: cat === c.id ? "#2d5a1b" : "#fffbf3", color: cat === c.id ? "#f4ede0" : "#1e150a", fontFamily: "'Source Sans 3',sans-serif", fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", letterSpacing: "0.04em", transition: "all 0.15s" }}>
            {c.icon} {c.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon="ðŸ”"
          title={listings.length === 0 ? "No listings yet" : "No results found"}
          desc={listings.length === 0 ? "Be the first to post an offer! The community is waiting." : "Try adjusting your search or filters."}
          action={listings.length === 0 ? "Post the First Offer" : null}
          onAction={() => setTab("list")}
        />
      ) : (
        <>
          <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 12, color: "#7a6040", marginBottom: 14 }}>{filtered.length} offer{filtered.length !== 1 ? "s" : ""} found</div>
          {filtered.map(l => (
            <CardHover key={l.id} style={{ display: "flex", gap: 0, marginBottom: 12 }} onClick={() => isLoggedIn ? setSelectedListing(l) : setShowAuth("signup")}>
              <div style={{ width: 4, background: "#c8842a", flexShrink: 0 }} />
              <div style={{ display: "flex", gap: 16, padding: "16px 18px", flex: 1, alignItems: "flex-start" }}>
                <div style={{ width: 60, height: 60, background: "#eee4cc", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>{l.emoji || "ðŸ“¦"}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 6, marginBottom: 4 }}>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700 }}>{l.title}</div>
                    <span style={S.tag("#2d5a1b", "#eef5e8", "#2d5a1b")}>{l.type}</span>
                  </div>
                  <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 12, color: "#7a6040", marginBottom: 6 }}>
                    ðŸ“ {l.region} Â· {l.created}
                  </div>
                  <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 13, color: "#2d5a1b", background: "#eef5e8", padding: "5px 10px", display: "inline-block" }}>
                    â†” Seeking: {l.seeking}
                  </div>
                </div>
              </div>
            </CardHover>
          ))}
        </>
      )}
    </div>
  );
}

function ListScreen({ isLoggedIn, setShowAuth, addListing, setTab }) {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ title: "", category: "", type: "", seeking: "", region: "", desc: "", allergens: "" });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  if (!isLoggedIn) return (
    <div style={{ paddingTop: 40 }}>
      <EmptyState
        icon="ðŸ”"
        title="Sign in to list an offer"
        desc="Create a free account to start posting your goods, services and homemade treasures."
        action="Join Free"
        onAction={() => setShowAuth("signup")}
      />
    </div>
  );

  if (done) return (
    <div style={{ paddingTop: 40, textAlign: "center" }}>
      <div style={{ fontSize: 72, marginBottom: 20 }}>ðŸŽ‰</div>
      <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, marginBottom: 10 }}>Your offer is live!</h2>
      <p style={{ fontFamily: "'Source Sans 3',sans-serif", color: "#7a6040", fontSize: 14, marginBottom: 28, lineHeight: 1.7, maxWidth: 380, margin: "0 auto 28px" }}>
        "{form.title}" is now visible to the community. You'll be notified when someone wants to swap.
      </p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        <button style={S.btn("#c8842a", "#fff")} onClick={() => { setDone(false); setStep(1); setForm({ title: "", category: "", type: "", seeking: "", region: "", desc: "", allergens: "" }); }}>Post Another</button>
        <button style={{ ...S.btn("transparent", "#2d5a1b"), border: "2px solid #2d5a1b" }} onClick={() => setTab("browse")}>Browse Offers</button>
      </div>
    </div>
  );

  const stepLabels = ["Details", "What you want", "Preview"];

  return (
    <div style={{ paddingTop: 28 }}>
      <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, marginBottom: 4 }}>List an Offer</h2>
      <p style={{ fontFamily: "'Source Sans 3',sans-serif", color: "#7a6040", marginBottom: 24, fontSize: 14 }}>Tell the community what you have to swap</p>

      {/* Step bar */}
      <div style={{ display: "flex", marginBottom: 28 }}>
        {stepLabels.map((s, i) => (
          <div key={s} style={{ flex: 1, padding: "10px 8px", background: step === i + 1 ? "#2d5a1b" : step > i + 1 ? "#eef5e8" : "#fffbf3", border: "1px solid #ddd0b0", borderLeft: i > 0 ? "none" : "1px solid #ddd0b0", textAlign: "center" }}>
            <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: step === i + 1 ? "#f4ede0" : step > i + 1 ? "#2d5a1b" : "#7a6040" }}>
              {step > i + 1 ? "âœ“ " : ""}{s}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 20, alignItems: "start" }}>
        <div style={{ background: "#fffbf3", border: "1px solid #ddd0b0", padding: 28 }}>

          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label style={S.label}>Listing Title *</label>
                <input style={S.input} placeholder="e.g. Homemade lemon curd â€“ 4 jars" value={form.title} onChange={e => set("title", e.target.value)} />
              </div>
              <div>
                <label style={S.label}>Description</label>
                <textarea style={{ ...S.input, resize: "vertical" }} rows={4} placeholder="Tell us more â€” quantity, condition, pickup or delivery options..." value={form.desc} onChange={e => set("desc", e.target.value)} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={S.label}>Category *</label>
                  <select style={{ ...S.input, cursor: "pointer" }} value={form.category} onChange={e => set("category", e.target.value)}>
                    <option value="">Select...</option>
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label style={S.label}>Item Type *</label>
                  <select style={{ ...S.input, cursor: "pointer" }} value={form.type} onChange={e => set("type", e.target.value)}>
                    <option value="">Select...</option>
                    {["New", "Used", "Homemade", "Skill / Service"].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={S.label}>Your Region *</label>
                <select style={{ ...S.input, cursor: "pointer" }} value={form.region} onChange={e => set("region", e.target.value)}>
                  <option value="">Select region...</option>
                  {REGIONS.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              {form.category === "food" && (
                <div style={{ background: "#fdf3e3", border: "1px solid #e8b870", padding: 16 }}>
                  <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 12, fontWeight: 700, color: "#c8842a", marginBottom: 8 }}>ðŸ¥— Food Listing â€” Allergen Info Required</div>
                  <input style={S.input} placeholder="e.g. Contains gluten, dairy. Nut-free kitchen." value={form.allergens} onChange={e => set("allergens", e.target.value)} />
                  <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 11, color: "#7a6040", marginTop: 8, lineHeight: 1.6 }}>By listing food you confirm it is prepared safely and accept responsibility for NZ food safety compliance.</div>
                </div>
              )}
              <button style={{ ...S.btn("#2d5a1b", "#f4ede0"), padding: "13px" }}
                onClick={() => form.title && form.category && form.type && form.region ? setStep(2) : alert("Please fill in all required fields.")}>
                Continue â†’
              </button>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label style={S.label}>What are you seeking in return? *</label>
                <input style={S.input} placeholder="e.g. Fresh vegetables, baking supplies, or accounting help" value={form.seeking} onChange={e => set("seeking", e.target.value)} />
                <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 12, color: "#7a6040", marginTop: 6 }}>Be specific â€” it helps the right person find you.</div>
              </div>
              <div style={{ background: "#eef5e8", border: "1px solid #a8d490", padding: 16 }}>
                <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 12, fontWeight: 700, color: "#2d5a1b", marginBottom: 8 }}>ðŸ’¡ Swap Tips</div>
                {["Be realistic about value â€” fair swaps build trust", "Open to multiple options? Say so!", "Mention pickup or shipping preference", "Don't share personal contact details in the listing"].map(tip => (
                  <div key={tip} style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 12, color: "#2d5a1b", marginBottom: 6, paddingLeft: 10, borderLeft: "2px solid #a8d490" }}>{tip}</div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button style={{ ...S.btn("transparent", "#2d5a1b"), border: "2px solid #2d5a1b", flex: 1 }} onClick={() => setStep(1)}>â† Back</button>
                <button style={{ ...S.btn("#2d5a1b", "#f4ede0"), flex: 2, padding: "13px" }}
                  onClick={() => form.seeking ? setStep(3) : alert("Please add what you're seeking.")}>
                  Preview Listing â†’
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 11, fontWeight: 700, color: "#7a6040", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Preview</div>
              <div style={{ ...S.card, padding: "20px 20px 20px 24px", marginBottom: 20 }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, marginBottom: 6 }}>{form.title}</div>
                <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                  <span style={S.tag("#2d5a1b", "#eef5e8", "#2d5a1b")}>{form.type}</span>
                </div>
                <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 13, color: "#5a4030", marginBottom: 12, lineHeight: 1.7 }}>{form.desc || "No description added."}</div>
                <div style={{ background: "#eef5e8", padding: "8px 12px", fontFamily: "'Source Sans 3',sans-serif", fontSize: 13, color: "#2d5a1b" }}>â†” Seeking: {form.seeking}</div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button style={{ ...S.btn("transparent", "#2d5a1b"), border: "2px solid #2d5a1b", flex: 1 }} onClick={() => setStep(2)}>â† Edit</button>
                <button style={{ ...S.btn("#c8842a", "#fff"), flex: 2, padding: "13px", fontSize: 15 }}
                  onClick={() => { addListing({ ...form, id: Date.now(), emoji: CATEGORIES.find(c => c.id === form.category)?.icon || "ðŸ“¦", created: "Just now", views: 0 }); setDone(true); }}>
                  ðŸŒ¿ Go Live!
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ background: "#fdf3e3", border: "1px solid #e8b870", padding: 20 }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 14, fontWeight: 700, color: "#c8842a", marginBottom: 8 }}>ðŸ“‹ Community Rules</div>
            {["No cash transactions â€” barter only", "Honest descriptions only", "Respond to messages within 48hrs", "Rate your swap partner after each trade", "NZ Consumer Guarantees Act applies"].map(rule => (
              <div key={rule} style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 12, color: "#7a6040", marginBottom: 6, paddingLeft: 10, borderLeft: "2px solid #e8b870" }}>{rule}</div>
            ))}
          </div>
          <div style={{ background: "#fffbf3", border: "1px solid #ddd0b0", padding: 20 }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Free Plan Limit</div>
            <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 12, color: "#7a6040", lineHeight: 1.7 }}>Free accounts can post up to 3 listings. Upgrade from $4.90/mo for unlimited offers.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessagesScreen({ isLoggedIn, setShowAuth }) {
  const [newMsg, setNewMsg] = useState("");
  const [thread, setThread] = useState([]);

  if (!isLoggedIn) return (
    <div style={{ paddingTop: 40 }}>
      <EmptyState icon="ðŸ’¬" title="Sign in to message traders" desc="Create a free account to contact other members and arrange swaps." action="Join Free" onAction={() => setShowAuth("signup")} />
    </div>
  );

  return (
    <div style={{ paddingTop: 28 }}>
      <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, marginBottom: 4 }}>Messages</h2>
      <p style={{ fontFamily: "'Source Sans 3',sans-serif", color: "#7a6040", marginBottom: 24, fontSize: 14 }}>Your swap conversations</p>
      {thread.length === 0 ? (
        <EmptyState icon="ðŸ’¬" title="No messages yet" desc="Browse listings and message a trader to start your first swap." action="Browse Offers" onAction={() => {}} />
      ) : (
        <div style={{ background: "#fffbf3", border: "1px solid #ddd0b0", padding: 16, minHeight: 300, display: "flex", flexDirection: "column", gap: 12, marginBottom: 14 }}>
          {thread.map((msg, i) => (
            <div key={i} style={{ display: "flex", justifyContent: msg.me ? "flex-end" : "flex-start" }}>
              <div style={{ maxWidth: "75%", background: msg.me ? "#2d5a1b" : "#eee4cc", color: msg.me ? "#f4ede0" : "#1e150a", padding: "10px 14px", fontFamily: "'Source Sans 3',sans-serif", fontSize: 14, lineHeight: 1.6 }}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      )}
      <div style={{ display: "flex", gap: 8 }}>
        <input style={{ ...S.input, flex: 1 }} placeholder="Type a message..." value={newMsg} onChange={e => setNewMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && newMsg.trim() && (setThread(p => [...p, { text: newMsg, me: true }]), setNewMsg(""))} />
        <button style={S.btn("#c8842a", "#fff")} onClick={() => newMsg.trim() && (setThread(p => [...p, { text: newMsg, me: true }]), setNewMsg(""))}>Send</button>
      </div>
    </div>
  );
}

function ProfileScreen({ isLoggedIn, setShowAuth, user, setTab, listings }) {
  const [section, setSection] = useState("listings");

  if (!isLoggedIn) return (
    <div style={{ paddingTop: 40 }}>
      <EmptyState icon="ðŸ‘¤" title="Sign in to view your profile" desc="Create a free account to manage your listings, messages and swap history." action="Join Free" onAction={() => setShowAuth("signup")} />
    </div>
  );

  const myListings = listings.filter(l => l.userId === user?.id);

  return (
    <div style={{ paddingTop: 28 }}>
      {/* Profile card */}
      <CardHover style={{ padding: "28px 24px", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ width: 72, height: 72, background: "#eee4cc", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, border: "2px solid #ddd0b0" }}>
            {user?.avatar || "ðŸ‘¤"}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 900, marginBottom: 4 }}>{user?.name || "Your Name"}</div>
            <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 13, color: "#7a6040", marginBottom: 8 }}>ðŸ“ {user?.region || "NZ"} Â· Free plan Â· Joined today</div>
            <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 13, color: "#7a6040", lineHeight: 1.7 }}>Add a bio to help other traders get to know you.</div>
          </div>
          <button style={{ ...S.btn("transparent", "#2d5a1b"), border: "1.5px solid #2d5a1b", fontSize: 13, padding: "8px 18px" }}>Edit Profile</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0, marginTop: 24, borderTop: "1px solid #ddd0b0", paddingTop: 20 }}>
          {[[myListings.length, "Listings"], ["0", "Swaps Done"], ["Free", "Plan"]].map(([v, l], i) => (
            <div key={i} style={{ textAlign: "center", borderRight: i < 2 ? "1px solid #ddd0b0" : "none" }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 900, color: "#2d5a1b" }}>{v}</div>
              <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 11, color: "#7a6040", textTransform: "uppercase", letterSpacing: "0.06em" }}>{l}</div>
            </div>
          ))}
        </div>
      </CardHover>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "2px solid #ddd0b0", marginBottom: 20 }}>
        {[["listings", "My Listings"], ["settings", "Account"]].map(([id, label]) => (
          <button key={id} onClick={() => setSection(id)} style={{ padding: "10px 20px", border: "none", background: "none", fontFamily: "'Source Sans 3',sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", cursor: "pointer", borderBottom: section === id ? "3px solid #c8842a" : "3px solid transparent", color: section === id ? "#c8842a" : "#7a6040", marginBottom: -2 }}>{label}</button>
        ))}
      </div>

      {section === "listings" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 13, color: "#7a6040" }}>{myListings.length} listing{myListings.length !== 1 ? "s" : ""}</div>
            <button style={S.btn("#2d5a1b", "#f4ede0")} onClick={() => setTab("list")}>+ New Listing</button>
          </div>
          {myListings.length === 0
            ? <EmptyState icon="ðŸ“" title="No listings yet" desc="Post your first offer and let the community know what you have to swap." action="Post an Offer" onAction={() => setTab("list")} />
            : myListings.map(l => (
              <CardHover key={l.id} style={{ padding: "16px 20px", marginBottom: 10, display: "flex", gap: 14, alignItems: "center" }}>
                <div style={{ fontSize: 28 }}>{l.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 700 }}>{l.title}</div>
                  <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 12, color: "#7a6040" }}>â†” {l.seeking} Â· {l.created}</div>
                </div>
                <span style={S.tag("#2d5a1b", "#eef5e8", "#2d5a1b")}>Active</span>
              </CardHover>
            ))
          }
        </div>
      )}

      {section === "settings" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "#2d5a1b", padding: 24 }}>
            <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#c8f5a0", marginBottom: 6 }}>Current Plan</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 900, color: "#f4ede0", marginBottom: 4 }}>KÅrero Â· Free</div>
            <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 13, color: "#c8f5a0", marginBottom: 16 }}>3 listing limit Â· Upgrade anytime</div>
            <button style={{ ...S.btn("#c8842a", "#fff"), fontSize: 13, padding: "9px 20px" }} onClick={() => setTab("plans")}>Upgrade from $4.90/mo â†’</button>
          </div>
          <CardHover style={{ padding: 20 }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 700, marginBottom: 14 }}>ðŸ”’ Privacy & Safety</div>
            {["Only verified users can message me", "Show my region only (not exact location)", "Profile visible to all members"].map(item => (
              <div key={item} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, fontFamily: "'Source Sans 3',sans-serif", fontSize: 13, color: "#5a4030" }}>
                {item}
                <div style={{ width: 36, height: 20, background: "#2d5a1b", borderRadius: 10, position: "relative", cursor: "pointer", flexShrink: 0 }}>
                  <div style={{ width: 16, height: 16, background: "#fff", borderRadius: "50%", position: "absolute", right: 2, top: 2 }} />
                </div>
              </div>
            ))}
          </CardHover>
          <button style={{ ...S.btn("transparent", "#c0392b"), border: "1.5px solid #c0392b", fontSize: 13, padding: "10px" }}>Sign Out</button>
        </div>
      )}
    </div>
  );
}

function PlansScreen() {
  const [billing, setBilling] = useState("monthly");
  return (
    <div style={{ paddingTop: 40 }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ ...S.tag("#2d5a1b", "#eef5e8", "#2d5a1b"), marginBottom: 16 }}>Simple, fair pricing</div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, marginBottom: 10 }}>Membership Plans</h2>
        <p style={{ fontFamily: "'Source Sans 3',sans-serif", color: "#7a6040", fontSize: 14, maxWidth: 420, margin: "0 auto 24px", lineHeight: 1.7 }}>No hidden fees. Cancel anytime. Built to be affordable for everyday people.</p>
        <div style={{ display: "inline-flex", border: "2px solid #ddd0b0", overflow: "hidden" }}>
          {["monthly", "yearly"].map(b => (
            <button key={b} onClick={() => setBilling(b)} style={{ padding: "8px 22px", background: billing === b ? "#2d5a1b" : "#fffbf3", color: billing === b ? "#f4ede0" : "#7a6040", border: "none", fontFamily: "'Source Sans 3',sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
              {b === "monthly" ? "Monthly" : "Yearly (save 20%)"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 20, marginBottom: 40 }}>
        {PLANS.map(plan => {
          const price = billing === "yearly" && plan.price > 0 ? (plan.price * 0.8).toFixed(2) : plan.price;
          return (
            <div key={plan.id} style={{ background: plan.highlight ? "#2d5a1b" : "#fffbf3", border: `2px solid ${plan.highlight ? "#2d5a1b" : "#ddd0b0"}`, padding: "28px 24px", position: "relative", transform: plan.highlight ? "scale(1.03)" : "none", boxShadow: plan.highlight ? "0 8px 32px rgba(45,90,27,0.25)" : "none" }}>
              {plan.highlight && <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "#c8842a", color: "#fff", padding: "4px 18px", fontFamily: "'Source Sans 3',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap" }}>Most Popular</div>}
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 900, color: plan.highlight ? "#f4ede0" : "#1e150a", marginBottom: 4 }}>{plan.name}</div>
              <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 13, color: plan.highlight ? "#c8f5a0" : "#7a6040", marginBottom: 20 }}>{plan.desc}</div>
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, fontWeight: 900, color: plan.highlight ? "#f4ede0" : "#1e150a" }}>${price === 0 ? "0" : price}</span>
                <span style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 13, color: plan.highlight ? "#c8f5a0" : "#7a6040" }}> NZD/{plan.period}</span>
              </div>
              <div style={{ marginBottom: 24 }}>
                {plan.features.map(f => (
                  <div key={f} style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 13, color: plan.highlight ? "#f4ede0" : "#5a4030", marginBottom: 8, display: "flex", gap: 8 }}>
                    <span style={{ color: plan.highlight ? "#c8f5a0" : "#2d5a1b" }}>âœ“</span>{f}
                  </div>
                ))}
              </div>
              <button style={{ width: "100%", padding: "12px", fontFamily: "'Source Sans 3',sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer", background: plan.highlight ? "#c8842a" : "transparent", color: plan.highlight ? "#fff" : "#2d5a1b", border: plan.highlight ? "none" : "2px solid #2d5a1b", letterSpacing: "0.04em" }}>
                {plan.price === 0 ? "Start Free" : `Subscribe Â· $${price}/mo`}
              </button>
            </div>
          );
        })}
      </div>

      <div style={{ background: "#fffbf3", border: "1px solid #ddd0b0", padding: 28, textAlign: "center" }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, marginBottom: 8 }}>ðŸ¡ Small Business & Collective Rates</div>
        <div style={{ fontFamily: "'Source Sans 3',sans-serif", color: "#7a6040", fontSize: 14, maxWidth: 460, margin: "0 auto 18px", lineHeight: 1.7 }}>Registered small businesses, collectives and co-ops can apply for discounted Pakihi rates.</div>
        <button style={{ ...S.btn("transparent", "#2d5a1b"), border: "2px solid #2d5a1b" }}>Get in Touch</button>
      </div>
    </div>
  );
}

// â”€â”€ AUTH MODAL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function AuthModal({ mode, onClose, onAuth }) {
  const [isLogin, setIsLogin] = useState(mode === "login");
  const [form, setForm] = useState({ name: "", email: "", password: "", region: "", type: "Individual" });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <Modal onClose={onClose}>
      <div style={{ ...S.tag("#c8842a", "rgba(200,132,42,0.1)", "#c8842a"), marginBottom: 20 }}>ðŸŒ kohao.app</div>
      <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, marginBottom: 6 }}>{isLogin ? "Welcome back" : "Join KÅhao"}</h2>
      <div style={{ fontFamily: "'Source Sans 3',sans-serif", color: "#7a6040", marginBottom: 24, fontSize: 14 }}>{isLogin ? "Sign in to your account" : "Free to start. Upgrade anytime from $4.90/mo."}</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {!isLogin && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div><label style={S.label}>First Name *</label><input style={S.input} placeholder="e.g. Aroha" value={form.name} onChange={e => set("name", e.target.value)} /></div>
              <div><label style={S.label}>Account Type</label>
                <select style={{ ...S.input, cursor: "pointer" }} value={form.type} onChange={e => set("type", e.target.value)}>
                  {["Individual", "Small Business", "Home-based Maker", "Community Group"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div><label style={S.label}>Your Region *</label>
              <select style={{ ...S.input, cursor: "pointer" }} value={form.region} onChange={e => set("region", e.target.value)}>
                <option value="">Select region...</option>
                {REGIONS.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
          </>
        )}
        <div><label style={S.label}>Email *</label><input style={S.input} placeholder="you@example.com" type="email" value={form.email} onChange={e => set("email", e.target.value)} /></div>
        <div><label style={S.label}>Password *</label><input style={S.input} placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" type="password" value={form.password} onChange={e => set("password", e.target.value)} /></div>

        {!isLogin && (
          <div style={{ background: "#eef5e8", padding: 12, fontFamily: "'Source Sans 3',sans-serif", fontSize: 12, color: "#2d5a1b", lineHeight: 1.6 }}>
            âœ… By joining I agree to KÅhao's Community Guidelines and confirm I will only post genuine offers for barter.
          </div>
        )}

        <button style={{ ...S.btn("#c8842a", "#fff"), width: "100%", padding: "13px", fontSize: 15 }}
          onClick={() => {
            if (!form.email || !form.password) { alert("Please fill in all required fields."); return; }
            onAuth({ name: form.name || form.email.split("@")[0], email: form.email, region: form.region || "NZ", avatar: "ðŸ‘¤", id: Date.now() });
            onClose();
          }}>
          {isLogin ? "Sign In" : "Create My Account â†’"}
        </button>

        <div style={{ textAlign: "center", fontFamily: "'Source Sans 3',sans-serif", fontSize: 13, color: "#7a6040" }}>
          {isLogin ? "New here? " : "Already have an account? "}
          <span style={{ color: "#2d5a1b", cursor: "pointer", fontWeight: 700 }} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Join free â†’" : "Sign in"}
          </span>
        </div>
      </div>
    </Modal>
  );
}

// â”€â”€ LISTING DETAIL MODAL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ListingModal({ listing, onClose, isLoggedIn, setShowAuth }) {
  const [msgText, setMsgText] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <Modal onClose={onClose} wide>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 20 }}>
        <div style={{ width: 72, height: 72, background: "#eee4cc", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, flexShrink: 0 }}>{listing.emoji || "ðŸ“¦"}</div>
        <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
            <span style={S.tag("#2d5a1b", "#eef5e8", "#2d5a1b")}>{listing.type}</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 900, marginBottom: 4 }}>{listing.title}</h2>
          <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 12, color: "#7a6040" }}>ðŸ“ {listing.region} Â· {listing.created}</div>
        </div>
      </div>

      <div style={{ background: "#eef5e8", padding: "12px 16px", borderLeft: "4px solid #2d5a1b", marginBottom: 20 }}>
        <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 11, fontWeight: 700, color: "#2d5a1b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Seeking in return</div>
        <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 15, color: "#1e150a" }}>{listing.seeking}</div>
      </div>

      {listing.desc && <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 14, color: "#5a4030", lineHeight: 1.8, marginBottom: 24 }}>{listing.desc}</div>}

      {sent ? (
        <div style={{ background: "#eef5e8", border: "1px solid #a8d490", padding: 24, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>âœ…</div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Message sent!</div>
          <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 13, color: "#2d5a1b" }}>Check your Messages tab for their reply.</div>
        </div>
      ) : isLoggedIn ? (
        <div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, marginBottom: 10 }}>Send a swap message</div>
          <textarea style={{ ...S.input, resize: "vertical" }} rows={3} placeholder={`Hi! I'm interested in swapping for your ${listing.title}. I can offer...`} value={msgText} onChange={e => setMsgText(e.target.value)} />
          <button style={{ ...S.btn("#c8842a", "#fff"), width: "100%", padding: "13px", marginTop: 10, fontSize: 15 }} onClick={() => msgText && setSent(true)}>
            ðŸ’¬ Send Message
          </button>
          <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 11, color: "#7a6040", marginTop: 8, textAlign: "center" }}>Don't share personal contact details until you're both comfortable</div>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 14, color: "#7a6040", marginBottom: 16 }}>Sign in to message this trader and arrange a swap.</div>
          <button style={S.btn("#c8842a", "#fff")} onClick={() => { onClose(); setShowAuth("signup"); }}>Join Free to Message</button>
        </div>
      )}
    </Modal>
  );
}

// â”€â”€ ROOT APP â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function App() {
  const [tab, setTab] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(null);
  const [listings, setListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);

  const addListing = (l) => setListings(prev => [{ ...l, userId: user?.id }, ...prev]);

  const TABS = [
    { id: "home", icon: "ðŸ ", label: "Home" },
    { id: "browse", icon: "ðŸ”", label: "Browse" },
    { id: "list", icon: "âž•", label: "List" },
    { id: "messages", icon: "ðŸ’¬", label: "Messages" },
    { id: "profile", icon: "ðŸ‘¤", label: "Profile" },
    { id: "plans", icon: "ðŸ’³", label: "Plans" },
  ];

  return (
    <div style={S.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Source+Sans+3:wght@400;600;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        input:focus, textarea:focus, select:focus { border-color:#2d5a1b !important; }
        ::-webkit-scrollbar { width:6px; } ::-webkit-scrollbar-thumb { background:#ddd0b0; }
        textarea { font-family:inherit; }
      `}</style>

      {/* HEADER */}
      <header style={S.header}>
        <div style={S.headerInner}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setTab("home")}>
            <span style={{ fontSize: 24 }}>ðŸ¤</span>
            <div>
              <div style={{ fontFamily: "'Playfair Display',serif", color: "#f4ede0", fontSize: 20, fontWeight: 900, lineHeight: 1 }}>KÅhao</div>
              <div style={{ fontFamily: "'Source Sans 3',sans-serif", color: "#c8842a", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase" }}>kohao.app Â· Barter Platform</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {isLoggedIn ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => setTab("profile")}>
                <div style={{ width: 32, height: 32, background: "#eee4cc", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>ðŸ‘¤</div>
                <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 12, color: "#c8b090" }}>{user?.name?.split(" ")[0]}</div>
              </div>
            ) : (
              <>
                <button style={{ ...S.btn("transparent", "#f4ede0"), border: "1.5px solid rgba(244,237,224,0.3)", padding: "7px 16px", fontSize: 13 }} onClick={() => setShowAuth("login")}>Sign In</button>
                <button style={{ ...S.btn("#c8842a", "#fff"), padding: "7px 16px", fontSize: 13 }} onClick={() => setShowAuth("signup")}>Join Free</button>
              </>
            )}
          </div>
        </div>
        {/* Desktop nav */}
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex" }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "8px 14px", background: "none", border: "none", fontFamily: "'Source Sans 3',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: tab === t.id ? "#c8842a" : "#8a6a40", cursor: "pointer", borderBottom: tab === t.id ? "2px solid #c8842a" : "2px solid transparent", transition: "color 0.2s" }}>
              {t.label}
            </button>
          ))}
        </div>
      </header>

      {/* MAIN */}
      <main style={S.main}>
        {tab === "home" && <HomeScreen setTab={setTab} isLoggedIn={isLoggedIn} setShowAuth={setShowAuth} />}
        {tab === "browse" && <BrowseScreen setTab={setTab} isLoggedIn={isLoggedIn} setShowAuth={setShowAuth} listings={listings} setSelectedListing={setSelectedListing} />}
        {tab === "list" && <ListScreen isLoggedIn={isLoggedIn} setShowAuth={setShowAuth} addListing={addListing} setTab={setTab} />}
        {tab === "messages" && <MessagesScreen isLoggedIn={isLoggedIn} setShowAuth={setShowAuth} />}
        {tab === "profile" && <ProfileScreen isLoggedIn={isLoggedIn} setShowAuth={setShowAuth} user={user} setTab={setTab} listings={listings} />}
        {tab === "plans" && <PlansScreen />}
      </main>

      {/* BOTTOM NAV */}
      <nav style={S.bottomNav}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: "10px 2px 8px", background: "none", border: "none", cursor: "pointer", color: tab === t.id ? "#c8842a" : "#6a5030", fontFamily: "'Source Sans 3',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, transition: "color 0.2s" }}>
            <span style={{ fontSize: 18 }}>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </nav>

      {/* MODALS */}
      {showAuth && <AuthModal mode={showAuth} onClose={() => setShowAuth(null)} onAuth={(u) => { setUser(u); setIsLoggedIn(true); }} />}
      {selectedListing && <ListingModal listing={selectedListing} onClose={() => setSelectedListing(null)} isLoggedIn={isLoggedIn} setShowAuth={setShowAuth} />}
    </div>
  );
}
