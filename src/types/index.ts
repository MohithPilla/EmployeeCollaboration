export interface User {
  id: string;
  name: string;
  email: string;
  role: 'manager' | 'employee';
  department: string;
  jobTitle: string;
  workType: 'Technical' | 'Creative' | 'Support' | 'Management';
  experience: number;
  companyId: string;
  avatar?: string;
  skills: string[];
  projects: Project[];
  rating: number;
  isAvailable: boolean;
  lastActive: string;
  endorsements: Endorsement[];
  location: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  employeeCount: number;
  description: string;
  logo?: string;
  founded: string;
  website: string;
}

export interface Post {
  id: string;
  authorId: string;
  title: string;
  content: string;
  tags: string[];
  visibility: 'public' | 'company' | 'department';
  attachments: Attachment[];
  createdAt: string;
  updatedAt: string;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'paused';
  deadline: string;
  participants: string[];
  tags: string[];
}

export interface WorkRequest {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  deadline: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
  createdBy: string;
  companyId: string;
  assignedTo?: string;
  applications: Application[];
  createdAt: string;
}

export interface Application {
  id: string;
  userId: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: Message;
  unreadCount: number;
}

export interface Endorsement {
  id: string;
  fromUserId: string;
  skill: string;
  message: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'message' | 'request' | 'endorsement' | 'project';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}