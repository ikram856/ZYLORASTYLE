export default function Footer({ onNavigate }) {
  return (
    <footer>
      <div className="fgrid">
        <div>
          <img src="/logo.png" alt="Zylorastyle" style={{ height: 56, width: "auto", display: "block", marginBottom: 8 }} />
          <p className="fdesc">
            La haute parfumerie accessible. Des fragrances 100% originales, extraits concentrés, tenue 24h. Livrées partout au Maroc.
          </p>

          <div className="socs">
            <a href="https://www.instagram.com/zylorastyle/" target="_blank" className="soc">IG</a>

            <a href="https://wa.me/+212 767-322826" target="_blank" className="soc">
              WTS
            </a>

            <a href="https://tiktok.https://www.tiktok.com/@zylora_style?_t=8o8TLYGvEKz&_r=1&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnyA5Txn5YIe6TvPVhqz5kfL77byAic5HNuxL_PseEPsRvtD5e69MWcwL5rSY_aem_Fgrmsh5zWZPtmi-yYP2Zow/@TONCOMPTE" target="_blank" className="soc">
              TT
            </a>
          </div>
        </div>

        <div>
          <div className="fttl">Boutique</div>
          <button className="flink" onClick={() => onNavigate("boutique")}>Tous les Parfums</button>
          <button className="flink" onClick={() => onNavigate("boutique")}>Eaux de Parfum</button>
          <button className="flink" onClick={() => onNavigate("boutique")}>Extraits</button>
          <button className="flink">Nouveautés</button>
          <button className="flink">Best Sellers</button>
        </div>

        <div>
          <div className="fttl">Maison</div>
          <button className="flink" onClick={() => onNavigate("about")}>Notre Histoire</button>
          <button className="flink">Authenticité</button>
          <button className="flink">Engagements</button>
          <button className="flink">Presse</button>
        </div>

        <div>
          <div className="fttl">Service</div>
          <button className="flink">Livraison & Retours</button>
          <button className="flink">FAQ</button>
          <button className="flink">Contact WhatsApp</button>
          <button className="flink">Suivi Commande</button>
        </div>
      </div>

      <div className="fbottom">
        <span style={{ fontSize: 10, color: "rgba(244,239,228,.14)", letterSpacing: 1.5 }}>
          © 2025 ZYLORASTYLE · TOUS DROITS RÉSERVÉS
        </span>

        <div style={{ display: "flex", gap: 20 }}>
          {["Mentions Légales","Confidentialité","CGV"].map((l) => (
            <span key={l} style={{ fontSize: 10, color: "rgba(244,239,228,.14)", cursor: "pointer" }}>{l}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}