---
name: nuova-idea
description: Prepara una nuova idea per il blog di Luca (reel + articolo in bozza) a partire dalle note del suo vault Obsidian. Usala quando Luca dice "prepara un'idea su X", "nuova idea", indica una nota del vault da trasformare in contenuto, oppure dice "pubblica" su una bozza già preparata (controlli sui dati riservati, push su main dopo il suo ok, verifica del deploy).
---

# nuova-idea

Trasforma una nota del vault in una bozza di idea per il blog: un reel (3-5 schermate) più un articolo completo, in `src/content/blog/<slug>.mdx` con `draft: true`. Luca approva ogni contenuto prima che esca.

## 0. Primo passo

Leggi `.claude/skills/nuova-idea/riservato.local.md` (file locale, ignorato da git): contiene il percorso del vault e l'elenco delle fonti vietate. Se manca, fermati e chiedi a Luca di crearlo.

## Regole di ferro

- Il vault di Luca (percorso in `riservato.local.md`) si legge, non si scrive. Mai.
- Mai `git push`, salvo richiesta esplicita di Luca. Mai bozze su branch remoti o anteprime Cloudflare.
- Anteprima solo in locale (`npm run dev`: le bozze si vedono solo in sviluppo).
- Mai inventare un numero. Una `cifra` nel reel c'è solo se la fonte ha quel numero.
- Italiano con accenti veri sempre. Niente em dash, niente virgolette caporali, solo virgolette dritte.

## 1. Fonti, in quest'ordine (sola lettura)

Le tre fonti, con i loro percorsi nel vault, sono elencate in ordine in `riservato.local.md`: la mappa delle idee, le note di sintesi pertinenti, i testi di Luca (post LinkedIn, talk, piano editoriale).

Se Luca indica una nota, parti da quella. Prima di scrivere applica il filtro qui sotto.

## 2. Filtro di riservatezza (vincolante)

- Documenti interni e di clienti elencati in `riservato.local.md`: mai usarli. Dalle schede che citano quei casi esce la tesi generalizzata, mai il caso, i numeri o le scelte di progetto. I nomi dei progetti PA sono pubblici, decisioni e dettagli tecnici no.
- Le note di sintesi sono formulazioni del vault, spesso sintesi di fonti altrui: si usano come spunto, la voce pubblicata è quella di Luca e le fonti esterne si citano.
- Nessun nome di prodotto come raccomandazione dove la funzione basta (regola globale di Luca per i documenti cliente; qui vale come buona pratica, non vincolo).
- Accenti italiani veri sempre.

Inoltre: mai nomi di clienti o decisioni interne Net7, niente contenuti personali (politica, arrampicata), nessun titolo professionale in evidenza. Se una fonte è vietata, fermati e dillo a Luca.

## 3. Voce (PRODUCT.md e piano editoriale)

- Si parte da una convinzione diffusa, spesso condivisa anche da Luca, e la si mette in discussione con evidenze nuove.
- Colloquiale ma precisa. Paragrafi brevi, ritmo irregolare, dubbi e limiti dichiarati. "Non lo so" e "forse" meglio di una conclusione finta.
- Termini tecnici inglesi quando sono quelli del lavoro (harness, reranker, evaluation set).
- La domanda finale è una domanda che Luca si fa davvero, non una CTA da engagement.
- Niente emoji, formule da marketing, "game changer", "la vera domanda è", "ecco 5 lezioni", entusiasmo obbligatorio, morali motivazionali.
- Niente imitazione meccanica dei tic: prima i ragionamenti, poi il lessico.

## 4. Protocollo contro le cazzate

Il vault orienta, non si cita come fonte.

1. La tesi nasce dal vault, da un'esperienza diretta o da una conversazione reale.
2. Ogni numero e claim esterno si verifica sulla fonte primaria (paper completo, documentazione ufficiale, repository, articolo originale), non sull'abstract.
3. I risultati dei vendor si dichiarano self-reported se non c'è replica indipendente.
4. Si nominano benchmark, dataset, metrica, baseline e condizioni. Non si generalizza da un benchmark a "l'AI".
5. Correlazione non diventa causalità.
6. Una contro-evidenza rilevante entra nell'articolo, anche se rende il pezzo meno netto.
7. Se una fonte non sostiene esattamente una frase, la frase si corregge o si toglie.
8. Fonti con autore, titolo e URL, linkate nell'articolo.
9. A Luca si consegna un fact sheet: claim, fonte, caveat, livello di confidenza.

## 5. Formato del file

`src/content/blog/<slug>.mdx`. Modello: `src/content/blog/harness-o-modello.mdx`.

```yaml
---
title: "..."
description: "..."
pubDate: AAAA-MM-GG
tags: [ai, agenti]
draft: true
reel:
  - stazione: tesi
    testo: "Frase con un *accento* tra asterischi."
  - stazione: passaggio
    cifra: "68"          # solo se la fonte ha questo numero
    testo: "..."
  - stazione: domanda    # l'ultima è sempre "domanda"
    testo: "..."
---
```

- `reel`: 3-5 schermate. `stazione` in `tesi | passaggio | evidenza | limite | domanda`; l'ultima è `domanda`. `cifra` e `colore` (`blu | ocra | rosso | verde | carta`) opzionali. Gli accenti nel `testo` vanno tra `*asterischi*`. Schema in `src/content.config.ts`.
- Tag solo tra quelli di `TAGS` in `src/lib/constants.ts` (ai, agenti, tech, javascript, typescript, astro, web, opinion, tutorial).
- Articolo: parte dalla convinzione diffusa, poi le evidenze, fonti linkate nel testo, e una sezione finale `## Limiti` con cosa i dati non dicono.
- Immagini in `src/assets/`, mai in `public/`. Nessun testo dentro immagini.

## 6. Passi

1. Leggi `riservato.local.md` (se manca, fermati e chiedi a Luca di crearlo), poi le fonti; applica il filtro, scegli la tesi.
2. Verifica numeri e claim sulle fonti primarie (punto 4).
3. Scrivi la bozza con `draft: true`.
4. Avvia `npm run dev` (in background) e controlla che la pagina si carichi senza errori di schema.
5. Rispondi a Luca con: link al file `[nome](file:///percorso/assoluto)` (spazi come `%20`), link locale all'anteprima (`/blog/<slug>` e il feed in `/`, sulla porta stampata da `npm run dev`), fact sheet, e cosa hai escluso per il filtro.
6. Luca corregge, tu modifichi. Nessun commit finché non dice "pubblica".
7. Su "pubblica" (il repo GitHub è pubblico: ogni push è per sempre):
   1. Lavora sul `main` locale, allineato a `origin/main` (`git fetch`, `git status`). Mai pushare altri branch.
   2. `draft: false` sulle idee indicate da Luca, poi `npm test` e `npm run build`: devono passare.
   3. Stage solo i file del progetto, uno per uno. Mai `.claude/settings*.json`, `.frontmatter/`, `frontmatter.json`, `PRD-*.md`, `src/.obsidian/`, `.playwright-mcp/`, `.impeccable/review/`, screenshot, `.env*`, `riservato.local.md`.
   4. Commit in italiano (`feat: idea <titolo breve>`).
   5. Controlli, tutti a zero, senza mai stampare i termini riservati:
      - `git log -p origin/main..HEAD` non contiene nessuna parola dell'elenco in `riservato.local.md` (confronto parola per parola, `grep -w -F -f`);
      - nessun percorso locale (`/Users/`, nome della cartella del vault);
      - `git diff --name-only origin/main..HEAD` non contiene nessuno dei file esclusi al punto 3.
      Se un controllo non è a zero, fermati e dillo a Luca.
   6. Mostra a Luca cosa esce (commit e file) e chiedi l'ok esplicito al push. Senza ok, fermati.
   7. `git push origin main` fa partire il deploy. Aspetta che la home contenga il nuovo slug, poi controlla che le pagine `/blog/<slug>/` rispondano 200.
   8. Rispondi con i link online delle pagine pubblicate.
