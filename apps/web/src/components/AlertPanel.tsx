"use client";

import { AlertTriangle, Clock, MapPin, CheckCircle, XCircle } from "lucide-react";

interface Alert {
  id: number;
  type: string;
  severity: string;
  location: string;
  timestamp: Date;
  description: string;
  verified: boolean;
}

interface AlertPanelProps {
  alerts: Alert[];
}

const AlertPanel: React.FC<AlertPanelProps> = ({ alerts }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 border-red-200 text-red-800";
      case "medium":
        return "bg-yellow-100 border-yellow-200 text-yellow-800";
      case "low":
        return "bg-green-100 border-green-200 text-green-800";
      default:
        return "bg-gray-100 border-gray-200 text-gray-800";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "medium":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "low":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <span>Active Alerts</span>
        </h3>
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
          {alerts.length}
        </span>
      </div>

      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <p className="text-gray-600">No active alerts</p>
            <p className="text-sm text-gray-500">All clear in your area</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getSeverityIcon(alert.severity)}
                  <span className="font-medium text-sm">
                    {alert.type.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  {alert.verified ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </div>

              <p className="text-sm mb-3 line-clamp-2">
                {alert.description}
              </p>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1 text-gray-600">
                  <MapPin className="h-3 w-3" />
                  <span>{alert.location}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <Clock className="h-3 w-3" />
                  <span>{formatTimeAgo(alert.timestamp)}</span>
                </div>
              </div>

              <div className="mt-3 flex space-x-2">
                <button className="flex-1 bg-white bg-opacity-50 hover:bg-opacity-75 text-xs font-medium py-1 px-2 rounded transition-colors">
                  View Details
                </button>
                <button className="flex-1 bg-white bg-opacity-50 hover:bg-opacity-75 text-xs font-medium py-1 px-2 rounded transition-colors">
                  Share
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {alerts.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All Alerts
          </button>
        </div>
      )}
    </div>
  );
};

export default AlertPanel;
