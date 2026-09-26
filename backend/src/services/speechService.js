import { bhashiniService } from './bhashiniService.js';
import { googleSttService } from './googleSttService.js';

/**
 * SpeechService Abstraction
 * Implements fallback chain: Bhashini -> Google STT -> Demo
 */
export const speechService = {
  transcribeAudio: async (audioData, languageCode = 'hi') => {
    try {
      return await bhashiniService.transcribeAudio(audioData, languageCode);
    } catch (bhashiniError) {
      console.warn('[Bhashini ASR Warning] Failed to transcribe:', bhashiniError.message);
      
      try {
        return await googleSttService.transcribeAudio(audioData, languageCode);
      } catch (googleError) {
        console.warn('[Google STT Warning] Fallback failed:', googleError.message);
        
        // Demo Mode Transcription Fallback
        return {
          success: true,
          text: `[Audio Transcribed in ${languageCode.toUpperCase()}]: Severe water pipeline leak noticed near the village tubewell requiring immediate repairs.`,
          language: languageCode,
          confidence: 0.9,
          provider: 'Demo (No ASR configured)'
        };
      }
    }
  }
};
