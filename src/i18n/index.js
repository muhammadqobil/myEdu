import uz from './uz'
import uk from './uk'
import ru from './ru'
import en from './en'

import fp_uz from './fp/uz'
import fp_uk from './fp/uk'
import fp_ru from './fp/ru'
import fp_en from './fp/en'
//
const ext_ru = Object.assign(ru, fp_ru);
const ext_uz = Object.assign(uz, fp_uz);
const ext_uk = Object.assign(uk, fp_uk);
const ext_en = Object.assign(en, fp_en);
export default {
  'uz': ext_uz,
  'uk': ext_uk,
  'ru': ext_ru,
  'en': ext_en
}

