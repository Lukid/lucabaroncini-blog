---
name: Luca Baroncini, Manifesti di numeri
description: Il dato è la composizione. Campi di colore pieno, cifre enormi scomposte in cerchi, quadrati e barre, grotesk pesante.
colors:
  blu: "oklch(0.3044 0.0866 267.72)"
  ocra: "oklch(0.7698 0.1625 74.45)"
  rosso: "oklch(0.5081 0.1858 21.09)"
  verde: "oklch(0.6996 0.113 154.96)"
  carta: "oklch(0.9588 0.0127 86.83)"
typography:
  display:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.75rem, 11cqi, 3.25rem)"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.75rem, 8.5cqi, 2.25rem)"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "tabular-nums"
  label:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    letterSpacing: "0.12em"
  figure:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "min(150cqi / n, 40svh, 80cqh)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.04em"
rounded:
  none: "0"
spacing:
  screen-x: "20px"
  screen-x-lg: "48px"
  gutter-lg: "48px"
  touch: "44px"
components:
  schermata:
    backgroundColor: "{colors.blu}"
    textColor: "{colors.carta}"
    padding: "8px 20px 16px"
    rounded: "{rounded.none}"
  link-controllo:
    textColor: "{colors.carta}"
    typography: "{typography.label}"
    height: "44px"
  accento-numero:
    textColor: "{colors.ocra}"
    typography: "{typography.headline}"
---

# Design System: Luca Baroncini, Manifesti di numeri

## Overview

**Creative North Star: "Il manifesto di numeri"** (Giovanni Pintori per Olivetti)

Ogni idea parte da un numero che diventa manifesto: un campo di colore pieno a tutta schermata, una cifra gigantesca costruita da forme geometriche, una frase sotto. Il dato è la composizione, non il suo commento. Il sito rifiuta il feed di card arrotondate su fondo bianco e il taccuino crema con serif.

Il sistema è piatto e tipografico. Il colore è campitura, mai effetto: nessuna ombra, nessun angolo arrotondato, nessuna sfumatura. Il blu notte è il fondo del feed; ogni schermata cambia campo in rotazione. L'articolo (modalità lettura) torna su carta e inchiostro blu, ma apre con una fascia di colore pieno che porta la stessa cifra.

Il feed è mobile-first (colonna da 480px al massimo nell'apertura), poi a 64rem diventa un manifesto orizzontale: cifra e forme nel campo largo (3fr), frase nella colonna stretta (2fr).

**Key Characteristics:**
- Cinque colori piatti, un campo pieno per schermata.
- Archivo variabile, pesi 800-900, cifre tabulari.
- La cifra si compone dalle sue forme e dalle forme libere; con il movimento ridotto resta statica.
- Zero ombre, zero raggi, zero gradienti.
- Il contrasto decide l'inchiostro, non il gusto.

## Colors

Cinque pigmenti pieni da stampa: blu notte, ocra, rosso, verde, carta. Valori sorgente in `src/lib/reel.ts` (COLORI, in hex) e in `src/styles/global.css` (oklch, `@theme static`).

### Primary
- **Blu notte** (#1c2b5a): fondo del feed, inchiostro dell'articolo, fondo del tema scuro. Su di esso carta 7,5:1.
- **Ocra** (#f0a202): la cifra e i numeri evidenziati sul blu; accento del tema scuro (6,4:1 sul blu). In chiaro solo campitura: su carta è 1,9:1.

### Secondary
- **Rosso** (#b81f33): campo di schermata e accento del tema chiaro (5,7:1 su carta).
- **Verde** (#5fb37f): campo di schermata e forma.

### Neutral
- **Carta** (#f5f1e8): fondo dell'articolo, schermata di apertura, inchiostro sui campi blu e rosso.
- Testo secondario: inchiostro al 75% su fondo (5,8:1 in chiaro). Filetti: inchiostro al 25% (chiaro) o 30% (scuro), solo come linea sottile.

### Named Rules
**The Un-Solo-Campo Rule.** Ogni schermata ha un solo colore di fondo, a tutta larghezza. Nessuna schermata è divisa in due campi.

**The Inchiostro Rule.** L'inchiostro segue il campo: carta su blu e rosso, blu su ocra, verde e carta (`inchiostro()` in `reel.ts`). La cifra è ocra solo dove l'ocra stacca di almeno 3:1 dal fondo, altrimenti prende l'inchiostro. Il testo evidenziato è ocra solo dove regge 4,5:1, altrimenti va a colori invertiti.

**The Forma-Invisibile Rule.** Una forma mai del colore del suo campo: se il caso la assegna uguale, prende l'inchiostro.

**The Domanda-Blu Rule.** L'ultima schermata (la domanda) è sempre su blu, con il disco ocra tagliato dal bordo.

## Typography

**Display Font:** Archivo variabile (asse wdth 100, sottoinsieme latino, `public/fonts/Archivo-Variable.woff2`, OFL), con Helvetica Neue, Arial, sans-serif
**Body Font:** Archivo, stesso stack
**Label/Mono Font:** Archivo per le etichette; `ui-monospace` solo per il codice

**Character:** Un grotesk pesante e stretto, quasi da targa, con cifre tabulari. Tutto in una famiglia: la gerarchia viene dal peso (400, 600, 700, 800, 900) e dalla taglia, non da un secondo carattere.

### Hierarchy
- **Cifra** (900, `min(150cqi / n, 40svh, 80cqh)`, interlinea 1, -0,04em): il numero dell'idea; occupa metà schermo. Su 64rem senza il tetto di 40svh.
- **Display** (900, clamp(1.75rem, 11cqi, 3.25rem), 1,05, -0,03em): la domanda finale; nome nell'apertura (900, clamp(2rem, 15cqi, 4.5rem), 0,95).
- **Headline** (800, clamp(1.75rem, 8,5cqi, 2,25rem), 1,12, -0,02em): la frase di ogni schermata; i numeri in 900.
- **Title** (800, 1,75rem / 1,3125rem / 1,125rem, 1,15, -0,02em): h2, h3, h4 dell'articolo.
- **Body** (400, 1,125rem, 1,6): testo dell'articolo, colonna `68ch`; cifre tabulari ovunque.
- **Label** (700, 0,8125rem, 0,12em, maiuscolo): barra della schermata, navigazione, "Avanti", "Leggi tutto", metadati dell'articolo.

### Named Rules
**The Taglia-Sul-Riquadro Rule.** Nel feed le taglie seguono il riquadro (unità `cqi`/`cqh`), non lo schermo, così il testo non esce mai dal foglio.

**The Una-Famiglia Rule.** Nessun secondo display. Il contrasto viene dal peso.

## Layout

Il foglio è una schermata a tutta altezza (`min-height: 100svh`) con aggancio dello scorrimento (`y proximity`, `y mandatory` con movimento ammesso e altezza oltre 560px). Padding laterale 20px su mobile, 48px da 64rem. Struttura verticale: barra (nome a sinistra, stazione e avanzamento "2 / 5" a destra), area della cifra con la frase sotto, barra dei comandi in basso.

Da 64rem la griglia è 3fr / 2fr con gap di 48px: la cifra e le forme nel campo largo, la frase nella colonna stretta, centrata in verticale. L'apertura mobile sta in 480px; da lg è a tutta larghezza. L'articolo ha una fascia di colore (`Campo`, max 64rem, testo e cifra in due colonne da lg) e poi una colonna di lettura da 68ch su carta.

Tutti i comandi hanno altezza minima 44px. Le forme libere stanno nelle fasce sopra e sotto il corpo della cifra e si restringono con la fascia.

### Named Rules
**The Dentro-Il-Foglio Rule.** Le forme libere restano dentro il riquadro; l'unica eccezione dichiarata è il disco della domanda, tagliato dal bordo di proposito (anche la cifra della copertina esce dal bordo alto di proposito).

## Elevation & Depth

Nessuna ombra e nessuna sfumatura: la profondità è solo sovrapposizione di campiture piane. Le forme ancorate stanno sopra il glifo e coprono un centesimo di em in più per nascondere l'antialias del bordo. Il codice sul tema scuro usa una campitura più scura del blu (`blu 60% + nero`), non un'ombra.

### Named Rules
**The Piatto-Sempre Rule.** Nessun `box-shadow`, `text-shadow` o `linear-gradient`. Una cosa sta sopra un'altra solo cambiando colore.

## Shapes

Tre forme: cerchio, quadrato e barra (rettangolo 10:1 in proporzione, 2 volte la misura per 1/5 dell'altezza). Raggio zero ovunque; il cerchio è un SVG, non un `border-radius`. Il quadrato pieno è anche il segno della citazione (0,625rem, accento) e del filetto (3rem x 0,5rem). I puntini degli elenchi sono quadrati.

Le forme per schermata sono 2 o 3, derivate da un seme (`formePer`, FNV-1a e mulberry32): la stessa idea ha sempre la stessa composizione. Senza cifra, la prima forma è grande (40-60 unità) e prende il posto del numero. I colori ruotano blu, ocra, rosso, verde.

Fino a due glifi della cifra prendono una forma ancorata alla loro geometria (`ANCORE` in `reel.ts`): un disco nell'occhiello di 0, 6, 8, 9, 3 e %, una barra al posto di un tratto in 1, 2, 4, 5, 7, -, un quadrato su 3 e ×. Le misure sono in em e valgono solo per Archivo 900.

### Named Rules
**The Ancora-Misurata Rule.** Una forma sta su un glifo solo nei punti progettati in `ANCORE`; se cambia il font, vanno rimisurati. Un disco può staccare anche in carta; barre e quadrati prendono un colore vicino di valore alla cifra, mai carta, e restano dentro il tratto (la barra del 4 non supera il filo destro dell'asta).

## Components

### Schermata
Un campo pieno, un'idea. Colore di fondo a rotazione (blu, ocra, rosso, verde); la domanda è su blu. Barra in alto con nome (link a Chi sono) e stazione con avanzamento; cifra e frase; in basso "Avanti" (con freccia a tratto 2px) e "Leggi tutto". Annunciata come "titolo, n di totale".

### Cifra
Riquadro a contenitore con il numero e le sue forme. Il numero entra salendo dal basso (`clip-path`), le forme ritornano al posto scalando da 0,3, le forme ancorate scivolano a posto. Solo con `animation-timeline: view()` e movimento ammesso; altrimenti statica. Nascosta ai lettori di schermo.

### Apertura (Intro)
Prima schermata su carta con inchiostro blu: nome a 900, frase di posizionamento, navigazione in etichette, "Avanti". Da lg è un manifesto orizzontale con la frase e la navigazione nella colonna destra.

### Campo (fascia dell'articolo)
Fascia di colore pieno a tutta larghezza con titolo 900, sommario, metadati in etichetta e la cifra dell'idea. Il fuoco prende l'inchiostro della fascia.

### Link e comandi
Etichetta maiuscola 700, 0,8125rem, 0,12em, altezza minima 44px, sottolineatura al passaggio. Nell'articolo i link sono sottolineati 2px nel colore accento, che al passaggio colora anche il testo. Il fuoco è un anello pieno di 3px con scarto 3px, nel colore accento (nel feed e nelle fasce: `currentColor`).

### Copertina social
PNG 1200x630 su blu: forme nella fascia alta, cifra ocra che esce dal bordo alto di proposito, titolo carta in basso a sinistra in Archivo ExtraBold, "LUCA BARONCINI". Stesse forme e stesso seme della schermata.

## Do's and Don'ts

### Do:
- **Do** dare a ogni schermata un solo campo pieno e far partire la composizione da un numero o, in sua assenza, da una forma grande (mai una cifra inventata).
- **Do** scegliere l'inchiostro dal contrasto: carta su blu e rosso, blu su ocra, verde e carta.
- **Do** costruire la composizione dallo stesso seme in feed, articolo e copertina.
- **Do** tenere cifre tabulari e un'unica famiglia, Archivo, con il peso a fare la gerarchia.
- **Do** dare ai comandi almeno 44px e un anello di fuoco di 3px visibile sul campo.
- **Do** lasciare statica la composizione con `prefers-reduced-motion`.

### Don't:
- **Don't** usare ombre, sfumature o angoli arrotondati.
- **Don't** usare l'ocra per testo o bordi su carta (1,9:1).
- **Don't** mettere una forma su un glifo fuori dai punti di `ANCORE`, né una barra o un quadrato di carta sopra la cifra.
- **Don't** tornare al feed di card su bianco o al taccuino crema con serif.
- **Don't** aggiungere un secondo carattere di titolo.

*Non canonizzato:* l'etichetta di stazione in maiuscolo spaziato (TESI, PASSAGGIO...) è un adattamento richiesto dalla specifica del reel, non uno stile da replicare su altre superfici come sopratitolo.
