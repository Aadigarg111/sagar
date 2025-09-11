"use client";

import { useState, useEffect } from "react";
import { Trophy, Star, Target, Award, TrendingUp, Users, Zap, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  reward: number;
  completed: boolean;
  completedAt?: Date;
}

interface LeaderboardEntry {
  rank: number;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  reputation: number;
  reports: number;
  verified: number;
}

const GamificationPanel: React.FC = () => {
  const { user } = useAuth();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGamificationData();
  }, []);

  const fetchGamificationData = async () => {
    try {
      setLoading(true);
      
      // Mock data for demonstration
      const mockBadges: Badge[] = [
        {
          id: "1",
          name: "First Reporter",
          description: "Submit your first hazard report",
          icon: "🎯",
          earned: true,
          earnedAt: new Date("2024-01-15"),
          rarity: "common",
        },
        {
          id: "2",
          name: "Verified Contributor",
          description: "Have 5 reports verified by officials",
          icon: "✅",
          earned: true,
          earnedAt: new Date("2024-01-20"),
          rarity: "rare",
        },
        {
          id: "3",
          name: "Community Helper",
          description: "Help 10 other users with their reports",
          icon: "🤝",
          earned: false,
          rarity: "rare",
        },
        {
          id: "4",
          name: "Storm Chaser",
          description: "Report 3 storm-related hazards",
          icon: "⛈️",
          earned: true,
          earnedAt: new Date("2024-02-01"),
          rarity: "epic",
        },
        {
          id: "5",
          name: "AI Validator",
          description: "Have 95%+ accuracy in AI predictions",
          icon: "🧠",
          earned: false,
          rarity: "legendary",
        },
        {
          id: "6",
          name: "Coastal Guardian",
          description: "Report hazards for 30 consecutive days",
          icon: "🛡️",
          earned: false,
          rarity: "legendary",
        },
      ];

      const mockAchievements: Achievement[] = [
        {
          id: "1",
          title: "Report Master",
          description: "Submit 50 hazard reports",
          progress: 23,
          maxProgress: 50,
          reward: 500,
          completed: false,
        },
        {
          id: "2",
          title: "Verification Expert",
          description: "Have 20 reports verified",
          progress: 8,
          maxProgress: 20,
          reward: 1000,
          completed: false,
        },
        {
          id: "3",
          title: "Community Champion",
          description: "Help 25 other users",
          progress: 12,
          maxProgress: 25,
          reward: 750,
          completed: false,
        },
        {
          id: "4",
          title: "Accuracy Ace",
          description: "Maintain 90%+ accuracy for 10 reports",
          progress: 7,
          maxProgress: 10,
          reward: 300,
          completed: false,
        },
      ];

      const mockLeaderboard: LeaderboardEntry[] = [
        {
          rank: 1,
          user: { id: "1", name: "Sarah Wilson", avatar: "👩‍🔬" },
          reputation: 2847,
          reports: 45,
          verified: 38,
        },
        {
          rank: 2,
          user: { id: "2", name: "Raj Patel", avatar: "👨‍💼" },
          reputation: 2653,
          reports: 38,
          verified: 32,
        },
        {
          rank: 3,
          user: { id: "3", name: "Priya Sharma", avatar: "👩‍🎓" },
          reputation: 2421,
          reports: 42,
          verified: 35,
        },
        {
          rank: 4,
          user: { id: "4", name: "Amit Kumar", avatar: "👨‍🔧" },
          reputation: 2189,
          reports: 31,
          verified: 28,
        },
        {
          rank: 5,
          user: { id: "5", name: "Lisa Chen", avatar: "👩‍💻" },
          reputation: 1956,
          reports: 29,
          verified: 25,
        },
      ];

      setBadges(mockBadges);
      setAchievements(mockAchievements);
      setLeaderboard(mockLeaderboard);
    } catch (error) {
      console.error("Error fetching gamification data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'rare':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'epic':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'legendary':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProgressPercentage = (progress: number, maxProgress: number) => {
    return Math.min((progress / maxProgress) * 100, 100);
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
      {/* User Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-yellow-600" />
          <span>Your Progress</span>
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{user?.reputation || 0}</div>
            <div className="text-sm text-gray-600">Reputation Points</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{badges.filter(b => b.earned).length}</div>
            <div className="text-sm text-gray-600">Badges Earned</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{achievements.filter(a => a.completed).length}</div>
            <div className="text-sm text-gray-600">Achievements</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {leaderboard.find(entry => entry.user.id === user?.id)?.rank || 'N/A'}
            </div>
            <div className="text-sm text-gray-600">Leaderboard Rank</div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Award className="h-5 w-5 text-yellow-600" />
          <span>Badges</span>
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-lg border-2 ${
                badge.earned ? getRarityColor(badge.rarity) : 'bg-gray-50 border-gray-200'
              } ${!badge.earned ? 'opacity-60' : ''}`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{badge.icon}</div>
                <h4 className="font-medium text-sm">{badge.name}</h4>
                <p className="text-xs text-gray-600 mt-1">{badge.description}</p>
                {badge.earned && badge.earnedAt && (
                  <p className="text-xs text-gray-500 mt-2">
                    Earned {badge.earnedAt.toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Target className="h-5 w-5 text-green-600" />
          <span>Achievements</span>
        </h3>
        
        <div className="space-y-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                <span className="text-sm text-gray-600">
                  {achievement.progress}/{achievement.maxProgress}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage(achievement.progress, achievement.maxProgress)}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-green-600">
                  +{achievement.reward} pts
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          <span>Leaderboard</span>
        </h3>
        
        <div className="space-y-3">
          {leaderboard.map((entry) => (
            <div
              key={entry.rank}
              className={`flex items-center space-x-4 p-3 rounded-lg ${
                entry.user.id === user?.id ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
              }`}
            >
              <div className="flex-shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  entry.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                  entry.rank === 2 ? 'bg-gray-100 text-gray-800' :
                  entry.rank === 3 ? 'bg-orange-100 text-orange-800' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {entry.rank}
                </div>
              </div>
              <div className="flex-shrink-0 text-2xl">{entry.user.avatar}</div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900">{entry.user.name}</h4>
                <p className="text-sm text-gray-600">
                  {entry.reports} reports • {entry.verified} verified
                </p>
              </div>
              <div className="flex-shrink-0 text-right">
                <div className="text-lg font-bold text-blue-600">{entry.reputation}</div>
                <div className="text-xs text-gray-500">points</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamificationPanel;
