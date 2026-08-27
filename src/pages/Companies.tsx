import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Building2, 
  MapPin, 
  Users, 
  Globe, 
  Calendar,
  ArrowRight,
  TrendingUp,
  Award,
  Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockCompanies, mockUsers } from '../data/mockData';

export function Companies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');

  const industries = [...new Set(mockCompanies.map(company => company.industry))];

  const filteredCompanies = mockCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesIndustry = !selectedIndustry || company.industry === selectedIndustry;
    
    return matchesSearch && matchesIndustry;
  });

  const getCompanyEmployees = (companyId: string) => {
    return mockUsers.filter(user => user.companyId === companyId);
  };

  const getCompanyStats = (companyId: string) => {
    const employees = getCompanyEmployees(companyId);
    const departments = [...new Set(employees.map(emp => emp.department))];
    const avgRating = employees.reduce((sum, emp) => sum + emp.rating, 0) / employees.length;
    
    return {
      employeeCount: employees.length,
      departmentCount: departments.length,
      avgRating: avgRating.toFixed(1)
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Company Directory
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Explore organizations and discover collaboration opportunities across the enterprise network.
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-4 py-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">
                    {filteredCompanies.length} Active Organizations
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8 animate-fade-in">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Search companies by name, industry, or location..."
                />
              </div>
            </div>

            {/* Industry Filter */}
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 focus:bg-white min-w-[200px]"
            >
              <option value="">All Industries</option>
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <Filter className="h-4 w-4 mr-2" />
              Showing {filteredCompanies.length} of {mockCompanies.length} companies
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>Growth Tracking</span>
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-1" />
                <span>Performance Metrics</span>
              </div>
            </div>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCompanies.map((company, index) => {
            const stats = getCompanyStats(company.id);
            return (
              <div
                key={company.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Company Header */}
                <div className="relative p-8 bg-gradient-to-br from-indigo-50 to-purple-50 border-b border-gray-100">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        src={company.logo || 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop'}
                        alt={company.name}
                        className="w-16 h-16 rounded-xl object-cover shadow-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                        {company.name}
                      </h3>
                      <p className="text-sm font-medium text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full inline-block mt-1">
                        {company.industry}
                      </p>
                      <div className="flex items-center mt-3 space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {company.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Est. {company.founded}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Company Stats */}
                <div className="px-8 py-6">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-lg mx-auto mb-2">
                        <Users className="h-5 w-5 text-indigo-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{stats.employeeCount}</p>
                      <p className="text-xs text-gray-600">Employees</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mx-auto mb-2">
                        <Briefcase className="h-5 w-5 text-purple-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{stats.departmentCount}</p>
                      <p className="text-xs text-gray-600">Departments</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mx-auto mb-2">
                        <Award className="h-5 w-5 text-green-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{stats.avgRating}</p>
                      <p className="text-xs text-gray-600">Avg Rating</p>
                    </div>
                  </div>

                  {/* Company Description */}
                  <p className="text-gray-700 text-sm leading-relaxed mb-6">
                    {company.description}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4">
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                      >
                        <Globe className="h-4 w-4 mr-1" />
                        Website
                      </a>
                    </div>
                    <Link
                      to={`/directory?company=${company.id}`}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      View Employees
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredCompanies.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
              <Building2 className="h-12 w-12 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No companies found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Try adjusting your search terms or filters to find the organizations you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedIndustry('');
              }}
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Enterprise Insights */}
        <div className="mt-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl text-white p-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Enterprise Network Insights</h2>
              <p className="text-indigo-100 mt-1">Real-time collaboration metrics across organizations</p>
            </div>
            <div className="hidden md:block">
              <TrendingUp className="h-12 w-12 text-indigo-200" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-indigo-100">Total Organizations</span>
                <Building2 className="h-5 w-5 text-indigo-200" />
              </div>
              <p className="text-3xl font-bold">{mockCompanies.length}</p>
              <p className="text-xs text-indigo-200 mt-1">Active in network</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-indigo-100">Cross-Company Projects</span>
                <Briefcase className="h-5 w-5 text-indigo-200" />
              </div>
              <p className="text-3xl font-bold">47</p>
              <p className="text-xs text-indigo-200 mt-1">+23% this quarter</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-indigo-100">Collaboration Score</span>
                <Award className="h-5 w-5 text-indigo-200" />
              </div>
              <p className="text-3xl font-bold">9.2</p>
              <p className="text-xs text-indigo-200 mt-1">Industry leading</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}