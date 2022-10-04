import { Injectable } from '@nestjs/common';
import { CreateEventDto } from '../dto/create-event.dto';
import { EventRepository } from '../repository/event.repository';

@Injectable()
export class CreateEventService {
  async execute(data: CreateEventDto) {
    const eventRepository = new EventRepository();

    const newEvent = await eventRepository.createEvent(data);

    return newEvent;
  }
}
