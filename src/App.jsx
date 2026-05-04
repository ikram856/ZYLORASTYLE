import { useState, useEffect, useRef } from "react";
import "./index.css";
import { products as initialProducts } from "./data/products";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import ProductModal from "./components/ProductModal";
import AdminPage from "./components/AdminPage";
import HomePage from "./components/HomePage";        // ← manquait
import BoutiquePage from "./components/BoutiquePage";
import { CollectionsPage, AboutPage } from "./components/OtherPages";
import Footer from "./components/Footer";

export default function App() {
  const [page, setPage] = useState("home");
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);              // ← manquait
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [filter, setFilter] = useState("all");
  const [notif, setNotif] = useState({ msg: "", show: false });
  const notifTimer = useRef(null);

  useEffect(() => {
    const cur = document.getElementById("cursor");
    const cr = document.getElementById("cring");
    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = (e) => { mx = e.clientX; my = e.clientY; cur.style.left = mx + "px"; cur.style.top = my + "px"; };
    document.addEventListener("mousemove", onMove);
    const interval = setInterval(() => {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      cr.style.left = rx + "px";
      cr.style.top = ry + "px";
    }, 16);
    return () => { document.removeEventListener("mousemove", onMove); clearInterval(interval); };
  }, []);

  const navigate = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showNotif = (msg) => {
    setNotif({ msg, show: true });
    clearTimeout(notifTimer.current);
    notifTimer.current = setTimeout(() => setNotif((n) => ({ ...n, show: false })), 3000);
  };

  const addToCart = (id) => {
    const p = products.find((x) => x.id === id);
    if (!p || !p.ok) return;
    setCart((prev) => {
      const ex = prev.find((x) => x.id === id);
      if (ex) return prev.map((x) => x.id === id ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { ...p, qty: 1 }];
    });
    showNotif("✦ " + p.name + " ajouté au panier");
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((x) => x.id !== id));

  const toggleWish = (id) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
    showNotif(wishlist.includes(id) ? "✦ Retiré des favoris" : "✦ Ajouté aux favoris");
  };

  // ← complétées
  const handleAdminSave = (product) => {
    setProducts((prev) => {
      const exists = prev.find((x) => x.id === product.id);
      if (exists) return prev.map((x) => x.id === product.id ? product : x);
      return [...prev, product];
    });
    showNotif("✦ Produit enregistré avec succès");
  };

  const handleAdminDelete = (id) => {
    setProducts((prev) => prev.filter((x) => x.id !== id));
    showNotif("✦ Produit supprimé");
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const modalProd = products.find((p) => p.id === modalProduct);
  const pageProps = { products, wishlist, onAddToCart: addToCart, onOpenProduct: setModalProduct, onToggleWish: toggleWish };

  return (
    <>
      <div id="cursor"></div>
      <div id="cring"></div>

      <div className={`notif${notif.show ? " show" : ""}`}>{notif.msg}</div>

      <Navbar currentPage={page} onNavigate={navigate} cartCount={cartCount} onCartToggle={() => setCartOpen((o) => !o)} />

      {page === "home"        && <HomePage {...pageProps} onNavigate={navigate} />}
      {page === "boutique"    && <BoutiquePage {...pageProps} filter={filter} onFilter={setFilter} />}
      {page === "collections" && <CollectionsPage {...pageProps} />}
      {page === "about"       && <AboutPage onNavigate={navigate} />}
      {page === "admin"       && <AdminPage products={products} onSave={handleAdminSave} onDelete={handleAdminDelete} />}

      {page !== "admin" && <Footer onNavigate={navigate} />}

      <Cart cart={cart} isOpen={cartOpen} onClose={() => setCartOpen(false)} onRemove={removeFromCart}
        onCheckout={() => showNotif("✦ Redirection vers le paiement sécurisé...")} />

      {/* ← sorti du bloc modalProd */}
      {modalProd && (
        <ProductModal
          product={modalProd}
          isWished={wishlist.includes(modalProd.id)}
          onClose={() => setModalProduct(null)}
          onAddToCart={addToCart}
          onToggleWish={toggleWish}
        />
      )}
    </>
  );
}