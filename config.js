/* =====================================================================
   CONFIGURATION DU PORTFOLIO
   ---------------------------------------------------------------------
   C'est le SEUL fichier à modifier pour changer les textes, les liens,
   les images, les projets et les compétences.

   Règles simples :
   - Les textes entre guillemets peuvent être remplacés librement.
   - Un champ laissé vide ("") est masqué automatiquement sur le site
     (aucun bouton ni lien factice n'est affiché).
   - Les chemins d'images sont RELATIFS à index.html
     (ex. "assets/images/accueil/visuel.png"). Ne commencez pas par "/".
   - Si une image est absente ou introuvable, un placeholder graphique
     local est affiché à la place.

   Options d'image (utilisables partout où un objet image apparaît) :
     src      : chemin du fichier. Vide = placeholder.
     alt      : texte alternatif (décrivez ce que montre l'image).
     fit      : "cover" (remplit le cadre, peut rogner)
                ou "contain" (image entière, idéal pour les PNG détourés).
     position : position du sujet dans le cadre, ex. "50% 50%" (centre),
                "50% 0%" (haut), "30% 70%"...
     hidden   : true pour masquer cet élément (accueil uniquement).
   ===================================================================== */

window.PORTFOLIO_CONFIG = {

  /* ------------------------------------------------------------------
     1. IDENTITÉ
     ------------------------------------------------------------------ */
  identity: {
    name: "[Nom Prénom]",
    // Activité / spécialité affichée sous le titre et dans la navigation.
    role: "[Activité ou spécialité]",
    // Phrase courte d'accroche (accueil + section À propos).
    shortBio: "[Présentation courte — une ou deux phrases qui résument ce que vous faites et pour qui.]",
    // Présentation détaillée (facultative). Un élément du tableau = un paragraphe.
    // Laissez [] pour ne rien afficher.
    longBio: [
      "[Présentation détaillée — paragraphe 1. Votre démarche, votre façon de travailler.]",
      "[Présentation détaillée — paragraphe 2 (facultatif).]"
    ],
    // Petite mention affichée en haut de l'accueil (ex. ville, disponibilité). Vide = masqué.
    location: "[Ville ou zone — facultatif]"
  },

  /* ------------------------------------------------------------------
     2. MÉTADONNÉES (titre de l'onglet). Pensez aussi à modifier
        <title> et <meta name="description"> dans index.html pour le
        référencement et les aperçus de partage.
     ------------------------------------------------------------------ */
  meta: {
    pageTitle: "Portfolio — [Nom Prénom]"
  },

  /* ------------------------------------------------------------------
     3. CONTACT ET LIENS
     ------------------------------------------------------------------ */
  contact: {
    // Adresse e-mail. Vide = aucun lien mailto ni bouton « Copier ».
    email: "",
    // Grand titre de la section Contact.
    title: "Parlons de votre prochain projet.",
    // Petit texte sous le titre (facultatif).
    intro: "[Phrase d’invitation — ex. type de projets ou de collaborations recherchés.]"
  },

  // Liens professionnels et réseaux.
  // Seuls les liens dont "url" est renseignée sont affichés.
  links: [
    { label: "LinkedIn",  url: "" },
    { label: "GitHub",    url: "" },
    { label: "Behance",   url: "" },
    { label: "Instagram", url: "" }
  ],

  /* ------------------------------------------------------------------
     4. CV (facultatif)
     Déposez le fichier dans assets/cv/ puis indiquez son chemin,
     ex. "assets/cv/cv-nom-prenom.pdf". Vide = pas de bouton.
     ------------------------------------------------------------------ */
  cv: {
    file: "",
    label: "Télécharger mon CV (PDF)"
  },

  /* ------------------------------------------------------------------
     5. ACCUEIL — emplacements d'images
     Chaque élément peut être masqué individuellement (hidden: true).
     Les éléments décoratifs (left, right, foreground) sont ignorés par
     les lecteurs d'écran : leur "alt" reste vide.
     ------------------------------------------------------------------ */
  hero: {
    ctaPrimary: "Découvrir mes projets",
    ctaSecondary: "Me contacter",
    // Visuel principal, au centre, qui passe devant le bas du titre.
    // Idéal : PNG ou WebP détouré (fond transparent), format carré.
    main: {
      src: "",
      alt: "",            // Décrivez le visuel s'il est porteur de sens.
      fit: "contain",
      position: "50% 100%",
      placeholder: "assets/placeholders/hero-main.svg",
      hidden: false
    },
    // Élément décoratif gauche (derrière le titre). Format portrait conseillé.
    left: {
      src: "",
      fit: "contain",
      position: "50% 50%",
      placeholder: "assets/placeholders/hero-left.svg",
      hidden: false
    },
    // Élément décoratif droit (devant le bord du titre).
    right: {
      src: "",
      fit: "contain",
      position: "50% 50%",
      placeholder: "assets/placeholders/hero-right.svg",
      hidden: false
    },
    // Élément de premier plan (facultatif), en bas à droite du visuel principal.
    foreground: {
      src: "",
      fit: "contain",
      position: "50% 50%",
      placeholder: "assets/placeholders/hero-foreground.svg",
      hidden: false
    }
  },

  /* ------------------------------------------------------------------
     6. À PROPOS — photo ou visuel (format portrait 4:5 conseillé)
     ------------------------------------------------------------------ */
  about: {
    title: "À propos",
    photo: {
      src: "",
      alt: "[Description de la photo — ex. Portrait de Nom Prénom]",
      fit: "cover",
      position: "50% 30%",
      placeholder: "assets/placeholders/portrait.svg"
    }
  },

  /* ------------------------------------------------------------------
     7. PROJETS
     - "id" : identifiant unique, sans espace ni accent (ex. "refonte-site").
     - L'ordre du tableau = l'ordre d'affichage. La mise en page
       asymétrique (grands / petits formats) suit cet ordre.
     - Les filtres par catégorie apparaissent automatiquement dès qu'il
       existe au moins deux catégories différentes.
     - "result" et "link" sont facultatifs : laissés vides, ils ne sont
       pas affichés.
     - Les six projets ci-dessous sont des CONTENUS DE DÉMONSTRATION
       à remplacer.
     ------------------------------------------------------------------ */
  projects: [
    {
      id: "projet-01",
      title: "[Titre du projet 1]",
      category: "[Catégorie A]",
      year: "[Année]",
      summary: "[Description courte du projet en une phrase.]",
      cover: {
        src: "",          // ex. "assets/images/projets/projet-01/couverture.jpg"
        alt: "[Description de l'image de couverture du projet 1]",
        fit: "cover",
        position: "50% 50%",
        placeholder: "assets/placeholders/project-01.svg"
      },
      gallery: [
        { src: "", alt: "[Description de l'image 1 du projet 1]", fit: "cover", position: "50% 50%", placeholder: "assets/placeholders/project-02.svg" },
        { src: "", alt: "[Description de l'image 2 du projet 1]", fit: "cover", position: "50% 50%", placeholder: "assets/placeholders/project-03.svg" }
      ],
      context: "[Contexte : pour qui, dans quel cadre, quel besoin.]",
      role: "[Votre rôle dans le projet.]",
      tools: ["[Outil 1]", "[Outil 2]"],
      approach: "[Démarche : les étapes, les choix, les contraintes.]",
      result: "",         // Uniquement si vous le renseignez.
      link: { url: "", label: "Voir le projet en ligne" }
    },
    {
      id: "projet-02",
      title: "[Titre du projet 2]",
      category: "[Catégorie B]",
      year: "[Année]",
      summary: "[Description courte du projet en une phrase.]",
      cover: { src: "", alt: "[Description de l'image de couverture du projet 2]", fit: "cover", position: "50% 50%", placeholder: "assets/placeholders/project-02.svg" },
      gallery: [
        { src: "", alt: "[Description de l'image 1 du projet 2]", fit: "cover", position: "50% 50%", placeholder: "assets/placeholders/project-04.svg" }
      ],
      context: "[Contexte du projet.]",
      role: "[Votre rôle.]",
      tools: ["[Outil 1]", "[Outil 2]", "[Outil 3]"],
      approach: "[Démarche.]",
      result: "",
      link: { url: "", label: "Voir le projet en ligne" }
    },
    {
      id: "projet-03",
      title: "[Titre du projet 3]",
      category: "[Catégorie A]",
      year: "",
      summary: "[Description courte du projet en une phrase.]",
      cover: { src: "", alt: "[Description de l'image de couverture du projet 3]", fit: "cover", position: "50% 50%", placeholder: "assets/placeholders/project-03.svg" },
      gallery: [
        { src: "", alt: "[Description de l'image 1 du projet 3]", fit: "cover", position: "50% 50%", placeholder: "assets/placeholders/project-05.svg" },
        { src: "", alt: "[Description de l'image 2 du projet 3]", fit: "cover", position: "50% 50%", placeholder: "assets/placeholders/project-06.svg" }
      ],
      context: "[Contexte du projet.]",
      role: "[Votre rôle.]",
      tools: ["[Outil 1]"],
      approach: "[Démarche.]",
      result: "",
      link: { url: "", label: "Voir le projet en ligne" }
    },
    {
      id: "projet-04",
      title: "[Titre du projet 4]",
      category: "[Catégorie C]",
      year: "[Année]",
      summary: "[Description courte du projet en une phrase.]",
      cover: { src: "", alt: "[Description de l'image de couverture du projet 4]", fit: "cover", position: "50% 50%", placeholder: "assets/placeholders/project-04.svg" },
      gallery: [],
      context: "[Contexte du projet.]",
      role: "[Votre rôle.]",
      tools: ["[Outil 1]", "[Outil 2]"],
      approach: "[Démarche.]",
      result: "",
      link: { url: "", label: "Voir le projet en ligne" }
    },
    {
      id: "projet-05",
      title: "[Titre du projet 5]",
      category: "[Catégorie B]",
      year: "[Année]",
      summary: "[Description courte du projet en une phrase.]",
      cover: { src: "", alt: "[Description de l'image de couverture du projet 5]", fit: "cover", position: "50% 50%", placeholder: "assets/placeholders/project-05.svg" },
      gallery: [
        { src: "", alt: "[Description de l'image 1 du projet 5]", fit: "cover", position: "50% 50%", placeholder: "assets/placeholders/project-01.svg" }
      ],
      context: "[Contexte du projet.]",
      role: "[Votre rôle.]",
      tools: ["[Outil 1]", "[Outil 2]"],
      approach: "[Démarche.]",
      result: "",
      link: { url: "", label: "Voir le projet en ligne" }
    },
    {
      id: "projet-06",
      title: "[Titre du projet 6]",
      category: "[Catégorie C]",
      year: "",
      summary: "[Description courte du projet en une phrase.]",
      cover: { src: "", alt: "[Description de l'image de couverture du projet 6]", fit: "cover", position: "50% 50%", placeholder: "assets/placeholders/project-06.svg" },
      gallery: [],
      context: "[Contexte du projet.]",
      role: "[Votre rôle.]",
      tools: ["[Outil 1]"],
      approach: "[Démarche.]",
      result: "",
      link: { url: "", label: "Voir le projet en ligne" }
    }
  ],

  /* ------------------------------------------------------------------
     8. COMPÉTENCES / DOMAINES D'INTERVENTION
     Un groupe = un domaine. Ajoutez, retirez ou réordonnez librement.
     ------------------------------------------------------------------ */
  skills: [
    { domain: "[Domaine 1]", items: ["[Compétence]", "[Compétence]", "[Compétence]"] },
    { domain: "[Domaine 2]", items: ["[Compétence]", "[Compétence]", "[Compétence]"] },
    { domain: "[Domaine 3]", items: ["[Compétence]", "[Compétence]"] },
    { domain: "[Outils]",    items: ["[Outil]", "[Outil]", "[Outil]", "[Outil]"] }
  ],

  /* ------------------------------------------------------------------
     9. ANIMATIONS
     enabled  : false = aucune animation (le contenu reste identique).
     parallax : léger décalage des éléments décoratifs de l'accueil au
                défilement (désactivé automatiquement sur mobile et si
                l'utilisateur a demandé la réduction des animations).
     ------------------------------------------------------------------ */
  animations: {
    enabled: true,
    parallax: true
  },

  /* ------------------------------------------------------------------
     10. AFFICHAGE DES INDICATIONS DE REMPLISSAGE
     true  : affiche une mention discrète lorsque l'e-mail ou les liens
             ne sont pas encore renseignés (utile pendant la préparation).
     false : n'affiche rien (à utiliser une fois le site finalisé).
     ------------------------------------------------------------------ */
  showPlaceholderHints: true
};
