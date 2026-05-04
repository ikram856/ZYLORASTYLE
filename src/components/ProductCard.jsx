import { useState } from "react";

export default function ProductCard({ product, onAddToCart, onOpenProduct, isWished, onToggleWish }) {
  const [imgSrc, setImgSrc] = useState(product.img);

  return (
    <div className="pcard" id={`pc${product.id}`}>
      <div className="cimg-wrap">
        <img
          className="cimg"
          src={imgSrc}
          alt={product.name}
          onMouseOver={() => setImgSrc(product.img2)}
          onMouseOut={() => setImgSrc(product.img)}
        />
        <div className="coverlay"></div>
        {product.badge && <div className="cbadge2">{product.badge}</div>}
        <div
          className={`cwish${isWished ? " active" : ""}`}
          onClick={(e) => { e.stopPropagation(); onToggleWish(product.id); }}
        >
          {isWished ? "♥" : "♡"}
        </div>
        {!product.ok && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(6,21,16,.68)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 10, letterSpacing: 4, color: "rgba(244,239,228,.32)", border: "1px solid rgba(244,239,228,.1)", padding: "10px 20px" }}>ÉPUISÉ</span>
          </div>
        )}
        {product.ok && (
          <div className="cquick">
            <button
              className="btn-em"
              style={{ width: "100%", padding: 11, fontSize: 9 }}
              onClick={(e) => { e.stopPropagation(); onAddToCart(product.id); }}
            >
              <span>Ajouter au Panier</span>
            </button>
          </div>
        )}
      </div>
      <div className="cinfo" onClick={() => onOpenProduct(product.id)}>
        <div className="ccol">{product.coll} · {product.cat}</div>
        <div className="cname">{product.name}</div>
        <div className="cnotes">{product.top}</div>
        <div className="cfoot">
          <div className="cprice">{product.price.toLocaleString()}<sub> MAD</sub></div>
          <div className="cvol">{product.vol}</div>
        </div>
      </div>
    </div>
  );
}
