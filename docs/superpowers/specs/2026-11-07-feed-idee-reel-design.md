# Feed di idee a reel: design

Data: 2026-11-07
Sito: https://lucabaroncini.tech (repo `lucabaroncini-blog`, Astro 5 + MDX + Tailwind v4, deploy Cloudflare Workers con asset statici, `wrangler.jsonc`)

## Intento

Luca vuole rifare il sito per due motivi insieme:

1. Priorità tecniche: responsive, accessibilità, SEO e GEO (essere citato dai motori di risposta AI).
2. Un'esperienza vicina a quella dei reel di Instagram e TikTok: chi arriva dal telefono, per esempio da un link LinkedIn, scorre e legge qualcosa di davvero interessante.

Obiettivo dichiarato da Luca: chi legge deve restare con una domanda in più in testa.

I contenuti vengono dal suo vault Obsidian personale, rielaborati. Ogni contenuto passa dalla sua approvazione prima di uscire.

## Cosa si costruisce

### 1. L'idea come unità di contenuto

Ogni idea ha due forme scritte nello stesso file:

- **Reel**: 3-5 schermate verticali a tutto schermo. Una frase forte per schermata, eventualmente un grafico. L'ultima schermata è sempre la domanda finale, su fondo scuro, con il link "leggi il ragionamento completo".
- **Articolo**: il ragionamento completo in prosa, con fonti e limiti. Regge SEO e GEO.

Formato scelto da Luca: opzione C della bozza, "reel + articolo".

Struttura dei passaggi presa dalla mappa delle idee del vault: tesi, passaggi, evidenza, limite, domanda.

### 2. Il feed

- Home (`/`): il feed delle idee pubblicate, dalla più recente. Scorrimento verticale con snap a schermata intera (CSS `scroll-snap`). Finite le schermate di un'idea parte la successiva.
- Indicatore di avanzamento in alto (trattini, come nelle storie) per l'idea corrente.
- Desktop: il reel resta una colonna centrale in proporzione verticale; si scorre con rotella, trackpad, frecce e PageUp/PageDown. Ai lati c'è spazio per il nome dell'idea e il link all'articolo (scelta del builder).
- Una sola URL per idea come fonte canonica: l'articolo. Il reel di una singola idea è raggiungibile anche da solo (es. `/idee/<slug>/reel` o ancora `/#<slug>`, a scelta del builder) per condividere su LinkedIn.

### 3. Movimento

Scelto da Luca:

- **Testo animato**: le parole entrano a tempo, i numeri vengono barrati o cambiano. Solo CSS. Il testo resta testo nel DOM.
- **Schemi e grafici animati**: SVG inline che si disegnano quando la schermata entra in vista (barre, confronti, piccoli flussi). Un componente MDX riusabile per i casi comuni (barre di confronto, prima/dopo), il resto SVG a mano.
- **Copertina tipografica per idea**, generata in codice nello stile taccuino: titolo grande, un piccolo schema, nome di Luca. Usata come immagine Open Graph e come prima schermata/anteprima. Generata in fase di build (immagine PNG 1200x630, più eventualmente 1080x1350 per i social), nessun servizio esterno.

Fuori per ora: video mp4 per i social (si può aggiungere dopo dagli stessi testi, vedi Non obiettivi); illustrazioni AI.

Animazioni avviate quando la schermata è visibile (IntersectionObserver o `animation-timeline: view()` con fallback). Con `prefers-reduced-motion: reduce` niente animazioni: testo e grafici compaiono nello stato finale.

### 4. Accessibilità (WCAG 2.2 AA)

- Navigazione completa da tastiera nel feed; focus visibile; un link "salta al contenuto" e un modo di uscire dal feed verso l'indice delle idee.
- Il reel è testo vero, letto in ordine dai lettori di schermo. Ogni grafico SVG ha un titolo e una descrizione testuale equivalente (`role="img"` + `aria-label`, oppure una frase visibile).
- Lo snap non deve intrappolare: chi usa zoom al 200% o testo ingrandito deve poter leggere tutta la schermata (se il contenuto non entra, la schermata si allunga invece di tagliare).
- Contrasto AA in chiaro e scuro (il sito ha già il dark mode con classe `.dark`).
- Niente autoplay di audio. Niente movimento continuo oltre 5 secondi senza controllo.

### 5. SEO e GEO

- Ogni articolo: `BlogPosting` JSON-LD con autore (la `Person` già presente in `BaseHead.astro`), date, immagine di copertina; `BreadcrumbList`.
- La domanda finale e la tesi in apertura dell'articolo in forma esplicita (frasi brevi, citabili): è ciò che i motori AI estraggono.
- `llms.txt` alla radice con l'elenco delle idee e degli articoli, e versione markdown di ogni articolo raggiungibile (es. `/idee/<slug>.md`), per gli agenti.
- Sitemap e RSS includono le idee. `robots.txt` punta già a `lucabaroncini.tech`. Crawler AI: vedi "Domande aperte".
- Il reel non è una pagina indicizzata a sé: porta `canonical` verso l'articolo. Tutto il testo dell'articolo sta nell'HTML statico.
- Fonte linkata accanto a ogni affermazione e data di aggiornamento visibile: è quello che i motori generativi citano (paper GEO, arXiv 2311.09735).
- Le URL esistenti (`/blog/come-ho-costruito-questo-blog`, `/blog/harness-o-modello`, `/osservatorio/...`) restano raggiungibili; se cambiano, redirect 301.
- Performance: niente JS framework (vincolo del progetto); JS solo vanilla e minimo per avanzamento e avvio animazioni. Obiettivo Lighthouse 95+ su mobile in tutte e quattro le categorie.

### 6. Responsive

Mobile first. Il feed è pensato per il telefono in verticale. Su tablet e desktop resta colonna centrale. Gli articoli usano il layout di lettura esistente (V4 taccuino brutalista), rivisto per mobile.

### 7. Look: "Manifesti di numeri"

Luca ha scelto di sostituire il look V4 (crema, Fraunces, IBM Plex Mono, quadretti), troppo vicino allo stile generico dei siti fatti con l'AI. Da evitare: troppo accademico, troppo istituzionale.

Direzione scelta il 2026-11-07 (secondo giro della scelta visiva): ispirata ai manifesti Olivetti di Giovanni Pintori.

- Ogni schermata del reel è un campo di colore pieno: blu notte, ocra, rosso, verde, bianco carta. Un colore di fondo per schermata.
- Il dato diventa composizione: una cifra gigantesca scomposta in cerchi, quadrati e barre ritagliate. Le schermate senza un numero forte usano una forma, mai una cifra inventata.
- Grotesk pesante con cifre tabulari. Niente ombre, angoli arrotondati o sfumature.
- Interazione firma: entrando in una schermata la cifra si compone dalle sue forme (animazione legata allo scroll in CSS; statica con "riduci movimento").
- Gli articoli usano lo stesso mondo in modalità lettura: fondo chiaro, colonna di testo leggibile, grafici nello stesso linguaggio di forme.
- La copertina tipografica di ogni idea è la sua schermata-manifesto principale.

Contratto di direzione completo in `.impeccable/surfaces/src-pages-index-astro.md`; prodotto e pubblico in `PRODUCT.md`. Bozza della prima schermata: `.impeccable/mocks/decision/model-pick-2.html`.

Riferimenti dalla ricerca online: Pintori per Olivetti, segnaletica di Noorda, formato delle Google Web Stories, metodo di scrollytelling di The Pudding, ciechanow.ski per i grafici dentro il testo.

### 8. La skill di produzione (in questo repo)

Skill di progetto in `.claude/skills/` (nome proposto: `nuova-idea`). Flusso:

1. Luca dice "prepara un'idea su X" (o indica una nota del vault).
2. La skill legge il vault in sola lettura, parte dalla mappa delle idee, dalle note di sintesi pertinenti e dai testi di Luca (post LinkedIn, talk). I percorsi stanno in `riservato.local.md`.
3. Applica il filtro di riservatezza (sotto) e scrive nel repo una bozza con reel e articolo, `draft: true`.
4. Avvia l'anteprima solo in locale (`npm run dev`, con le bozze visibili solo in sviluppo) e dà a Luca il link. Le bozze non vanno mai su branch remoti né su anteprime Cloudflare (decisione di Luca, 2026-11-07).
5. Luca corregge. Su "pubblica": `draft: false`, commit, push su `main`.

La skill non scrive mai nel vault.

### 9. Filtro di riservatezza (vincolante)

Indicazioni dall'agente del vault, da riportare nella skill:

- Mai i documenti interni Net7 né i casi di clienti PA: l'elenco puntuale sta in un file locale della skill, ignorato da git (`riservato.local.md`). Mai i file non tracciati nella radice del vault.
- Dalle schede che citano quei casi esce la tesi generalizzata, mai il caso, i numeri o le scelte di progetto. I nomi dei progetti PA sono pubblici, decisioni e dettagli tecnici no.
- Le note di sintesi sono formulazioni del vault, spesso sintesi di fonti altrui: si usano come spunto, la voce pubblicata è quella di Luca e le fonti esterne si citano.
- Nessun nome di prodotto come raccomandazione dove la funzione basta (regola globale di Luca per i documenti cliente; qui vale come buona pratica, non vincolo).
- Accenti italiani veri sempre.

### 10. Contenuti al lancio

- Le idee proposte dall'agente del vault come più forti: baseline curata, harness vs modello, collo di bottiglia sulla review, feedback come diagnosi, wiki che compila conoscenza, eval proprietario, costo dell'inferenza, intensificazione del lavoro. Al lancio ne servono 3, tutte approvate da Luca.
- Il post esistente "Harness o modello? Dipende da dove sei" diventa la prima idea (ha già testo e dati pubblicati).

## Non obiettivi

- Video mp4, voce, musica (possibile fase successiva con lo stesso testo).
- Illustrazioni generate con AI.
- Commenti, like, contatori, account: le icone laterali dei reel social non si copiano. Al massimo "condividi" (Web Share API nativa) e "copia link".
- Pubblicazione automatica dal vault senza approvazione.
- Cambio di stack o di identità visiva.

## Anti-obiettivi (sarebbe un fallimento anche se funziona)

- Uscita di un dettaglio cliente o Net7 riservato.
- Un feed che intrappola: impossibile usarlo da tastiera, con zoom o lettore di schermo.
- Testo dentro immagini o canvas invece che nel DOM (SEO, GEO e accessibilità persi).
- Animazioni che rallentano o distraggono dalla frase; peggioramento di Lighthouse rispetto a oggi.
- Contenuto che sembra generato: frasi da AI, accenti sbagliati, tono non di Luca.

## Vincoli

- Stack attuale, nessun framework JS client-side (`CLAUDE.md` del progetto).
- Immagini in `src/assets/`, non in `public/`.
- Tag ammessi definiti in `src/lib/constants.ts` (già presenti `ai` e `agenti`).
- Il vault si legge, non si modifica.

## Decisioni prese da Luca

- Formato C: reel verticale con articolo completo.
- Movimento: testo animato e grafici animati nel sito; copertina tipografica generata in codice.
- Ogni contenuto approvato da lui prima di uscire.
- Flusso di produzione come skill di questo repo.

## Scelte mie (da verificare)

- Home = feed. La prima schermata è una breve presentazione (nome, una riga su cosa scrive Luca, link a Osservatorio e Chi sono, nessun titolo professionale), poi partono le idee.
- `/blog` diventa l'indice di tutte le idee e gli articoli, ed è la via d'uscita dal feed richiesta dall'accessibilità. L'URL canonico dell'articolo resta `/blog/<slug>`: nessun redirect necessario.
- La collezione `blog` si estende con un campo opzionale per le schermate del reel. Un post senza reel (es. "come ho costruito questo blog") sta nell'indice ma non nel feed.
- L'Osservatorio resta; gli articoli ci rimandano quando una tesi ha la sua pagina di misure.
- Nessun titolo professionale in evidenza; niente contenuti personali (politica, arrampicata): decisioni di Luca del 2026-11-07. I tag non usati si tolgono dallo schema.
- Video per i social rimandato.

## Domande aperte (per Luca)

Risolte con Luca il 2026-11-07:

- Anteprima delle bozze: solo in locale. In produzione le bozze non vengono mai generate.
- Lancio: con 3 idee approvate ("Harness o modello" più due nuove dal vault).
- Crawler AI: tutti consentiti in `robots.txt`; `llms.txt` e versione markdown degli articoli.

## Lasciato al builder

- Schema esatto del frontmatter del reel (es. lista di schermate in YAML o componenti MDX `<Schermata>` nel corpo).
- Come generare le copertine in build (es. SVG renderizzato in PNG).
- Dettagli di layout desktop e dell'indicatore di avanzamento.
- Struttura interna della skill.
