import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Prompt templates for generating content
export const PROMPTS = {
  GENERATE_SCRIPT: (scenario: string, language: 'en' | 'es', state: string) => `
    Generate a concise, legally sound script for someone to use during a ${scenario} in ${state}.
    Language: ${language === 'en' ? 'English' : 'Spanish'}
    
    Requirements:
    - Keep it under 50 words
    - Use clear, respectful language
    - Focus on constitutional rights
    - Avoid confrontational tone
    - Include specific phrases that protect rights
    
    Return only the script text, no additional formatting or explanation.
  `,
  
  GENERATE_GUIDE_CONTENT: (scenario: string, state: string, language: 'en' | 'es') => `
    Create a comprehensive but concise legal rights guide for ${scenario} in ${state}.
    Language: ${language === 'en' ? 'English' : 'Spanish'}
    
    Include:
    - Key constitutional rights
    - What to say and what not to say
    - State-specific laws and procedures
    - Practical tips for the situation
    - Emergency contact information
    
    Format as markdown. Keep under 500 words. Focus on actionable information.
  `,
  
  GENERATE_SHAREABLE_CARD: (sessionData: any) => `
    Create a concise summary card for this incident:
    
    Time: ${sessionData.startTime}
    Location: ${sessionData.location?.address || 'Location recorded'}
    Duration: ${sessionData.duration || 'Unknown'}
    Type: ${sessionData.incidentType || 'General interaction'}
    
    Generate a brief, factual summary suitable for sharing with trusted contacts or legal counsel.
    Keep it under 100 words. Focus on key facts and timeline.
    
    Return only the summary text.
  `,
} as const;

// Helper function to generate content with error handling
export async function generateContent(prompt: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a legal assistant helping people understand their rights during police interactions. Provide accurate, helpful, and non-confrontational guidance.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 500,
      temperature: 0.3,
    });

    return completion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate content');
  }
}
