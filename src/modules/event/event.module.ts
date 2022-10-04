import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'prisma/service/prisma.service';
import { EventController } from './event.controller';
import {
  CreateEventService,
  DeleteEventService,
  FindAllEventsServices,
  FindOneEventService,
  UpdateEventService,
} from './services';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [EventController],
  providers: [
    PrismaService,
    FindAllEventsServices,
    CreateEventService,
    FindOneEventService,
    UpdateEventService,
    DeleteEventService,
  ],
})
export class EventModule {}
