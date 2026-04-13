import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';

@Controller('v1/orchestration')
export class OrchestrationController {
  @Get('dashboard-summary')
  async getDashboardSummary() {
    // Orquestra chamadas entre API de Projetos, Billing e Vozes
    return {
      activeProjects: 3,
      creditsRemaining: 42,
      voiceStatus: 'ready',
      recentActivity: []
    };
  }

  @Post('create-full-production')
  async createFullProduction(@Body() data: any) {
    // Pipeline complexo de criação em uma única chamada BFF
    return { status: 'pipeline_started', jobId: 'bff_job_123' };
  }
}
