
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, isNotEmpty, IsNotEmpty, Length } from 'class-validator';



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
    @Length(8,16)
    password:string;
 
   


















}
