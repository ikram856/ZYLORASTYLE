import { useEffect } from "react";
import ProductCard from "./ProductCard";
import { collections } from "../data/products";

export function CollectionsPage({ products, wishlist, onAddToCart, onOpenProduct, onToggleWish }) {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ paddingTop: 78 }}>
      <div className="phero">
        <div className="phbg"><img src="https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=1400&q=80" alt="" /></div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(6,21,16,.5),rgba(27,94,56,.05),rgba(6,21,16,.65))" }}></div>
        <div className="phcont">
          <div className="slabel">Nos Univers</div>
          <h1 className="stitle" style={{ fontSize: "clamp(44px,8vw,84px)" }}>Collections</h1>
        </div>
      </div>

      {collections.map((c, i) => {
        const prods = products.filter((p) => p.coll === c.name);
        const even = i % 2 === 0;
        return (
          <section key={c.name} style={{ padding: "90px 5%", background: even ? "var(--ink)" : "var(--deep)", borderBottom: "1px solid var(--border)" }}>
            <div style={{ maxWidth: 1440, margin: "0 auto" }}>
              <div style={{ display: "grid", gridTemplateColumns: even ? "360px 1fr" : "1fr 360px", gap: 68, alignItems: "center", marginBottom: 52 }}>
                {even ? (
                  <>
                    <div className="reveal">
                      <div className="slabel">{c.sub}</div>
                      <h2 className="stitle" style={{ fontSize: "clamp(28px,4vw,50px)" }}>{c.name}</h2>
                      <div className="divider" style={{ justifyContent: "flex-start" }}><span style={{ color: "var(--silk)", fontSize: 11 }}>✦</span></div>
                      <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 2 }}>{c.desc}</p>
                    </div>
                    <img src={c.img} className="reveal" style={{ width: "100%", height: 390, objectFit: "cover", filter: "brightness(.48)", border: "1px solid rgba(27,94,56,.22)" }} alt={c.name} />
                  </>
                ) : (
                  <>
                    <img src={c.img} className="reveal" style={{ width: "100%", height: 390, objectFit: "cover", filter: "brightness(.48)", border: "1px solid rgba(27,94,56,.22)" }} alt={c.name} />
                    <div className="reveal">
                      <div className="slabel">{c.sub}</div>
                      <h2 className="stitle" style={{ fontSize: "clamp(28px,4vw,50px)" }}>{c.name}</h2>
                      <div className="divider" style={{ justifyContent: "flex-start" }}><span style={{ color: "var(--silk)", fontSize: 11 }}>✦</span></div>
                      <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 2 }}>{c.desc}</p>
                    </div>
                  </>
                )}
              </div>
              {prods.length > 0 ? (
                <div className="pgrid">
                  {prods.map((p) => (
                    <ProductCard key={p.id} product={p} isWished={wishlist.includes(p.id)}
                      onAddToCart={onAddToCart} onOpenProduct={onOpenProduct} onToggleWish={onToggleWish} />
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: 13, color: "var(--muted)", textAlign: "center", padding: 36 }}>Bientôt disponible</p>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export function AboutPage({ onNavigate }) {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ paddingTop: 78 }}>
      <div className="phero" style={{ height: "60vh" }}>
        <div className="phbg"><img src="/histoire .jpeg" alt="" /></div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(6,21,16,.45),rgba(27,94,56,.05),rgba(6,21,16,.65))" }}></div>
        <div className="phcont">
          <div className="slabel">Notre Histoire</div>
          <h1 className="stitle" style={{ fontSize: "clamp(44px,8vw,86px)", letterSpacing: 6 }}>ZYLORASTYLE</h1>
          <p style={{ fontSize: 10, letterSpacing: 6, color: "rgba(201,185,122,.38)", marginTop: 11 }}>HAUTE PARFUMERIE · DEPUIS 2019</p>
        </div>
      </div>

      <section>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="split" style={{ minHeight: 560, marginBottom: 2 }}>
            <div className="stext reveal" style={{ background: "var(--card)" }}>
              <div className="slabel">Fondation</div>
              <h2 className="stitle" style={{ fontSize: "clamp(28px,3.6vw,46px)" }}>Une passion<br /><em>transmise</em></h2>
              <div className="saccent"></div>
              <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 2, marginBottom: 16 }}>Tout a commencé par un souvenir. Le parfum de notre mère, le matin, avant qu'elle parte travailler. Cette odeur qui disait <strong style={{ color: "var(--silk)", fontWeight: 500 }}>"je suis là"</strong> sans un seul mot.</p>
              <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 2, marginBottom: 16 }}>C'est de ce souvenir qu'est née Zylorastyle en 2019. Non pas pour vendre des parfums, mais pour redonner à chacun ce sentiment rare — celui d'être reconnu, d'exister, de laisser une trace.</p>
              <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 2, marginBottom: 16 }}>Nous avons parcouru les souks de Marrakech, les champs de jasmin de Grasse, les forêts d'oud d'Oman. Pas pour trouver les meilleures matières premières — mais pour trouver les bonnes émotions.</p>
              <p style={{ fontSize: 14, color: "var(--silk)", lineHeight: 2, fontStyle: "italic" }}>Chaque flacon Zylorastyle est une promesse : que quelqu'un, quelque part, se retournera sur ton passage.</p>
            </div>
            <div className="simg"><img src="/chogan maison.jpeg" alt="" /></div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
            {[
              { ic: "🌸", t: "Authenticité", d: "Certifié 100% original. Nous sourceons depuis les meilleures maisons mondiales — Dior, Chanel, YSL et bien d'autres." },
              { ic: "⚗️", t: "Concentration", d: "Extraits de parfum à concentration maximale. Formulation haute densité qui offre une tenue exceptionnelle jusqu'à 24h." },
              { ic: "💚", t: "Soin de Peau", d: "Nourrit, hydrate et protège la peau tout en parfumant. Neutralise les signes du vieillissement cutané." },
            ].map((item) => (
              <div key={item.t} style={{ background: "var(--card)", border: "1px solid rgba(27,94,56,.28)", padding: "46px 32px" }} className="reveal">
                <div style={{ fontSize: 30, marginBottom: 16 }}>{item.ic}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 400, color: "var(--cream)", marginBottom: 12 }}>{item.t}</h3>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.9 }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
