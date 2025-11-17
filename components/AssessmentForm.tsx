
import React, { useState, useMemo, useEffect } from 'react';
import type { AssessmentAnswers } from '../types';
import type { UserType } from '../App';

interface Question {
    id: string;
    text: string;
    options: string[];
}
interface AssessmentFormProps {
  onSubmit: (answers: AssessmentAnswers) => void;
  isLoading: boolean;
  questions: Question[];
  userType: UserType;
}

const AssessmentForm: React.FC<AssessmentFormProps> = ({ onSubmit, isLoading, questions, userType }) => {
  
  const initialAnswers = useMemo(() => {
    const initial: AssessmentAnswers = {};
    questions.forEach(q => initial[q.id] = '');
    return initial;
  }, [questions]);

  const [currentAnswers, setCurrentAnswers] = useState<AssessmentAnswers>(initialAnswers);
  
  useEffect(() => {
    // Reset answers when the questions change (i.e., user type changes)
    setCurrentAnswers(initialAnswers);
  }, [questions, initialAnswers]);

  const isComplete = useMemo(() => {
    return questions.every(q => currentAnswers[q.id] && currentAnswers[q.id] !== '');
  }, [currentAnswers, questions]);

  const handleOptionChange = (questionId: string, option: string) => {
    setCurrentAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isComplete) {
      onSubmit(currentAnswers);
    }
  };
  
  const titles = {
      'HIGH_SCHOOL': {
          title: "High School Assessment",
          subtitle: "Answer a few questions to explore career paths and course options.",
          button: "Get My Recommendations"
      },
      'UNIVERSITY': {
          title: "University Student Assessment",
          subtitle: "Refine your career goals based on your studies and projects.",
          button: "Get My Recommendations"
      },
      'ADULT': {
          title: "Career Changer Assessment",
          subtitle: "Leverage your experience to find your next impactful role.",
          button: "Get My Recommendations"
      },
      'CBC_PRIMARY': {
          title: "Child's Competency Profile",
          subtitle: "Answer these questions based on your observations of the child to discover their emerging strengths.",
          button: "Generate Competency Profile"
      },
      'UNSELECTED': { title: "", subtitle: "", button: "" }
  }
  const { title, subtitle, button } = titles[userType] || titles['UNSELECTED'];

  return (
    <div className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-slate-700">
      <h2 className="text-2xl font-bold mb-2 text-cyan-300">{title}</h2>
      <p className="text-slate-400 mb-6">{subtitle}</p>
      <form onSubmit={handleSubmit} className="space-y-8">
        {questions.map((question, index) => (
          <fieldset key={question.id} className="border-t border-slate-700 pt-6">
            <legend className="text-lg font-semibold mb-4">
              <span className="text-cyan-400 mr-2">{index + 1}.</span>{question.text}
            </legend>
            <div className="space-y-3">
              {question.options.map((option) => (
                <label key={option} className="flex items-center p-4 bg-slate-700/50 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors">
                  <input
                    type="radio"
                    name={question.id}
                    value={option}
                    checked={currentAnswers[question.id] === option}
                    onChange={() => handleOptionChange(question.id, option)}
                    className="h-5 w-5 text-cyan-500 bg-slate-600 border-slate-500 focus:ring-cyan-500 focus:ring-2"
                  />
                  <span className="ml-4 text-slate-300">{option}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
        <div className="pt-6 border-t border-slate-700">
          <button
            type="submit"
            disabled={!isComplete || isLoading}
            className="w-full py-3 px-6 text-lg font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg shadow-lg transition-all transform hover:scale-105 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed disabled:scale-100"
          >
            {isLoading ? 'Analyzing...' : button}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssessmentForm;
