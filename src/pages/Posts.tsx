import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal,
  Tag,
  Clock,
  Building2,
  Eye,
  TrendingUp,
  Users,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockPosts, mockUsers, mockCompanies } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

export function Posts() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedVisibility, setSelectedVisibility] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const allTags = [...new Set(mockPosts.flatMap(post => post.tags))];

  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    const matchesVisibility = !selectedVisibility || post.visibility === selectedVisibility;
    
    let matchesTab = true;
    if (activeTab === 'my-posts') {
      matchesTab = post.authorId === user?.id;
    }
    
    return matchesSearch && matchesTag && matchesVisibility && matchesTab;
  });

  const getAuthor = (authorId: string) => {
    return mockUsers.find(u => u.id === authorId);
  };

  const getCompany = (companyId: string) => {
    return mockCompanies.find(c => c.id === companyId);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  const getVisibilityColor = (visibility: string) => {
    switch (visibility) {
      case 'public':
        return 'bg-green-100 text-green-800';
      case 'company':
        return 'bg-blue-100 text-blue-800';
      case 'department':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'all', label: 'All Posts', count: mockPosts.length },
    { id: 'my-posts', label: 'My Posts', count: mockPosts.filter(p => p.authorId === user?.id).length },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Community Posts
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Share knowledge, collaborate, and stay connected with your professional network.
            </p>
          </div>
          <Link
            to="/posts/create"
            className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Post
          </Link>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8 animate-fade-in">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-gray-100 text-gray-600">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Search and Filters */}
          <div className="p-6">
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
                    placeholder="Search posts by title, content, or tags..."
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex space-x-4">
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                >
                  <option value="">All Tags</option>
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>

                <select
                  value={selectedVisibility}
                  onChange={(e) => setSelectedVisibility(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                >
                  <option value="">All Visibility</option>
                  <option value="public">Public</option>
                  <option value="company">Company</option>
                  <option value="department">Department</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex items-center text-sm text-gray-600">
              <Filter className="h-4 w-4 mr-2" />
              Showing {filteredPosts.length} of {mockPosts.length} posts
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {filteredPosts.map((post, index) => {
            const author = getAuthor(post.authorId);
            const company = author ? getCompany(author.companyId) : null;
            
            return (
              <div
                key={post.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Post Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <img
                        src={author?.avatar || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop'}
                        alt={author?.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">{author?.name}</h3>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getVisibilityColor(post.visibility)}`}>
                            {post.visibility}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                          <span>{author?.jobTitle}</span>
                          <span>•</span>
                          <div className="flex items-center">
                            <Building2 className="h-3 w-3 mr-1" />
                            {company?.name}
                          </div>
                          <span>•</span>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatTimeAgo(post.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Post Content */}
                <div className="px-6 pb-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Post Actions */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors duration-200">
                        <Heart className="h-5 w-5" />
                        <span className="text-sm font-medium">{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                        <MessageCircle className="h-5 w-5" />
                        <span className="text-sm font-medium">{post.comments.length}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors duration-200">
                        <Share2 className="h-5 w-5" />
                        <span className="text-sm font-medium">Share</span>
                      </button>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Eye className="h-4 w-4 mr-1" />
                      <span>{post.likes * 3 + 15} views</span>
                    </div>
                  </div>
                </div>

                {/* Comments Preview */}
                {post.comments.length > 0 && (
                  <div className="px-6 py-4 border-t border-gray-100">
                    <div className="space-y-3">
                      {post.comments.slice(0, 2).map((comment) => {
                        const commentAuthor = getAuthor(comment.authorId);
                        return (
                          <div key={comment.id} className="flex items-start space-x-3">
                            <img
                              src={commentAuthor?.avatar || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop'}
                              alt={commentAuthor?.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="bg-gray-50 rounded-lg px-3 py-2">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="text-sm font-medium text-gray-900">{commentAuthor?.name}</span>
                                  <span className="text-xs text-gray-500">{formatTimeAgo(comment.createdAt)}</span>
                                </div>
                                <p className="text-sm text-gray-700">{comment.content}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      {post.comments.length > 2 && (
                        <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                          View all {post.comments.length} comments
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
              <FileText className="h-12 w-12 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {activeTab === 'my-posts' 
                ? "You haven't created any posts yet. Share your knowledge with the community!"
                : "Try adjusting your search terms or filters to find the content you're looking for."
              }
            </p>
            <div className="space-x-4">
              {activeTab !== 'my-posts' && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedTag('');
                    setSelectedVisibility('');
                  }}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                >
                  Clear Filters
                </button>
              )}
              <Link
                to="/posts/create"
                className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Post
              </Link>
            </div>
          </div>
        )}

        {/* Community Insights */}
        <div className="mt-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl text-white p-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Community Insights</h2>
              <p className="text-indigo-100 mt-1">Engagement and collaboration metrics</p>
            </div>
            <div className="hidden md:block">
              <TrendingUp className="h-12 w-12 text-indigo-200" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-indigo-100">Total Posts</span>
                <FileText className="h-5 w-5 text-indigo-200" />
              </div>
              <p className="text-3xl font-bold">{mockPosts.length}</p>
              <p className="text-xs text-indigo-200 mt-1">Community contributions</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-indigo-100">Total Engagement</span>
                <Heart className="h-5 w-5 text-indigo-200" />
              </div>
              <p className="text-3xl font-bold">
                {mockPosts.reduce((sum, post) => sum + post.likes + post.comments.length, 0)}
              </p>
              <p className="text-xs text-indigo-200 mt-1">Likes and comments</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-indigo-100">Active Contributors</span>
                <Users className="h-5 w-5 text-indigo-200" />
              </div>
              <p className="text-3xl font-bold">
                {new Set(mockPosts.map(post => post.authorId)).size}
              </p>
              <p className="text-xs text-indigo-200 mt-1">Unique authors</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}