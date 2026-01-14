/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { UseGuards, Get, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UpdateUserDto } from './update-user.dto';
//import { Roles } from 'src/auth/role.decorator';
//import { Role } from 'src/auth/roles.enum';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  async create(@Body() body: CreateUserDto) {
    return this.userService.createUser(body.name, body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return {
      message: 'Profile viewed successfully',
      user: req.user,
    };
  }

  @Get('booked-seats')
  async getBookedSeats(
    @Query('movieTitle') movieTitle: string,
    @Query('showDate') showDate: string,
    @Query('showTime') showTime: string,
    //@Query('venue') venue: string,
  ) {
    return this.userService.getBookedSeats(
      movieTitle,
      showDate,
      showTime,
      //venue,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('book')
  bookMovie(@Req() req, @Body() body) {
    return this.userService.createBooking(req.user.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-bookings')
  myBookings(@Req() req) {
    return this.userService.getMyBookings(req.user.id);
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(id, body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
