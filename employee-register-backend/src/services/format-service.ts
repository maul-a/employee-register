import countries from 'i18n-iso-countries'

export default class FormatService {
  getCountryCode(countryName: string, locale ='de' ) {
    if (countryName.length <= 2) {
      return countryName
    }
    const countryCode = countries.getAlpha2Code(countryName, locale)
    if (countryCode) {
      return countryCode
    }
    return null
  }
}