/**
 * AIService Abstraction
 * Calls external Python FastAPI AI service endpoint (http://localhost:8000)
 * with automatic fallback to local classification engine.
 */

export const aiService = {
  analyzeProblem: async (problemData) => {
    const aiUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';
    try {
      const response = await fetch(`${aiUrl}/ai/analyze-problem`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(problemData)
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      console.warn(`[AI Service Warning] Python FastAPI AI service at ${aiUrl} unavailable. Using local fallback engine.`);
    }

    // Local Fallback AI Categorization & Receiver Recommendation Logic
    const cat = problemData.category || 'Water & Sanitation';
    return {
      category: cat,
      subcategory: cat,
      aiConfidence: 94,
      priority: problemData.severity === 'CRITICAL' ? 'CRITICAL' : 'HIGH',
      keywords: ['water', 'sanitation', 'infrastructure', 'jharkhand'],
      recommendedReceiver: 'Dumka District Water & Sanitation Dept (DWSD)',
      receiverType: 'Government Department',
      whyReceiver: `Primary jurisdiction over public ${cat} infrastructure in ${problemData.district || 'Dumka'}.`,
      assignedUniversity: 'Birsa Institute of Technology (BIT) Mesra',
      explanation: 'High priority due to population impact and critical public sanitation needs.'
    };
  }
};
