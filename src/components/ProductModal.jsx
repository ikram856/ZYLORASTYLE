import { useState } from "react";

export default function ProductModal({ product, isWished, onClose, onAddToCart, onToggleWish }) {
  const [imgSrc, setImgSrc] = useState(product.img);

  if (!product) return null;

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 3000, background: "rgba(0,0,0,.82)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "fadeIn .3s ease" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: "var(--deep)", border: "1px solid var(--border)", maxWidth: 960, width: "100%", maxHeight: "90vh", overflowY: "auto", position: "relative", animation: "fadeUp .4s ease" }}>
        <button
          onClick={onClose}
          style={{ position: "absolute", top: 17, right: 17, background: "none", border: "none", color: "rgba(244,239,228,.28)", fontSize: 21, cursor: "pointer", zIndex: 2, width: 37, height: 37, display: "flex", alignItems: "center", justifyContent: "center", transition: "color .3s" }}
          onMouseOver={(e) => e.target.style.color = "var(--silk)"}
          onMouseOut={(e) => e.target.style.color = "rgba(244,239,228,.28)"}
        >✕</button>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 470 }}>
          {/* Image Side */}
          <div style={{ position: "relative", overflow: "hidden", minHeight: 470 }}>
            <img src={imgSrc} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.68)" }} />
            {product.badge && <div className="cbadge2">{product.badge}</div>}
            {!product.ok && (
              <div style={{ position: "absolute", inset: 0, background: "rgba(6,21,16,.68)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 12, letterSpacing: 4, color: "rgba(244,239,228,.35)", border: "1px solid rgba(244,239,228,.1)", padding: "12px 24px" }}>ÉPUISÉ</span>
              </div>
            )}
            <div style={{ position: "absolute", bottom: 13, left: 13, display: "flex", gap: 7 }}>
              <div onClick={() => setImgSrc(product.img)} style={{ width: 56, height: 56, overflow: "hidden", border: "1px solid rgba(201,185,122,.32)", cursor: "pointer" }}>
                <img src={product.img} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
              </div>
              <div onClick={() => setImgSrc(product.img2)} style={{ width: 56, height: 56, overflow: "hidden", border: "1px solid rgba(27,94,56,.28)", cursor: "pointer" }}>
                <img src={product.img2} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
              </div>
            </div>
          </div>

          {/* Info Side */}
          <div style={{ padding: "46px 42px", display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 8, letterSpacing: 4, color: "var(--silk)", marginBottom: 8 }}>{product.coll.toUpperCase()} · {product.cat.toUpperCase()}</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 300, color: "var(--cream)", marginBottom: 6 }}>{product.name}</h2>
            <div style={{ width: 46, height: 1, background: "var(--silk)", margin: "16px 0" }}></div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 300, color: "var(--silk)", marginBottom: 3 }}>
              {product.price.toLocaleString()} <span style={{ fontSize: 14, color: "rgba(201,185,122,.48)", fontFamily: "'Raleway', sans-serif" }}>MAD</span>
            </div>
            <div style={{ fontSize: 10, color: "rgba(244,239,228,.26)", marginBottom: 22 }}>{product.vol} · {product.cat}</div>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.9, marginBottom: 22 }}>{product.desc}</p>

            {/* Pyramid */}
            <div style={{ background: "rgba(27,94,56,.07)", border: "1px solid rgba(27,94,56,.26)", padding: 20, marginBottom: 22 }}>
              <div style={{ fontSize: 8, letterSpacing: 3, color: "var(--silk)", marginBottom: 13 }}>PYRAMIDE OLFACTIVE</div>
              <div style={{ fontSize: 11, color: "rgba(244,239,228,.4)", marginBottom: 6 }}><span style={{ color: "rgba(201,185,122,.48)" }}>Tête ·</span> {product.top}</div>
              <div style={{ fontSize: 11, color: "rgba(244,239,228,.4)", marginBottom: 6 }}><span style={{ color: "rgba(201,185,122,.48)" }}>Cœur ·</span> {product.heart}</div>
              <div style={{ fontSize: 11, color: "rgba(244,239,228,.4)" }}><span style={{ color: "rgba(201,185,122,.48)" }}>Fond ·</span> {product.base}</div>
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: 13 }}>
              {product.ok && (
                <button className="btn-em" style={{ flex: 1, padding: 13, fontSize: 9 }} onClick={() => { onAddToCart(product.id); onClose(); }}>
                  <span>Ajouter au Panier</span>
                </button>
              )}
              <button
                onClick={() => onToggleWish(product.id)}
                style={{ width: 47, height: 47, background: "rgba(27,94,56,.07)", border: "1px solid rgba(27,94,56,.32)", color: isWished ? "var(--silk)" : "rgba(244,239,228,.28)", fontSize: 16, cursor: "pointer", transition: "all .3s" }}
              >{isWished ? "♥" : "♡"}</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
              {[["🚚", "Livraison", "Maroc entier"], ["🎁", "Emballage", "Luxe & cadeau"], ["✓", "Original", "100% certifié"], ["⏱️", "Tenue", "24 heures"]].map(([ic, t, s]) => (
                <div key={t} style={{ padding: 10, background: "rgba(27,94,56,.04)", border: "1px solid rgba(27,94,56,.18)", display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 12 }}>{ic}</span>
                  <div>
                    <div style={{ fontSize: 9, fontWeight: 600, color: "var(--cream)", marginBottom: 1 }}>{t}</div>
                    <div style={{ fontSize: 9, color: "rgba(244,239,228,.26)" }}>{s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
