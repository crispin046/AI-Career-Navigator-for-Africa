
import React from 'react';

const ArchitecturePage: React.FC = () => {
  return (
    <div className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-slate-700 space-y-8 text-slate-300">
      <div>
        <h2 className="text-2xl font-bold text-cyan-300">AI Career Navigator: Real-Time, CBC-Aligned Guidance for Students Across Africa</h2>
        <p className="text-slate-400 mt-1">A multilingual, multimodal AI-powered career and learning guidance assistant that supports students, parents, and teachers in navigating the new Competency-Based Curriculum (CBC) in Kenya and other African education systems.</p>
      </div>

      <div className="border-t border-slate-700 pt-6">
        <h3 className="text-xl font-semibold mb-2">Vision</h3>
        <p>Empower students from primary school to adulthood with personalized, competency-based career guidance and mentorship — bridging education with labor market demands, starting from CBC pathways.</p>
      </div>

      <div className="border-t border-slate-700 pt-6">
        <h3 className="text-xl font-semibold mb-4">User Journeys &amp; Features</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-bold text-slate-200">1. Level-Based Career Guidance</h4>
            <ul className="list-disc list-inside mt-2 text-sm space-y-1">
              <li>User selects level: Primary | Junior Secondary (Grades 7–9) | Senior Secondary (Grades 10–12) | University/College | Adult/Career Switcher.</li>
              <li>Assesses interests, CBC competencies, personality (RIASEC), and current subjects.</li>
              <li>Recommends 3–5 future careers + relevant CBC pathways.</li>
              <li>Output includes: Personalized career map, subject & skill alignment, clear "Why this fits you" explanation, and actionable steps.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-200">2. Grade 9–10 CBC Transition Coach</h4>
            <ul className="list-disc list-inside mt-2 text-sm space-y-1">
              <li>Helps students select a senior school CBC pathway (STEM, Social Sciences, Arts/Sports).</li>
              <li>Recommends subject clusters based on strengths and interests.</li>
              <li>Generates visual guidance: "If you love Biology + Empathy → STEM → Healthcare or Biotech."</li>
              <li>Simulates pathway outcomes: “Choosing STEM opens 150+ careers; strongest demand: AI, medicine, green tech.”</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-200">3. CBC Portfolio Evaluator</h4>
             <ul className="list-disc list-inside mt-2 text-sm space-y-1">
              <li>Allows students to log projects and soft skills evidence.</li>
              <li>AI interprets data and builds a competency profile (creativity, leadership, etc.).</li>
              <li>Suggests next steps: “You led a drama club → build public speaking → explore journalism or law.”</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-200">4. Parent/Guardian Mode</h4>
             <ul className="list-disc list-inside mt-2 text-sm space-y-1">
              <li>Simple CBC walkthrough: "What is CBC?", "How do I support my child?".</li>
              <li>View child's progress (strengths, recommended tracks, deadlines).</li>
              <li>Receive SMS/WhatsApp/email reminders for key dates.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-200">5. Teacher Mode</h4>
             <ul className="list-disc list-inside mt-2 text-sm space-y-1">
              <li>Generate CBC-aligned quizzes, lesson plans, and assessment rubrics.</li>
              <li>Auto-map activities to competencies.</li>
              <li>Access class-wide dashboards showing competency gaps and strengths.</li>
              <li>Get AI coaching tips for classroom activities.</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="border-t border-slate-700 pt-6">
        <h3 className="text-xl font-semibold mb-4">Technologies to Use</h3>
        <div className="space-y-4">
            <div>
                <h4 className="font-bold text-slate-200">Genkit + Gemini</h4>
                <p className="text-sm">Power conversations, explanations, and multilingual support (English, Kiswahili, French). Use retrieval-augmented generation (RAG) to pull in curriculum guides and local career data.</p>
            </div>
             <div>
                <h4 className="font-bold text-slate-200">ADK (Agent Development Kit)</h4>
                <p className="text-sm">Implement modular agents (CompetencyAgent, PathwayAdvisorAgent, ParentExplainerAgent, etc.) that delegate and reason with each other for personalization.</p>
            </div>
             <div>
                <h4 className="font-bold text-slate-200">Vertex AI + Firestore</h4>
                <p className="text-sm">Store user profiles, scores, and assessments. Feed data into Vertex pipelines for real-time analysis and AI recommendations.</p>
            </div>
        </div>
      </div>
      
      <div className="border-t border-slate-700 pt-6">
        <h3 className="text-xl font-semibold mb-2">CBC & African Education Context Integration</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
            <li>Integrate CBC structure (2–6–3–3), pathways, and assessment style.</li>
            <li>Include virtual labs or STEM simulators for rural learners.</li>
            <li>Provide offline-first options for under-resourced schools.</li>
            <li>Map CBC subjects to 350+ careers using official data.</li>
        </ul>
      </div>

    </div>
  );
};

export default ArchitecturePage;
