"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  AlertTriangle, 
  FileText, 
  TrendingUp, 
  Shield, 
  Settings, 
  BarChart3,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Download
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

interface AdminStats {
  totalUsers: number;
  totalReports: number;
  totalAlerts: number;
  verifiedReports: number;
  pendingReports: number;
  rejectedReports: number;
  activeUsers: number;
  systemUptime: number;
}

interface ReportData {
  id: string;
  type: string;
  severity: string;
  description: string;
  status: string;
  isVerified: boolean;
  createdAt: string;
  reporter: {
    id: string;
    name: string;
    email: string;
  };
  location: {
    lat: number;
    lng: number;
  };
}

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  reputation: number;
  reportsCount: number;
  isActive: boolean;
  lastLoginAt: string;
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [reports, setReports] = useState<ReportData[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("overview");

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      
      // Mock data for demonstration
      const mockStats: AdminStats = {
        totalUsers: 2847,
        totalReports: 1247,
        totalAlerts: 23,
        verifiedReports: 892,
        pendingReports: 234,
        rejectedReports: 121,
        activeUsers: 1847,
        systemUptime: 99.9,
      };

      const mockReports: ReportData[] = [
        {
          id: "1",
          type: "high_wave",
          severity: "high",
          description: "Very high waves observed near Marina Beach",
          status: "verified",
          isVerified: true,
          createdAt: new Date().toISOString(),
          reporter: {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
          },
          location: { lat: 13.0827, lng: 80.2707 },
        },
        {
          id: "2",
          type: "storm_surge",
          severity: "medium",
          description: "Storm surge warning - water level rising",
          status: "pending",
          isVerified: false,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          reporter: {
            id: "2",
            name: "Jane Smith",
            email: "jane@example.com",
          },
          location: { lat: 19.0760, lng: 72.8777 },
        },
        {
          id: "3",
          type: "tsunami_warning",
          severity: "critical",
          description: "Unusual wave patterns detected",
          status: "verified",
          isVerified: true,
          createdAt: new Date(Date.now() - 7200000).toISOString(),
          reporter: {
            id: "3",
            name: "Raj Patel",
            email: "raj@example.com",
          },
          location: { lat: 12.9716, lng: 77.5946 },
        },
      ];

      const mockUsers: UserData[] = [
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          role: "citizen",
          reputation: 1250,
          reportsCount: 23,
          isActive: true,
          lastLoginAt: new Date().toISOString(),
          createdAt: new Date("2024-01-15").toISOString(),
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          role: "analyst",
          reputation: 2100,
          reportsCount: 45,
          isActive: true,
          lastLoginAt: new Date(Date.now() - 3600000).toISOString(),
          createdAt: new Date("2024-01-10").toISOString(),
        },
        {
          id: "3",
          name: "Dr. Sarah Wilson",
          email: "sarah@example.com",
          role: "official",
          reputation: 3500,
          reportsCount: 67,
          isActive: true,
          lastLoginAt: new Date(Date.now() - 1800000).toISOString(),
          createdAt: new Date("2024-01-05").toISOString(),
        },
      ];

      setStats(mockStats);
      setReports(mockReports);
      setUsers(mockUsers);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyReport = async (reportId: string) => {
    try {
      // API call to verify report
      console.log("Verifying report:", reportId);
      // Update local state
      setReports(prev =>
        prev.map(report =>
          report.id === reportId
            ? { ...report, isVerified: true, status: "verified" }
            : report
        )
      );
    } catch (error) {
      console.error("Error verifying report:", error);
    }
  };

  const handleRejectReport = async (reportId: string) => {
    try {
      // API call to reject report
      console.log("Rejecting report:", reportId);
      // Update local state
      setReports(prev =>
        prev.map(report =>
          report.id === reportId
            ? { ...report, status: "rejected" }
            : report
        )
      );
    } catch (error) {
      console.error("Error rejecting report:", error);
    }
  };

  const handleToggleUserStatus = async (userId: string, isActive: boolean) => {
    try {
      // API call to toggle user status
      console.log("Toggling user status:", userId, isActive);
      // Update local state
      setUsers(prev =>
        prev.map(user =>
          user.id === userId
            ? { ...user, isActive: !isActive }
            : user
        )
      );
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-600";
      case "high":
        return "text-orange-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span>Admin Dashboard</span>
          </h2>
          <div className="flex items-center space-x-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Data</span>
            </button>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalReports.toLocaleString()}</p>
              </div>
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalAlerts}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Uptime</p>
                <p className="text-2xl font-bold text-gray-900">{stats.systemUptime}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "reports", label: "Reports", icon: FileText },
              { id: "users", label: "Users", icon: Users },
              { id: "analytics", label: "Analytics", icon: TrendingUp },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  selectedTab === tab.id
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

        <div className="p-6">
          {/* Overview Tab */}
          {selectedTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-800">Verified Reports</p>
                      <p className="text-2xl font-bold text-green-900">{stats?.verifiedReports}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Pending Reports</p>
                      <p className="text-2xl font-bold text-yellow-900">{stats?.pendingReports}</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>

                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-800">Rejected Reports</p>
                      <p className="text-2xl font-bold text-red-900">{stats?.rejectedReports}</p>
                    </div>
                    <XCircle className="h-8 w-8 text-red-600" />
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Reports Over Time</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={[
                        { date: "2024-01-01", reports: 45, verified: 38 },
                        { date: "2024-01-02", reports: 52, verified: 44 },
                        { date: "2024-01-03", reports: 38, verified: 32 },
                        { date: "2024-01-04", reports: 61, verified: 48 },
                        { date: "2024-01-05", reports: 55, verified: 42 },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="reports" stroke="#3b82f6" strokeWidth={2} />
                        <Line type="monotone" dataKey="verified" stroke="#10b981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Types</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "High Wave", value: 35, color: "#3b82f6" },
                            { name: "Storm Surge", value: 25, color: "#10b981" },
                            { name: "Flooding", value: 20, color: "#f59e0b" },
                            { name: "Other", value: 20, color: "#ef4444" },
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                        >
                          {[
                            { name: "High Wave", value: 35, color: "#3b82f6" },
                            { name: "Storm Surge", value: 25, color: "#10b981" },
                            { name: "Flooding", value: 20, color: "#f59e0b" },
                            { name: "Other", value: 20, color: "#ef4444" },
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {selectedTab === "reports" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
                <div className="flex items-center space-x-2">
                  <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>Verified</option>
                    <option>Rejected</option>
                  </select>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                    Filter
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Report
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reporter
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reports.map((report) => (
                      <tr key={report.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {report.type.replace('_', ' ').toUpperCase()}
                            </div>
                            <div className="text-sm text-gray-500">{report.description}</div>
                            <div className={`text-xs ${getSeverityColor(report.severity)}`}>
                              {report.severity.toUpperCase()}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{report.reporter.name}</div>
                          <div className="text-sm text-gray-500">{report.reporter.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(report.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleVerifyReport(report.id)}
                              className="text-green-600 hover:text-green-900"
                              disabled={report.isVerified}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleRejectReport(report.id)}
                              className="text-red-600 hover:text-red-900"
                              disabled={report.status === "rejected"}
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {selectedTab === "users" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  />
                  <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                    Search
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reputation
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reports
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.reputation.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.reportsCount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleToggleUserStatus(user.id, user.isActive)}
                            className={`${
                              user.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                            }`}
                          >
                            {user.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {selectedTab === "analytics" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={[
                        { month: "Jan", users: 1200 },
                        { month: "Feb", users: 1450 },
                        { month: "Mar", users: 1680 },
                        { month: "Apr", users: 1920 },
                        { month: "May", users: 2150 },
                        { month: "Jun", users: 2400 },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Accuracy</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { month: "Jan", accuracy: 85 },
                        { month: "Feb", accuracy: 87 },
                        { month: "Mar", accuracy: 89 },
                        { month: "Apr", accuracy: 91 },
                        { month: "May", accuracy: 88 },
                        { month: "Jun", accuracy: 94 },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="accuracy" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
