"use client";

import { TrendingUp, Users, MapPin, AlertTriangle, Activity, Shield } from "lucide-react";

const StatsDashboard: React.FC = () => {
  // Mock data for demonstration
  const stats = {
    totalReports: 1247,
    verifiedReports: 892,
    activeAlerts: 3,
    communityMembers: 2847,
    responseTime: "4.2 min",
    accuracy: "94.2%"
  };

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
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.totalReports.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Reports</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.verifiedReports.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Verified</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{stats.activeAlerts}</div>
            <div className="text-sm text-gray-600">Active Alerts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.communityMembers.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Community</div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-gray-900">{stats.responseTime}</div>
              <div className="text-sm text-gray-600">Avg Response Time</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900">{stats.accuracy}</div>
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
