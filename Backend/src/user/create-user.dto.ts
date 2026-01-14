import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString({ message: 'Name should be in string' })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'The password should atleast be of 6 characters' })
  password: string;
}
