export default function Cart({ cart, isOpen, onClose, onRemove, onCheckout }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className={`cback${isOpen ? " open" : ""}`} onClick={(e) => { if (e.target.classList.contains("cback")) onClose(); }}>
      <div className="cdrawer">
        <div className="chdr">
          <div>
            <div className="ctitle">Panier</div>
            <div className="ccnt">{count} ARTICLE{count > 1 ? "S" : ""}</div>
          </div>
          <button className="cx" onClick={onClose}>✕</button>
        </div>

        <div className="citems">
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "76px 20px" }}>
              <div style={{ fontSize: 40, marginBottom: 13, opacity: .18 }}>🧴</div>
              <div style={{ fontSize: 9, letterSpacing: 3, color: "rgba(244,239,228,.18)" }}>VOTRE PANIER EST VIDE</div>
            </div>
          ) : cart.map((item) => (
            <div className="citem" key={item.id}>
              <img className="ciimg" src={item.img} alt={item.name} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 8, letterSpacing: 2, color: "rgba(201,185,122,.36)", marginBottom: 3 }}>{item.coll.toUpperCase()}</div>
                <div className="ciname">{item.name}</div>
                <div className="cimeta">{item.vol} · Qté: {item.qty}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div className="ciprice">{(item.price * item.qty).toLocaleString()} MAD</div>
                  <button className="cirem" onClick={() => onRemove(item.id)}>Retirer</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="cftr">
            <div style={{ background: "rgba(27,94,56,.07)", border: "1px solid rgba(27,94,56,.26)", padding: "10px 14px", marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 9, letterSpacing: 2, color: "rgba(244,239,228,.3)" }}>LIVRAISON</span>
              <span style={{ fontSize: 9, color: total >= 500 ? "#5cb87a" : "var(--silk)" }}>{total >= 500 ? "✓ Offerte" : "dès 500 MAD"}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
              <span style={{ fontSize: 10, letterSpacing: 3, color: "rgba(244,239,228,.3)", textTransform: "uppercase" }}>Total</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 300, color: "var(--silk)" }}>
                {total.toLocaleString()} <span style={{ fontSize: 16 }}>MAD</span>
              </span>
            </div>
            <button className="btn-em" style={{ width: "100%", padding: 15, fontSize: 10 }} onClick={onCheckout}>
              <span>Procéder au Paiement</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
