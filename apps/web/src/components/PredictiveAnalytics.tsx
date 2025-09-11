"use client";

import { useState, useEffect } from "react";
import { TrendingUp, AlertTriangle, Clock, MapPin, Brain, Target } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

interface Prediction {
  id: string;
  type: string;
  title: string;
  description: string;
  centerLatitude: number;
  centerLongitude: number;
  radius: number;
  confidence: number;
  severity: number;
  predictedAt: string;
  status: string;
  isVerified: boolean;
}

interface PredictionData {
  predictions: Prediction[];
  trends: any[];
  accuracy: number;
  totalPredictions: number;
  verifiedPredictions: number;
}

const PredictiveAnalytics: React.FC = () => {
  const [data, setData] = useState<PredictionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");

  useEffect(() => {
    fetchPredictiveData();
  }, [selectedTimeframe]);

  const fetchPredictiveData = async () => {
    try {
      setLoading(true);
      // Mock data for demonstration
      const mockData: PredictionData = {
        predictions: [
          {
            id: "1",
            type: "storm_surge",
            title: "Storm Surge Prediction - Mumbai",
            description: "AI model predicts moderate storm surge in Mumbai area within 6 hours",
            centerLatitude: 19.0760,
            centerLongitude: 72.8777,
            radius: 20,
            confidence: 85.5,
            severity: 65.0,
            predictedAt: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
            status: "active",
            isVerified: false,
          },
          {
            id: "2",
            type: "high_wave",
            title: "High Wave Prediction - Chennai",
            description: "High probability of high waves along Chennai coast in next 2 hours",
            centerLatitude: 13.0827,
            centerLongitude: 80.2707,
            radius: 15,
            confidence: 92.3,
            severity: 78.5,
            predictedAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
            status: "active",
            isVerified: true,
          },
          {
            id: "3",
            type: "flooding",
            title: "Coastal Flooding - Kolkata",
            description: "Predicted coastal flooding in Kolkata area due to high tide",
            centerLatitude: 22.5726,
            centerLongitude: 88.3639,
            radius: 25,
            confidence: 78.2,
            severity: 55.0,
            predictedAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
            status: "active",
            isVerified: false,
          },
        ],
        trends: [
          { time: "00:00", accuracy: 85, confidence: 78 },
          { time: "04:00", accuracy: 87, confidence: 82 },
          { time: "08:00", accuracy: 89, confidence: 85 },
          { time: "12:00", accuracy: 91, confidence: 88 },
          { time: "16:00", accuracy: 88, confidence: 84 },
          { time: "20:00", accuracy: 86, confidence: 80 },
        ],
        accuracy: 89.2,
        totalPredictions: 156,
        verifiedPredictions: 142,
      };
      
      setData(mockData);
    } catch (error) {
      console.error("Error fetching predictive data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPredictionColor = (type: string) => {
    switch (type) {
      case "storm_surge":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "high_wave":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "flooding":
        return "bg-cyan-100 text-cyan-800 border-cyan-200";
      case "tsunami":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSeverityColor = (severity: number) => {
    if (severity >= 80) return "text-red-600";
    if (severity >= 60) return "text-orange-600";
    if (severity >= 40) return "text-yellow-600";
    return "text-green-600";
  };

  const formatTimeUntil = (predictedAt: string) => {
    const now = new Date();
    const predicted = new Date(predictedAt);
    const diffInHours = Math.floor((predicted.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Less than 1 hour";
    if (diffInHours < 24) return `${diffInHours} hours`;
    return `${Math.floor(diffInHours / 24)} days`;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center text-gray-500">
          <Brain className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p>Unable to load predictive analytics</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
            <Brain className="h-6 w-6 text-purple-600" />
            <span>AI Predictions</span>
          </h3>
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Accuracy</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">{data.accuracy}%</div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Total Predictions</span>
            </div>
            <div className="text-2xl font-bold text-green-600">{data.totalPredictions}</div>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Verified</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">{data.verifiedPredictions}</div>
          </div>
        </div>

        {/* Accuracy Trend Chart */}
        <div className="h-64">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Prediction Accuracy Trend</h4>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.trends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="accuracy" stroke="#8b5cf6" strokeWidth={2} />
              <Line type="monotone" dataKey="confidence" stroke="#06b6d4" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active Predictions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Clock className="h-5 w-5 text-orange-600" />
          <span>Active Predictions</span>
        </h4>
        
        <div className="space-y-4">
          {data.predictions.map((prediction) => (
            <div
              key={prediction.id}
              className={`border rounded-lg p-4 ${getPredictionColor(prediction.type)}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h5 className="font-semibold text-sm">{prediction.title}</h5>
                  <p className="text-xs mt-1 opacity-90">{prediction.description}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  {prediction.isVerified ? (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Verified
                    </span>
                  ) : (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      Pending
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                <div className="text-center">
                  <div className="text-xs text-gray-600">Confidence</div>
                  <div className="text-sm font-semibold">{prediction.confidence}%</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-600">Severity</div>
                  <div className={`text-sm font-semibold ${getSeverityColor(prediction.severity)}`}>
                    {prediction.severity}%
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-600">Time Until</div>
                  <div className="text-sm font-semibold">{formatTimeUntil(prediction.predictedAt)}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-600">Radius</div>
                  <div className="text-sm font-semibold">{prediction.radius}km</div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center space-x-1 text-xs text-gray-600">
                  <MapPin className="h-3 w-3" />
                  <span>
                    {prediction.centerLatitude.toFixed(4)}, {prediction.centerLongitude.toFixed(4)}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button className="text-xs bg-white bg-opacity-50 hover:bg-opacity-75 px-2 py-1 rounded transition-colors">
                    View Details
                  </button>
                  <button className="text-xs bg-white bg-opacity-50 hover:bg-opacity-75 px-2 py-1 rounded transition-colors">
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;
