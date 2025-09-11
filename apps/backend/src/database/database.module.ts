import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { Report } from './entities/report.entity';
import { Alert } from './entities/alert.entity';
import { MediaFile } from './entities/media-file.entity';
import { UserReputation } from './entities/user-reputation.entity';
import { Prediction } from './entities/prediction.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'password'),
        database: configService.get('DB_NAME', 'sagar_platform'),
        entities: [User, Report, Alert, MediaFile, UserReputation, Prediction],
        synchronize: configService.get('NODE_ENV') === 'development',
        logging: configService.get('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      User,
      Report,
      Alert,
      MediaFile,
      UserReputation,
      Prediction,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
