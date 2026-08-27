import { User, WorkRequest, Message, Conversation, Notification, Project, Company, Post } from '../types';

export const mockCompanies: Company[] = [
  {
    id: 'c1',
    name: 'TechCorp Solutions',
    industry: 'Technology',
    location: 'San Francisco, CA',
    employeeCount: 1250,
    description: 'Leading enterprise software solutions provider specializing in cloud infrastructure and AI-powered business intelligence platforms.',
    logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    founded: '2015',
    website: 'https://techcorp.com'
  },
  {
    id: 'c2',
    name: 'InnovateLabs',
    industry: 'Research & Development',
    location: 'Boston, MA',
    employeeCount: 850,
    description: 'Cutting-edge research and development firm focused on biotechnology, renewable energy, and advanced materials science.',
    logo: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    founded: '2018',
    website: 'https://innovatelabs.com'
  },
  {
    id: 'c3',
    name: 'Global Finance Partners',
    industry: 'Financial Services',
    location: 'New York, NY',
    employeeCount: 2100,
    description: 'Premier financial services firm providing investment banking, wealth management, and corporate advisory services to Fortune 500 companies.',
    logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    founded: '2010',
    website: 'https://globalfinance.com'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@techcorp.com',
    role: 'manager',
    department: 'Engineering',
    jobTitle: 'Senior Engineering Manager',
    workType: 'Technical',
    experience: 8,
    companyId: 'c1',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    skills: ['React', 'TypeScript', 'Team Leadership', 'Project Management', 'System Architecture'],
    projects: [
      {
        id: 'p1',
        title: 'Enterprise Dashboard Redesign',
        description: 'Complete UI/UX overhaul of the main enterprise dashboard with modern design principles',
        status: 'active',
        deadline: '2024-03-15',
        participants: ['1', '2', '3'],
        tags: ['React', 'Design', 'UI/UX', 'Enterprise']
      }
    ],
    rating: 4.8,
    isAvailable: true,
    lastActive: '2024-01-15T10:30:00Z',
    endorsements: [],
    location: 'San Francisco, CA'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@techcorp.com',
    role: 'employee',
    department: 'Engineering',
    jobTitle: 'Senior Data Scientist',
    workType: 'Technical',
    experience: 6,
    companyId: 'c1',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'TensorFlow', 'SQL'],
    projects: [
      {
        id: 'p2',
        title: 'AI-Powered Analytics Pipeline',
        description: 'Building automated machine learning pipeline for business intelligence',
        status: 'active',
        deadline: '2024-02-28',
        participants: ['2', '4'],
        tags: ['Python', 'ML', 'Analytics', 'AI']
      }
    ],
    rating: 4.6,
    isAvailable: true,
    lastActive: '2024-01-15T09:45:00Z',
    endorsements: [],
    location: 'San Francisco, CA'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily@innovatelabs.com',
    role: 'employee',
    department: 'Design',
    jobTitle: 'Principal UX Designer',
    workType: 'Creative',
    experience: 7,
    companyId: 'c2',
    avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    skills: ['UI/UX Design', 'Figma', 'Prototyping', 'User Research', 'Design Systems'],
    projects: [],
    rating: 4.9,
    isAvailable: false,
    lastActive: '2024-01-14T16:20:00Z',
    endorsements: [],
    location: 'Boston, MA'
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david@globalfinance.com',
    role: 'employee',
    department: 'Technology',
    jobTitle: 'DevOps Engineer',
    workType: 'Technical',
    experience: 5,
    companyId: 'c3',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Infrastructure'],
    projects: [],
    rating: 4.4,
    isAvailable: true,
    lastActive: '2024-01-15T11:15:00Z',
    endorsements: [],
    location: 'New York, NY'
  },
  {
    id: '5',
    name: 'Lisa Wang',
    email: 'lisa@techcorp.com',
    role: 'employee',
    department: 'Marketing',
    jobTitle: 'Digital Marketing Specialist',
    workType: 'Creative',
    experience: 4,
    companyId: 'c1',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    skills: ['Digital Marketing', 'Content Strategy', 'SEO', 'Social Media', 'Analytics'],
    projects: [],
    rating: 4.3,
    isAvailable: true,
    lastActive: '2024-01-15T08:30:00Z',
    endorsements: [],
    location: 'San Francisco, CA'
  }
];

export const mockPosts: Post[] = [
  {
    id: 'post1',
    authorId: '1',
    title: 'Looking for Frontend Developers for New Enterprise Project',
    content: 'We\'re launching a new enterprise dashboard project and need experienced React developers. This is a great opportunity to work with cutting-edge technologies and contribute to a product used by thousands of users daily.',
    tags: ['React', 'Frontend', 'Enterprise', 'Collaboration'],
    visibility: 'public',
    attachments: [],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    likes: 12,
    comments: [
      {
        id: 'comment1',
        authorId: '2',
        content: 'This sounds like an exciting project! I have 6 years of React experience and would love to contribute.',
        createdAt: '2024-01-15T10:30:00Z'
      }
    ]
  },
  {
    id: 'post2',
    authorId: '3',
    title: 'UX Research Best Practices Workshop',
    content: 'I\'m organizing a workshop on modern UX research methodologies. Topics will include user interviews, usability testing, and data-driven design decisions. Open to all departments!',
    tags: ['UX', 'Research', 'Workshop', 'Learning'],
    visibility: 'company',
    attachments: [],
    createdAt: '2024-01-14T14:00:00Z',
    updatedAt: '2024-01-14T14:00:00Z',
    likes: 8,
    comments: []
  }
];

export const mockWorkRequests: WorkRequest[] = [
  {
    id: 'wr1',
    title: 'Senior Frontend Developer - Enterprise Platform',
    description: 'We need an experienced frontend developer to help build our new enterprise e-commerce platform. The project involves creating responsive components, implementing payment integration, and ensuring cross-browser compatibility. This is a high-impact project that will serve thousands of enterprise clients.',
    requiredSkills: ['React', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Enterprise Architecture'],
    deadline: '2024-02-20',
    priority: 'high',
    status: 'open',
    createdBy: '1',
    companyId: 'c1',
    applications: [
      {
        id: 'app1',
        userId: '2',
        message: 'I have extensive experience with React and TypeScript, having worked on similar enterprise projects. I can deliver high-quality, scalable code and have experience with enterprise-grade applications.',
        status: 'pending',
        appliedAt: '2024-01-14T10:00:00Z'
      }
    ],
    createdAt: '2024-01-13T09:00:00Z'
  },
  {
    id: 'wr2',
    title: 'UX Research Lead - Mobile Application',
    description: 'Looking for an experienced UX researcher to conduct comprehensive user research and usability testing for our new mobile application. This includes creating user personas, conducting interviews, analyzing user behavior, and presenting actionable insights to stakeholders.',
    requiredSkills: ['User Research', 'Usability Testing', 'Data Analysis', 'Figma', 'Mobile UX'],
    deadline: '2024-02-10',
    priority: 'medium',
    status: 'open',
    createdBy: '1',
    companyId: 'c2',
    applications: [],
    createdAt: '2024-01-12T14:30:00Z'
  }
];

export const mockMessages: Message[] = [
  {
    id: 'm1',
    senderId: '2',
    recipientId: '1',
    content: 'Hi Sarah, I wanted to discuss the upcoming enterprise project requirements and timeline.',
    timestamp: '2024-01-15T10:30:00Z',
    read: false
  },
  {
    id: 'm2',
    senderId: '1',
    recipientId: '2',
    content: 'Absolutely! Let\'s schedule a meeting for tomorrow to go over the technical specifications.',
    timestamp: '2024-01-15T10:35:00Z',
    read: true
  }
];

export const mockConversations: Conversation[] = [
  {
    id: 'c1',
    participants: ['1', '2'],
    lastMessage: mockMessages[1],
    unreadCount: 1
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    userId: '1',
    type: 'message',
    title: 'New message from Michael Chen',
    message: 'Hi Sarah, I wanted to discuss the upcoming enterprise project requirements.',
    read: false,
    createdAt: '2024-01-15T10:30:00Z',
    actionUrl: '/chat/2'
  },
  {
    id: 'n2',
    userId: '1',
    type: 'request',
    title: 'New application for Frontend Developer position',
    message: 'Michael Chen has applied for your work request.',
    read: false,
    createdAt: '2024-01-14T10:00:00Z',
    actionUrl: '/requests/wr1'
  }
];