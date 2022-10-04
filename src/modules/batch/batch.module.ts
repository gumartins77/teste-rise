import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'prisma/service/prisma.service';
import { BatchController } from './batch.controller';
import { CreateBatchService } from './services';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [BatchController],
  providers: [PrismaService, CreateBatchService],
})
export class BatchModule {}
