
export const HIGH_SCHOOL_QUESTIONS = [
  {
    id: 'subjects',
    text: 'Which subjects do you enjoy the most or perform best in?',
    options: [
      'Sciences (Biology, Chemistry, Physics)',
      'Mathematics and Computer Studies',
      'Languages and Humanities (English, History, Geography)',
      'Business and Commerce',
      'Technical and Creative Arts (Art, Music, Design)',
    ],
  },
  {
    id: 'activities',
    text: 'Outside of class, what kind of activities are you drawn to?',
    options: [
      'Science clubs, coding competitions, or fixing electronics.',
      'Debating, writing for the school magazine, or volunteering.',
      'Sports teams, student government, or organizing events.',
      'Building things, drawing, or playing a musical instrument.',
    ],
  },
  {
    id: 'problem_solving_style',
    text: 'When you face a challenging problem, you prefer to:',
    options: [
      'Research and analyze data to find a logical answer.',
      'Collaborate with others and brainstorm ideas.',
      'Experiment with hands-on solutions.',
      'Follow a structured plan to solve it step-by-step.',
    ],
  },
  {
    id: 'future_interest',
    text: 'What kind of future work environment seems most appealing?',
    options: [
      'A fast-paced tech company or a research lab.',
      'An NGO, a government office, or a school.',
      'A business setting, like a bank or a startup.',
      'A creative studio, a workshop, or working outdoors.',
    ],
  },
  {
    id: 'uncertainty',
    text: 'How clear are you about what university/college courses you want to take?',
    options: [
      'Very clear, I have a specific course in mind.',
      'Somewhat clear, I have a few options I am considering.',
      'Not very clear, I am exploring different fields.',
      "I'm not sure at all and need help exploring what's out there.",
    ],
  },
];

export const UNIVERSITY_QUESTIONS = [
    {
        id: 'major',
        text: 'What is your primary field of study (major)?',
        options: [
            'Computer Science / IT',
            'Engineering (Civil, Electrical, Mechanical, etc.)',
            'Health Sciences (Medicine, Nursing, Pharmacy)',
            'Business / Economics / Finance',
            'Social Sciences / Arts / Law'
        ]
    },
    {
        id: 'skills',
        text: 'Which of these technical skills are you most comfortable with?',
        options: [
            'Programming (e.g., Python, JavaScript, Java)',
            'Data Analysis (e.g., SQL, R, Spreadsheets)',
            'Lab Techniques / Scientific Research',
            'Financial Modeling / Business Analysis',
            'Writing / Communication / Public Speaking'
        ]
    },
    {
        id: 'projects',
        text: 'What types of projects do you enjoy most?',
        options: [
            'Building a software application or a website.',
            'Conducting research and writing a detailed report.',
            'Developing a business plan or a marketing strategy.',
            'Working on a hands-on engineering or design challenge.',
            'Organizing a community project or an event.'
        ]
    },
    {
        id: 'preferred_role_type',
        text: 'After graduation, what kind of role are you leaning towards?',
        options: [
            'A technical, hands-on role (e.g., developer, engineer).',
            'A research or academic-focused role.',
            'A business or client-facing role (e.g., consultant, analyst).',
            'A leadership or management track role.',
            'A role in public service or a non-profit organization.'
        ]
    }
];

export const ADULT_QUESTIONS = [
    {
        id: 'current_industry',
        text: 'What industry are you currently working in?',
        options: [
            'Technology / IT',
            'Healthcare',
            'Finance / Banking',
            'Retail / Customer Service',
            'Education / Public Sector / NGO',
            'Other'
        ]
    },
    {
        id: 'years_experience',
        text: 'How many years of professional experience do you have?',
        options: [
            '0-2 years',
            '3-5 years',
            '6-10 years',
            '10+ years'
        ]
    },
    {
        id: 'top_skill',
        text: 'What is your strongest professional skill?',
        options: [
            'Technical skills (e.g., coding, data analysis, engineering)',
            'Management and leadership',
            'Sales and customer relations',
            'Operations and project management',
            'Communication and strategic planning'
        ]
    },
    {
        id: 'aspiration',
        text: 'What is your primary goal for a career change or advancement?',
        options: [
            'Move into a leadership position.',
            'Transition to a more technical, future-proof field like AI or data science.',
            'Find a role with a greater social impact.',
            'Increase my earning potential significantly.',
            'Achieve a better work-life balance.'
        ]
    }
];

export const CBC_ASSESSMENT_QUESTIONS = [
    {
        id: 'creativity',
        text: 'When telling a story or building with blocks, the child tends to...',
        options: [
            'Create detailed, imaginative worlds and complex structures.',
            'Focus on recreating real-life things they have seen.',
            'Enjoy the process but keep their creations simple.',
            'Prefer following instructions from a kit or book.',
        ],
    },
    {
        id: 'problem_solving',
        text: 'When a toy breaks or a game is challenging, the child usually...',
        options: [
            'Tries to figure out the problem systematically, testing different solutions.',
            'Asks an adult or older child for help right away.',
            'Gets frustrated and quickly moves to a different activity.',
            'Experiments randomly until something works by chance.',
        ],
    },
    {
        id: 'numeracy',
        text: 'How does the child engage with numbers, shapes, and patterns?',
        options: [
            'Enjoys counting, sorting objects, and noticing patterns in their environment.',
            'Can count when asked but doesn\'t show spontaneous interest.',
            'Is more interested in words and stories than in numbers.',
            'Finds activities involving numbers to be challenging.',
        ],
    },
    {
        id: 'collaboration',
        text: 'During group play, this child is most likely to...',
        options: [
            'Organize the game, suggest rules, and help others.',
            'Happily participate and follow the group\'s lead.',
            'Play alongside others but remain focused on their own task.',
            'Prefer to play alone.',
        ],
    },
    {
        id: 'digital_literacy',
        text: 'When using a tablet or phone, the child...',
        options: [
            'Independently explores new apps and can follow instructional videos.',
            'Can use familiar apps but needs help to find new things.',
            'Mostly watches videos and is passive.',
            'Has little experience or interest in using digital devices.',
        ],
    },
];
