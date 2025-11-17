
export interface AssessmentAnswers {
  [key: string]: string;
}

// Main response structure for High School, University, Adult
export interface CareerMatch {
  role: string;
  fit_reasons: string[];
  market_insight: string;
  confidence: number;
}

export interface ActionPlan {
  short_term: string[];
  medium_term: string[];
  long_term: string[];
}

export interface SkillGap {
  skill: string;
  current_level: 'beginner' | 'intermediate' | 'advanced';
  recommended_action: string;
}

export interface MarketData {
  sources: string[];
  date: string;
}

export interface CareerRecommendationResponse {
  profile_summary: string;
  strengths: string[];
  values: string[];
  top_career_matches: CareerMatch[];
  action_plan: ActionPlan;
  skill_gap_analysis: SkillGap[];
  market_data_used: MarketData;
  coach_tip: string;
  confidence_score: number;
  explainability: string[];
}

// Types for CBC Primary Student Assessment
export interface CbcProfile {
    competency_scores: {
        literacy: number;
        numeracy: number;
        creativity: number;
        communication: number;
        critical_thinking: number;
        digital_literacy: number;
        collaboration: number;
    };
    learning_preferences: string[];
}

export interface MicroPathway {
    name: string;
    description: string;
}

export interface CbcRecommendation {
    user_level: "Primary_CBC";
    cbc_profile: CbcProfile;
    micro_pathways: MicroPathway[];
    recommended_activities: string[];
    teacher_notes: string;
    // Adding fields from the new spec's sample output for consistency
    africa_relevance: {
        problem_centrality_score: number;
        stem_alignment_score: number;
        development_contribution: string;
    }
}
