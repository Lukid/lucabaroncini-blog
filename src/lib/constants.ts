export const SITE = {
  title: "Luca Baroncini",
  description:
    "Luca Baroncini: agenti, RAG e AI applicata al lavoro vero. Cosa funziona, cosa no e con quali prove.",
  url: "https://lucabaroncini.tech",
  locale: "it-IT",
  lang: "it",
  author: "Luca Baroncini",
  jobTitle: "Chief AI Officer",
  postsPerPage: 10,
} as const;

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Idee", href: "/blog" },
  { label: "Chi sono", href: "/about" },
] as const;

export const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/Lukid/",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/luca-baroncini-b4b1a1b6/",
    icon: "linkedin",
  },
] as const;

export const TAGS = [
  "ai",
  "agenti",
  "tech",
  "javascript",
  "typescript",
  "astro",
  "web",
  "opinion",
  "tutorial",
] as const;

export type Tag = (typeof TAGS)[number];

// Una sola entità Person, con @id fisso, così Google la distingue dagli omonimi.
export const PERSON = {
  "@type": "Person",
  "@id": `${SITE.url}/#luca-baroncini`,
  name: SITE.author,
  jobTitle: SITE.jobTitle,
  description: "Chief AI Officer in Net7 (Pisa). Agenti, sistemi RAG e AI applicata, anche per la pubblica amministrazione.",
  worksFor: { "@type": "Organization", name: "Net7", url: "https://www.netseven.it" },
  homeLocation: { "@type": "Place", name: "Pisa, Italia" },
  knowsAbout: ["Intelligenza artificiale", "Agenti AI", "RAG", "WordPress", "Sviluppo web"],
  url: SITE.url,
  sameAs: [...SOCIAL_LINKS.map((l) => l.href), "https://www.wikidata.org/wiki/Q142083969"],
};
