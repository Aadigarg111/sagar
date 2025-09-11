import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User, UserSchema } from './entities/user.entity';
import { Report, ReportSchema } from './entities/report.entity';
import { Alert, AlertSchema } from './entities/alert.entity';
import { MediaFile, MediaFileSchema } from './entities/media-file.entity';
import { UserReputation, UserReputationSchema } from './entities/user-reputation.entity';
import { Prediction, PredictionSchema } from './entities/prediction.entity';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI', 'mongodb+srv://aadileetcode:3PyPy3AbgYSbTtrZ@cluster0.ppfyozj.mongodb.net/sagar_db'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Report.name, schema: ReportSchema },
      { name: Alert.name, schema: AlertSchema },
      { name: MediaFile.name, schema: MediaFileSchema },
      { name: UserReputation.name, schema: UserReputationSchema },
      { name: Prediction.name, schema: PredictionSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
