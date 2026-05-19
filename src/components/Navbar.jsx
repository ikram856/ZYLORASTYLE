import { useEffect, useState } from "react";

export default function Navbar({ currentPage, onNavigate, cartCount, onCartToggle }) {
  const [scrolled, setScrolled] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [showAdmin, setShowAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleLogoClick = () => {
    onNavigate("home");
    const next = logoClicks + 1;
    setLogoClicks(next);
    if (next >= 5) setShowAdmin(true);
  };

  const handleNav = (id) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  const links = [
    { id: "home", label: "Accueil" },
    { id: "boutique", label: "Boutique" },
    { id: "about", label: "Maison" },
  ];

  return (
    <>
    <nav className={scrolled ? "scrolled" : ""}>
      <div className="nav-inner">
        <div className="logo" onClick={handleLogoClick}>
          <img src="/logo.png" alt="Zylorastyle" style={{ height: 48, width: "auto", display: "block" }} />
        </div>
        <div className="nav-links">
          {links.map((l) => (
            <button key={l.id} className={`nav-link${currentPage === l.id ? " active" : ""}`} onClick={() => handleNav(l.id)}>
              {l.label}
            </button>
          ))}
          {showAdmin && (
            <button className={`nav-link${currentPage === "admin" ? " active" : ""}`} onClick={() => handleNav("admin")} style={{ color: "var(--silk)", opacity: 0.7 }}>
              ⚙ Admin
            </button>
          )}
        </div>
        <div className="nav-actions">
          <button className="icon-btn" onClick={onCartToggle}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {cartCount > 0 && <div className="cbadge">{cartCount}</div>}
          </button>
          <button className="btn-em" onClick={() => handleNav("boutique")}><span>Découvrir</span></button>
          <button className="hamburger" onClick={() => setMenuOpen(o => !o)}>
            <span style={{ transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }}></span>
            <span style={{ opacity: menuOpen ? 0 : 1 }}></span>
            <span style={{ transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }}></span>
          </button>
        </div>
      </div>
    </nav>
    <div className={`mobile-nav${menuOpen ? " open" : ""}`}>
      {links.map((l) => (
        <button key={l.id} className={`nav-link${currentPage === l.id ? " active" : ""}`} onClick={() => handleNav(l.id)}>
          {l.label}
        </button>
      ))}
      {showAdmin && (
        <button className="nav-link" onClick={() => handleNav("admin")} style={{ color: "var(--silk)" }}>⚙ Admin</button>
      )}
    </div>
    </>
  );
}