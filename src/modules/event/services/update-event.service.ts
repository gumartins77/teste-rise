import { UpdateEventDto } from '../dto/update-event.dto';
import { EventRepository } from '../repository/event.repository';

export class UpdateEventService {
  async execute(eventID: number, data: UpdateEventDto) {
    const eventRepository = new EventRepository();

    const event = await eventRepository.findOneEvent(eventID);

    return await eventRepository.updateEvent(eventID, data);
  }
}
