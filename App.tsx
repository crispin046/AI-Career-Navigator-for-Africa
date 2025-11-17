
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import AssessmentForm from './components/AssessmentForm';
import ResultsDisplay from './components/ResultsDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ResourceHub from './components/ResourceHub';
import ProfilePage from './components/ProfilePage';
import UserTypeSelector from './components/UserTypeSelector';
import CbcResultsDisplay from './components/CbcResultsDisplay';
import { fetchCareerRecommendations, fetchCbcRecommendations } from './services/geminiService';
import type { CareerRecommendationResponse, AssessmentAnswers, CbcRecommendation } from './types';
import { HIGH_SCHOOL_QUESTIONS, UNIVERSITY_QUESTIONS, ADULT_QUESTIONS, CBC_ASSESSMENT_QUESTIONS } from './constants';

export type View = 'ASSESSMENT' | 'LOADING' | 'RESULTS' | 'ERROR' | 'RESOURCES' | 'PROFILE' | 'USER_TYPE_SELECTION';
export type UserType = 'UNSELECTED' | 'CBC_PRIMARY' | 'HIGH_SCHOOL' | 'UNIVERSITY' | 'ADULT';


export default function App() {
  const [view, setView] = useState<View>('USER_TYPE_SELECTION');
  const [userType, setUserType] = useState<UserType>('UNSELECTED');
  const [recommendations, setRecommendations] = useState<CareerRecommendationResponse | null>(null);
  const [cbcRecommendations, setCbcRecommendations] = useState<CbcRecommendation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUserTypeSelect = useCallback((type: UserType) => {
    setUserType(type);
    setView('ASSESSMENT');
  }, []);

  const handleAssessmentSubmit = useCallback(async (answers: AssessmentAnswers) => {
    setView('LOADING');
    setError(null);
    try {
      if (userType === 'CBC_PRIMARY') {
        const result = await fetchCbcRecommendations(answers);
        setCbcRecommendations(result);
      } else {
        const result = await fetchCareerRecommendations(answers, userType);
        setRecommendations(result);
      }
      setView('RESULTS');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setView('ERROR');
    }
  }, [userType]);
  
  const resetState = useCallback(() => {
    setView('USER_TYPE_SELECTION');
    setUserType('UNSELECTED');
    setRecommendations(null);
    setCbcRecommendations(null);
    setError(null);
  }, []);

  const handleNavigate = useCallback((newView: View) => {
    setView(newView);
    if (newView === 'ASSESSMENT') {
        setRecommendations(null);
        setCbcRecommendations(null);
        setError(null);
    }
  }, []);
  
  const getQuestionsForUserType = () => {
      switch(userType) {
          case 'CBC_PRIMARY': return CBC_ASSESSMENT_QUESTIONS;
          case 'HIGH_SCHOOL': return HIGH_SCHOOL_QUESTIONS;
          case 'UNIVERSITY': return UNIVERSITY_QUESTIONS;
          case 'ADULT': return ADULT_QUESTIONS;
          default: return [];
      }
  }
  
  const renderContent = () => {
    if (view === 'USER_TYPE_SELECTION' || userType === 'UNSELECTED') {
        return <UserTypeSelector onSelect={handleUserTypeSelect} />;
    }

    switch (view) {
      case 'ASSESSMENT':
        return <AssessmentForm 
                    onSubmit={handleAssessmentSubmit} 
                    isLoading={false} 
                    questions={getQuestionsForUserType()}
                    userType={userType}
                />;
      case 'LOADING':
        return (
          <div className="text-center p-8">
            <LoadingSpinner />
            <p className="mt-4 text-lg text-slate-300 animate-pulse">Navigating the future... this may take a moment.</p>
            <p className="mt-2 text-sm text-slate-400">Our AI is analyzing the profile against millions of data points.</p>
          </div>
        );
      case 'RESULTS':
        if (userType === 'CBC_PRIMARY' && cbcRecommendations) {
            return <CbcResultsDisplay recommendation={cbcRecommendations} onNavigate={handleNavigate} />;
        }
        if (recommendations) {
            return <ResultsDisplay recommendations={recommendations} onNavigate={handleNavigate} />;
        }
        // Fallback if results are not in the expected state
        setView('ERROR');
        setError("Could not display results. Please try again.");
        return null;
      case 'ERROR':
        return (
          <div className="text-center p-8 bg-red-900/20 border border-red-500 rounded-lg">
            <h2 className="text-2xl font-bold text-red-400">An Error Occurred</h2>
            <p className="mt-2 text-red-300">{error}</p>
            <button
              onClick={() => handleNavigate('ASSESSMENT')}
              className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold transition-colors"
            >
              Try Again
            </button>
          </div>
        );
      case 'RESOURCES':
        return <ResourceHub />;
      case 'PROFILE':
        return <ProfilePage />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <Header onNavigate={handleNavigate} currentView={view} onReset={resetState} userType={userType} />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {renderContent()}
      </main>
      <footer className="text-center py-4 text-xs text-slate-500">
        <p>AI Career Navigator for Africa | Powered by Google Gemini</p>
      </footer>
    </div>
  );
}