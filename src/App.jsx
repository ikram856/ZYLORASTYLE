import { useState, useEffect, useRef } from "react";
import "./index.css";
import { products as initialProducts } from "./data/products";
import { db } from "./firebase";
import { collection, getDocs, setDoc, deleteDoc, doc } from "firebase/firestore";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import ProductModal from "./components/ProductModal";
import AdminPage from "./components/AdminPage";
import HomePage from "./components/HomePage";
import BoutiquePage from "./components/BoutiquePage";
import { AboutPage } from "./components/OtherPages";
import Footer from "./components/Footer";

export default function App() {
  const [page, setPage] = useState("home");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [filter, setFilter] = useState("all");
  const [notif, setNotif] = useState({ msg: "", show: false });
  const [loading, setLoading] = useState(true);
  const notifTimer = useRef(null);

  // Charger les produits depuis Firestore au démarrage
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const snap = await getDocs(collection(db, "products"));
        if (snap.empty) {
          // Première fois : charger les produits initiaux dans Firestore
          for (const p of initialProducts) {
            await setDoc(doc(db, "products", String(p.id)), p);
          }
          setProducts(initialProducts);
        } else {
          const prods = snap.docs.map(d => d.data());
          setProducts(prods);
        }
      } catch (e) {
        console.error(e);
        setProducts(initialProducts);
      }
      setLoading(false);
    };
    loadProducts();
  }, []);

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

  const handleAdminSave = async (product) => {
    try {
      await setDoc(doc(db, "products", String(product.id)), product);
      setProducts((prev) => {
        const exists = prev.find((x) => x.id === product.id);
        if (exists) return prev.map((x) => x.id === product.id ? product : x);
        return [...prev, product];
      });
      showNotif("✦ Produit enregistré avec succès");
    } catch (e) {
      showNotif("✦ Erreur lors de l'enregistrement");
    }
  };

  const handleAdminDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "products", String(id)));
      setProducts((prev) => prev.filter((x) => x.id !== id));
      showNotif("✦ Produit supprimé");
    } catch (e) {
      showNotif("✦ Erreur lors de la suppression");
    }
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const modalProd = products.find((p) => p.id === modalProduct);
  const pageProps = { products, wishlist, onAddToCart: addToCart, onOpenProduct: setModalProduct, onToggleWish: toggleWish };

  if (loading) return (
    <>
      <div id="cursor"></div>
      <div id="cring"></div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#060f0a", color: "#c9b97a", fontFamily: "Playfair Display, serif", fontSize: 22 }}>
        Chargement...
      </div>
    </>
  );

  return (
    <>
      <div id="cursor"></div>
      <div id="cring"></div>

      <div className={`notif${notif.show ? " show" : ""}`}>{notif.msg}</div>

      <Navbar currentPage={page} onNavigate={navigate} cartCount={cartCount} onCartToggle={() => setCartOpen((o) => !o)} />

      {page === "home"     && <HomePage {...pageProps} onNavigate={navigate} />}
      {page === "boutique" && <BoutiquePage {...pageProps} filter={filter} onFilter={setFilter} />}
      {page === "about"    && <AboutPage onNavigate={navigate} />}
      {page === "admin"    && <AdminPage products={products} onSave={handleAdminSave} onDelete={handleAdminDelete} />}

      {page !== "admin" && <Footer onNavigate={navigate} />}

      <Cart cart={cart} isOpen={cartOpen} onClose={() => setCartOpen(false)} onRemove={removeFromCart}
        onCheckout={() => showNotif("✦ Redirection vers le paiement sécurisé...")} />

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
