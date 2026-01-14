import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { AdminService } from './admin.service';
import { Role } from 'src/auth/roles.enum';
import { Roles } from 'src/auth/role.decorator';
import { RolesGuard } from 'src/auth/role.guard';
@Controller('admin')
export class AdminController {
  constructor(
    private readonly userService: UserService,
    private readonly adminService: AdminService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('stats')
  async getStats() {
    console.log('AdminController /admin/stats hit');
    return this.adminService.getStats();
  }
  @UseGuards(JwtAuthGuard)
  @Get('users')
  async getAllUsers() {
    return this.userService.getAllUsersForAdmin();
  }
  @Get('bookings')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  getAllBookings() {
    return this.userService.getAllBookingsForAdmin();
  }
}
