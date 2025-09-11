import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('stats')
  getStats() {
    return this.analyticsService.getStats();
  }

  @Get('reports/trends')
  getReportTrends(@Query() query: any) {
    return this.analyticsService.getReportTrends(query);
  }

  @Get('predictions')
  getPredictions() {
    return this.analyticsService.getPredictions();
  }
}
