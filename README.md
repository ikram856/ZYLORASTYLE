# ZYLORASTYLE — React App

## 🚀 Installation & Démarrage

### Étape 1 — Installer Node.js
Téléchargez Node.js sur https://nodejs.org (version LTS)

### Étape 2 — Ouvrir le terminal dans ce dossier
```
cd zylorastyle
```

### Étape 3 — Installer les dépendances
```
npm install
```

### Étape 4 — Lancer le site
```
npm start
```
Le site s'ouvre automatiquement sur http://localhost:3000

---

## 📁 Structure du projet

```
zylorastyle/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        ← Barre de navigation
│   │   ├── HomePage.jsx      ← Page d'accueil
│   │   ├── BoutiquePage.jsx  ← Page boutique avec filtres
│   │   ├── OtherPages.jsx    ← Collections + À propos
│   │   ├── ProductCard.jsx   ← Carte produit
│   │   ├── ProductModal.jsx  ← Modal détail produit
│   │   ├── Cart.jsx          ← Panier drawer
│   │   └── Footer.jsx        ← Footer
│   ├── data/
│   │   └── products.js       ← Vos produits & collections
│   ├── App.jsx               ← Composant principal
│   ├── index.css             ← Tous les styles
│   └── index.js              ← Point d'entrée
└── package.json
```

## ✏️ Modifier les produits

Ouvrez `src/data/products.js` et modifiez le tableau `products` :

```js
{
  id: 1,
  name: "Nom du parfum",
  price: 550,          // Prix en MAD
  vol: "100ml",
  badge: "Best Seller", // ou null
  ok: true,            // false = épuisé
  img: "URL_image",
  img2: "URL_image_hover",
  desc: "Description..."
}
```

## 🎨 Changer les couleurs

Dans `src/index.css`, modifiez les variables CSS :

```css
:root {
  --silk: #c9b97a;   /* Couleur dorée principale */
  --em2: #246b42;    /* Vert boutons */
  --ink: #061510;    /* Fond sombre */
}
```

## 🌐 Mettre en ligne (gratuit)

1. `npm run build` — crée le dossier `build/`
2. Allez sur https://netlify.com
3. Glissez-déposez le dossier `build/` sur Netlify
