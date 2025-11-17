
import React from 'react';

const learningResources = [
    {
        title: 'AI & Machine Learning',
        description: 'Dive into data science, machine learning, and AI with courses from top universities and companies.',
        platform: 'Coursera',
        url: 'https://www.coursera.org/browse/data-science/machine-learning',
        icon: '🧠'
    },
    {
        title: 'Fintech & Mobile Payments',
        description: 'Learn about the technology driving financial innovation in Africa and beyond.',
        platform: 'edX',
        url: 'https://www.edx.org/learn/fintech',
        icon: '💳'
    },
    {
        title: 'AgriTech',
        description: 'Explore sustainable agrifood systems and the technology transforming agriculture.',
        platform: 'Cornell University',
        url: 'https://online.cornell.edu/technologies-for-sustainable-agrifood-systems',
        icon: '🌱'
    },
    {
        title: 'Renewable Energy',
        description: 'Understand the engineering and policy behind the transition to renewable energy sources.',
        platform: 'TU Delft',
        url: 'https://www.tudelft.nl/en/online-learning/vakgebieden/energy-transition',
        icon: '⚡️'
    },
    {
        title: 'Cybersecurity',
        description: 'Get professional training from Google to start your career in cybersecurity.',
        platform: 'Google / Coursera',
        url: 'https://www.coursera.org/specializations/google-cybersecurity',
        icon: '🔒'
    },
    {
        title: 'Educational Technology (EdTech)',
        description: 'Discover how technology is reshaping education and creating new learning opportunities.',
        platform: 'Coursera',
        url: 'https://www.coursera.org/courses?query=educational%20technology',
        icon: '📚'
    },
    {
        title: 'HealthTech',
        description: 'Learn about the intersection of healthcare and technology to improve patient outcomes.',
        platform: 'edX',
        url: 'https://www.edx.org/learn/health-technology',
        icon: '❤️‍🩹'
    },
    {
        title: 'Logistics & Supply Chain Tech',
        description: 'Master the fundamentals of modern supply chain management and logistics.',
        platform: 'Coursera',
        url: 'https://www.coursera.org/specializations/supply-chain-management',
        icon: '🚚'
    },
];

const ResourceCard: React.FC<{ title: string; description: string; platform: string; url: string; icon: string; }> = ({ title, description, platform, url, icon }) => (
    <div className="bg-slate-700/50 p-6 rounded-lg flex flex-col transition-all hover:scale-105 hover:bg-slate-700">
        <div className="flex-grow">
            <div className="text-3xl mb-3">{icon}</div>
            <h4 className="font-bold text-slate-200 text-lg">{title}</h4>
            <p className="text-sm text-slate-400 mt-2">{description}</p>
        </div>
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 block w-full px-4 py-2 text-sm font-semibold bg-cyan-600 hover:bg-cyan-700 text-white rounded-md transition-colors text-center"
        >
            Learn on {platform}
        </a>
    </div>
);

const ResourceHub: React.FC = () => {
  return (
    <div className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-slate-700 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-cyan-300">Learning Resource Hub</h2>
        <p className="text-slate-400 mt-1">Explore curated, high-quality resources to build skills for the future.</p>
      </div>

      <div className="border-t border-slate-700 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningResources.map(resource => <ResourceCard key={resource.title} {...resource} />)}
        </div>
      </div>
    </div>
  );
};

export default ResourceHub;
