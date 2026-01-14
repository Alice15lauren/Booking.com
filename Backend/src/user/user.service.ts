/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/auth/roles.enum';

type AdminBooking = {
  userId: number;
  userName: string;
  userEmail: string;
  bookingId: string;
  movieTitle: string;
  showDate: string;
  showTime: string;
  venue: string;
  seats: string[];
  totalAmount: number;
  createdAt: string;
};

@Injectable()
export class UserService {
  findById(id: number) {
    throw new Error('Method not implemented.');
  }
  //userRepository: any;
  // getStats() {
  //   throw new Error('Method not implemented.');
  // }
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async countAll(): Promise<number> {
    return this.userRepo.count();
  }

  async countActive(): Promise<number> {
    return this.userRepo.count({
      where: { isLoggedIn: true },
    });
  }

  async countByRole(role: Role): Promise<number> {
    return this.userRepo.count({
      where: { role },
    });
  }

  async findAllForAdmin() {
    return this.userRepo.find({
      select: ['id', 'name', 'email', 'role'],
    });
  }
  async markLoggedIn(userId: number) {
    await this.userRepo.update({ id: userId }, { isLoggedIn: true });
  }

  async markLoggedOut(userId: number) {
    await this.userRepo.update({ id: userId }, { isLoggedIn: false });
  }

  async createUser(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepo.create({
      name,
      email,
      password: hashedPassword,
    });

    return this.userRepo.save(user);
  }

  async findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async getAllUsers() {
    return this.userRepo.find();
  }

  async getUserById(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  async updateUser(id: number, data: Partial<User>) {
    await this.userRepo.update({ id }, data);
    return this.getUserById(id);
  }

  async deleteUser(id: number) {
    return this.userRepo.delete({ id });
  }

  async getAdminStats() {
    const totalUsers = await this.countAll();
    const activeUsers = await this.countActive();
    const adminUsers = await this.countByRole(Role.Admin);

    return {
      totalUsers,
      activeUsers,
      adminUsers,
    };
  }

  async getAllUsersForAdmin() {
    return this.findAllForAdmin();
  }

  async createBooking(userId: number, bookingData: any) {
    const users = await this.userRepo.find();

    const bookedSeats = users.flatMap((user: { bookings: any }) =>
      (user.bookings || [])
        .filter(
          (b: { movieTitle: any; showDate: any; showTime: any; venue: any }) =>
            b.movieTitle === bookingData.movieTitle &&
            b.showDate === bookingData.showDate &&
            b.showTime === bookingData.showTime &&
            b.venue === bookingData.venue,
        )
        .flatMap((b: { seats: any }) => b.seats),
    );
    const conflict = bookingData.seats.some((seat: any) =>
      bookedSeats.includes(seat),
    );

    if (conflict) {
      throw new BadRequestException(
        'This seat is already booked. Try another one!',
      );
    }

    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const newBooking = {
      bookingId: 'BK' + Date.now(),
      movieTitle: bookingData.movieTitle,
      showDate: bookingData.showDate,
      showTime: bookingData.showTime,
      venue: bookingData.venue,
      seats: bookingData.seats,
      totalAmount: bookingData.totalAmount,
      createdAt: new Date().toISOString(),
    };

    user.bookings = [...(user.bookings || []), newBooking];

    await this.userRepo.save(user);

    return newBooking;
  }

  async getBookedSeats(
    movieTitle: string,
    showDate: string,
    showTime: string,
    //venue = 'INOX Pune',
  ) {
    const users = await this.userRepo.find();
    //const normalize = (s: string) => s.trim().toLowerCase();
    return users.flatMap((user) =>
      (user.bookings || [])
        .filter(
          (b) =>
            b.movieTitle === movieTitle &&
            b.showDate === showDate &&
            b.showTime === showTime,
          //b.venue === venue,
        )
        .flatMap((b) => b.seats),
    );
  }

  async getMyBookings(userId: number) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user.bookings || [];
  }

  async getAllBookingsForAdmin() {
    const users = await this.userRepo.find();

    const allBookings: AdminBooking[] = [];

    for (const user of users) {
      if (!user.bookings || user.bookings.length === 0) continue;

      for (const booking of user.bookings) {
        allBookings.push({
          userId: user.id,
          userName: user.name,
          userEmail: user.email,

          bookingId: booking.bookingId,
          movieTitle: booking.movieTitle,
          showDate: booking.showDate,
          showTime: booking.showTime,
          venue: booking.venue,
          seats: booking.seats,
          totalAmount: booking.totalAmount,
          createdAt: booking.createdAt,
        });
      }
    }

    return allBookings;
  }
}
