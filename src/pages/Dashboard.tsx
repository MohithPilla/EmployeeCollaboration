import React from 'react';
import { 
  Users, 
  MessageSquare, 
  Briefcase, 
  TrendingUp, 
  Calendar, 
  Clock,
  Plus,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Target,
  Award,
  Zap,
  BarChart3,
  DollarSign,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockWorkRequests, mockNotifications } from '../data/mockData';

export function Dashboard() {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Active Projects',
      value: '12',
      icon: Briefcase,
      color: 'text-primary-600',
      bgColor: 'bg-primary-100',
      change: '+23%',
      changeType: 'increase',
      description: 'Cross-functional initiatives'
    },
    {
      title: 'Talent Matches',
      value: '47',
      icon: Users,
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-100',
      change: '+15',
      changeType: 'increase',
      description: 'Skill-based connections'
    },
    {
      title: 'Success Rate',
      value: '94%',
      icon: Target,
      color: 'text-success-600',
      bgColor: 'bg-success-100',
      change: '+8%',
      changeType: 'increase',
      description: 'Project completion rate'
    },
    {
      title: 'ROI Impact',
      value: '$2.4M',
      icon: DollarSign,
      color: 'text-accent-600',
      bgColor: 'bg-accent-100',
      change: '+31%',
      changeType: 'increase',
      description: 'Resource optimization savings'
    },
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'project',
      title: 'AI-Powered Analytics Dashboard launched',
      time: '2 hours ago',
      icon: Zap,
      color: 'text-primary-600',
      priority: 'high'
    },
    {
      id: '2',
      type: 'match',
      title: 'New talent match: React Developer for Frontend Team',
      time: '4 hours ago',
      icon: Users,
      color: 'text-secondary-600',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'success',
      title: 'Mobile App Redesign project completed successfully',
      time: '1 day ago',
      icon: CheckCircle,
      color: 'text-success-600',
      priority: 'low'
    },
    {
      id: '4',
      type: 'message',
      title: 'Cross-department collaboration request received',
      time: '2 days ago',
      icon: MessageSquare,
      color: 'text-accent-600',
      priority: 'medium'
    }
  ];

  const upcomingDeadlines = [
    {
      id: '1',
      title: 'Q1 Digital Transformation Initiative',
      deadline: '2024-03-15',
      priority: 'high' as const,
      daysLeft: 12,
      progress: 78
    },
    {
      id: '2',
      title: 'Enterprise Security Audit',
      deadline: '2024-03-28',
      priority: 'high' as const,
      daysLeft: 25,
      progress: 45
    },
    {
      id: '3',
      title: 'Customer Portal Enhancement',
      deadline: '2024-04-10',
      priority: 'medium' as const,
      daysLeft: 38,
      progress: 62
    }
  ];

  const quickActions = [
    {
      title: 'Post Project Request',
      description: 'Find skilled team members for your initiative',
      icon: Plus,
      color: 'from-primary-600 to-primary-700',
      link: '/projects/new'
    },
    {
      title: 'Browse Talent',
      description: 'Discover expertise across your organization',
      icon: Users,
      color: 'from-secondary-600 to-secondary-700',
      link: '/talent-directory'
    },
    {
      title: 'View Analytics',
      description: 'Track collaboration metrics and ROI',
      icon: BarChart3,
      color: 'from-accent-600 to-accent-700',
      link: '/analytics'
    },
    {
      title: 'Enterprise Settings',
      description: 'Manage organization-wide configurations',
      icon: Globe,
      color: 'from-warning-600 to-warning-700',
      link: '/settings'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Welcome back, {user?.name?.split(' ')[0]}! 
                <span className="inline-block ml-2 animate-bounce">👋</span>
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Your AURA workspace is optimizing collaboration across {user?.department} and beyond.
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-4 py-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Enterprise Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 animate-fade-in group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                    stat.changeType === 'increase' ? 'bg-success-100 text-success-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                to={action.link}
                className="group bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${(index + 4) * 100}ms` }}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600">{action.description}</p>
                <div className="mt-4 flex items-center text-primary-600 group-hover:text-primary-700">
                  <span className="text-sm font-medium">Get started</span>
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 animate-fade-in">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Enterprise Activity Feed</h2>
                  <span className="text-sm text-gray-500">Real-time updates</span>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div 
                        key={activity.id} 
                        className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-colors duration-200"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className={`flex-shrink-0 p-2 rounded-lg ${
                          activity.priority === 'high' ? 'bg-error-100' :
                          activity.priority === 'medium' ? 'bg-warning-100' : 'bg-success-100'
                        }`}>
                          <Icon className={`h-5 w-5 ${activity.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                          <div className="flex items-center mt-1 space-x-2">
                            <p className="text-sm text-gray-500">{activity.time}</p>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              activity.priority === 'high' ? 'bg-error-100 text-error-800' :
                              activity.priority === 'medium' ? 'bg-warning-100 text-warning-800' :
                              'bg-success-100 text-success-800'
                            }`}>
                              {activity.priority}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <Link
                    to="/analytics"
                    className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
                  >
                    View detailed analytics
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 animate-fade-in">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Project Deadlines</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {upcomingDeadlines.map((item, index) => (
                    <div key={item.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-sm font-medium text-gray-900 flex-1">{item.title}</h4>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ml-2 ${
                          item.priority === 'high' 
                            ? 'bg-error-100 text-error-800'
                            : 'bg-warning-100 text-warning-800'
                        }`}>
                          {item.daysLeft} days
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Progress</span>
                          <span>{item.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              item.progress >= 80 ? 'bg-success-500' :
                              item.progress >= 50 ? 'bg-warning-500' : 'bg-error-500'
                            }`}
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          Due {new Date(item.deadline).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enterprise Insights */}
            <div className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl shadow-sm text-white animate-fade-in">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Award className="h-6 w-6 mr-2" />
                  <h2 className="text-lg font-semibold">Enterprise Insights</h2>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Collaboration Score</span>
                      <span className="text-lg font-bold">9.2/10</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Resource Utilization</span>
                      <span className="text-lg font-bold">87%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full" style={{ width: '87%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <Link
                    to="/analytics"
                    className="inline-flex items-center text-sm font-medium text-white hover:text-primary-100 transition-colors duration-200"
                  >
                    View full report
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}