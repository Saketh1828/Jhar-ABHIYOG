/**
 * Jharkhand Multi-Language Capability & Speech Matrix
 * Configures speech recognition codes (BCP-47), translation codes, and browser capability flags.
 */

export const JHARKHAND_LANGUAGES = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    bcp47: 'en-IN',
    translationCode: 'en',
    supportedByBrowserSpeech: true,
    supportedByTranslationProvider: true,
    notes: 'Native browser support available in standard Web Speech API.'
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    bcp47: 'hi-IN',
    translationCode: 'hi',
    supportedByBrowserSpeech: true,
    supportedByTranslationProvider: true,
    notes: 'Native browser support available in standard Web Speech API.'
  },
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    bcp47: 'bn-IN',
    translationCode: 'bn',
    supportedByBrowserSpeech: true,
    supportedByTranslationProvider: true,
    notes: 'Native browser speech support available.'
  },
  {
    code: 'ur',
    name: 'Urdu',
    nativeName: 'اردو',
    bcp47: 'ur-IN',
    translationCode: 'ur',
    supportedByBrowserSpeech: true,
    supportedByTranslationProvider: true,
    notes: 'Native browser speech support available.'
  },
  {
    code: 'sat',
    name: 'Santhali',
    nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ',
    bcp47: 'sat-IN',
    translationCode: 'sat',
    supportedByBrowserSpeech: false,
    supportedByTranslationProvider: false,
    notes: 'Requires backend / custom speech-to-text integration model.'
  },
  {
    code: 'kru',
    name: 'Kurukh',
    nativeName: 'कुड़ुख़',
    bcp47: 'kru-IN',
    translationCode: 'kru',
    supportedByBrowserSpeech: false,
    supportedByTranslationProvider: false,
    notes: 'Requires backend / custom speech-to-text integration model.'
  },
  {
    code: 'mun',
    name: 'Mundari',
    nativeName: 'मुंडारी',
    bcp47: 'mun-IN',
    translationCode: 'mun',
    supportedByBrowserSpeech: false,
    supportedByTranslationProvider: false,
    notes: 'Requires backend / custom speech-to-text integration model.'
  },
  {
    code: 'nag',
    name: 'Nagpuri',
    nativeName: 'नागपुरी',
    bcp47: 'nag-IN',
    translationCode: 'nag',
    supportedByBrowserSpeech: false,
    supportedByTranslationProvider: false,
    notes: 'Requires backend / custom speech-to-text integration model.'
  },
  {
    code: 'kho',
    name: 'Khortha',
    nativeName: 'खोरठा',
    bcp47: 'kho-IN',
    translationCode: 'kho',
    supportedByBrowserSpeech: false,
    supportedByTranslationProvider: false,
    notes: 'Requires backend / custom speech-to-text integration model.'
  },
  {
    code: 'pan',
    name: 'Panchpargania',
    nativeName: 'पंचपरगनिया',
    bcp47: 'pan-IN',
    translationCode: 'pan',
    supportedByBrowserSpeech: false,
    supportedByTranslationProvider: false,
    notes: 'Requires backend / custom speech-to-text integration model.'
  }
];

export const getLanguageConfig = (code) => {
  return JHARKHAND_LANGUAGES.find(l => l.code === code) || JHARKHAND_LANGUAGES[0];
};
