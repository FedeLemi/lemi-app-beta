import { createI18n } from 'vue-i18n'
import en from '@/Locales/en.json'
import es from '@/Locales/es.json'

export default createI18n({
  legacy: false,  // Required for Composition API
  locale: 'es',
  fallbackLocale: 'en',
  messages: { en, es }
})