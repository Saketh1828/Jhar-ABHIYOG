export const bhashiniService = {
  async transcribeAudio(audioBase64, languageCode) {
    const { BHASHINI_API_KEY, BHASHINI_USER_ID, BHASHINI_PIPELINE_ENDPOINT } = process.env;

    if (!BHASHINI_API_KEY || !BHASHINI_USER_ID || !BHASHINI_PIPELINE_ENDPOINT) {
      throw new Error('Bhashini environment variables are missing (BHASHINI_API_KEY, BHASHINI_USER_ID, BHASHINI_PIPELINE_ENDPOINT)');
    }

    const languageMap = {
      en: 'en', hi: 'hi', bn: 'bn', ur: 'ur', sat: 'sat', kru: 'kru',
      mun: 'mun', nag: 'nag', kho: 'kho', pan: 'pan', or: 'or', ta: 'ta',
      te: 'te', mr: 'mr'
    };

    const sourceLanguage = languageMap[languageCode] || 'en';

    const requestBody = {
      pipelineTasks: [{
        taskType: 'asr',
        config: {
          language: { sourceLanguage },
          serviceId: 'ai4bharat/conformer-hi-gpu--t4',
          audioFormat: 'wav',
          samplingRate: 16000
        }
      }],
      inputData: {
        audio: [{ audioContent: audioBase64 }]
      }
    };

    const response = await fetch(BHASHINI_PIPELINE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': BHASHINI_API_KEY,
        'userId': BHASHINI_USER_ID
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Bhashini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    let text = '';
    let confidence = 1.0; // Bhashini might not always provide confidence, defaulting to 1.0
    
    try {
        text = data.pipelineResponse[0].output[0].source;
    } catch (e) {
        throw new Error('Could not parse text from Bhashini response');
    }

    return {
      text,
      language: sourceLanguage,
      confidence,
      provider: 'Bhashini'
    };
  }
};
