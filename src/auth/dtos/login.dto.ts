import { IsEmail, IsString, MinLength, minLength } from "class-validator";

export class LoginDto {
  
  @IsString()
  email: string;

  @IsString()
  //@MinLength(6)
  password: string;
}