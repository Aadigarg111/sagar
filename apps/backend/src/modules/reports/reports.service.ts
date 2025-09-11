import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from '../../database/entities/report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}

  async findAll(query: any) {
    const { page = 1, limit = 10, type, status, verified } = query;
    
    const queryBuilder = this.reportRepository.createQueryBuilder('report')
      .leftJoinAndSelect('report.reporter', 'reporter')
      .leftJoinAndSelect('report.mediaFiles', 'mediaFiles')
      .orderBy('report.createdAt', 'DESC');

    if (type) {
      queryBuilder.andWhere('report.type = :type', { type });
    }

    if (status) {
      queryBuilder.andWhere('report.status = :status', { status });
    }

    if (verified !== undefined) {
      queryBuilder.andWhere('report.isVerified = :verified', { verified: verified === 'true' });
    }

    const [reports, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      reports,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    return this.reportRepository.findOne({
      where: { id },
      relations: ['reporter', 'mediaFiles'],
    });
  }

  async create(createReportDto: any) {
    const report = this.reportRepository.create(createReportDto);
    return this.reportRepository.save(report);
  }
}
