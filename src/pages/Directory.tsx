import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Clock, 
  MessageSquare, 
  ThumbsUp,
  Building2,
  Briefcase,
  Award,
  Users,
  TrendingUp
} from 'lucide-react';
import { mockUsers, mockCompanies } from '../data/mockData';
import { User } from '../types';
import { Link } from 'react-router-dom';

export function Directory() {
  const [searchParams] = useSearchParams();
  const preselectedCompany = searchParams.get('company');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(preselectedCompany || '');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedWorkType, setSelectedWorkType] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [users] = useState<User[]>(mockUsers);

  const companies = mockCompanies;
  const departments = [...new Set(users.map(user => user.department))];
  const workTypes = [...new Set(users.map(user => user.workType))];
  const allSkills = [...new Set(users.flatMap(user => user.skills))];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCompany = !selectedCompany || user.companyId === selectedCompany;
    const matchesDepartment = !selectedDepartment || user.department === selectedDepartment;
    const matchesWorkType = !selectedWorkType || user.workType === selectedWorkType;
    const matchesSkill = !selectedSkill || user.skills.includes(selectedSkill);
    
    let matchesExperience = true;
    if (selectedExperience) {
      switch (selectedExperience) {
        case 'junior':
          matchesExperience = user.experience <= 2;
          break;
        case 'mid':
          matchesExperience = user.experience >= 3 && user.experience <= 5;
          break;
        case 'senior':
          matchesExperience = user.experience >= 6;
          break;
      }
    }
    
    return matchesSearch && matchesCompany && matchesDepartment && matchesWorkType && matchesSkill && matchesExperience;
  });

  const formatLastActive = (lastActive: string) => {
    const date = new Date(lastActive);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Active now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  const getCompanyName = (companyId: string) => {
    const company = companies.find(c => c.id === companyId);
    return company?.name || 'Unknown Company';
  };

  const getExperienceLevel = (years: number) => {
    if (years <= 2) return 'Junior';
    if (years <= 5) return 'Mid-Level';
    return 'Senior';
  };

  const getExperienceColor = (years: number) => {
    if (years <= 2) return 'bg-green-100 text-green-800';
    if (years <= 5) return 'bg-blue-100 text-blue-800';
    return 'bg-purple-100 text-purple-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Employee Directory
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Discover talent, expertise, and collaboration opportunities across the enterprise network.
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-4 py-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">
                    {filteredUsers.length} Active Professionals
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8 animate-fade-in">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 focus:bg-white text-lg"
                placeholder="Search by name, role, skills, or expertise..."
              />
            </div>
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            >
              <option value="">All Companies</option>
              {companies.map(company => (
                <option key={company.id} value={company.id}>{company.name}</option>
              ))}
            </select>

            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <select
              value={selectedWorkType}
              onChange={(e) => setSelectedWorkType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            >
              <option value="">All Work Types</option>
              {workTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            >
              <option value="">All Experience</option>
              <option value="junior">Junior (0-2 years)</option>
              <option value="mid">Mid-Level (3-5 years)</option>
              <option value="senior">Senior (6+ years)</option>
            </select>

            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            >
              <option value="">All Skills</option>
              {allSkills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>

            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCompany('');
                setSelectedDepartment('');
                setSelectedWorkType('');
                setSelectedExperience('');
                setSelectedSkill('');
              }}
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200 font-medium"
            >
              Clear All
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <Filter className="h-4 w-4 mr-2" />
              Showing {filteredUsers.length} of {users.length} professionals
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>Skills Analytics</span>
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-1" />
                <span>Performance Tracking</span>
              </div>
            </div>
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user, index) => (
            <div
              key={user.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* User Header */}
              <div className="relative p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-b border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <img
                      src={user.avatar || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop'}
                      alt={user.name}
                      className="w-16 h-16 rounded-full object-cover shadow-lg"
                    />
                    <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                      user.isAvailable ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                      {user.name}
                    </h3>
                    <p className="text-sm font-medium text-indigo-600">{user.jobTitle}</p>
                    <div className="flex items-center mt-2 space-x-2 text-xs text-gray-600">
                      <div className="flex items-center">
                        <Building2 className="h-3 w-3 mr-1" />
                        {getCompanyName(user.companyId)}
                      </div>
                      <span>•</span>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {user.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Details */}
              <div className="p-6">
                {/* Stats Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium text-gray-900">{user.rating}</span>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getExperienceColor(user.experience)}`}>
                      {getExperienceLevel(user.experience)} • {user.experience}y
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatLastActive(user.lastActive)}
                  </div>
                </div>

                {/* Department and Work Type */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    <Briefcase className="h-3 w-3 mr-1" />
                    {user.department}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {user.workType}
                  </span>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {user.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                      >
                        {skill}
                      </span>
                    ))}
                    {user.skills.length > 3 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        +{user.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Link
                    to={`/chat/${user.id}`}
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Link>
                  <Link
                    to={`/profile/${user.id}`}
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
              <Users className="h-12 w-12 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No professionals found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Try adjusting your search terms or filters to find the talent you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCompany('');
                setSelectedDepartment('');
                setSelectedWorkType('');
                setSelectedExperience('');
                setSelectedSkill('');
              }}
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Directory Insights */}
        <div className="mt-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl text-white p-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Directory Insights</h2>
              <p className="text-indigo-100 mt-1">Real-time talent analytics and trends</p>
            </div>
            <div className="hidden md:block">
              <TrendingUp className="h-12 w-12 text-indigo-200" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-indigo-100">Total Professionals</span>
                <Users className="h-5 w-5 text-indigo-200" />
              </div>
              <p className="text-3xl font-bold">{users.length}</p>
              <p className="text-xs text-indigo-200 mt-1">Across all companies</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-indigo-100">Avg Experience</span>
                <Award className="h-5 w-5 text-indigo-200" />
              </div>
              <p className="text-3xl font-bold">
                {Math.round(users.reduce((sum, user) => sum + user.experience, 0) / users.length)}y
              </p>
              <p className="text-xs text-indigo-200 mt-1">Years of expertise</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-indigo-100">Active Now</span>
                <Clock className="h-5 w-5 text-indigo-200" />
              </div>
              <p className="text-3xl font-bold">{users.filter(u => u.isAvailable).length}</p>
              <p className="text-xs text-indigo-200 mt-1">Available for collaboration</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-indigo-100">Avg Rating</span>
                <Star className="h-5 w-5 text-indigo-200" />
              </div>
              <p className="text-3xl font-bold">
                {(users.reduce((sum, user) => sum + user.rating, 0) / users.length).toFixed(1)}
              </p>
              <p className="text-xs text-indigo-200 mt-1">Performance score</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}