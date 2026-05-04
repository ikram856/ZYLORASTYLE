import { useState } from "react";

const empty = {
  name: "", coll: "", cat: "Eau de Parfum", price: "", vol: "100ml",
  badge: "", top: "", heart: "", base: "", ok: true,
  img: "", img2: "", desc: "",
};

export default function AdminPage({ products, onSave, onDelete }) {
  const [editing, setEditing] = useState(null); // null = liste, id = édition, "new" = nouveau
  const [form, setForm] = useState(empty);
  const [pwd, setPwd] = useState("");
  const [auth, setAuth] = useState(false);

  // Mot de passe simple
  if (!auth) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--ink)", paddingTop: 78 }}>
      <div style={{ background: "var(--card)", border: "1px solid var(--border)", padding: "52px 48px", width: 360, textAlign: "center" }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: "var(--cream)", marginBottom: 8 }}>Administration</div>
        <div style={{ fontSize: 9, letterSpacing: 4, color: "var(--silk)", marginBottom: 36 }}>ZYLORASTYLE</div>
        <input
          type="password" placeholder="Mot de passe..."
          value={pwd} onChange={(e) => setPwd(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (pwd === "admin123" ? setAuth(true) : alert("Mot de passe incorrect"))}
          style={{ width: "100%", background: "rgba(255,255,255,.04)", border: "1px solid var(--border)", borderBottom: "none", padding: "13px 16px", fontFamily: "'Raleway', sans-serif", fontSize: 13, color: "var(--cream)", outline: "none", marginBottom: 0 }}
        />
        <button className="btn-em" style={{ width: "100%", padding: 14 }}
          onClick={() => pwd === "admin123" ? setAuth(true) : alert("Mot de passe incorrect")}>
          <span>Accéder</span>
        </button>
        <div style={{ fontSize: 10, color: "rgba(244,239,228,.18)", marginTop: 16, letterSpacing: 1 }}>Mot de passe par défaut : admin123</div>
      </div>
    </div>
  );

  const openNew = () => { setForm({ ...empty, id: Date.now() }); setEditing("new"); };
  const openEdit = (p) => { setForm({ ...p, badge: p.badge || "" }); setEditing(p.id); };
  const cancel = () => { setEditing(null); setForm(empty); };

  const save = () => {
    if (!form.name || !form.price || !form.img) return alert("Nom, prix et image sont requis.");
    onSave({ ...form, price: Number(form.price), badge: form.badge || null, id: editing === "new" ? Date.now() : editing });
    cancel();
  };

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  // ── FORM ──
  if (editing !== null) return (
    <div style={{ paddingTop: 78, minHeight: "100vh", background: "var(--ink)" }}>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "52px 5%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 40 }}>
          <button onClick={cancel} style={{ background: "none", border: "1px solid var(--gborder)", color: "var(--muted)", padding: "8px 20px", cursor: "pointer", fontSize: 10, letterSpacing: 2, fontFamily: "'Raleway', sans-serif" }}>← Retour</button>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "var(--cream)" }}>{editing === "new" ? "Nouveau Produit" : "Modifier le Produit"}</div>
            <div style={{ fontSize: 9, letterSpacing: 4, color: "var(--silk)", marginTop: 4 }}>ADMINISTRATION</div>
          </div>
        </div>

        <div style={{ display: "grid", gap: 2 }}>
          {/* Infos principales */}
          <div style={{ background: "var(--card)", border: "1px solid rgba(27,94,56,.28)", padding: "32px 28px" }}>
            <div style={{ fontSize: 9, letterSpacing: 4, color: "var(--silk)", marginBottom: 24 }}>INFORMATIONS PRINCIPALES</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field label="Nom du parfum *" value={form.name} onChange={(v) => set("name", v)} placeholder="Ex: Oud Royale" />
              <Field label="Collection" value={form.coll} onChange={(v) => set("coll", v)} placeholder="Ex: Nuit d'Orient" />
              <div>
                <Label>Catégorie</Label>
                <select value={form.cat} onChange={(e) => set("cat", e.target.value)} style={selectStyle}>
                  <option>Eau de Parfum</option>
                  <option>Extrait de Parfum</option>
                </select>
              </div>
              <div>
                <Label>Volume</Label>
                <select value={form.vol} onChange={(e) => set("vol", e.target.value)} style={selectStyle}>
                  <option>50ml</option>
                  <option>75ml</option>
                  <option>100ml</option>
                </select>
              </div>
              <Field label="Prix (MAD) *" value={form.price} onChange={(v) => set("price", v)} placeholder="Ex: 550" type="number" />
              <Field label="Badge" value={form.badge} onChange={(v) => set("badge", v)} placeholder="Ex: Best Seller, Nouveau..." />
            </div>
          </div>

          {/* Notes olfactives */}
          <div style={{ background: "var(--card)", border: "1px solid rgba(27,94,56,.28)", padding: "32px 28px" }}>
            <div style={{ fontSize: 9, letterSpacing: 4, color: "var(--silk)", marginBottom: 24 }}>PYRAMIDE OLFACTIVE</div>
            <div style={{ display: "grid", gap: 12 }}>
              <Field label="Notes de Tête" value={form.top} onChange={(v) => set("top", v)} placeholder="Ex: Safran, Cardamome" />
              <Field label="Notes de Cœur" value={form.heart} onChange={(v) => set("heart", v)} placeholder="Ex: Oud, Rose de Taïf" />
              <Field label="Notes de Fond" value={form.base} onChange={(v) => set("base", v)} placeholder="Ex: Ambre, Musc blanc" />
              <Field label="Description" value={form.desc} onChange={(v) => set("desc", v)} placeholder="Description du parfum..." area />
            </div>
          </div>

          {/* Images */}
          <div style={{ background: "var(--card)", border: "1px solid rgba(27,94,56,.28)", padding: "32px 28px" }}>
            <div style={{ fontSize: 9, letterSpacing: 4, color: "var(--silk)", marginBottom: 24 }}>IMAGES</div>
            <div style={{ display: "grid", gap: 12 }}>
              <Field label="URL Image principale *" value={form.img} onChange={(v) => set("img", v)} placeholder="https://images.unsplash.com/..." />
              {form.img && <img src={form.img} alt="" style={{ height: 160, objectFit: "cover", border: "1px solid rgba(27,94,56,.28)", filter: "brightness(.7)" }} onError={(e) => e.target.style.display = "none"} />}
              <Field label="URL Image au survol" value={form.img2} onChange={(v) => set("img2", v)} placeholder="https://images.unsplash.com/..." />
              {form.img2 && <img src={form.img2} alt="" style={{ height: 100, objectFit: "cover", border: "1px solid rgba(27,94,56,.28)", filter: "brightness(.7)" }} onError={(e) => e.target.style.display = "none"} />}
            </div>
          </div>

          {/* Stock */}
          <div style={{ background: "var(--card)", border: "1px solid rgba(27,94,56,.28)", padding: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <div
                  onClick={() => set("ok", !form.ok)}
                  style={{ width: 44, height: 24, background: form.ok ? "var(--em2)" : "rgba(255,255,255,.08)", border: `1px solid ${form.ok ? "var(--em2)" : "rgba(255,255,255,.12)"}`, borderRadius: 12, position: "relative", transition: "all .3s", cursor: "pointer" }}
                >
                  <div style={{ width: 16, height: 16, background: "var(--cream)", borderRadius: "50%", position: "absolute", top: 3, left: form.ok ? 24 : 3, transition: "left .3s" }}></div>
                </div>
                <span style={{ fontSize: 12, color: "var(--cream)", letterSpacing: 1 }}>Produit en stock</span>
                <span style={{ fontSize: 10, color: form.ok ? "var(--silk)" : "rgba(244,239,228,.3)", letterSpacing: 2 }}>{form.ok ? "EN STOCK" : "ÉPUISÉ"}</span>
              </label>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button className="btn-em" style={{ flex: 1, padding: 15, fontSize: 10 }} onClick={save}><span>💾 Enregistrer le Produit</span></button>
          <button className="btn-ghost" style={{ padding: "15px 28px" }} onClick={cancel}>Annuler</button>
        </div>
      </div>
    </div>
  );

  // ── LISTE ──
  return (
    <div style={{ paddingTop: 78, minHeight: "100vh", background: "var(--ink)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "52px 5%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: "var(--cream)" }}>Gestion des Produits</div>
            <div style={{ fontSize: 9, letterSpacing: 4, color: "var(--silk)", marginTop: 6 }}>{products.length} PRODUIT{products.length > 1 ? "S" : ""} · ADMINISTRATION</div>
          </div>
          <button className="btn-em" onClick={openNew}><span>+ Nouveau Produit</span></button>
        </div>

        <div style={{ display: "grid", gap: 2 }}>
          {products.map((p) => (
            <div key={p.id} style={{ background: "var(--card)", border: "1px solid rgba(27,94,56,.28)", padding: "20px 24px", display: "flex", alignItems: "center", gap: 20, transition: "border-color .3s" }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = "rgba(201,185,122,.3)"}
              onMouseOut={(e) => e.currentTarget.style.borderColor = "rgba(27,94,56,.28)"}
            >
              <img src={p.img} alt={p.name} style={{ width: 64, height: 72, objectFit: "cover", filter: "brightness(.65)", flexShrink: 0, border: "1px solid rgba(27,94,56,.28)" }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "var(--cream)" }}>{p.name}</div>
                  {p.badge && <span style={{ fontSize: 8, letterSpacing: 2, color: "var(--silk)", border: "1px solid rgba(201,185,122,.3)", padding: "3px 8px" }}>{p.badge}</span>}
                  <span style={{ fontSize: 8, letterSpacing: 2, color: p.ok ? "rgba(45,138,80,.7)" : "rgba(192,57,43,.6)", border: `1px solid ${p.ok ? "rgba(45,138,80,.3)" : "rgba(192,57,43,.3)"}`, padding: "3px 8px" }}>{p.ok ? "EN STOCK" : "ÉPUISÉ"}</span>
                </div>
                <div style={{ fontSize: 10, color: "rgba(201,185,122,.4)", letterSpacing: 2 }}>{p.coll} · {p.cat} · {p.vol}</div>
                <div style={{ fontSize: 11, color: "rgba(244,239,228,.25)", marginTop: 4 }}>{p.top}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "var(--silk)", marginBottom: 12 }}>{p.price.toLocaleString()} MAD</div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => openEdit(p)} style={{ padding: "7px 16px", background: "rgba(27,94,56,.15)", border: "1px solid rgba(27,94,56,.4)", color: "var(--cream)", cursor: "pointer", fontSize: 9, letterSpacing: 2, fontFamily: "'Raleway', sans-serif", transition: "all .25s" }}
                    onMouseOver={(e) => e.target.style.background = "rgba(27,94,56,.35)"}
                    onMouseOut={(e) => e.target.style.background = "rgba(27,94,56,.15)"}
                  >✏️ Modifier</button>
                  <button onClick={() => { if (window.confirm(`Supprimer "${p.name}" ?`)) onDelete(p.id); }}
                    style={{ padding: "7px 14px", background: "rgba(192,57,43,.1)", border: "1px solid rgba(192,57,43,.3)", color: "#c0392b", cursor: "pointer", fontSize: 9, fontFamily: "'Raleway', sans-serif", transition: "all .25s" }}
                    onMouseOver={(e) => e.target.style.background = "rgba(192,57,43,.25)"}
                    onMouseOut={(e) => e.target.style.background = "rgba(192,57,43,.1)"}
                  >🗑</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── helpers ──
const inputStyle = { width: "100%", background: "rgba(255,255,255,.04)", border: "1px solid rgba(27,94,56,.35)", padding: "11px 14px", fontFamily: "'Raleway',sans-serif", fontSize: 12, color: "var(--cream)", outline: "none", transition: "border-color .3s" };
const selectStyle = { ...inputStyle, cursor: "pointer" };

function Label({ children }) {
  return <div style={{ fontSize: 9, letterSpacing: 3, color: "rgba(201,185,122,.5)", marginBottom: 7, textTransform: "uppercase" }}>{children}</div>;
}
function Field({ label, value, onChange, placeholder, type = "text", area }) {
  return (
    <div>
      <Label>{label}</Label>
      {area
        ? <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={3} style={{ ...inputStyle, resize: "vertical" }} onFocus={(e) => e.target.style.borderColor = "rgba(201,185,122,.4)"} onBlur={(e) => e.target.style.borderColor = "rgba(27,94,56,.35)"} />
        : <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={inputStyle} onFocus={(e) => e.target.style.borderColor = "rgba(201,185,122,.4)"} onBlur={(e) => e.target.style.borderColor = "rgba(27,94,56,.35)"} />
      }
    </div>
  );
}