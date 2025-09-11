"use client";

import { useState, useEffect } from "react";
import InteractiveMap from "@/components/InteractiveMap";
import StatsDashboard from "@/components/StatsDashboard";
import AlertPanel from "@/components/AlertPanel";
import ReportModal from "@/components/ReportModal";
import LoginModal from "@/components/LoginModal";
import RegisterModal from "@/components/RegisterModal";
import UserProfile from "@/components/UserProfile";
import GamificationPanel from "@/components/GamificationPanel";
import PredictiveAnalytics from "@/components/PredictiveAnalytics";
import NotificationPanel from "@/components/NotificationPanel";
import AdminDashboard from "@/components/AdminDashboard";
import { useAuth, AuthProvider } from "@/contexts/AuthContext";
import { useNotifications } from "@/hooks/useNotifications";
import { useReports } from "@/hooks/useReports";
import { 
  mockUsers, 
  mockReports, 
  mockAlerts, 
  mockPredictions, 
  mockAnalytics, 
  mockStats, 
  mockChartData,
  type Report,
  type Alert,
  type User
} from "@/data/mockData";

function HomeContent() {
  const { user, login, register, logout } = useAuth();
  const { notifications, addNotification, markAsRead } = useNotifications();
  const { reports, addReport, updateReport } = useReports();
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [activeTab, setActiveTab] = useState<'map' | 'analytics' | 'alerts' | 'admin'>('map');
  const [isLoading, setIsLoading] = useState(true);

  // Use mock data for demonstration
  const [alerts] = useState<Alert[]>(mockAlerts);
  const [allReports] = useState<Report[]>(mockReports);
  const [predictions] = useState(mockPredictions);
  const [analytics] = useState(mockAnalytics);
  const [stats] = useState(mockStats);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleReportClick = (report: Report) => {
    setSelectedReport(report);
  };

  const handleAddReport = (reportData: any) => {
    const newReport: Report = {
      id: Date.now(),
      type: reportData.type,
      location: reportData.location,
      description: reportData.description,
      timestamp: new Date(),
      verified: false,
      reporter: user || mockUsers[0],
      severity: reportData.severity || 'medium',
      status: 'pending',
      upvotes: 0,
      downvotes: 0
    };
    addReport(newReport);
    addNotification({
      id: Date.now(),
      type: 'success',
      title: 'Report Submitted',
      message: 'Your report has been submitted and is under review.',
      timestamp: new Date()
    });
  };

  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      // Simulate login with mock user
      const mockUser = mockUsers.find(u => u.email === credentials.email) || mockUsers[0];
      await login(credentials.email, credentials.password);
      setShowLoginModal(false);
      addNotification({
        id: Date.now(),
        type: 'success',
        title: 'Login Successful',
        message: `Welcome back, ${mockUser.name}!`,
        timestamp: new Date()
      });
    } catch (error) {
      addNotification({
        id: Date.now(),
        type: 'error',
        title: 'Login Failed',
        message: 'Invalid credentials. Please try again.',
        timestamp: new Date()
      });
    }
  };

  const handleRegister = async (userData: { name: string; email: string; password: string }) => {
    try {
      await register(userData.name, userData.email, userData.password);
      setShowRegisterModal(false);
      addNotification({
        id: Date.now(),
        type: 'success',
        title: 'Registration Successful',
        message: 'Welcome to SAGAR Platform! Your account has been created.',
        timestamp: new Date()
      });
    } catch (error) {
      addNotification({
        id: Date.now(),
        type: 'error',
        title: 'Registration Failed',
        message: 'Failed to create account. Please try again.',
        timestamp: new Date()
      });
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserProfile(false);
    setShowAdminDashboard(false);
    addNotification({
      id: Date.now(),
      type: 'info',
      title: 'Logged Out',
      message: 'You have been successfully logged out.',
      timestamp: new Date()
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">Loading SAGAR Platform...</h2>
          <p className="mt-2 text-gray-600">Preparing your geospatial intelligence dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-xl border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🌊</span>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      SAGAR
                    </h1>
                    <p className="text-sm text-gray-500 font-medium">Social-AI Geospatial Alerts & Reporting</p>
                  </div>
                </div>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-2">
              {[
                { id: 'map', label: 'Interactive Map', icon: '🗺️' },
                { id: 'analytics', label: 'Analytics', icon: '📊' },
                { id: 'alerts', label: 'Alerts', icon: '🚨' },
                ...(user?.role === 'admin' ? [{ id: 'admin', label: 'Admin', icon: '⚙️' }] : [])
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowReportModal(true)}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                + Report Incident
              </button>
              
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                  <button
                    onClick={() => setShowUserProfile(true)}
                    className="w-10 h-10 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center hover:from-blue-200 hover:to-cyan-200 transition-all duration-200"
                  >
                    <span className="text-lg font-bold text-blue-600">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowRegisterModal(true)}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'map' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                  <div className="h-[600px] w-full">
                    <InteractiveMap
                      reports={allReports}
                      alerts={alerts}
                      onReportClick={handleReportClick}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <StatsDashboard stats={stats} analytics={analytics} />
                <GamificationPanel user={user} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <PredictiveAnalytics predictions={predictions} chartData={mockChartData} />
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="space-y-8">
            <AlertPanel alerts={alerts} />
          </div>
        )}

        {activeTab === 'admin' && user?.role === 'admin' && (
          <div className="space-y-8">
            <AdminDashboard 
              users={mockUsers}
              reports={allReports}
              alerts={alerts}
              analytics={analytics}
            />
          </div>
        )}
      </main>

      {/* Modals */}
      {showReportModal && (
        <ReportModal
          onClose={() => setShowReportModal(false)}
          onSubmit={handleAddReport}
          user={user}
        />
      )}

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
          onSwitchToRegister={() => {
            setShowLoginModal(false);
            setShowRegisterModal(true);
          }}
        />
      )}

      {showRegisterModal && (
        <RegisterModal
          onClose={() => setShowRegisterModal(false)}
          onRegister={handleRegister}
          onSwitchToLogin={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
        />
      )}

      {showUserProfile && user && (
        <UserProfile
          user={user}
          onClose={() => setShowUserProfile(false)}
          onLogout={handleLogout}
        />
      )}

      {/* Notification Panel */}
      <NotificationPanel
        notifications={notifications}
        onMarkAsRead={markAsRead}
        onClose={() => {}}
      />
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