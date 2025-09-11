import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  findAll(@Query() query: any) {
    return this.reportsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportsService.findOne(id);
  }

  @Post()
  create(@Body() createReportDto: any) {
    return this.reportsService.create(createReportDto);
  }
}
