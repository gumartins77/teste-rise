import { NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { handleError } from '../../../shared/utils/handle-error.util';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';

export class EventRepository extends PrismaClient {
  async createEvent(data: CreateEventDto) {
    const newEvent = await this.event
      .create({
        data: {
          ...data,
        },
      })
      .catch(handleError);

    return newEvent;
  }

  async findAllEvents() {
    const events = await this.event.findMany().catch(handleError);

    if (events.length === 0) {
      throw new NotFoundException('No a events found');
    }

    return events;
  }

  async findOneEvent(eventId: number) {
    const event = await this.event
      .findUnique({
        where: { id: eventId },
        include: {
          ticks: {
            include: {
              Batch: true
            }
          }
        }
      })
      .catch(handleError);

    if (!event) {
      throw new NotFoundException(`Event with Id '${eventId}' not found!`);
    }

    return event;
  }

  async updateEvent(eventId: number, data: UpdateEventDto) {
    const updatedEvent = await this.event
      .update({
        where: { id: eventId },
        data: {
          ...data,
        },
      })
      .catch(handleError);

    return updatedEvent;
  }

  async deleteEvent(eventId: number): Promise<object> {
    await this.event
      .delete({
        where: { id: eventId },
      })
      .catch(handleError);

    return { message: 'Event deleted successfully' };
  }
}
