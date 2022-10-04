import { EventRepository } from '../repository/event.repository';

export class FindAllEventsServices {
  async execute() {
    const eventRepository = new EventRepository();

    const events = await eventRepository.findAllEvents();

    return events;
  }
}
