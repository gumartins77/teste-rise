import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { LoggedAdmin } from '../auth/decorator/logged-admin.decorator';
import { LoggedUser } from '../auth/decorator/logged-user.decorator';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { CreateTicketService, PurchaseTicketService } from './services';

@ApiTags('Ticket')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('ticket')
export class TicketController {
  constructor(
    private createTicketService: CreateTicketService,
    private purchaseTicketService: PurchaseTicketService,
  ) {}

  @Post('create')
  @ApiOperation({
    summary: 'Create a new ticket - (FOR ADMIN).',
  })
  create(@LoggedAdmin() user: User, @Body() createTicketDto: CreateTicketDto) {
    return this.createTicketService.execute(createTicketDto);
  }

  @Patch('purchase-ticket/:ticketId')
  @ApiOperation({
    summary: 'Purchase a ticket - (OPEN).',
  })
  purchase(@LoggedUser() user: User, @Param('ticketId') ticketId: number) {
    return this.purchaseTicketService.execute(ticketId, user.id);
  }
}
