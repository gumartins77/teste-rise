import { EventRepository } from '../repository/event.repository';

export class DeleteEventService {
  async execute(eventId: number): Promise<object> {
    const eventRepository = new EventRepository();

    const event = await eventRepository.findOneEvent(eventId);

    return await eventRepository.deleteEvent(eventId);
  }
}
