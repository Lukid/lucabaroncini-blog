export const SITE = {
  title: "Luca Baroncini",
  description:
    "Luca Baroncini, Chief AI Officer: agenti, RAG e AI applicata al lavoro vero. Cosa funziona, cosa no e con quali prove.",
  url: "https://lucabaroncini.tech",
  locale: "it-IT",
  lang: "it",
  author: "Luca Baroncini",
  jobTitle: "Chief AI Officer",
  postsPerPage: 10,
} as const;

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Osservatorio", href: "/osservatorio" },
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
  "politics",
  "climbing",
  "javascript",
  "typescript",
  "astro",
  "web",
  "opinion",
  "tutorial",
  "personal",
] as const;

export type Tag = (typeof TAGS)[number];
