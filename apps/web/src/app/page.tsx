'use client';

import { useState } from 'react';
import { Map, TrendingUp, Users, Shield, BarChart3, Navigation } from 'lucide-react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import InteractiveMap from '../components/InteractiveMap';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';

// Mock data for demonstration
const mockAlerts = [
  {
    id: 1,
    type: 'tsunami',
    severity: 'high',
    location: 'Mumbai Coast',
    timestamp: new Date(),
    description: 'Tsunami warning issued for coastal areas',
    verified: true,
  },
  {
    id: 2,
    type: 'flood',
    severity: 'medium',
    location: 'Goa Beaches',
    timestamp: new Date(),
    description: 'Heavy rainfall causing flooding',
    verified: false,
  },
];

const mockReports = [
  {
    id: 1,
    type: 'erosion',
    severity: 'high',
    location: 'Kerala Coast',
    latitude: 8.5241,
    longitude: 76.9366,
    description: 'Severe coastal erosion observed',
    timestamp: new Date(),
    upvotes: 15,
    downvotes: 2,
    verified: true,
  },
  {
    id: 2,
    type: 'pollution',
    severity: 'medium',
    location: 'Chennai Beach',
    latitude: 12.9141,
    longitude: 80.2206,
    description: 'Oil spill detected near Marina Beach',
    timestamp: new Date(),
    upvotes: 8,
    downvotes: 1,
    verified: false,
  },
];

const tabs = [
  { id: 'map', label: 'Map', icon: Map },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'predictions', label: 'Predictions', icon: TrendingUp },
  { id: 'gamification', label: 'Gamification', icon: Shield },
  { id: 'admin', label: 'Admin', icon: Users },
];

interface User {
  name: string;
  role: string;
}

function HomeContent() {
  const [activeTab, setActiveTab] = useState('map');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const alerts = mockAlerts;
  const reports = mockReports;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">SAGAR</h1>
              </div>
              <span className="text-sm text-gray-500">Coastal Hazard Monitoring</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {isAuthenticated && user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">Welcome, {user.firstName}</span>
                  <button
                    onClick={logout}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowRegisterModal(true)}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === "map" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Map Section */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                    <Map className="h-6 w-6 text-blue-600" />
                    <span>Real-time Hazard Map</span>
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Interactive map showing coastal hazards, reports, and predictions
                  </p>
                </div>
                <div className="h-[600px]">
                  <InteractiveMap 
                    reports={reports.map(report => ({
                      ...report,
                      location: { lat: report.latitude, lng: report.longitude }
                    }))}
                    alerts={alerts}
                    onReportClick={(report) => console.log('Report clicked:', report)}
                  />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Alerts Panel */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Alerts</h3>
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${
                      alert.severity === 'high' ? 'border-red-500 bg-red-50' :
                      alert.severity === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                      'border-green-500 bg-green-50'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900 capitalize">{alert.type}</h4>
                          <p className="text-sm text-gray-600">{alert.location}</p>
                          <p className="text-xs text-gray-500 mt-1">{alert.description}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          alert.verified ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {alert.verified ? 'Verified' : 'Unverified'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Stats Dashboard */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{reports.length}</div>
                    <div className="text-sm text-gray-500">Reports</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{alerts.length}</div>
                    <div className="text-sm text-gray-500">Alerts</div>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                    <Navigation className="h-5 w-5" />
                    <span>View Evacuation Routes</span>
                  </button>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                    <Users className="h-5 w-5" />
                    <span>Join Community</span>
                  </button>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                    <TrendingUp className="h-5 w-5" />
                    <span>View Analytics</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Analytics Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{reports.length}</div>
                  <div className="text-sm text-gray-600">Total Reports</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-3xl font-bold text-red-600">{alerts.length}</div>
                  <div className="text-sm text-gray-600">Active Alerts</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">85%</div>
                  <div className="text-sm text-gray-600">Accuracy Rate</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "predictions" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Predictive Analytics</h2>
              <p className="text-gray-600">AI-powered predictions for coastal hazards will be displayed here.</p>
            </div>
          </div>
        )}

        {activeTab === "gamification" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Gamification</h2>
              <p className="text-gray-600">Community engagement features and rewards will be shown here.</p>
            </div>
          </div>
        )}

        {activeTab === "admin" && (user?.role === "admin" || user?.role === "official") && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Admin Dashboard</h2>
              <p className="text-gray-600">Administrative controls and system management tools.</p>
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)}
          onSwitchToRegister={() => {
            setShowLoginModal(false);
            setShowRegisterModal(true);
          }}
        />
      )}
      
      {showRegisterModal && (
        <RegisterModal 
          onClose={() => setShowRegisterModal(false)}
          onSwitchToLogin={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
    </div>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <HomeContent />
    </AuthProvider>
  );
}