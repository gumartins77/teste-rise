import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedAdmin } from '../auth/decorator/logged-admin.decorator';
import { LoggedUser } from '../auth/decorator/logged-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {
  CreateUserService,
  DeleteUserService,
  FindAllUsersServices,
  FindOneUserService,
  UpdateUserService,
} from './services';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private findAllUsersServices: FindAllUsersServices,
    private createUserService: CreateUserService,
    private findOneUserService: FindOneUserService,
    private updateUserService: UpdateUserService,
    private deleteUserService: DeleteUserService,
  ) {}

  @Post('create')
  @ApiOperation({
    summary: 'Create a new user.',
  })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.createUserService.execute(createUserDto);
  }

  @Get('all')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'List all users - (FOR ADMIN).',
  })
  findAll(@LoggedAdmin() user: User) {
    return this.findAllUsersServices.execute();
  }

  @Get(':userId')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'View a user by Id - (FOR ADMIN).',
  })
  findOneUser(@LoggedUser() user: User) {
    return this.findOneUserService.execute(user.id);
  }

  @Patch('update/:userId')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Edit a user by Id - (FOR ADMIN).',
  })
  updateUser(
    @LoggedUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.updateUserService.execute(user.id, updateUserDto);
  }

  @Delete('delete/:userId')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remove a user by Id - (FOR ADMIN).',
  })
  deleteUser(@LoggedUser() user: User): Promise<object> {
    return this.deleteUserService.execute(user.id);
  }
}
