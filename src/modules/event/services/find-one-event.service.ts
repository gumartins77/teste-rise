import { EventRepository } from '../repository/event.repository';

export class FindOneEventService {
  async execute(eventId: number) {
    const eventRepository = new EventRepository();

    return await eventRepository.findOneEvent(eventId);
  }
}
