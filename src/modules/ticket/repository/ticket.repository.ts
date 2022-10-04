import { NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { handleError } from '../../../shared/utils/handle-error.util';
import { CreateTicketDto } from '../dto/create-ticket.dto';

export class TicketRepository extends PrismaClient {
  async createTicket(data: CreateTicketDto) {
    const newTicket = await this.ticket
      .create({
        data: {
          type: data.type,
          barCode: data.barCode,
          qrCode: data.qrCode,
          price: data.price,
          Event: {
            connect: {
              id: data.eventId,
            },
          },
          Batch: {
            connect: {
              id: data.batchId,
            },
          },
        },
      })
      .catch(handleError);

    return newTicket;
  }

  async purchaseTicket(ticketId, userId) {
    const ticket = await this.ticket.findUnique({
      where: {
        id: ticketId,
      },
      include: {
        Batch: true,
        Event: true,
      },
    });

    if (ticket.Batch.batchSales <= 0) {
      return {
        message: `Tickets for the ${ticket.Batch.name} Lot are sold out!`,
      };
    }

    const purchaseTicket = await this.ticket.update({
      where: {
        id: ticket.id,
      },
      data: {
        Batch: {
          update: {
            batchSales: ticket.Batch.batchSales - 1,
          },
        },
        User: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return {
      message: `Successful purchase of the ${ticket.type} ticket to Lote ${ticket.Batch.name}, for the ${ticket.Event.name} Event, scheduled for ${ticket.Event.eventDataTime}. Thank you very much for the purchase, and good event.`,
    };
  }
}
