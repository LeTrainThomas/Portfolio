# Portfolio — site statique (HTML, CSS, JavaScript natif)

Portfolio personnel prêt pour GitHub Pages. Aucun framework, aucune compilation, aucune dépendance npm, aucun service tiers.
**Tout le contenu se modifie dans `config.js`.**

---

## 1. Arborescence

```
portfolio/
├── index.html              Structure de la page (+ contenu de secours si JavaScript échoue)
├── styles.css              Styles, couleurs et variables visuelles
├── config.js               ← VOS TEXTES, LIENS, IMAGES, PROJETS, COMPÉTENCES
├── script.js               Construction du contenu dynamique (pas besoin d'y toucher)
├── README.md               Ce fichier
├── .nojekyll               Indique à GitHub Pages de servir les fichiers tels quels
└── assets/
    ├── favicon.svg
    ├── fonts/              Anton + Instrument Sans (locales, licence SIL OFL)
    ├── images/             ← VOS IMAGES (à créer : accueil/, projets/, etc.)
    │   └── projets/
    ├── placeholders/       Visuels provisoires (utilisés tant qu'une image manque)
    └── cv/                 ← VOTRE CV (facultatif)
```

---

## 2. Prévisualiser en local

**Option simple :** double-cliquez sur `index.html`. Le site fonctionne directement (la configuration est un fichier JavaScript, pas un chargement réseau).

**Option recommandée** (comportement identique à la mise en ligne) : dans le dossier du projet, lancez

```bash
python -m http.server 8000
```

puis ouvrez `http://localhost:8000`. Vous pouvez aussi utiliser l'extension « Live Server » de VS Code.

> Après chaque modification, rechargez la page. Si un changement n'apparaît pas, faites un rechargement forcé (Ctrl+F5 / Cmd+Maj+R).

---

## 3. Personnaliser

### Nom, activité, textes
Dans `config.js`, section **1. IDENTITÉ** : `name`, `role`, `shortBio`, `longBio` (un élément = un paragraphe), `location`.
Pour le référencement et les aperçus de partage, modifiez aussi dans `index.html` : `<title>`, `<meta name="description">` et `og:title`.

> Un champ laissé vide (`""`) est masqué automatiquement. Aucun lien ni bouton factice n'est affiché.

### Couleurs, espacements, polices
En haut de `styles.css`, bloc **2. VARIABLES** (`--pink`, `--lime`, `--gutter`, `--font-display`, etc.).

### Ajouter une image
1. Déposez le fichier dans `assets/images/` (ex. `assets/images/accueil/visuel.png`).
2. Dans `config.js`, renseignez son chemin **relatif** dans `src` (sans `/` au début) :
   ```js
   src: "assets/images/accueil/visuel.png",
   ```
3. Réglez si besoin :
   - `alt` : description de l'image (ce qu'elle montre).
   - `fit` : `"cover"` (remplit le cadre, peut rogner) ou `"contain"` (image entière — idéal pour les PNG détourés).
   - `position` : position du sujet, ex. `"50% 50%"` (centre), `"50% 0%"` (haut), `"30% 70%"`.

Formats conseillés : JPG/WebP pour les photos, PNG/WebP **avec transparence** pour les visuels détourés. Visez environ 2000 px de large au maximum et un poids raisonnable.

### Remplacer un placeholder
Il suffit de renseigner `src`. Le champ `placeholder` reste en secours : si le fichier indiqué dans `src` est introuvable, le placeholder s'affiche (aucune icône d'image cassée). Si le placeholder lui-même manque, un aplat coloré reste visible.

### Modifier l'accueil
`config.js`, section **5. ACCUEIL** :

| Emplacement | Rôle | Format conseillé |
|---|---|---|
| `main` | Visuel principal, passe devant le bas du titre | Carré, détouré, `fit: "contain"` |
| `left` | Décor gauche, derrière le titre | Portrait (2:3), détouré |
| `right` | Décor droit, devant le bord du titre | ~6:7, détouré |
| `foreground` | Premier plan, en bas à droite du visuel principal | Paysage (~5:4), détouré |

- Masquer un élément : `hidden: true`. La composition reste équilibrée.
- `foreground` est placé dans le cadre du visuel principal : masquer `main` masque aussi `foreground`.
- Les textes des boutons se règlent avec `ctaPrimary` et `ctaSecondary`.
- Le titre « PORTFOLIO » est dans `index.html` (une lettre par `<span>` pour l'animation). Si vous changez le mot, ajustez `--title-ratio` dans `styles.css` (largeur du mot en em).

### Ajouter un projet
Dans `config.js`, section **7. PROJETS**, copiez un bloc `{ ... },` complet et collez-le à la position voulue, puis modifiez :
- `id` : unique, sans espace ni accent (ex. `"refonte-identite"`) ;
- `title`, `category`, `year` (facultatif), `summary` ;
- `cover` et `gallery` (liste d'images, peut être vide `[]`) ;
- `context`, `role`, `tools`, `approach` ;
- `result` et `link.url` : facultatifs, masqués s'ils sont vides.

Rangement conseillé : `assets/images/projets/<id>/couverture.jpg`, `.../01.jpg`, etc.
La mise en page asymétrique se répète automatiquement tous les six projets. Les filtres apparaissent dès qu'il y a au moins deux catégories différentes.

### Retirer un projet
Supprimez son bloc `{ ... },` dans `config.js` (attention à garder les virgules entre les blocs). Le compteur de l'accueil se met à jour seul.

### Compétences
Section **8. COMPÉTENCES** : un groupe = `{ domain: "...", items: ["...", "..."] }`. Ajoutez, supprimez ou réordonnez librement.

### Contact et liens
- `contact.email` : affiche le lien `mailto:` et le bouton « Copier l'adresse ».
- `links` : seuls les liens avec une `url` commençant par `https://` sont affichés (ils s'ouvrent dans un nouvel onglet).
- Une fois le site finalisé, passez `showPlaceholderHints` à `false` pour masquer les mentions « à renseigner ».

### Ajouter votre CV
1. Déposez le PDF dans `assets/cv/` (ex. `assets/cv/cv-nom-prenom.pdf`).
2. Dans `config.js` : `cv: { file: "assets/cv/cv-nom-prenom.pdf", ... }`.
Le bouton n'apparaît que si `file` est renseigné. En ligne, il est automatiquement retiré si le fichier est introuvable.

### Désactiver une animation
- **Toutes** : `animations: { enabled: false }` dans `config.js`.
- **Parallaxe seule** : `parallax: false`.
- **Une animation précise** : dans `styles.css`, section **11. ANIMATIONS**, supprimez ou commentez la règle concernée (ex. `.hero__title-part > span` pour l'apparition du titre).
- Les visiteurs ayant activé « réduire les animations » dans leur système n'en voient aucune, automatiquement.

---

## 4. Publier sur GitHub Pages

Procédure « Deploy from a branch » (documentation officielle GitHub, consultée en octobre 2026 : *Creating a GitHub Pages site* et *Configuring a publishing source for your GitHub Pages site*).

1. Créez un dépôt sur GitHub (avec un compte gratuit, il doit être **public**).
   - Pour un site personnel à la racine, le dépôt doit s'appeler `<votre-identifiant>.github.io` (en minuscules).
   - Sinon, n'importe quel nom : le site sera servi dans un sous-dossier portant le nom du dépôt. Le portfolio est prévu pour (chemins relatifs uniquement).
2. Envoyez **le contenu** du dossier `portfolio/` à la racine du dépôt (`index.html` doit être au premier niveau). Via l'interface web : *Add file → Upload files*, puis glissez les fichiers et dossiers (y compris `.nojekyll`).
3. Dans le dépôt : **Settings → Pages** (section « Code and automation »).
4. Sous **Build and deployment → Source**, choisissez **Deploy from a branch**.
5. Sélectionnez la branche (ex. `main`) et le dossier **`/ (root)`**, puis **Save**.
6. Patientez quelques minutes : l'adresse du site s'affiche sur la page **Settings → Pages**.

> Un site GitHub Pages est public sur Internet. Ne mettez dans le dépôt aucune donnée confidentielle.

Une fois l'adresse connue, décommentez `og:url` et `og:image` dans `index.html` avec des adresses **absolues**.

---

## 5. Polices

Anton et Instrument Sans sont incluses localement dans `assets/fonts/` (licence SIL Open Font License 1.1, usage web autorisé). Polices de secours prévues : Impact / Arial Narrow pour les titres, police système pour le texte.

---

## 6. Ce qu'il vous reste à ajouter

**Textes (`config.js`)**
- [ ] Nom et prénom (`identity.name`) — et dans `index.html` : `<title>`, description, `og:title`
- [ ] Activité ou spécialité (`identity.role`)
- [ ] Présentation courte et détaillée
- [ ] Ville / zone (ou laisser vide)
- [ ] Adresse e-mail
- [ ] Liens professionnels (LinkedIn, GitHub, etc. — ou laisser vides)
- [ ] Phrase d'invitation de la section Contact
- [ ] Les 6 projets : titre, catégorie, année, résumé, contexte, rôle, outils, démarche, résultat éventuel, lien éventuel
- [ ] Les domaines de compétences et leurs éléments
- [ ] Passer `showPlaceholderHints` à `false` à la fin

**Images**
- [ ] Accueil : visuel principal (carré, détouré)
- [ ] Accueil : décor gauche, décor droit, premier plan (détourés — ou `hidden: true`)
- [ ] À propos : photo ou visuel (portrait 4:5)
- [ ] Projets : une couverture par projet + images de galerie, avec leurs textes alternatifs
- [ ] Facultatif : image de partage (1200 × 630) pour `og:image`

**Fichiers**
- [ ] CV en PDF dans `assets/cv/` (facultatif)
