
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';



export class CreateSignupDto {

 
    @ApiProperty()
    @IsNotEmpty()
    @Length(3,8)
    name:string;
   
    @ApiProperty()
    @IsNotEmpty()
    @Length(3,50)
    @IsEmail()
    email:string;
   
    @ApiProperty()
    @IsNotEmpty()
    token:string;
   


















}
