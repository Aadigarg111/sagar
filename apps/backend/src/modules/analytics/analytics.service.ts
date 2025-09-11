import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report } from '../../database/entities/report.entity';
import { Alert, AlertStatus } from '../../database/entities/alert.entity';
import { User } from '../../database/entities/user.entity';
import { Prediction, PredictionStatus } from '../../database/entities/prediction.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Report.name)
    private readonly reportModel: Model<Report>,
    @InjectModel(Alert.name)
    private readonly alertModel: Model<Alert>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Prediction.name)
    private readonly predictionModel: Model<Prediction>,
  ) {}

  async getStats() {
    const [totalReports, totalAlerts, totalUsers, activePredictions] = await Promise.all([
      this.reportModel.countDocuments(),
      this.alertModel.countDocuments({ status: AlertStatus.ACTIVE }),
      this.userModel.countDocuments(),
      this.predictionModel.countDocuments({ status: PredictionStatus.ACTIVE }),
    ]);

    const verifiedReports = await this.reportModel.countDocuments({ isVerified: true });
    const accuracy = totalReports > 0 ? (verifiedReports / totalReports) * 100 : 0;

    return {
      totalReports,
      verifiedReports,
      totalAlerts,
      totalUsers,
      activePredictions,
      accuracy: Math.round(accuracy * 100) / 100,
    };
  }

  async getReportTrends(query: any) {
    const { days = 7 } = query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const trends = await this.reportModel.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            type: '$type'
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          date: '$_id.date',
          type: '$_id.type',
          count: 1,
          _id: 0
        }
      },
      {
        $sort: { date: 1 }
      }
    ]);

    return trends;
  }

  async getPredictions() {
    return this.predictionModel.find({ status: PredictionStatus.ACTIVE }).sort({ predictedAt: 1 });
  }
}
