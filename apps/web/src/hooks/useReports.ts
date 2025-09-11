import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface Report {
  id: string;
  type: string;
  severity: string;
  description: string;
  latitude: number;
  longitude: number;
  status: string;
  isVerified: boolean;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  reporter: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

interface CreateReportData {
  type: string;
  severity: string;
  description: string;
  latitude: number;
  longitude: number;
  media?: File[];
}

export const useReports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchReports = async (params?: {
    page?: number;
    limit?: number;
    type?: string;
    status?: string;
    verified?: boolean;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.type) queryParams.append('type', params.type);
      if (params?.status) queryParams.append('status', params.status);
      if (params?.verified !== undefined) queryParams.append('verified', params.verified.toString());

      const token = localStorage.getItem('accessToken');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reports?${queryParams}`,
        {
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch reports');
      }

      const data = await response.json();
      setReports(data.reports || []);
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createReport = async (reportData: CreateReportData) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Authentication required');
      }

      const formData = new FormData();
      formData.append('type', reportData.type);
      formData.append('severity', reportData.severity);
      formData.append('description', reportData.description);
      formData.append('latitude', reportData.latitude.toString());
      formData.append('longitude', reportData.longitude.toString());

      if (reportData.media && reportData.media.length > 0) {
        reportData.media.forEach((file, index) => {
          formData.append(`media_${index}`, file);
        });
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/reports`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create report');
      }

      const newReport = await response.json();
      setReports(prev => [newReport, ...prev]);
      return newReport;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const upvoteReport = async (reportId: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reports/${reportId}/upvote`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to upvote report');
      }

      // Update local state
      setReports(prev =>
        prev.map(report =>
          report.id === reportId
            ? { ...report, upvotes: report.upvotes + 1 }
            : report
        )
      );
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const downvoteReport = async (reportId: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reports/${reportId}/downvote`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to downvote report');
      }

      // Update local state
      setReports(prev =>
        prev.map(report =>
          report.id === reportId
            ? { ...report, downvotes: report.downvotes + 1 }
            : report
        )
      );
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return {
    reports,
    loading,
    error,
    fetchReports,
    createReport,
    upvoteReport,
    downvoteReport,
  };
};
