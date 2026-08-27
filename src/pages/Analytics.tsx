import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target, 
  DollarSign, 
  Clock,
  Award,
  Zap,
  Globe,
  Filter,
  Download,
  Calendar,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';

export function Analytics() {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  const kpiMetrics = [
    {
      title: 'Total ROI Generated',
      value: '$2.4M',
      change: '+31%',
      trend: 'up',
      description: 'Resource optimization savings',
      icon: DollarSign,
      color: 'text-success-600',
      bgColor: 'bg-success-100'
    },
    {
      title: 'Project Success Rate',
      value: '94%',
      change: '+8%',
      trend: 'up',
      description: 'Completed on time & budget',
      icon: Target,
      color: 'text-primary-600',
      bgColor: 'bg-primary-100'
    },
    {
      title: 'Talent Utilization',
      value: '87%',
      change: '+12%',
      trend: 'up',
      description: 'Employee engagement rate',
      icon: Users,
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-100'
    },
    {
      title: 'Time to Match',
      value: '2.3 days',
      change: '-23%',
      trend: 'down',
      description: 'Average skill matching time',
      icon: Clock,
      color: 'text-accent-600',
      bgColor: 'bg-accent-100'
    }
  ];

  const departmentData = [
    { name: 'Engineering', projects: 45, utilization: 92, satisfaction: 4.8 },
    { name: 'Design', projects: 28, utilization: 89, satisfaction: 4.7 },
    { name: 'Marketing', projects: 32, utilization: 85, satisfaction: 4.6 },
    { name: 'Sales', projects: 19, utilization: 78, satisfaction: 4.5 },
    { name: 'Operations', projects: 23, utilization: 82, satisfaction: 4.4 }
  ];

  const skillDemand = [
    { skill: 'React/Frontend', demand: 95, supply: 78, gap: 17 },
    { skill: 'Data Analysis', demand: 88, supply: 92, gap: -4 },
    { skill: 'UI/UX Design', demand: 82, supply: 75, gap: 7 },
    { skill: 'Project Management', demand: 76, supply: 85, gap: -9 },
    { skill: 'DevOps/Cloud', demand: 91, supply: 68, gap: 23 }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="h-4 w-4 text-success-600" />;
      case 'down':
        return <ArrowDown className="h-4 w-4 text-success-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-success-600';
      case 'down':
        return 'text-success-600'; // Down is good for time metrics
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Enterprise Analytics</h1>
            <p className="mt-2 text-gray-600">
              Track collaboration metrics, ROI, and organizational efficiency
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* KPI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.title}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${metric.bgColor}`}>
                    <Icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                  <div className={`flex items-center space-x-1 ${getTrendColor(metric.trend)}`}>
                    {getTrendIcon(metric.trend)}
                    <span className="text-sm font-medium">{metric.change}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</p>
                  <p className="text-xs text-gray-500">{metric.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Department Performance */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Department Performance</h2>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Utilization Rate</span>
              </div>
            </div>
            <div className="space-y-4">
              {departmentData.map((dept, index) => (
                <div key={dept.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{dept.name}</h3>
                      <span className="text-sm text-gray-600">{dept.utilization}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${dept.utilization}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{dept.projects} active projects</span>
                      <span>★ {dept.satisfaction} satisfaction</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Supply vs Demand */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Skill Supply vs Demand</h2>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                  <span className="text-gray-600">Demand</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-secondary-500 rounded-full"></div>
                  <span className="text-gray-600">Supply</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {skillDemand.map((skill, index) => (
                <div key={skill.skill} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">{skill.skill}</h3>
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                      skill.gap > 0 
                        ? 'bg-error-100 text-error-700' 
                        : skill.gap < 0 
                        ? 'bg-success-100 text-success-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {skill.gap > 0 ? `+${skill.gap}` : skill.gap} gap
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>Demand</span>
                      <span>{skill.demand}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full"
                        style={{ width: `${skill.demand}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>Supply</span>
                      <span>{skill.supply}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-secondary-500 h-2 rounded-full"
                        style={{ width: `${skill.supply}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enterprise Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Collaboration Trends */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 animate-fade-in">
            <div className="flex items-center mb-4">
              <TrendingUp className="h-6 w-6 text-primary-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Collaboration Trends</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Cross-department projects</span>
                <span className="text-lg font-bold text-primary-600">+47%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Remote collaboration</span>
                <span className="text-lg font-bold text-secondary-600">+62%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-success-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Skill sharing sessions</span>
                <span className="text-lg font-bold text-success-600">+38%</span>
              </div>
            </div>
          </div>

          {/* Top Performers */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 animate-fade-in">
            <div className="flex items-center mb-4">
              <Award className="h-6 w-6 text-warning-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Top Performers</h2>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Sarah Johnson', score: 98, projects: 12 },
                { name: 'Michael Chen', score: 95, projects: 8 },
                { name: 'Emily Rodriguez', score: 92, projects: 10 },
                { name: 'David Kim', score: 89, projects: 7 }
              ].map((performer, index) => (
                <div key={performer.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                      index === 0 ? 'bg-warning-500' : 
                      index === 1 ? 'bg-gray-400' :
                      index === 2 ? 'bg-warning-600' : 'bg-gray-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{performer.name}</p>
                      <p className="text-xs text-gray-500">{performer.projects} projects</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-primary-600">{performer.score}</span>
                </div>
              ))}
            </div>
          </div>

          {/* System Health */}
          <div className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl shadow-sm text-white p-6 animate-fade-in">
            <div className="flex items-center mb-4">
              <Zap className="h-6 w-6 mr-2" />
              <h2 className="text-lg font-semibold">System Health</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Platform Uptime</span>
                  <span className="text-lg font-bold">99.9%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: '99.9%' }}></div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">User Satisfaction</span>
                  <span className="text-lg font-bold">4.8/5</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: '96%' }}></div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">API Response Time</span>
                  <span className="text-lg font-bold">120ms</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}