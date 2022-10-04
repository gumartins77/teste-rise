import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { LoggedAdmin } from '../auth/decorator/logged-admin.decorator';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import {
  CreateEventService,
  DeleteEventService,
  FindAllEventsServices,
  FindOneEventService,
  UpdateEventService,
} from './services';

@ApiTags('Event')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('event')
export class EventController {
  constructor(
    private findAllEventsServices: FindAllEventsServices,
    private createEventService: CreateEventService,
    private findOneEventService: FindOneEventService,
    private updateEventService: UpdateEventService,
    private deleteEventService: DeleteEventService,
  ) {}

  @Post('create')
  @ApiOperation({
    summary: 'Create a new event - (FOR ADMIN).',
  })
  create(@LoggedAdmin() user: User, @Body() createEventDto: CreateEventDto) {
    return this.createEventService.execute(createEventDto);
  }

  @Get('all')
  @ApiOperation({
    summary: 'List all events - (OPEN).',
  })
  findAll() {
    return this.findAllEventsServices.execute();
  }

  @Get(':eventId')
  @ApiOperation({
    summary: 'View a event by Id - (OPEN).',
  })
  findOne(@Param('eventId') eventId: number) {
    return this.findOneEventService.execute(eventId);
  }

  @Patch('update/:eventId')
  @ApiOperation({
    summary: 'Edit a event by Id - (FOR ADMIN).',
  })
  update(
    @LoggedAdmin() user: User,
    @Param('eventId') eventId: number,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.updateEventService.execute(eventId, updateEventDto);
  }

  @Delete('delete/:eventId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remove a event by Id - (FOR ADMIN).',
  })
  delete(
    @LoggedAdmin() user: User,
    @Param('eventId') eventId: number,
  ): Promise<object> {
    return this.deleteEventService.execute(eventId);
  }
}
