import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert, AlertStatus } from '../../database/entities/alert.entity';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private readonly alertRepository: Repository<Alert>,
  ) {}

  async findAll() {
    return this.alertRepository.find({ 
      where: { status: AlertStatus.ACTIVE },
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: string) {
    return this.alertRepository.findOne({ where: { id } });
  }

  async create(createAlertDto: any) {
    const alert = this.alertRepository.create(createAlertDto);
    return this.alertRepository.save(alert);
  }
}
