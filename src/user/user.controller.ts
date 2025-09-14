import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }

  @Get()
  async getAllUsers(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAllUsers()).map(
      (userEntity) => new ReturnUserDto(userEntity)
    );
  }

@Get('/:userId')
async getUserById(
  @Param('userId', ParseIntPipe) userId: number,
): Promise<ReturnUserDto> {
  const user = await this.userService.getUserByIdUsingRelations(userId);

  //se tirar da erro no return
  if (!user) {
    throw new NotFoundException(`User with id ${userId} not found`);
  }

  return new ReturnUserDto(user);
}






}
