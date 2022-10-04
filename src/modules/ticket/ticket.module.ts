import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'prisma/service/prisma.service';
import { CreateTicketService, PurchaseTicketService } from './services';
import { TicketController } from './ticket.controller';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [TicketController],
  providers: [PrismaService, CreateTicketService, PurchaseTicketService],
})
export class TicketModule {}
