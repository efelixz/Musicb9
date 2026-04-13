import { Controller, Get, Req } from '@nestjs/common';

@Controller('dashboard')
export class DashboardController {
  @Get('summary')
  async getSummary(@Req() req: any) {
    // No BFF real, faria chamadas HTTP para os microserviços/API core
    return {
      user: {
         name: 'Rafael Silva',
         plan: 'Pro',
         credits: 42
      },
      stats: {
         activeProjects: 3,
         vocalProfiles: 1,
         completedRenders: 12
      },
      recentActivity: [
         { type: 'render', status: 'completed', project: 'Vibe de Verão', time: '2h ago' }
      ]
    };
  }
}
