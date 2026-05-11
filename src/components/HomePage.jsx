import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const tickerItems = ["100% Original","Extrait Concentré","Tenue 24h","Fabrication Artisanale","Livraison Rapide","Oud d'Oman","Jasmin de Grasse","Santal de Mysore"];

export default function HomePage({ products, wishlist, onAddToCart, onOpenProduct, onToggleWish, onNavigate }) {
  const [email, setEmail] = useState("");

  // Reveal observer
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleSubscribe = () => {
    if (email && email.includes("@")) {
      alert("✦ Bienvenue dans le Club Zylorastyle !");
      setEmail("");
    } else {
      alert("✦ Veuillez entrer un email valide");
    }
  };

  return (
    <div>
      {/* HERO */}
      <section id="hero" style={{ padding: 0 }}>
        <div className="hslide active">
          <img src="/banner1.png" alt="Zylorastyle" style={{ objectPosition: "center" }} />
        </div>
        <div className="hover-overlay"></div>
        <div style={{ position: "absolute", top: 0, right: 0, width: 2, height: "100%", background: "linear-gradient(to bottom,transparent,var(--em2),transparent)", opacity: .4, zIndex: 1 }}></div>
        <div className="hcontent">
          <div className="heyebrow">✦ Haute Parfumerie Exclusive ✦</div>
          <h1 className="htitle">L'art de<br /><em>sentir</em><br />le monde</h1>
          <p className="hsub">100% original · extrait concentré · tenue longue durée 24h</p>
          <div className="hctas">
        </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker">
          {[...tickerItems, ...tickerItems].map((item, i) => <div key={i} className="titem">{item}</div>)}
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <section>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="slabel">Nos Créations</div>
            <h2 className="stitle">Parfums d'<em>Exception</em></h2>
            <div className="divider"><span style={{ color: "var(--silk)", fontSize: 11 }}>✦</span></div>
          </div>
          <div className="pgrid">
            {["100ml","70ml","35ml","30ml"].map(vol => {
              const p = products.find(x => x.vol === vol);
              return p ? (
                <ProductCard key={p.id} product={p} isWished={wishlist.includes(p.id)}
                  onAddToCart={onAddToCart} onOpenProduct={onOpenProduct} onToggleWish={onToggleWish} />
              ) : null;
            })}
          </div>
          <div style={{ textAlign: "center", marginTop: 50 }} className="reveal">
            <button className="btn-ghost" onClick={() => onNavigate("boutique")}>Voir Toute la Boutique</button>
          </div>
        </div>
      </section>

      {/* SPLIT */}
      <div className="split">
        <div className="simg">
          <img src="/Zylora.png" alt="Zylora" />
          <div style={{ position: "absolute", top: 18, left: 18, right: 18, bottom: 18, border: "1px solid rgba(27,94,56,.22)", pointerEvents: "none" }}></div>
        </div>
        <div className="stext reveal">
          <div className="slabel">Zylorastyle</div>
          <h2 className="stitle" style={{ fontSize: "clamp(30px,3.8vw,48px)" }}>L'essence<br />de la <em>beauté</em><br />rare</h2>
          <div className="saccent"></div>
          <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 2, marginBottom: 16 }}>Chaque parfum Zylorastyle est <strong style={{ color: "var(--silk)", fontWeight: 500 }}>100% original</strong> — extrait, concentré, pour une tenue longue durée jusqu'à 24h.</p>
          <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 2, marginBottom: 36 }}>Nos formules nourrissent, hydratent et protègent la peau tout en la parfumant intensément.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 38 }}>
            {[["50+","FRAGRANCES"],["24h","TENUE"],["100%","ORIGINAL"],["5★","SATISFACTION"]].map(([val,lbl]) => (
              <div key={lbl} style={{ padding: 18, border: "1px solid rgba(27,94,56,.28)", background: "rgba(27,94,56,.06)" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 300, color: "var(--silk)" }}>{val}</div>
                <div style={{ fontSize: 9, letterSpacing: 3, color: "rgba(244,239,228,.25)", marginTop: 3 }}>{lbl}</div>
              </div>
            ))}
          </div>
          <button className="btn-ghost" onClick={() => onNavigate("about")}>Notre Maison</button>
        </div>
      </div>

      {/* FEATURES */}
      <section style={{ padding: "56px 5%", background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2 }}>
          {[["🌿","100% Original","Extrait pur certifié"],["⏱️","Tenue 24h","Concentration maximale"],["🚚","Livraison Rapide","Partout au Maroc"],["🎁","Emballage Luxe","Idéal pour offrir"]].map(([ic,t,s]) => (
            <div key={t} style={{ textAlign: "center", padding: "30px 18px", border: "1px solid rgba(27,94,56,.22)" }} className="reveal">
              <div style={{ fontSize: 28, marginBottom: 12 }}>{ic}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, color: "var(--cream)", marginBottom: 5 }}>{t}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>{s}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="slabel">Ils en Parlent</div>
            <h2 className="stitle">Paroles de <em>Clients</em></h2>
            <div className="divider"><span style={{ color: "var(--silk)", fontSize: 11 }}>✦</span></div>
          </div>
          <div className="tgrid">
            {[
              { text: '"Zylorastyle m\'a conquise. Le parfum reste toute la journée — 24h comme promis. 100% original, j\'en suis sûre."', name: "Fatima A.", city: "CASABLANCA" },
              { text: '"Un packaging magnifique, livraison rapide. Le Sauvage pour lui est incomparable. Je commande déjà ma deuxième bouteille !"', name: "Karim B.", city: "MARRAKECH" },
              { text: '"100% original comme annoncé. Zylorastyle est mon parfumeur de confiance depuis 2 ans. Qualité irréprochable."', name: "Nadia R.", city: "RABAT" },
            ].map((t, i) => (
              <div key={i} className="tcard reveal">
                <div className="tstars">★★★★★</div>
                <p className="ttext">{t.text}</p>
                <div className="tfooter">
                  <span className="tname">{t.name}</span>
                  <span className="tcity">{t.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    
    </div>
  );
}
