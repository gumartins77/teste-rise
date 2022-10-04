import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { TicketRepository } from '../repository/ticket.repository';

@Injectable()
export class PurchaseTicketService {
  async execute(ticketId, userId) {
    const ticketRepository = new TicketRepository();

    const purchaseTicket = await ticketRepository.purchaseTicket(ticketId, userId);

    return purchaseTicket;
  }
}
