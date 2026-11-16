# Photos à prendre sur place

Le site utilise déjà 22 photos tirées de la fiche Google (vitrine, viennoiseries, pâtisseries, galettes, façade). Il manque surtout le pain, le flan et le snacking. Tant qu'une photo manque, le site affiche un emplacement sobre (un moulin au trait sur fond uni), jamais une fausse photo.

**Comment faire** : déposez la photo sous le nom exact ci-dessous (jpg, png ou heic), puis lancez `npm run media`. L'emplacement est remplacé tout seul, et là où une photo de la fiche Google dépanne (hero, tuiles, blocs), la nouvelle photo prend sa place.

Conseils : lumière du jour, pas de flash, produits de près, fond calme (comptoir en bois, papier kraft, panière). Format vertical 4:5 pour les produits, horizontal pour le hero. Pas de clients reconnaissables.

| Fichier | Où il apparaît | Ce qu'il faut |
|---|---|---|
| `hero/hero-tradition.jpg` | Grand visuel d'accueil (remplace la vitrine) | Baguettes tradition et croissants dorés, en horizontal, lumière du matin |
| `pains/baguette-tradition.jpg` | Tuile « Pains », bloc « La tradition », carte, page Paris 15 | Quelques traditions bien grignées, de près |
| `pains/baguette.jpg` | Carte | Baguettes dans leur panière |
| `pains/pain-nordik.jpg` | Carte | Le pain Nordik, entier et une tranche |
| `viennoiseries/chausson-aux-pommes.jpg` | Carte | Chaussons aux pommes |
| `patisseries/flan.jpg` | Tuile « Flans & pâtisseries », bloc « Viennoiseries & flan », carte | Un flan entier et une part coupée |
| `patisseries/meringue.jpg` | Carte | Les meringues |
| `patisseries/piece-montee.jpg` | Carte | Une pièce montée |
| `snacking/quiche.jpg` | Tuile « Quiches & snacking », bloc « Le midi », carte | Quiche entière et une part |
| `snacking/croque-monsieur.jpg` | Carte | Croque-monsieur |
| `snacking/salade.jpg` | Carte | Une salade en barquette |
| `snacking/plateau-bureau.jpg` | Carte « Plateaux pour le bureau », page Plateaux | Un plateau de mini-viennoiseries et mini-quiches |
| `boutique/fournil.jpg` | (réserve) | Le fournil, le four, les mains du boulanger |

Photos d'origine (fiche Google) : `assets/raw/` (doublons et photos floues écartés, personnel en caisse et passants recadrés).
