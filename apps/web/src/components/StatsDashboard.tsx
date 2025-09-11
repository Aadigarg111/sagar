"use client";

import { TrendingUp, Users, MapPin, AlertTriangle, Activity, Shield } from "lucide-react";

interface StatsDashboardProps {
  stats?: any;
  analytics?: any;
}

const StatsDashboard: React.FC<StatsDashboardProps> = ({ stats, analytics }) => {
  // Default stats if not provided
  const defaultStats = {
    reportsToday: 23,
    alertsActive: 8,
    predictionsGenerated: 12,
    responseTime: '12.5 min',
    accuracy: '87.3%',
    userEngagement: '94.2%',
    reportsThisWeek: 156,
    reportsThisMonth: 647,
    verifiedThisWeek: 134,
    falseAlarmsThisWeek: 8
  };

  const currentStats = stats || defaultStats;

  const recentActivity = [
    { type: "report", message: "New tsunami warning reported in Chennai", time: "2m ago" },
    { type: "alert", message: "High wave alert verified by officials", time: "5m ago" },
    { type: "community", message: "15 new community members joined", time: "12m ago" },
    { type: "prediction", message: "AI predicted storm surge in Mumbai", time: "18m ago" }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "report":
        return <MapPin className="h-4 w-4 text-blue-600" />;
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "community":
        return <Users className="h-4 w-4 text-green-600" />;
      case "prediction":
        return <Activity className="h-4 w-4 text-purple-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          <span>Platform Statistics</span>
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">{currentStats.reportsToday}</div>
            <div className="text-sm text-blue-700 font-medium">Reports Today</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-600">{currentStats.verifiedThisWeek}</div>
            <div className="text-sm text-green-700 font-medium">Verified This Week</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-red-50 to-red-100 rounded-lg border border-red-200">
            <div className="text-2xl font-bold text-red-600">{currentStats.alertsActive}</div>
            <div className="text-sm text-red-700 font-medium">Active Alerts</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
            <div className="text-2xl font-bold text-purple-600">{currentStats.predictionsGenerated}</div>
            <div className="text-sm text-purple-700 font-medium">AI Predictions</div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-gray-900">{currentStats.responseTime}</div>
              <div className="text-sm text-gray-600">Avg Response Time</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900">{currentStats.accuracy}</div>
              <div className="text-sm text-gray-600">AI Accuracy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Activity className="h-5 w-5 text-green-600" />
          <span>Recent Activity</span>
        </h3>
        
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All Activity
          </button>
        </div>
      </div>

      {/* AI Predictions */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Shield className="h-5 w-5 text-purple-600" />
          <span>AI Predictions</span>
        </h3>
        
        <div className="space-y-3">
          <div className="bg-white bg-opacity-60 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">Storm Surge Risk</span>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Medium</span>
            </div>
            <p className="text-xs text-gray-600">Mumbai area - Next 6 hours</p>
          </div>
          
          <div className="bg-white bg-opacity-60 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">High Wave Alert</span>
              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">High</span>
            </div>
            <p className="text-xs text-gray-600">Chennai coast - Next 2 hours</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-purple-200">
          <button className="w-full text-sm text-purple-600 hover:text-purple-700 font-medium">
            View All Predictions
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;
