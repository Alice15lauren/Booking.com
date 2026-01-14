import { Role } from 'src/auth/roles.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('userData')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @Column({ default: false })
  isLoggedIn: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column('json', { nullable: true })
  bookings: {
    bookingId: string;
    movieTitle: string;
    showDate: string;
    showTime: string;
    venue: string;
    seats: string[];
    totalAmount: number;
    createdAt: string;
  }[];
}
