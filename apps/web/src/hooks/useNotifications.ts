import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface Notification {
  id: string;
  type: 'alert' | 'report' | 'prediction' | 'system';
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  metadata?: Record<string, any>;
}

interface NotificationPermission {
  granted: boolean;
  denied: boolean;
  default: boolean;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [permission, setPermission] = useState<NotificationPermission>({
    granted: false,
    denied: false,
    default: true,
  });
  const [isSupported, setIsSupported] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // Check if notifications are supported
  useEffect(() => {
    setIsSupported('Notification' in window);
  }, []);

  // Request notification permission
  const requestPermission = useCallback(async () => {
    if (!isSupported) return false;

    try {
      const result = await Notification.requestPermission();
      setPermission({
        granted: result === 'granted',
        denied: result === 'denied',
        default: result === 'default',
      });
      return result === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }, [isSupported]);

  // Show browser notification
  const showNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    if (!permission.granted || !isSupported) return;

    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };

    // Add to local state
    setNotifications(prev => [newNotification, ...prev.slice(0, 49)]); // Keep last 50

    // Show browser notification
    const browserNotification = new Notification(notification.title, {
      body: notification.message,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: notification.id,
      requireInteraction: notification.severity === 'critical',
    });

    // Handle click
    browserNotification.onclick = () => {
      window.focus();
      if (notification.actionUrl) {
        window.location.href = notification.actionUrl;
      }
      browserNotification.close();
    };

    // Auto close after 5 seconds for non-critical notifications
    if (notification.severity !== 'critical') {
      setTimeout(() => {
        browserNotification.close();
      }, 5000);
    }
  }, [permission.granted, isSupported]);

  // Mark notification as read
  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  }, []);

  // Mark all as read
  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  }, []);

  // Clear notification
  const clearNotification = useCallback((notificationId: string) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== notificationId)
    );
  }, []);

  // Clear all notifications
  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Get unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  // Simulate real-time notifications (in production, this would be WebSocket)
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      // Simulate random notifications for demo
      const shouldShowNotification = Math.random() < 0.1; // 10% chance every 30 seconds
      
      if (shouldShowNotification) {
        const notificationTypes = [
          {
            type: 'alert' as const,
            title: 'New Coastal Alert',
            message: 'High wave warning issued for your area',
            severity: 'high' as const,
          },
          {
            type: 'report' as const,
            title: 'Report Verified',
            message: 'Your hazard report has been verified by officials',
            severity: 'medium' as const,
          },
          {
            type: 'prediction' as const,
            title: 'AI Prediction Update',
            message: 'New storm surge prediction with 85% confidence',
            severity: 'medium' as const,
          },
          {
            type: 'system' as const,
            title: 'System Update',
            message: 'New features available in SAGAR platform',
            severity: 'low' as const,
          },
        ];

        const randomNotification = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
        showNotification(randomNotification);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [isAuthenticated, showNotification]);

  // Request permission on mount if user is authenticated
  useEffect(() => {
    if (isAuthenticated && isSupported && permission.default) {
      requestPermission();
    }
  }, [isAuthenticated, isSupported, permission.default, requestPermission]);

  return {
    notifications,
    permission,
    isSupported,
    unreadCount,
    requestPermission,
    showNotification,
    markAsRead,
    markAllAsRead,
    clearNotification,
    clearAllNotifications,
  };
};
