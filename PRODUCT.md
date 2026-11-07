# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Pubblico largo, confermato da Luca il 2026-11-07: chi decide con chi lavorare sull'AI (founder, CTO, head of product di software house e system integrator, chi vende AI e digitale alla PA), ma anche tech lead e sviluppatori che portano RAG e agenti in produzione, la community WordPress e chi è curioso di AI applicata.

Situazione tipica: arriva dal telefono, spesso da un link LinkedIn, ha pochi secondi di attenzione e scorre.

## Product Purpose

Il sito pubblica le idee di Luca Baroncini sull'AI applicata al lavoro vero: cosa funziona, cosa no, con quali prove. Ogni idea si legge come un reel verticale di poche schermate e porta a un articolo completo con fonti e limiti.

Successo: chi legge resta con una domanda in più in testa (parole di Luca).

## Positioning

Luca porta RAG e agenti in produzione, anche per la pubblica amministrazione, e guida team che li mantengono. Legge fonti primarie, dichiara i limiti, cambia idea quando arrivano dati migliori. Le idee partono da una convinzione diffusa, spesso anche sua, e la mettono alla prova con le misure.

Nessun titolo in evidenza (decisione del 2026-11-07): contano il lavoro e le idee, il titolo sta solo nella pagina Chi sono.

## Operating Context

- I contenuti nascono dal vault personale di Luca, letto in sola lettura, e sono rielaborati da un agente.
- Ogni contenuto esce solo dopo l'approvazione di Luca.
- Distribuzione principale: LinkedIn.

## Capabilities and Constraints

- Astro 5, MDX, Tailwind v4, deploy Cloudflare Workers con asset statici, dominio lucabaroncini.tech.
- Nessun framework JS client-side; script vanilla minimi.
- Solo contenuti di lavoro: niente politica, arrampicata, vita personale (decisione del 2026-11-07).
- Riservatezza: mai dettagli di clienti o decisioni interne Net7; si pubblica la tesi, non il caso.

## Brand Commitments

- Lingua italiana, accenti veri sempre; termini tecnici inglesi quando sono quelli del lavoro (harness, reranker, evaluation set).
- Voce: colloquiale ma precisa, paragrafi brevi, dubbi e limiti dichiarati, domande finali vere e non da engagement.
- Niente emoji, formule da marketing, "game changer", "ecco 5 lezioni", entusiasmo obbligatorio.
- Fonti: il piano editoriale e la bio di Luca, nel vault (percorsi in `.claude/skills/nuova-idea/riservato.local.md`).

## Evidence on Hand

- Post pubblicato: `src/content/blog/harness-o-modello.mdx` (tredici misure su harness e modello).
- Misure: `src/components/mdx/MisureHarness.astro`, dentro l'articolo harness-o-modello.
- Foto: `src/assets/luca-baroncini.jpg`.
- Vault: mappa delle idee, note di sintesi, post LinkedIn, materiali dei talk.
- Non esistono testimonianze, clienti citabili o numeri di audience: non inventarli.

## Product Principles

1. Una domanda vera vale più di una conclusione finta.
2. Ogni affermazione ha una fonte o un limite dichiarato.
3. Il testo resta testo: leggibile da persone, lettori di schermo, motori di ricerca e agenti.
4. Veloce sul telefono prima di tutto.
5. Si mostra il lavoro, non lo si dichiara.

## Accessibility & Inclusion

WCAG 2.2 AA. Navigazione completa da tastiera, rispetto di `prefers-reduced-motion`, nessun contenuto intrappolato nello scroll a schermata intera.
