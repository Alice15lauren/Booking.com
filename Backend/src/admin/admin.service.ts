import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Role } from '../auth/roles.enum';

@Injectable()
export class AdminService {
  constructor(private readonly userService: UserService) {}

  async getStats() {
    const totalUsers = await this.userService.countAll();
    const activeUsers = await this.userService.countActive();
    const adminUsers = await this.userService.countByRole(Role.Admin);
    console.log('ADMIN STATS:', { totalUsers, activeUsers, adminUsers });
    return {
      totalUsers,
      activeUsers,
      adminUsers,
    };
  }

  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}
