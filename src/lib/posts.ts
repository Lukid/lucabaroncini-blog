// Niente alias "@/" né import Astro: il file deve girare anche sotto `node --test`.
export function pubblicato(
  data: { draft: boolean },
  prod: boolean = import.meta.env?.PROD ?? true,
): boolean {
  return !prod || !data.draft;
}

export function ordinaPerData<T extends { data: { pubDate: Date } }>(posts: T[]): T[] {
  return [...posts].sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
