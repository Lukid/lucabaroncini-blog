export const SITE = {
  title: "Luca Baroncini",
  description:
    "Blog personale di Luca Baroncini su tecnologia, politica e arrampicata.",
  url: "https://lucabaroncini.pages.dev",
  locale: "it-IT",
  lang: "it",
  author: "Luca Baroncini",
  postsPerPage: 10,
} as const;

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Chi sono", href: "/about" },
] as const;

export const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/lucabaroncini",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/lucabaroncini",
    icon: "linkedin",
  },
] as const;

export const TAGS = [
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
