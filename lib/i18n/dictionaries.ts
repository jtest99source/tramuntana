export type Lang = 'en' | 'es' | 'de'

export type { EnDictionary as Dictionary } from './en'

export async function getDictionary(lang: Lang) {
  const dicts = {
    en: () => import('./en').then((module) => module.default),
    es: () => import('./es').then((module) => module.default),
    de: () => import('./de').then((module) => module.default),
  }

  return dicts[lang]()
}
