import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { Report } from '../../database/entities/report.entity';
import { Alert } from '../../database/entities/alert.entity';
import { User } from '../../database/entities/user.entity';
import { Prediction } from '../../database/entities/prediction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Report,
    Alert,
    User,
    Prediction,
  ])],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
