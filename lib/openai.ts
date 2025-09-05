import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function generateScenarioScript(
  scenario: string,
  state: string,
  language: 'en' | 'es' = 'en'
): Promise<string[]> {
  try {
    const prompt = `Generate 3 concise, legally sound phrases that a person should say during a ${scenario} in ${state}. 
    The phrases should be:
    - Respectful and non-confrontational
    - Legally protective of constitutional rights
    - Easy to remember under stress
    - Appropriate for ${language === 'es' ? 'Spanish' : 'English'} speakers
    
    Format as a simple array of strings, no explanations.`;

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200,
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content || '';
    
    // Parse the response to extract phrases
    const phrases = content
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.replace(/^\d+\.\s*/, '').replace(/^[-*]\s*/, '').trim())
      .filter(phrase => phrase.length > 0)
      .slice(0, 3);

    return phrases.length > 0 ? phrases : [
      language === 'es' 
        ? 'Estoy ejerciendo mi derecho a permanecer en silencio.'
        : 'I am exercising my right to remain silent.',
      language === 'es'
        ? 'No consiento a ninguna búsqueda.'
        : 'I do not consent to any searches.',
      language === 'es'
        ? 'Quiero hablar con un abogado.'
        : 'I want to speak to a lawyer.'
    ];
  } catch (error) {
    console.error('Error generating scenario script:', error);
    // Return fallback scripts
    return language === 'es' ? [
      'Estoy ejerciendo mi derecho a permanecer en silencio.',
      'No consiento a ninguna búsqueda.',
      'Quiero hablar con un abogado.'
    ] : [
      'I am exercising my right to remain silent.',
      'I do not consent to any searches.',
      'I want to speak to a lawyer.'
    ];
  }
}

export async function generateRightsGuide(
  scenario: string,
  state: string,
  language: 'en' | 'es' = 'en'
): Promise<string> {
  try {
    const prompt = `Create a concise, mobile-friendly legal rights guide for ${scenario} situations in ${state}.
    
    Include:
    - Key constitutional rights that apply
    - What you must/must not do
    - What police can/cannot do
    - 3-5 specific action items
    
    Write in ${language === 'es' ? 'Spanish' : 'English'}.
    Keep it under 300 words, use bullet points, and make it actionable for high-stress situations.`;

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 400,
      temperature: 0.6,
    });

    return completion.choices[0]?.message?.content || 'Guide content unavailable.';
  } catch (error) {
    console.error('Error generating rights guide:', error);
    return 'Unable to generate guide at this time. Please try again later.';
  }
}

export async function generateShareableCardContent(sessionLog: {
  startTime: Date;
  location?: { latitude: number; longitude: number; address?: string };
  incidentType?: string;
}): Promise<string> {
  try {
    const prompt = `Create a concise, professional incident summary card based on:
    - Time: ${sessionLog.startTime.toISOString()}
    - Location: ${sessionLog.location?.address || 'Location recorded'}
    - Type: ${sessionLog.incidentType || 'Police interaction'}
    
    Format as a shareable social media post that:
    - Is factual and neutral
    - Includes relevant hashtags
    - Mentions RightsGuard app
    - Is under 280 characters`;

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
      temperature: 0.5,
    });

    return completion.choices[0]?.message?.content || 'Incident documented via RightsGuard app.';
  } catch (error) {
    console.error('Error generating shareable card:', error);
    return 'Incident documented via RightsGuard app. #RightsGuard #CivilRights';
  }
}
