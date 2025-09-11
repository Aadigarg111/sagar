import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Alert, AlertStatus } from '../../database/entities/alert.entity';

@Injectable()
export class AlertsService {
  constructor(
    @InjectModel(Alert.name)
    private readonly alertModel: Model<Alert>,
  ) {}

  async findAll() {
    return this.alertModel.find({ status: AlertStatus.ACTIVE }).sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    return this.alertModel.findById(id);
  }

  async create(createAlertDto: any) {
    const alert = new this.alertModel(createAlertDto);
    return alert.save();
  }
}
