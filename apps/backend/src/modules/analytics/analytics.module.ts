import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { Report, ReportSchema } from '../../database/entities/report.entity';
import { Alert, AlertSchema } from '../../database/entities/alert.entity';
import { User, UserSchema } from '../../database/entities/user.entity';
import { Prediction, PredictionSchema } from '../../database/entities/prediction.entity';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Report.name, schema: ReportSchema },
    { name: Alert.name, schema: AlertSchema },
    { name: User.name, schema: UserSchema },
    { name: Prediction.name, schema: PredictionSchema },
  ])],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
