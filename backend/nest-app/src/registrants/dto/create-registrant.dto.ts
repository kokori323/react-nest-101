import { IsString, IsEmail } from 'class-validator';

export class CreateRegistrantDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;
}
