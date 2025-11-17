import React, { useState, useMemo } from 'react';

const allMentors = [
    { name: 'Dr. Evelyn Asiedu', title: 'Senior Data Scientist', expertise: 'AI & Machine Learning', countryFocus: 'Ghana', online: true, resourceUrl: 'https://www.coursera.org/browse/data-science/machine-learning' },
    { name: 'Chike Okafor', title: 'Fintech Founder', expertise: 'Mobile Payments', countryFocus: 'Nigeria', online: false, resourceUrl: 'https://www.edx.org/learn/fintech' },
    { name: 'Amina Yusuf', title: 'BioTech Researcher', expertise: 'AgriTech', countryFocus: 'Kenya', online: true, resourceUrl: 'https://online.cornell.edu/technologies-for-sustainable-agrifood-systems' },
    { name: 'Samuel Chen', title: 'Renewable Energy Engineer', expertise: 'Renewable Energy', countryFocus: 'South Africa', online: true, resourceUrl: 'https://www.tudelft.nl/en/online-learning/vakgebieden/energy-transition' },
    { name: 'Fatima Al-Jabir', title: 'Cybersecurity Analyst', expertise: 'Cybersecurity', countryFocus: 'Egypt', online: false, resourceUrl: 'https://www.coursera.org/specializations/google-cybersecurity' },
    { name: 'David Obinna', title: 'EdTech CEO', expertise: 'EdTech', countryFocus: 'Nigeria', online: true, resourceUrl: 'https://www.coursera.org/courses?query=educational%20technology' },
    { name: 'Maria Santos', title: 'HealthTech Innovator', expertise: 'HealthTech', countryFocus: 'Angola', online: false, resourceUrl: 'https://www.edx.org/learn/health-technology' },
    { name: 'Kwame Appiah', title: 'Logistics Tech Lead', expertise: 'Logistics & Supply Chain', countryFocus: 'Ghana', online: true, resourceUrl: 'https://www.coursera.org/specializations/supply-chain-management' },
];

const MentorCard: React.FC<{ name: string; title: string; expertise: string; countryFocus: string; online: boolean; resourceUrl: string; }> = ({ name, title, expertise, countryFocus, online, resourceUrl }) => (
    <div className="bg-slate-700/50 p-4 rounded-lg text-center relative transition-all hover:scale-105 hover:bg-slate-700">
        {online && <div title="Online" className="absolute top-3 right-3 h-3 w-3 rounded-full bg-green-400 border-2 border-slate-700/50 animate-pulse"></div>}
        <div className="w-20 h-20 rounded-full bg-slate-600 mx-auto mb-3 flex items-center justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        </div>
        <h4 className="font-bold text-slate-200">{name}</h4>
        <p className="text-sm text-cyan-400">{title}</p>
        <p className="text-xs text-slate-400 mt-1">Expertise: {expertise}</p>
        <p className="text-xs text-slate-400 mt-1">Focus: {countryFocus}</p>
        <a 
            href={resourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block w-full px-3 py-1.5 text-xs font-semibold bg-cyan-600 hover:bg-cyan-700 text-white rounded-md transition-colors text-center"
        >
            Explore Learning Resources
        </a>
    </div>
);

const CommunityPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [expertiseFilter, setExpertiseFilter] = useState('all');
    const [countryFilter, setCountryFilter] = useState('all');
    const [onlineOnlyFilter, setOnlineOnlyFilter] = useState(false);

    const expertiseOptions = useMemo(() => ['all', ...Array.from(new Set(allMentors.map(m => m.expertise)))], []);
    const countryOptions = useMemo(() => ['all', ...Array.from(new Set(allMentors.map(m => m.countryFocus)))], []);
    
    const filteredMentors = useMemo(() => {
        return allMentors.filter(mentor => {
            const nameMatch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase());
            const expertiseMatch = expertiseFilter === 'all' || mentor.expertise === expertiseFilter;
            const countryMatch = countryFilter === 'all' || mentor.countryFocus === countryFilter;
            const onlineMatch = !onlineOnlyFilter || mentor.online;
            return nameMatch && expertiseMatch && countryMatch && onlineMatch;
        });
    }, [searchTerm, expertiseFilter, countryFilter, onlineOnlyFilter]);


  return (
    <div className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-slate-700 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-cyan-300">Community & Mentorship Hub</h2>
        <p className="text-slate-400 mt-1">Connect, learn, and grow with peers and experts in Africa's STEM ecosystem.</p>
      </div>

      <div className="border-t border-slate-700 pt-6">
        <h3 className="text-xl font-semibold mb-4">Find a Mentor</h3>
        <div className="space-y-4 mb-6 p-4 bg-slate-700/30 rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                 <input 
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="col-span-1 sm:col-span-2 lg:col-span-1 bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                />
                <select
                    value={expertiseFilter}
                    onChange={(e) => setExpertiseFilter(e.target.value)}
                    className="col-span-1 bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                >
                    <option value="all">All Fields of Expertise</option>
                    {expertiseOptions.filter(o => o !== 'all').map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                 <select
                    value={countryFilter}
                    onChange={(e) => setCountryFilter(e.target.value)}
                    className="col-span-1 bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                >
                    <option value="all">All Country Focuses</option>
                    {countryOptions.filter(o => o !== 'all').map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            </div>
             <div className="flex items-center justify-end">
                <label className="flex items-center space-x-2 text-sm text-slate-300 cursor-pointer">
                    <input 
                        type="checkbox"
                        checked={onlineOnlyFilter}
                        onChange={(e) => setOnlineOnlyFilter(e.target.checked)}
                        className="h-4 w-4 rounded bg-slate-600 border-slate-500 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span>Show Online Only</span>
                </label>
            </div>
        </div>
        
        {filteredMentors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredMentors.map(mentor => <MentorCard key={mentor.name} {...mentor} />)}
            </div>
        ) : (
            <p className="text-center text-slate-400 py-8">No mentors found matching your criteria.</p>
        )}
      </div>
      
      <div className="border-t border-slate-700 pt-6">
        <h3 className="text-xl font-semibold mb-4">Popular Discussion Forums</h3>
        <div className="space-y-3">
            <div className="bg-slate-700/50 p-4 rounded-lg flex justify-between items-center">
                <div>
                    <h4 className="font-semibold text-slate-300">#agritech-innovations</h4>
                    <p className="text-sm text-slate-400">Discussing new tech in African agriculture.</p>
                </div>
                <button className="px-4 py-2 text-sm font-semibold bg-slate-600 hover:bg-slate-500 rounded-md transition-colors">
                    Join
                </button>
            </div>
             <div className="bg-slate-700/50 p-4 rounded-lg flex justify-between items-center">
                <div>
                    <h4 className="font-semibold text-slate-300">#renewable-energy-east-africa</h4>
                    <p className="text-sm text-slate-400">Challenges and opportunities in solar and wind power.</p>
                </div>
                <button className="px-4 py-2 text-sm font-semibold bg-slate-600 hover:bg-slate-500 rounded-md transition-colors">
                    Join
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;