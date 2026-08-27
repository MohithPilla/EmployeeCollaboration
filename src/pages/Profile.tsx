import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Clock, 
  MessageSquare, 
  ThumbsUp, 
  Calendar,
  Award,
  Briefcase,
  Users,
  Edit
} from 'lucide-react';
import { mockUsers } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

export function Profile() {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  // If no userId provided, show current user's profile
  const profileUser = userId ? mockUsers.find(u => u.id === userId) : currentUser;
  const isOwnProfile = !userId || currentUser?.id === userId;

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">User not found</h2>
          <p className="mt-2 text-gray-600">The profile you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const formatLastActive = (lastActive: string) => {
    const date = new Date(lastActive);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Active now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'projects', label: 'Projects' },
    { id: 'endorsements', label: 'Endorsements' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8 animate-fade-in">
          <div className="h-32 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
              <div className="relative -mt-16 mb-4 sm:mb-0">
                <img
                  src={profileUser.avatar || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'}
                  alt={profileUser.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 border-white ${
                  profileUser.isAvailable ? 'bg-success-500' : 'bg-gray-400'
                }`}></div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{profileUser.name}</h1>
                    <p className="text-lg text-gray-600 capitalize">{profileUser.role}</p>
                    <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {profileUser.department}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatLastActive(profileUser.lastActive)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                    {!isOwnProfile && (
                      <>
                        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200">
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          Endorse
                        </button>
                        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </button>
                      </>
                    )}
                    {isOwnProfile && (
                      <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center animate-fade-in">
            <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mx-auto mb-3">
              <Star className="h-6 w-6 text-primary-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{profileUser.rating}</p>
            <p className="text-sm text-gray-600">Rating</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center animate-fade-in">
            <div className="flex items-center justify-center w-12 h-12 bg-secondary-100 rounded-full mx-auto mb-3">
              <Briefcase className="h-6 w-6 text-secondary-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{profileUser.projects.length}</p>
            <p className="text-sm text-gray-600">Projects</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center animate-fade-in">
            <div className="flex items-center justify-center w-12 h-12 bg-accent-100 rounded-full mx-auto mb-3">
              <Users className="h-6 w-6 text-accent-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{profileUser.endorsements.length}</p>
            <p className="text-sm text-gray-600">Endorsements</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center animate-fade-in">
            <div className="flex items-center justify-center w-12 h-12 bg-success-100 rounded-full mx-auto mb-3">
              <Award className="h-6 w-6 text-success-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{profileUser.skills.length}</p>
            <p className="text-sm text-gray-600">Skills</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 animate-fade-in">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Skills */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills & Expertise</h3>
                  <div className="flex flex-wrap gap-3">
                    {profileUser.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary-100 text-primary-800 hover:bg-primary-200 transition-colors duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Email:</span>
                        <span className="ml-2 text-sm text-gray-900">{profileUser.email}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Department:</span>
                        <span className="ml-2 text-sm text-gray-900">{profileUser.department}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Status:</span>
                        <span className={`ml-2 text-sm ${profileUser.isAvailable ? 'text-success-600' : 'text-gray-500'}`}>
                          {profileUser.isAvailable ? 'Available' : 'Busy'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-6">
                {profileUser.projects.length > 0 ? (
                  profileUser.projects.map((project) => (
                    <div
                      key={project.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow duration-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900">{project.title}</h4>
                          <p className="text-gray-600 mt-2">{project.description}</p>
                          <div className="flex items-center mt-4 space-x-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              project.status === 'active' 
                                ? 'bg-success-100 text-success-800'
                                : project.status === 'completed'
                                ? 'bg-primary-100 text-primary-800'
                                : 'bg-warning-100 text-warning-800'
                            }`}>
                              {project.status}
                            </span>
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="h-4 w-4 mr-1" />
                              Due {new Date(project.deadline).toLocaleDateString()}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Users className="h-4 w-4 mr-1" />
                              {project.participants.length} members
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
                    <p className="text-gray-600">
                      {isOwnProfile ? "You haven't joined any projects yet." : `${profileUser.name} hasn't joined any projects yet.`}
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'endorsements' && (
              <div className="text-center py-8">
                <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No endorsements yet</h3>
                <p className="text-gray-600">
                  {isOwnProfile ? "You haven't received any endorsements yet." : `${profileUser.name} hasn't received any endorsements yet.`}
                </p>
                {!isOwnProfile && (
                  <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Be the first to endorse
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}