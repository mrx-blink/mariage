# Site de mariage — Florie & Maxime

Site statique en HTML/CSS/JS pur (aucune installation, aucun framework).
3 fichiers seulement : `index.html`, `style.css`, `script.js`.

## Avant la mise en ligne : à personnaliser

Cherchez `⚠️` et `[À compléter]` dans `index.html` :

- **RSVP** : remplacer le `href="#"` du bouton « Confirmer ma présence » par l'URL de votre formulaire Google.
- **Liste de mariage** : remplacer le `href="#"` du bouton par l'URL de votre liste Millemerci.
- **Hébergement** : les 4 cartes sont des modèles à dupliquer/modifier avec vos vraies adresses (nom, description, lien).
- **FAQ** : les réponses entre `<em>[À compléter : ...]</em>` sont des décisions qui vous appartiennent (dress code, enfants, transport, retour d'hôtel) — remplacez le texte en italique par votre réponse.

Une fois un lien renseigné, retirez l'attribut `data-placeholder="true"` sur le `<a>` correspondant (sinon un message d'avertissement s'affiche au clic).

## Tester en local

Ouvrez simplement `index.html` dans un navigateur, ou lancez un petit serveur local :

```bash
python3 -m http.server 8000
```

puis ouvrez `http://localhost:8000`.

## Mettre en ligne avec GitHub Pages

Je n'ai pas pu accéder au dépôt `mrx-blink/mariage` (probablement privé, ou pas encore initialisé) — voici donc la marche à suivre générique :

1. Ajoutez les 3 fichiers (`index.html`, `style.css`, `script.js`) à la racine de votre dépôt.
2. Commit + push sur la branche par défaut (`main`).
3. Sur GitHub : **Settings → Pages**.
4. Dans « Build and deployment » → **Source : Deploy from a branch**.
5. **Branch : `main`**, dossier **`/ (root)`** → **Save**.
6. GitHub vous donne une URL du type `https://mrx-blink.github.io/mariage/` (disponible après 1–2 minutes).

### Nom de domaine personnalisé (optionnel)

Si vous avez un nom de domaine (ex. `florie-et-maxime.fr`) :
1. Créez un fichier `CNAME` à la racine contenant uniquement votre domaine.
2. Chez votre registrar, ajoutez un enregistrement CNAME pointant vers `mrx-blink.github.io`.
3. Renseignez le domaine dans Settings → Pages → Custom domain.

## Structure des couleurs

Chaque onglet a une couleur d'accent définie via `data-accent` (variable CSS `--accent`) :
Programme = sanguine, RSVP = cobalt, Hébergement = cinnamon, Liste = jaune, Photos = ultramarine, FAQ = rouge profond.
Pour changer l'attribution, modifiez l'attribut `data-accent` sur la `<section>` concernée dans `index.html`.
