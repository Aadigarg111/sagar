import { Connection } from 'mongoose';
import { User, UserRole, UserSchema } from '../entities/user.entity';
import { Report, HazardType, SeverityLevel, ReportStatus, ReportSchema } from '../entities/report.entity';
import { Alert, AlertType, AlertSeverity, AlertStatus, AlertSchema } from '../entities/alert.entity';
import { Prediction, PredictionType, PredictionStatus, PredictionSchema } from '../entities/prediction.entity';
import * as bcrypt from 'bcryptjs';

export async function seedDemoData(connection: Connection) {
  console.log('🌱 Seeding demo data...');

  const UserModel = connection.model(User.name, UserSchema);
  const ReportModel = connection.model(Report.name, ReportSchema);
  const AlertModel = connection.model(Alert.name, AlertSchema);
  const PredictionModel = connection.model(Prediction.name, PredictionSchema);

  // Create demo users
  const demoUsers = [
    {
      email: 'admin@sagar.com',
      password: await bcrypt.hash('admin123', 12),
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
      reputation: 1000,
      location: 'Chennai, India',
      isVerified: true,
    },
    {
      email: 'citizen@sagar.com',
      password: await bcrypt.hash('citizen123', 12),
      firstName: 'John',
      lastName: 'Doe',
      role: UserRole.CITIZEN,
      reputation: 250,
      location: 'Chennai, India',
      isVerified: true,
    },
    {
      email: 'official@sagar.com',
      password: await bcrypt.hash('official123', 12),
      firstName: 'Dr. Sarah',
      lastName: 'Wilson',
      role: UserRole.OFFICIAL,
      reputation: 500,
      location: 'Mumbai, India',
      isVerified: true,
    },
  ];

  const users = [];
  for (const userData of demoUsers) {
    const existingUser = await UserModel.findOne({ email: userData.email });
    if (!existingUser) {
      const user = new UserModel(userData);
      users.push(await user.save());
    } else {
      users.push(existingUser);
    }
  }

  // Create demo reports
  const demoReports = [
    {
      type: HazardType.HIGH_WAVE,
      severity: SeverityLevel.HIGH,
      description: 'Very high waves observed near Marina Beach. Water level is unusually high and waves are crashing over the promenade.',
      latitude: 13.0827,
      longitude: 80.2707,
      reporterId: users[1].id,
      isVerified: true,
      status: ReportStatus.VERIFIED,
      upvotes: 15,
      downvotes: 2,
    },
    {
      type: HazardType.STORM_SURGE,
      severity: SeverityLevel.MEDIUM,
      description: 'Storm surge warning - water level rising rapidly. Coastal areas may be affected.',
      latitude: 19.0760,
      longitude: 72.8777,
      reporterId: users[1].id,
      isVerified: false,
      status: ReportStatus.PENDING,
      upvotes: 8,
      downvotes: 1,
    },
    {
      type: HazardType.TSUNAMI_WARNING,
      severity: SeverityLevel.CRITICAL,
      description: 'Unusual wave patterns detected. Possible tsunami warning. Please evacuate immediately.',
      latitude: 12.9716,
      longitude: 77.5946,
      reporterId: users[2].id,
      isVerified: true,
      status: ReportStatus.VERIFIED,
      upvotes: 25,
      downvotes: 0,
    },
  ];

  for (const reportData of demoReports) {
    const existingReport = await ReportModel.findOne({ 
      latitude: reportData.latitude, 
      longitude: reportData.longitude 
    });
    if (!existingReport) {
      const report = new ReportModel({
        ...reportData,
        location: {
          type: 'Point',
          coordinates: [reportData.longitude, reportData.latitude]
        },
      });
      await report.save();
    }
  }

  // Create demo alerts
  const demoAlerts = [
    {
      type: AlertType.HIGH_WAVE,
      severity: AlertSeverity.HIGH,
      title: 'High Wave Alert - Chennai Coast',
      description: 'High waves up to 3.2m expected along Chennai coast. Avoid beach activities.',
      centerLatitude: 13.0827,
      centerLongitude: 80.2707,
      radius: 10,
      status: AlertStatus.ACTIVE,
      isVerified: true,
      source: 'INCOIS',
      createdById: users[2].id,
    },
    {
      type: AlertType.STORM_SURGE,
      severity: AlertSeverity.MEDIUM,
      title: 'Storm Surge Warning - Mumbai',
      description: 'Storm surge of 1.8m above normal tide expected in Mumbai area.',
      centerLatitude: 19.0760,
      centerLongitude: 72.8777,
      radius: 15,
      status: AlertStatus.ACTIVE,
      isVerified: true,
      source: 'IMD',
      createdById: users[2].id,
    },
  ];

  for (const alertData of demoAlerts) {
    const existingAlert = await AlertModel.findOne({ 
      centerLatitude: alertData.centerLatitude, 
      centerLongitude: alertData.centerLongitude 
    });
    if (!existingAlert) {
      const alert = new AlertModel({
        ...alertData,
        affectedArea: {
          type: 'Polygon',
          coordinates: [[[
            [alertData.centerLongitude - 0.1, alertData.centerLatitude - 0.1],
            [alertData.centerLongitude + 0.1, alertData.centerLatitude - 0.1],
            [alertData.centerLongitude + 0.1, alertData.centerLatitude + 0.1],
            [alertData.centerLongitude - 0.1, alertData.centerLatitude + 0.1],
            [alertData.centerLongitude - 0.1, alertData.centerLatitude - 0.1]
          ]]]
        },
      });
      await alert.save();
    }
  }

  // Create demo predictions
  const demoPredictions = [
    {
      type: PredictionType.STORM_SURGE,
      title: 'Storm Surge Prediction - Next 6 Hours',
      description: 'AI model predicts moderate storm surge in Mumbai area within 6 hours.',
      centerLatitude: 19.0760,
      centerLongitude: 72.8777,
      radius: 20,
      confidence: 85.5,
      severity: 65.0,
      predictedAt: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
      status: PredictionStatus.ACTIVE,
      isVerified: false,
    },
    {
      type: PredictionType.HIGH_WAVE,
      title: 'High Wave Prediction - Chennai',
      description: 'High probability of high waves along Chennai coast in next 2 hours.',
      centerLatitude: 13.0827,
      centerLongitude: 80.2707,
      radius: 15,
      confidence: 92.3,
      severity: 78.5,
      predictedAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      status: PredictionStatus.ACTIVE,
      isVerified: true,
    },
  ];

  for (const predictionData of demoPredictions) {
    const existingPrediction = await PredictionModel.findOne({ 
      centerLatitude: predictionData.centerLatitude, 
      centerLongitude: predictionData.centerLongitude 
    });
    if (!existingPrediction) {
      const prediction = new PredictionModel({
        ...predictionData,
        affectedArea: {
          type: 'Polygon',
          coordinates: [[[
            [predictionData.centerLongitude - 0.2, predictionData.centerLatitude - 0.2],
            [predictionData.centerLongitude + 0.2, predictionData.centerLatitude - 0.2],
            [predictionData.centerLongitude + 0.2, predictionData.centerLatitude + 0.2],
            [predictionData.centerLongitude - 0.2, predictionData.centerLatitude + 0.2],
            [predictionData.centerLongitude - 0.2, predictionData.centerLatitude - 0.2]
          ]]]
        },
      });
      await prediction.save();
    }
  }

  console.log('✅ Demo data seeded successfully!');
  console.log('📧 Demo accounts created:');
  console.log('   - admin@sagar.com / admin123 (Admin)');
  console.log('   - citizen@sagar.com / citizen123 (Citizen)');
  console.log('   - official@sagar.com / official123 (Official)');
}
