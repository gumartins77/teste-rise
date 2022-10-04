import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { LoggedAdmin } from '../auth/decorator/logged-admin.decorator';
import { CreateBatchDto } from './dto/create-batch.dto';
import { CreateBatchService } from './services';

@ApiTags('Batch')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('batch')
export class BatchController {
  constructor(private createBatchService: CreateBatchService) {}

  @Post('create')
  @ApiOperation({
    summary: 'Create a new batch - (FOR ADMIN).',
  })
  create(@LoggedAdmin() user: User, @Body() createBatchDto: CreateBatchDto) {
    return this.createBatchService.execute(createBatchDto);
  }
}
