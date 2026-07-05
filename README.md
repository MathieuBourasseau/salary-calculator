# Salarium — Test technique développeur web

Calculateur de salaire brut/net : intégration HTML/CSS/JS (Partie 1), thème WordPress sur mesure (Partie 2) et plugin WordPress avec shortcode `[salary_calculator]` (Partie 3).

## Prérequis

- Node.js (récent) et npm, pour compiler le CSS Tailwind.
- [LocalWP](https://localwp.com) (ou toute stack WordPress locale équivalente : PHP 8.2+, MySQL/MariaDB, serveur web).
- WordPress (installé automatiquement par LocalWP).

## Partie 1 — Intégration HTML/CSS/JS

Fichiers à la racine du dépôt : `index.html`, `src/input.css` (source Tailwind), `dist/output.css` (compilé), `js/main.js`, `public/img/`.

### Installation et lancement

```bash
npm install
npx @tailwindcss/cli -i ./src/input.css -o ./dist/output.css --watch
```

Le fichier `index.html` peut ensuite être ouvert directement dans un navigateur (aucun serveur n'est nécessaire pour cette partie).

### Choix techniques

- **Tailwind CSS (CLI classique, sans bundler)** : autorisé par le brief, et suffisant pour ce projet (pas de composants JS complexes nécessitant Vite/Webpack).
- **JS vanilla**, séparé par responsabilité dans `js/main.js` : sélection du DOM, calcul (`updateNetFromRaw` / `updateRawFromNet`), gestion des toggles (statut/période), validation, bouton d'échange.
- **Logique du calculateur** :
  - `Net = Brut × (1 − Taux/100)` et son inverse `Brut = Net / (1 − Taux/100)`.
  - Les deux champs (brut/net) sont indépendamment éditables ; une saisie dans l'un recalcule l'autre en direct (évènement `input`).
  - Le taux de cotisation dépend du statut sélectionné (22 % non-cadre / 25 % cadre), stocké via des attributs `data-rate` sur les boutons.
  - Le mode Mensuel/Annuel multiplie ou divise les montants affichés par 12, et adapte le calcul du bloc "Sur 12 mois" selon le mode courant.
  - Le bouton central (icône "inverser brut/net") échange les deux valeurs affichées, puis relance un calcul du net à partir de la nouvelle valeur du brut.
- **Validation** : les champs vides, non numériques ou ≤ 0 déclenchent un message d'erreur dédié (`#error-container`), géré en JS.

### Limitation connue

Après un clic sur le bouton d'échange, les blocs "Cotisations" et "Sur 12 mois" ne sont pas recalculés (ils restent sur les valeurs précédentes) — limitation assumée par manque de temps. Une saisie ultérieure dans l'un des champs relance un calcul cohérent.

## Partie 2 — Thème WordPress sur mesure

Thème situé dans `wordpress/wp-content/themes/salarium/`.

### Installation

1. Créer un site local avec LocalWP.
2. Copier le dossier `wordpress/wp-content/themes/salarium/` dans `wp-content/themes/` de l'installation WordPress.
3. Dans l'admin WordPress → Apparence → Thèmes, activer "Salarium Theme".
4. La page d'intégration de la Partie 1 s'affiche alors automatiquement sur la page d'accueil du site (template `front-page.php`, reconnu nativement par WordPress sans configuration supplémentaire).

### Structure du thème

- `style.css` : en-tête obligatoire (métadonnées du thème), sans style visuel.
- `functions.php` : charge `dist/output.css` et `js/main.js` via `wp_enqueue_style`/`wp_enqueue_script`, accrochés au hook `wp_enqueue_scripts` — aucune balise `<link>`/`<script>` en dur.
- `front-page.php` : page d'accueil (reprend l'intégration de la Partie 1, chemins d'images générés via `get_template_directory_uri()`).
- `page.php` : template générique pour les autres pages (nécessaire pour que WordPress affiche le contenu réel d'une page, et donc traite les shortcodes qu'elle contient).
- `index.php` : template de secours minimal, exigé par WordPress, non développé au-delà d'un message de test (aucune page du site ne s'appuie dessus en pratique).
- `dist/`, `js/`, `public/` : copies des assets compilés de la Partie 1, à l'intérieur du thème (chemins relatifs identiques, résolus depuis la racine du thème).

### Bonus non réalisé

Aucun champ éditable via ACF ou champs natifs, faute de temps.

## Partie 3 — Plugin calculateur de salaire

Plugin situé dans `wordpress/wp-content/plugins/salary-calculator/`.

### Installation

1. Copier le dossier `wordpress/wp-content/plugins/salary-calculator/` dans `wp-content/plugins/` de l'installation WordPress.
2. Dans l'admin WordPress → Extensions, activer "Salarium - Calculateur de salaire".
3. Insérer le shortcode `[salary_calculator]` dans le contenu de n'importe quelle page ou article.

### Choix technique : logique 100 % côté serveur (PHP)

Le calcul, la récupération des données du formulaire et la validation sont entièrement gérés en PHP, sans JavaScript :

- Le shortcode (`add_shortcode`) appelle une fonction qui retourne le HTML du formulaire (via mise en mémoire tampon `ob_start()`/`ob_get_clean()`, nécessaire car une fonction de shortcode doit retourner son contenu, jamais l'afficher directement).
- La soumission du formulaire (`method="post"`) est détectée avec `isset($_POST[...])`, les valeurs sont récupérées et validées (`empty()`, `is_numeric()`, comparaison ≤ 0), avant le calcul `Net = Brut × (1 − Taux/100)`.

Ce choix (plutôt qu'une logique client ou hybride, alors qu'un calculateur JS équivalent existe déjà en Partie 1) a été fait pour les raisons suivantes :
1. Le brief évalue explicitement la "compréhension de WordPress" — une logique serveur démontre la manipulation des conventions PHP/WordPress (traitement de formulaire, validation serveur), plutôt qu'une réutilisation du JS déjà écrit.
2. Les bonus suggérés par le brief (endpoint AJAX/REST) sont présentés comme une amélioration optionnelle d'une base serveur, confirmant qu'une soumission classique est l'attendu de base.

### Limitations et bonus non réalisés

Faute de temps :
- Aucun style Tailwind appliqué au formulaire du plugin (HTML fonctionnel mais non stylé).
- Aucun formatage des nombres (séparateurs de milliers, symbole €) dans le résultat affiché.
- Aucun mode mensuel/annuel dans le plugin (contrairement à la Partie 1 JS).
- Aucun endpoint AJAX/REST.
- Aucun réglage du taux par défaut dans l'admin.

## Organisation du dépôt et workflow de développement

Le thème et le plugin sont développés directement dans ce dépôt Git (`wordpress/wp-content/...`), puis copiés manuellement vers le dossier du site LocalWP (`~/Local Sites/<nom-du-site>/app/public/wp-content/...`) pour être testés dans le navigateur — les deux emplacements se trouvent sur des systèmes de fichiers différents (dépôt en environnement Linux/WSL, LocalWP sur Windows), sans synchronisation automatique entre eux.
