export const geminiService = {
  async classifyProblem(title, description, category) {
    const { GEMINI_API_KEY } = process.env;

    if (!GEMINI_API_KEY) {
      throw new Error('Gemini API key is missing (GEMINI_API_KEY)');
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const prompt = `You are an AI issue classifier for Jharkhand, India public grievance system.

Given this citizen complaint:
Title: ${title}
Description: ${description}
Category (user-selected): ${category}

Respond in JSON ONLY with this exact format:
{
  "category": "one of: Infrastructure, Water & Sanitation, Electricity, Healthcare, Education, Road & Transportation, Agriculture, Waste Management, Environment, Public Safety, Grievance, Other",
  "severity": "one of: Low, Medium, High, Critical",
  "detected_language": "the language the description is written in",
  "summary": "a one-sentence summary in English",
  "remediation_suggestion": "a one-sentence actionable suggestion"
}`;

    const requestBody = {
      contents: [{
        parts: [{ text: prompt }]
      }]
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
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    try {
        let textContent = data.candidates[0].content.parts[0].text;
        // Clean markdown code blocks if present
        textContent = textContent.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsedJSON = JSON.parse(textContent);
        return parsedJSON;
    } catch (e) {
        throw new Error('Could not parse Gemini classification response as JSON');
    }
  }
};
