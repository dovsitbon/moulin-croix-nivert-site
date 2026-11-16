# Le Moulin de la Croix Nivert : contenu du site

Tous les textes et la carte, pour validation. Ce qui est marqué « À REMPLIR » ou « à confirmer » manque encore : voir INFOS-A-DEMANDER.md.

Relevé le 2026-11-16 à partir de sa fiche Google (4.5/5, 743 avis, catégorie « Boulangerie », gamme 1–10 €) et des photos qui y sont publiées : façade (store « Maison Boullier », affichettes « Horaires » et « Salon de thé · Sandwichs · Salades · Snacking · Macarons · Pièces montées · Pain Nordik », autocollants « Artisan », « Boulanger de France », « Carte Titre-Restaurant »), étiquettes de la vitrine, ardoises des formules et des boissons. Aucun Instagram trouvé ; SIRET relevé sur l'annuaire SIRENE.

Les textes se corrigent dans `locales/fr.json` et `locales/en.json` ; la carte dans `data/carte.json` ; les horaires dans `data/horaires.json` ; le bandeau dans `data/annonces.json` ; les saisons dans `data/saisons.json`. Puis `npm run contenu` pour régénérer ce fichier.

## Titre du hero : trois propositions

1. **« Le bon pain de la Croix Nivert. »** (retenu) : simple, local, et c'est la baguette que citent le plus les avis.
2. « Baguette tradition et pur beurre. » : à n'utiliser que si toutes les viennoiseries sont au beurre (l'étiquette du « croissant ordinaire » mentionne de la margarine).
3. « Votre boulangerie, du matin au soir. » : met en avant l'amplitude, 7 h – 20 h 30.

## Référencement (balises title et description)

- **Title de l'accueil**
  - FR : Boulangerie à Paris 15, rue de la Croix Nivert | Le Moulin de la Croix Nivert
  - EN : Bakery in Paris 15, rue de la Croix Nivert | Le Moulin de la Croix Nivert
- **Description de l'accueil**
  - FR : Le Moulin de la Croix Nivert, boulangerie-pâtisserie au 39 rue de la Croix Nivert, Paris 15, près de Cambronne. Baguette tradition, viennoiseries, flan, quiches, galettes des rois. Ouvert jusqu'à 20 h 30.
  - EN : Le Moulin de la Croix Nivert, a neighbourhood bakery at 39 rue de la Croix Nivert, Paris 15, near Cambronne. Baguette tradition, croissants, flan, quiches, king cakes. Open until 8:30 pm.
- **Title · La carte**
  - FR : Carte et prix : pains, viennoiseries, flan, quiches | Le Moulin de la Croix Nivert, Paris 15
  - EN : Menu and prices: bread, pastries, flan, quiche | Le Moulin de la Croix Nivert, Paris 15
- **Description · La carte**
  - FR : La carte de la boulangerie Le Moulin de la Croix Nivert : baguette tradition, croissants, pains au chocolat, flan, éclairs, quiches, formules du midi, galettes des rois. Prix et commande à retirer.
  - EN : The menu at Le Moulin de la Croix Nivert bakery: baguette tradition, croissants, pains au chocolat, flan, éclairs, quiches, lunch deals, king cakes. Prices and click & collect.
- **Title · Commander**
  - FR : Commander à retirer en boutique | Le Moulin de la Croix Nivert, Paris 15
  - EN : Order for collection | Le Moulin de la Croix Nivert, Paris 15
- **Description · Commander**
  - FR : Commandez vos pains, viennoiseries, quiches, gâteaux et galettes des rois au Moulin de la Croix Nivert, 39 rue de la Croix Nivert. Choisissez l'heure de retrait, payez en boutique.
  - EN : Order bread, pastries, quiches, cakes and king cakes from Le Moulin de la Croix Nivert, 39 rue de la Croix Nivert. Choose your collection time, pay in store.
- **Title · Plateaux entreprises**
  - FR : Plateaux viennoiseries et mini-quiches pour le bureau | Boulangerie Paris 15, Le Moulin de la Croix Nivert
  - EN : Pastry and mini quiche platters for the office | Paris 15 bakery, Le Moulin de la Croix Nivert
- **Description · Plateaux entreprises**
  - FR : Petit-déjeuner d'équipe, réunion ou pot de départ dans le 15e : demandez vos plateaux de viennoiseries, mini-quiches, sandwichs et pâtisseries au Moulin de la Croix Nivert.
  - EN : Team breakfast, meeting or leaving drinks in the 15th: request platters of pastries, mini quiches, sandwiches and cakes from Le Moulin de la Croix Nivert.
- **Title · Boulangerie Paris 15**
  - FR : Boulangerie Paris 15 : baguette tradition, viennoiseries, flan | Le Moulin de la Croix Nivert
  - EN : Bakery in Paris 15: baguette tradition, pastries, flan | Le Moulin de la Croix Nivert
- **Description · Boulangerie Paris 15**
  - FR : Boulangerie-pâtisserie du 15e arrondissement, rue de la Croix Nivert : baguette tradition, viennoiseries, flan, quiches, gâteaux sur commande. Ouvert jusqu'à 20 h 30, 4,5/5 sur Google.
  - EN : A neighbourhood bakery in Paris's 15th arrondissement, rue de la Croix Nivert: baguette tradition, croissants, flan, quiches, cakes to order. Open until 8:30 pm, rated 4.5/5 on Google.
- **Title · Boulangerie Cambronne**
  - FR : Boulangerie près du métro Cambronne : Le Moulin de la Croix Nivert, Paris 15
  - EN : Bakery near Cambronne metro: Le Moulin de la Croix Nivert, Paris 15
- **Description · Boulangerie Cambronne**
  - FR : Boulangerie à 5 minutes du métro Cambronne (ligne 6), au 39 rue de la Croix Nivert : baguette tradition, viennoiseries, quiches et formules du midi, ouvert jusqu'à 20 h 30.
  - EN : A bakery 5 minutes from Cambronne metro (line 6), at 39 rue de la Croix Nivert: baguette tradition, pastries, quiches and lunch deals, open until 8:30 pm.
- **Title · Mentions légales**
  - FR : Mentions légales | Le Moulin de la Croix Nivert
  - EN : Legal notice | Le Moulin de la Croix Nivert
- **Description · Mentions légales**
  - FR : Mentions légales du site du Moulin de la Croix Nivert, boulangerie au 39 rue de la Croix Nivert, Paris 15.
  - EN : Legal notice for the website of Le Moulin de la Croix Nivert, a bakery at 39 rue de la Croix Nivert, Paris 15.

## Bandeau du haut

- **Par défaut** : Ouvert jusqu'à 20 h 30, du mardi au samedi · le dimanche de 7 h à 14 h / Open until 8:30 pm, Tuesday to Saturday · Sundays 7 am to 2 pm
- **galettes-2027** (du 2026-12-15 au 2027-01-31) : Galettes des rois : commandez dès maintenant, à retirer en boutique. / King cakes (galettes des rois): order now, collect in store.

## Accueil

- **Petite ligne**
  - FR : Boulangerie · Pâtisserie · Rue de la Croix Nivert
  - EN : Bakery · Pâtisserie · Rue de la Croix Nivert
- **Titre**
  - FR : Le bon pain de la Croix Nivert.
  - EN : Good bread on the Croix Nivert.
- **Sous-titre**
  - FR : Baguette tradition, viennoiseries bien dorées, flan et quiches. Du mardi au samedi, jusqu'à 20 h 30.
  - EN : Baguette tradition, golden pastries, flan and quiches. Tuesday to Saturday, until 8:30 pm.
- **Boutons**
  - FR : Voir nos produits · Itinéraire
  - EN : See our bakes · Directions

### Tuiles

- **pains**
  - FR : Pains & baguettes
  - EN : Bread & baguettes
- **viennoiseries**
  - FR : Viennoiseries
  - EN : Pastries
- **patisseries**
  - FR : Flans & pâtisseries
  - EN : Flan & cakes
- **snacking**
  - FR : Quiches & snacking
  - EN : Quiche & lunch
- **gateaux**
  - FR : Gâteaux sur commande
  - EN : Cakes to order

### Services (4 pictos)

- **Picto 1**
  - FR : Fait maison, chaque jour — Pains, viennoiseries et gâteaux sortent du fournil.
  - EN : Baked here, every day — Bread, pastries and cakes come straight from our ovens.
- **Picto 2**
  - FR : Ouvert jusqu'à 20 h 30 — Du mardi au samedi. Le dimanche, jusqu'à 14 h.
  - EN : Open until 8:30 pm — Tuesday to Saturday. Sundays until 2 pm.
- **Picto 3**
  - FR : Le midi — Quiches, sandwichs et formules à emporter.
  - EN : Lunchtime — Quiches, sandwiches and set menus to take away.
- **Picto 4**
  - FR : Sur commande — Gâteaux, galettes, plateaux pour le bureau.
  - EN : To order — Cakes, king cakes, office platters.

### Carte (intro)

- **Titre**
  - FR : Ce qui sort du four.
  - EN : Fresh out of the oven.
- **Texte**
  - FR : Ajoutez à votre commande, choisissez l'heure, passez prendre. Les prix sont ceux de la boutique.
  - EN : Add to your order, pick a time, collect in store. Prices are the shop's own.
- **Gâteaux sur commande**
  - FR : Les gâteaux se commandent au moins 48 heures à l'avance, les galettes la veille. Pour une pièce montée ou un gâteau d'anniversaire, appelez-nous : on en parle ensemble.
  - EN : Cakes need at least 48 hours' notice, king cakes the day before. For a croquembouche or a birthday cake, give us a call and we'll talk it through.

### Blocs alternés

- **Bloc 1 · titre**
  - FR : La tradition, croustillante jusqu'au soir.
  - EN : The tradition, crackling until closing time.
- **Bloc 1 · texte**
  - FR : On vient pour elle le matin, on repasse en rentrant du travail. Croûte dorée, mie crème, et des fournées jusqu'à la fermeture. À côté : le pain Nordik aux graines et de grosses brioches pour le week-end.
  - EN : People come for it in the morning and stop by again on the way home. Golden crust, creamy crumb, and fresh batches until we close. Alongside it: seeded Nordik bread and big brioches for the weekend.
- **Bloc 1 · bouton**
  - FR : Voir les pains
  - EN : See the bread
- **Bloc 2 · titre**
  - FR : Du beurre, du feuilletage, et le flan.
  - EN : Butter, flaky layers, and the flan.
- **Bloc 2 · texte**
  - FR : Croissant, pain au chocolat, croissant framboise rayé de rouge, pain aux raisins. Et le flan pâtissier, haut et tremblant, que les habitués prennent à la part ou entier.
  - EN : Croissant, pain au chocolat, red-striped raspberry croissant, pain aux raisins. And the flan pâtissier, tall and wobbly, which regulars buy by the slice or whole.
- **Bloc 2 · bouton**
  - FR : Voir les viennoiseries
  - EN : See the pastries
- **Bloc 3 · titre**
  - FR : Une quiche, un sandwich, et on y retourne.
  - EN : A quiche, a sandwich, back to work.
- **Bloc 3 · texte**
  - FR : Pour ceux qui travaillent dans le quartier : quiches, sandwichs sur baguette, croque-monsieur et formules avec boisson. Commandez avant, c'est prêt quand vous passez.
  - EN : For everyone working nearby: quiches, baguette sandwiches, croque-monsieur and set menus with a drink. Order ahead and it's ready when you arrive.
- **Bloc 3 · bouton**
  - FR : Voir les formules
  - EN : See the set menus

### Commandes

- **Titre**
  - FR : Pour les grandes occasions, et les petites.
  - EN : For big occasions, and small ones.
- **Intro**
  - FR : Un anniversaire, l'Épiphanie, une réunion d'équipe : passez commande, on prépare, vous retirez en boutique.
  - EN : A birthday, Epiphany, a team meeting: place your order, we bake it, you collect it in store.
- **Carte 1**
  - FR : Gâteaux — Forêt-noire, pièces montées et autres gâteaux sur demande. 48 heures à l'avance.
  - EN : Cakes — Black Forest, croquembouches and other cakes on request. 48 hours' notice.
- **Carte 2**
  - FR : Galettes des rois — Frangipane et pâte feuilletée, de 4 à 8 parts, et la couronne briochée aux fruits confits.
  - EN : King cakes — Frangipane in puff pastry, serving 4 to 8, plus the brioche crown with candied fruit.
- **Carte 3**
  - FR : Plateaux pour le bureau — Viennoiseries, mini-quiches, sandwichs : dites-nous combien vous serez.
  - EN : Office platters — Pastries, mini quiches, sandwiches: tell us how many of you there will be.

### Avis

- **Titre**
  - FR : Ce qu'en dit le quartier.
  - EN : What the neighbourhood says.
- **Intro**
  - FR : {value}/5 sur Google, {count} avis. La baguette, les viennoiseries et le flan reviennent souvent. On reprendra ici, avec leur accord, quelques mots de clients.
  - EN : {value}/5 on Google, {count} reviews. The baguette, the pastries and the flan come up again and again. With their permission, we'll share a few customers' words here.

Aucun avis inventé : trois emplacements vides `<!-- À REMPLIR avec de vrais avis clients -->` en attendant `data/avis.json` (avis Google recopiés avec l'accord de la boulangerie et de leurs auteurs).

### Infos pratiques

- **Métro**
  - FR : Cambronne (Ligne 6, 5 min à pied) ; Commerce (Ligne 8, 5 min à pied) ; La Motte-Picquet–Grenelle (Lignes 6, 8, 10, 6 min à pied)
  - EN : Cambronne (Line 6, 5 min walk) ; Commerce (Line 8, 5 min walk) ; La Motte-Picquet–Grenelle (Lines 6, 8, 10, 6 min walk)
- **Salon de thé**
  - FR : Quelques tables pour un café et une viennoiserie, ou la formule petit-déjeuner.
  - EN : A few tables for a coffee and a croissant, or the breakfast deal.

### FAQ

- **Q1**
  - FR : Quels sont vos horaires ?
  - EN : What are your opening hours?
- **R1**
  - FR : Du mardi au samedi de 7 h à 20 h 30, le dimanche de 7 h à 14 h. Fermé le lundi. Les fermetures exceptionnelles et les congés sont annoncés en haut du site.
  - EN : Tuesday to Saturday, 7 am to 8:30 pm; Sunday, 7 am to 2 pm. Closed on Mondays. Holidays and exceptional closures are announced at the top of the site.
- **Q2**
  - FR : Combien de temps à l'avance faut-il commander ?
  - EN : How far ahead should I order?
- **R2**
  - FR : Pour les pains, viennoiseries et quiches, commandez en ligne au moins 30 minutes avant de passer. Les gâteaux se commandent 48 heures à l'avance, les galettes des rois la veille. Pour une pièce montée, appelez-nous le plus tôt possible.
  - EN : For bread, pastries and quiches, order online at least 30 minutes before you come. Cakes need 48 hours' notice, king cakes the day before. For a croquembouche, call us as early as you can.
- **Q3**
  - FR : Où trouver la liste des allergènes ?
  - EN : Where can I find allergen information?
- **R3**
  - FR : Les allergènes sont indiqués sur les étiquettes en vitrine. En cas d'allergie, dites-le au comptoir ou dans les remarques de votre commande : on vous répond produit par produit.
  - EN : Allergens are listed on the labels in our counter. If you have an allergy, tell us at the counter or in your order notes and we'll answer product by product.
- **Q4**
  - FR : Faites-vous des plateaux pour les bureaux ?
  - EN : Do you make platters for offices?
- **R4**
  - FR : Oui, sur demande : viennoiseries, mini-quiches, sandwichs et pâtisseries pour les petits-déjeuners d'équipe, réunions et pots. Envoyez la date et le nombre de personnes depuis la page Plateaux, on vous propose une composition et un prix.
  - EN : Yes, on request: pastries, mini quiches, sandwiches and cakes for team breakfasts, meetings and drinks. Send us the date and number of people from the Platters page and we'll suggest a selection and a price.
- **Q5**
  - FR : Quels moyens de paiement acceptez-vous ?
  - EN : How can I pay?
- **R5**
  - FR : Le paiement se fait en boutique, sur place ou au retrait de votre commande. Les titres-restaurant sont acceptés pour le snacking du midi.
  - EN : Payment is made in store, when you eat in or collect your order. Meal vouchers (titres-restaurant) are accepted for lunch items.
- **Q6**
  - FR : Peut-on manger sur place ?
  - EN : Can I eat in?
- **R6**
  - FR : Oui, il y a quelques tables. La formule petit-déjeuner (boisson chaude, jus d'orange, viennoiserie) est à 5,20 €, la formule brunch à 11,80 €.
  - EN : Yes, there are a few tables. The breakfast deal (hot drink, orange juice, pastry) is €5.20, the brunch deal €11.80.

### Pied de page

- **Phrase**
  - FR : Boulangerie-pâtisserie de quartier, au 39 rue de la Croix Nivert. Maison Boullier.
  - EN : A neighbourhood bakery and pâtisserie at 39 rue de la Croix Nivert. Maison Boullier.

## Pages


### Boulangerie Paris 15

- **H1**
  - FR : Boulangerie à Paris 15
  - EN : Bakery in Paris 15
- **Intro**
  - FR : Une boulangerie de quartier dans le 15e, ouverte tôt et tard, avec ce qu'on attend d'elle : du bon pain, des viennoiseries dorées et des gâteaux pour le week-end.
  - EN : A neighbourhood bakery in the 15th, open early and late, with everything you'd hope for: good bread, golden pastries and cakes for the weekend.
- **§1 titre**
  - FR : La baguette tradition du 15e
  - EN : The 15th's baguette tradition
- **§1 texte**
  - FR : C'est le produit qui revient le plus dans les avis. Croûte qui craque, mie crème, et des fournées jusqu'au soir pour ceux qui rentrent tard. À côté de la tradition : la baguette, le pain Nordik aux graines, des brioches, et le pain du jour selon les fournées.
  - EN : It's the product that comes up most in our reviews. A crust that crackles, a creamy crumb, and fresh batches into the evening for people who get home late. Alongside the tradition: the classic baguette, seeded Nordik bread, brioches, and the bread of the day.
- **§2 titre**
  - FR : Viennoiseries, flan, éclairs
  - EN : Pastries, flan, éclairs
- **§2 texte**
  - FR : Croissants, pains au chocolat, pains aux raisins, croissants framboise : la vitrine du matin. L'après-midi, c'est le flan pâtissier, les éclairs, les tartelettes aux framboises et les macarons.
  - EN : Croissants, pains au chocolat, pains aux raisins, raspberry croissants: that's the morning counter. In the afternoon, it's the flan pâtissier, éclairs, raspberry tartlets and macarons.
- **§3 titre**
  - FR : Ouvert jusqu'à 20 h 30
  - EN : Open until 8:30 pm
- **§3 texte**
  - FR : Du mardi au samedi, de 7 h à 20 h 30. Le dimanche, de 7 h à 14 h. Fermé le lundi. Pour ne pas attendre, commandez en ligne et passez prendre à l'heure choisie.
  - EN : Tuesday to Saturday, 7 am to 8:30 pm. Sunday, 7 am to 2 pm. Closed on Mondays. To skip the queue, order online and collect at the time you choose.

### Boulangerie Cambronne

- **H1**
  - FR : Boulangerie à Cambronne
  - EN : Bakery near Cambronne
- **Intro**
  - FR : À quelques minutes du métro Cambronne, dans le bas de la rue de la Croix Nivert. Le pain du matin, le déjeuner du midi, la baguette du soir.
  - EN : A few minutes from Cambronne metro, at the lower end of rue de la Croix Nivert. Morning bread, lunch at midday, a baguette for dinner.
- **§1 titre**
  - FR : À la sortie du métro
  - EN : Just off the metro
- **§1 texte**
  - FR : Depuis la station Cambronne (ligne 6), comptez environ cinq minutes à pied. Les stations Commerce (ligne 8) et La Motte-Picquet–Grenelle (lignes 6, 8, 10) sont à peu près à la même distance.
  - EN : From Cambronne station (line 6), it's about a five-minute walk. Commerce (line 8) and La Motte-Picquet–Grenelle (lines 6, 8, 10) are roughly the same distance.
- **§2 titre**
  - FR : Le midi, pour les bureaux du quartier
  - EN : Lunch for local offices
- **§2 texte**
  - FR : Quiches, sandwichs sur baguette, croque-monsieur et formules avec boisson, à emporter. Pour une réunion ou un petit-déjeuner d'équipe, demandez un plateau de viennoiseries ou de mini-quiches.
  - EN : Quiches, baguette sandwiches, croque-monsieur and deals with a drink, to take away. For a meeting or a team breakfast, ask for a platter of pastries or mini quiches.
- **§3 titre**
  - FR : Le matin et le soir
  - EN : Morning and evening
- **§3 texte**
  - FR : Ouverture à 7 h pour le café et la viennoiserie, fermeture à 20 h 30 pour la baguette du dîner. La formule petit-déjeuner est à 5,20 €.
  - EN : We open at 7 am for coffee and a croissant, and close at 8:30 pm for the dinner baguette. The breakfast deal is €5.20.

### Plateaux entreprises

- **H1**
  - FR : Plateaux pour les entreprises
  - EN : Platters for businesses
- **Intro**
  - FR : Viennoiseries, mini-quiches, sandwichs et pâtisseries pour vos équipes. Donnez-nous la date et le nombre de personnes, on vous propose le reste.
  - EN : Pastries, mini quiches, sandwiches and cakes for your team. Give us the date and the number of people, we'll suggest the rest.

### Commander

- **H1**
  - FR : Commander
  - EN : Order
- **Intro**
  - FR : Votre commande, le jour et l'heure de retrait, votre nom : c'est tout. Paiement en boutique quand vous passez.
  - EN : Your order, a collection day and time, your name: that's all. Pay in store when you come by.

### Plateaux : formulaire

- **Points**
  - FR : Viennoiseries classiques ou mini-viennoiseries ; Mini-quiches, sandwichs, pâtisseries à partager ; Retrait en boutique, livraison dans le quartier à voir ensemble
  - EN : Classic pastries or mini pastries ; Mini quiches, sandwiches, cakes to share ; Collection in store, local delivery to discuss
- **Occasions**
  - FR : Petit-déjeuner d'équipe, Déjeuner, Réunion, séminaire, Pot, anniversaire, Autre
  - EN : Team breakfast, Lunch, Meeting, seminar, Drinks, birthday, Other
- **Souhaits**
  - FR : Viennoiseries, Mini-viennoiseries, Mini-quiches, Sandwichs, Pâtisseries, Jus d'orange
  - EN : Pastries, Mini pastries, Mini quiches, Sandwiches, Cakes & tarts, Orange juice

## La carte

Prix relevés le 2026-11-16 sur les étiquettes et ardoises visibles sur les photos de la fiche Google. « à confirmer » : article ou recette deviné d'après une photo.

### Pains / Bread

| Article | Prix | Description (FR) | Description (EN) | Notes |
|---|---|---|---|---|
| Baguette tradition / Baguette tradition | **À REMPLIR** | Croûte qui chante, mie crème et alvéolée. Celle qu'on vient chercher le soir. | Crackling crust, creamy open crumb. The one people queue for in the evening. | incontournable · photo : /media/pains/baguette-tradition.jpg |
| Baguette / Baguette | **À REMPLIR** | La baguette de tous les jours, pour le petit-déjeuner et les sandwichs. | The everyday baguette, for breakfast and sandwiches. | à confirmer · photo : /media/pains/baguette.jpg |
| Pain Nordik / Nordik bread | **À REMPLIR** | Le pain aux graines annoncé sur la vitrine. Dense, parfumé, il se garde bien. | The seeded loaf named on our shop window. Dense, fragrant, keeps well. | photo : /media/pains/pain-nordik.jpg |
| Brioche / Brioche | **À REMPLIR** | Grosse brioche dorée, à partager au petit-déjeuner du week-end. | A big golden brioche, for sharing at a weekend breakfast. | à confirmer |

### Viennoiseries / Pastries

| Article | Prix | Description (FR) | Description (EN) | Notes |
|---|---|---|---|---|
| Croissant au beurre / Butter croissant | **À REMPLIR** | Feuilleté, doré, croustillant dehors et fondant dedans. | Flaky and golden, crisp outside, tender inside. | à confirmer · incontournable · photo : /media/viennoiseries/panier-cafes.jpg |
| Pain au chocolat / Pain au chocolat | **À REMPLIR** | Deux barres de chocolat dans une pâte feuilletée bien cuite. Le favori des avis. | Two bars of chocolate in well-baked flaky pastry. The reviewers' favourite. | incontournable · photo : /media/viennoiseries/pain-au-chocolat.jpg |
| Croissant / Croissant | 1,25 € | Le croissant classique, pour le café du matin au comptoir. | The classic croissant, for a morning coffee at the counter. | à confirmer · photo : /media/facade/terrasse.jpg |
| Croissant framboise / Raspberry croissant | 1,75 € | Croissant rayé de rouge, garni à la framboise. Il se voit de loin dans la vitrine. | Red-striped croissant with a raspberry filling. You'll spot it across the shop. | photo : /media/viennoiseries/croissant-framboise.jpg |
| Pain aux raisins / Pain aux raisins | 1,55 € | Spirale de pâte feuilletée, crème pâtissière et raisins. | A spiral of flaky pastry, custard and raisins. | photo : /media/viennoiseries/pain-aux-raisins.jpg |
| Cruffin à la crème / Cream cruffin | **À REMPLIR** | Pâte à croissant roulée en spirale, sucrée, garnie de crème. | Croissant dough rolled into a spiral, sugared and cream-filled. | à confirmer · photo : /media/viennoiseries/cruffin.jpg |
| Chausson aux pommes / Apple turnover | **À REMPLIR** | Feuilleté rayé, compote de pommes. | Scored puff pastry, apple compote inside. | à confirmer · photo : /media/viennoiseries/chausson-aux-pommes.jpg |

### Pâtisseries / Cakes & tarts

| Article | Prix | Description (FR) | Description (EN) | Notes |
|---|---|---|---|---|
| Flan pâtissier / Flan pâtissier | **À REMPLIR** | Haut, tremblant, bien vanillé, sur une pâte croustillante. Un des plus cités par les clients. | Tall, wobbly and full of vanilla, on a crisp crust. One of our customers' favourites. | incontournable · photo : /media/patisseries/flan.jpg |
| Éclair / Éclair | **À REMPLIR** | Pâte à choux, crème pâtissière, glaçage brillant. Au chocolat ou au café. | Choux pastry, custard, glossy icing. Chocolate or coffee. | photo : /media/patisseries/vitrine-eclairs.jpg |
| Tarte aux pommes / Apple tart | 3,10 € | Pommes en rosace sur compote, pâte feuilletée. | Apple slices fanned over compote, on puff pastry. | photo : /media/patisseries/tartes-pommes-foret-noire.jpg |
| Tartelette framboise / Raspberry tartlet | **À REMPLIR** | Framboises entières sur crème, pâte sablée. | Whole raspberries on cream, shortcrust base. | photo : /media/patisseries/tarte-framboise.jpg |
| Macarons / Macarons | **À REMPLIR** | Pistache, framboise, citron, vanille, chocolat : choisissez vos couleurs. | Pistachio, raspberry, lemon, vanilla, chocolate: pick your colours. | photo : /media/patisseries/macarons.jpg |
| Meringue / Meringue | 1,00 € | Blanc d'œuf et sucre, croquante dehors. | Egg white and sugar, crisp on the outside. | photo : /media/patisseries/meringue.jpg |

### Snacking & formules / Lunch & set menus

| Article | Prix | Description (FR) | Description (EN) | Notes |
|---|---|---|---|---|
| Quiche / Quiche | **À REMPLIR** | Pâte brisée, appareil généreux. La lorraine, et les garnitures du jour. | Shortcrust pastry, generous filling. Quiche lorraine and the day's specials. | incontournable · photo : /media/snacking/quiche.jpg |
| Sandwich baguette / Baguette sandwich | **À REMPLIR** | Préparé le matin, sur baguette de la maison. | Made in the morning, on our own baguette. | photo : /media/snacking/vitrine-fraiche.jpg |
| Croque-monsieur / Croque-monsieur | **À REMPLIR** | Jambon, fromage, béchamel, doré au four. | Ham, cheese and béchamel, baked golden. | photo : /media/snacking/croque-monsieur.jpg |
| Salade / Salad | **À REMPLIR** | En barquette, prête à emporter pour le déjeuner. | In a takeaway tub, ready for lunch. | à confirmer · photo : /media/snacking/salade.jpg |
| Formule sandwich / Sandwich deal | 8,50 € | Un sandwich et une boisson au choix (canette 33 cl ou eau 50 cl). | A sandwich and a drink of your choice (33 cl can or 50 cl water). | à confirmer · pas de commande en ligne |
| Formule quiche / Quiche deal | 9,00 € | Une part de quiche et une boisson au choix (canette 33 cl ou eau 50 cl). | A slice of quiche and a drink of your choice (33 cl can or 50 cl water). | à confirmer · pas de commande en ligne |
| Formule petit-déjeuner / Breakfast deal | 5,20 € | Une boisson chaude, un jus d'orange 20 cl et une viennoiserie : croissant, pain au chocolat ou brioche. | A hot drink, a 20 cl orange juice and a pastry: croissant, pain au chocolat or brioche. | pas de commande en ligne |
| Formule brunch / Brunch deal | 11,80 € | Boisson chaude, jus d'orange 20 cl, deux viennoiseries ou deux tartines beurre-confiture, puis une quiche, un feuilleté ou un croque-monsieur. | Hot drink, 20 cl orange juice, two pastries or two buttered baguette halves with jam, then a quiche, a savoury puff or a croque-monsieur. | pas de commande en ligne · photo : /media/viennoiseries/panier-cappuccinos.jpg |

### Gâteaux sur commande / Cakes to order

| Article | Prix | Description (FR) | Description (EN) | Notes |
|---|---|---|---|---|
| Galette des rois, 4 parts / King cake, serves 4 | 19,00 € | Pâte feuilletée, frangipane, la fève et la couronne. | Puff pastry, almond frangipane, the charm and the paper crown. | 24 h à l'avance · saison : galettes · photo : /media/patisseries/galettes-des-rois.jpg |
| Galette des rois, 6 parts / King cake, serves 6 | 28,00 € | Pâte feuilletée, frangipane, la fève et la couronne. | Puff pastry, almond frangipane, the charm and the paper crown. | 24 h à l'avance · saison : galettes · photo : /media/patisseries/galettes-des-rois.jpg |
| Galette des rois, 8 parts / King cake, serves 8 | 38,00 € | Pâte feuilletée, frangipane, la fève et la couronne. | Puff pastry, almond frangipane, the charm and the paper crown. | 24 h à l'avance · saison : galettes · photo : /media/patisseries/galettes-des-rois.jpg |
| Couronne des rois / Brioche king cake | 16,00 € | Brioche en couronne, fruits confits et sucre perlé. | Brioche ring with candied fruit and pearl sugar. | 24 h à l'avance · saison : galettes · photo : /media/patisseries/couronne-des-rois.jpg |
| Forêt-noire / Black Forest gâteau | à partir de 23,00 € | Génoise au chocolat, chantilly, cerises, grands copeaux de chocolat. Deux tailles. | Chocolate sponge, whipped cream, cherries, big chocolate curls. Two sizes. | à confirmer · 48 h à l'avance · photo : /media/patisseries/foret-noire.jpg |
| Pièce montée / Croquembouche | **À REMPLIR** | Pour un mariage, un baptême, une communion. Sur devis : appelez-nous ou passez en boutique. | For weddings, christenings and communions. Quoted on request: call us or drop by. | pas de commande en ligne · photo : /media/patisseries/piece-montee.jpg |

### Boissons chaudes / Hot drinks

| Article | Prix | Description (FR) | Description (EN) | Notes |
|---|---|---|---|---|
| Café expresso / Espresso | 1,75 € | Servi dans les tasses Cafés Richard. | Served in Cafés Richard cups. | pas de commande en ligne |
| Double expresso / Double espresso | 3,50 € | — | — | pas de commande en ligne |
| Café noisette / Café noisette | 1,85 € | Un expresso, un nuage de lait. | An espresso with a dash of milk. | pas de commande en ligne |
| Grand crème / Grand crème | 2,80 € | — | A large white coffee. | pas de commande en ligne |
| Cappuccino / Cappuccino | **À REMPLIR** | — | — | pas de commande en ligne |
| Chocolat chaud / Hot chocolate | **À REMPLIR** | — | — | pas de commande en ligne |
| Thé ou infusion / Tea or herbal tea | **À REMPLIR** | — | — | pas de commande en ligne |

## Saisons

- **Galettes des rois** : commandes en ligne du 2026-12-01 au 2027-01-31, retrait du 2026-12-26 au 2027-01-31.

## Horaires (data/horaires.json)

- Lundi : fermé
- Mardi : 07:00 – 20:30
- Mercredi : 07:00 – 20:30
- Jeudi : 07:00 – 20:30
- Vendredi : 07:00 – 20:30
- Samedi : 07:00 – 20:30
- Dimanche : 07:00 – 14:00

⚠ L'affichette en vitrine (photo de la façade) dit « Fermé dimanche et lundi » ; la fiche Google indique le dimanche 7 h – 14 h. À trancher avec le boulanger.

## Coordonnées

- Téléphone : 01 47 83 30 10 (fixe : pas de WhatsApp pour l'instant)
- Adresse : 39 rue de la Croix Nivert, 75015 Paris
- SIRET : 808 380 117 00016 (Annuaire SIRENE (INSEE), établissement actif depuis le 14/01/2015 au 39 rue de la Croix Nivert : à confirmer avec le boulanger)
- E-mail : **À REMPLIR**
- Instagram : aucun trouvé
- Facebook : ancienne page « Boulangerie Boullier » liée à la fiche Google : adresse exacte à récupérer
