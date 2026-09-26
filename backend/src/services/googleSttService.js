export const googleSttService = {
  async transcribeAudio(audioBase64, languageCode) {
    const { GOOGLE_SPEECH_TO_TEXT_API_KEY } = process.env;

    if (!GOOGLE_SPEECH_TO_TEXT_API_KEY) {
      throw new Error('Google Speech-to-Text API key is missing (GOOGLE_SPEECH_TO_TEXT_API_KEY)');
    }

    const languageMap = {
      en: 'en-IN', hi: 'hi-IN', bn: 'bn-IN', ur: 'ur-IN', or: 'or-IN',
      sat: 'sat-Olck-IN', ta: 'ta-IN', te: 'te-IN', mr: 'mr-IN'
    };

    const bcp47 = languageMap[languageCode] || 'en-IN';
    const endpoint = `https://speech.googleapis.com/v1/speech:recognize?key=${GOOGLE_SPEECH_TO_TEXT_API_KEY}`;

    const requestBody = {
      config: {
        encoding: 'WEBM_OPUS',
        sampleRateHertz: 48000,
        languageCode: bcp47,
        enableAutomaticPunctuation: true
      },
      audio: { content: audioBase64 }
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Google STT API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    let text = '';
    let confidence = 0;

    if (data.results && data.results.length > 0) {
        text = data.results[0].alternatives[0].transcript;
        confidence = data.results[0].alternatives[0].confidence || 0;
    } else {
        throw new Error('No transcription results from Google STT');
    }

    return {
      text,
      language: bcp47,
      confidence,
      provider: 'Google Speech-to-Text'
    };
  }
};
