import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { TicketRepository } from '../repository/ticket.repository';

@Injectable()
export class CreateTicketService {
  async execute(data: CreateTicketDto) {
    const ticketRepository = new TicketRepository();

    const newTicket = await ticketRepository.createTicket(data);

    return newTicket;
  }
}
