import { GoogleGenAI, Type } from '@google/genai';
import type { AssessmentAnswers, CareerRecommendationResponse, CbcRecommendation } from '../types';
import type { UserType } from '../App';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const careerResponseSchema = {
    type: Type.OBJECT,
    properties: {
        profile_summary: { type: Type.STRING, description: "A short, human-readable summary of the user's profile, max 3 paragraphs." },
        strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of the user's key strengths." },
        values: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of the user's likely work values." },
        top_career_matches: {
            type: Type.ARRAY,
            description: "A list of the top 3 recommended career paths.",
            items: {
                type: Type.OBJECT,
                properties: {
                    role: { type: Type.STRING, description: "The title of the career role." },
                    fit_reasons: { type: Type.ARRAY, description: "List of bullet-point reasons why this role fits the user's profile.", items: {type: Type.STRING} },
                    market_insight: { type: Type.STRING, description: "A brief insight into the job market for this role, especially in an African context." },
                    confidence: { type: Type.NUMBER, description: "A score from 0.0 to 1.0 indicating the model's confidence in this match." },
                },
                required: ["role", "fit_reasons", "market_insight", "confidence"]
            }
        },
        action_plan: {
            type: Type.OBJECT,
            properties: {
                short_term: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Actionable steps for the next 0-6 months." },
                medium_term: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Goals for the next 6-18 months." },
                long_term: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Ambitions for the next 2-5 years." },
            },
             required: ["short_term", "medium_term", "long_term"]
        },
        skill_gap_analysis: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: { type: Type.STRING },
                    current_level: { type: Type.STRING, enum: ["beginner", "intermediate", "advanced"] },
                    recommended_action: { type: Type.STRING }
                },
                required: ["skill", "current_level", "recommended_action"]
            }
        },
        market_data_used: {
            type: Type.OBJECT,
            properties: {
                sources: { type: Type.ARRAY, items: { type: Type.STRING } },
                date: { type: Type.STRING, description: "YYYY-MM-DD" }
            },
            required: ["sources", "date"]
        },
        coach_tip: { type: Type.STRING, description: "An encouraging, actionable tip." },
        confidence_score: { type: Type.NUMBER, description: "Overall confidence in the entire recommendation set." },
        explainability: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Bullet points explaining the reasoning behind the recommendations." }
    },
    required: ["profile_summary", "strengths", "values", "top_career_matches", "action_plan", "skill_gap_analysis", "market_data_used", "coach_tip", "confidence_score", "explainability"]
};


export const fetchCareerRecommendations = async (answers: AssessmentAnswers, userLevel: UserType): Promise<CareerRecommendationResponse> => {
    const systemInstruction = `You are "AI Career Navigator (ACN)", an expert educational and career advisor for Africa. Use the provided user data and market signals to produce a comprehensive, encouraging, and actionable career plan.

Your response MUST be a valid JSON object that strictly follows the provided schema.

Key instructions:
1.  **Analyze Holistically**: Synthesize the user's level (e.g., High School, University) and their specific answers to build a coherent profile.
2.  **Africa Context is Crucial**: All market insights, career roles, and action plans should be relevant to the development priorities and job market realities in African countries. Assume a high demand for STEM, AgriTech, FinTech, HealthTech, and Renewable Energy.
3.  **Problem Centrality**: Implicitly factor in how careers address systemic problems (e.g., teacher shortages, healthcare access). For roles that address these, provide stronger recommendations and reflect this in the 'fit_reasons' and 'market_insight'.
4.  **Actionability**: The 'action_plan' and 'skill_gap_analysis' must be concrete and practical for the user's specific level.
5.  **Tone**: Your language should be encouraging, clear, and empowering.`;

    const userPrompt = `
    INPUT:

    *   user_level: ${userLevel}
    *   user_data: ${JSON.stringify(answers, null, 2)}
    *   market_snapshot: { "top_roles": ["Software Developer", "Data Analyst", "Digital Marketer", "Nurse", "AgriTech Specialist"], "growth_by_role": { "Software Developer": 0.25, "Nurse": 0.30 }, "local_adjustments": { "notes": "High demand for healthcare and tech skills across the continent." } }
    *   config: { "locale": "KE", "language": "en", "guidance_tone": "encouraging" }

    TASK: Generate a JSON output strictly matching the required OUTPUT_SCHEMA.
    `;
    
    const fullPrompt = `${systemInstruction}\n\n${userPrompt}`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: [{ parts: [{ text: fullPrompt }] }],
            config: {
                responseMimeType: "application/json",
                responseSchema: careerResponseSchema,
                temperature: 0.3,
                thinkingConfig: {
                    thinkingBudget: 32768,
                },
            },
        });
        
        const jsonText = response.text.trim();
        const parsedResponse = JSON.parse(jsonText);
        
        if (!parsedResponse.top_career_matches) {
            throw new Error("Invalid response structure from API.");
        }
        
        return parsedResponse as CareerRecommendationResponse;

    } catch (error) {
        console.error("Error fetching career recommendations:", error);
        throw new Error("Failed to get recommendations from the AI. Please check your API key and try again.");
    }
};

const cbcResponseSchema = {
    type: Type.OBJECT,
    properties: {
        user_level: { type: Type.STRING, enum: ["Primary_CBC"] },
        cbc_profile: {
            type: Type.OBJECT,
            properties: {
                competency_scores: {
                    type: Type.OBJECT,
                    properties: {
                        literacy: { type: Type.NUMBER, description: "Score 0.0-1.0" },
                        numeracy: { type: Type.NUMBER, description: "Score 0.0-1.0" },
                        creativity: { type: Type.NUMBER, description: "Score 0.0-1.0" },
                        communication: { type: Type.NUMBER, description: "Score 0.0-1.0. Infer from collaboration/storytelling." },
                        critical_thinking: { type: Type.NUMBER, description: "Score 0.0-1.0" },
                        digital_literacy: { type: Type.NUMBER, description: "Score 0.0-1.0" },
                        collaboration: { type: Type.NUMBER, description: "Score 0.0-1.0" },
                    },
                    required: ["literacy", "numeracy", "creativity", "communication", "critical_thinking", "digital_literacy", "collaboration"],
                },
                learning_preferences: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["competency_scores", "learning_preferences"],
        },
        micro_pathways: {
            type: Type.ARRAY,
            description: "2-3 broad, encouraging, kid-friendly pathways.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING },
                },
                required: ["name", "description"],
            },
        },
        recommended_activities: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3-4 simple, low-cost, gamified/play-based activities." },
        teacher_notes: { type: Type.STRING, description: "A brief, encouraging note for the parent/teacher." },
        africa_relevance: {
             type: Type.OBJECT,
             properties: {
                problem_centrality_score: { type: Type.NUMBER },
                stem_alignment_score: { type: Type.NUMBER },
                development_contribution: { type: Type.STRING },
             },
             required: ["problem_centrality_score", "stem_alignment_score", "development_contribution"]
        }
    },
     required: ["user_level", "cbc_profile", "micro_pathways", "recommended_activities", "teacher_notes", "africa_relevance"],
};


export const fetchCbcRecommendations = async (answers: AssessmentAnswers): Promise<CbcRecommendation> => {
        const systemInstruction = `You are an AI educational psychologist for parents and teachers of primary school children in Africa's Competency-Based Curriculum (CBC). Your goal is to translate simple observational answers about a child into an encouraging, actionable competency profile.

Based on the answers provided, you MUST:
1.  **Estimate Competency Scores**: Provide a score from 0.0 to 1.0 for each of the 7 competencies. Base 'literacy' and 'communication' scores on creativity/storytelling and collaboration answers.
2.  **Identify Learning Preferences**: Suggest 2-3 learning preferences (e.g., "visual", "hands-on", "verbal").
3.  **Recommend Micro-Pathways**: Propose 2-3 kid-friendly "micro-pathways" like "Junior Maker & Engineering," "Storytelling & Early Literacy," or "Junior Data Explorer." These should be broad, encouraging, and linked to their highest-scoring competencies.
4.  **Suggest Activities**: Provide 3-4 simple, low-cost, and gamified/play-based activities a parent or teacher can do.
5.  **Write Teacher/Parent Notes**: Offer a brief, encouraging note with advice.
6.  **Africa Relevance**: Briefly explain how nurturing these early competencies is foundational for later STEM education and contributes to Africa's development.

Your response MUST be a valid JSON object that adheres to the provided schema.`;

    const userPrompt = `Based on my observations of the child, please generate a competency profile.

    My Answers:
    ${JSON.stringify(answers, null, 2)}
    `;
    
    const fullPrompt = `${systemInstruction}\n\n${userPrompt}`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash", 
            contents: [{ parts: [{ text: fullPrompt }] }],
            config: {
                responseMimeType: "application/json",
                responseSchema: cbcResponseSchema,
                temperature: 0.6,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedResponse = JSON.parse(jsonText);
        
        if (!parsedResponse.cbc_profile) {
            throw new Error("Invalid response structure from API for CBC profile.");
        }
        
        return parsedResponse as CbcRecommendation;

    } catch (error) {
        console.error("Error fetching CBC recommendations:", error);
        throw new Error("Failed to get recommendations from the AI. Please check your API key and try again.");
    }
};