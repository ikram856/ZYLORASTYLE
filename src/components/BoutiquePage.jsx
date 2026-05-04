import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function BoutiquePage({ products, wishlist, filter, onFilter, onAddToCart, onOpenProduct, onToggleWish }) {
  const filtered = filter === "all" ? products : products.filter((p) => p.cat === filter);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const filters = [
    { id: "all", label: "Tous" },
    { id: "Eau de Parfum", label: "Eaux de Parfum" },
    { id: "Extrait de Parfum", label: "Extraits" },
  ];

  return (
    <div style={{ paddingTop: 78 }}>
      <div className="phero">
        <div className="phbg"><img src="https://images.unsplash.com/photo-1596091213011-8b62e2a0b5f7?w=1400&q=80" alt="" /></div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(6,21,16,.5),rgba(27,94,56,.05),rgba(6,21,16,.65))" }}></div>
        <div className="phcont">
          <div className="slabel">Notre Sélection</div>
          <h1 className="stitle" style={{ fontSize: "clamp(44px,8vw,84px)" }}>Boutique</h1>
        </div>
      </div>

      <div style={{ background: "var(--deep)", borderBottom: "1px solid var(--border)", padding: "16px 5%" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", gap: 3 }}>
            {filters.map((f) => (
              <button
                key={f.id}
                className={filter === f.id ? "btn-em" : "btn-ghost"}
                onClick={() => onFilter(f.id)}
              >
                {filter === f.id ? <span>{f.label}</span> : f.label}
              </button>
            ))}
          </div>
          <div style={{ fontSize: 10, letterSpacing: 2, color: "rgba(244,239,228,.2)" }}>
            {filtered.length} fragrance{filtered.length > 1 ? "s" : ""}
          </div>
        </div>
      </div>

      <section>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div className="pgrid">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} isWished={wishlist.includes(p.id)}
                onAddToCart={onAddToCart} onOpenProduct={onOpenProduct} onToggleWish={onToggleWish} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
