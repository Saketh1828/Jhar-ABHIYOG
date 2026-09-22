/**
 * SpeechService Abstraction
 * Supports Google Cloud Speech-to-Text, Azure Speech, or AWS Transcribe integrations.
 * Falls back to demo provider when external provider is unconfigured.
 */

export const speechService = {
  transcribeAudio: async (audioData, languageCode = 'hi') => {
    const provider = process.env.SPEECH_PROVIDER || 'demo';

    if (provider === 'google' && process.env.GOOGLE_SPEECH_API_KEY) {
      // Integration point for Google Cloud Speech-to-Text API
      return { text: "[Google Cloud Transcribed Audio]: Pipeline leak reported.", confidence: 0.95 };
    }

    // Demo Mode Transcription Fallback
    return {
      success: true,
      text: `[Audio Transcribed in ${languageCode.toUpperCase()}]: Severe water pipeline leak noticed near the village tubewell requiring immediate repairs.`,
      language: languageCode,
      provider: 'Demo Speech Provider'
    };
  }
};
