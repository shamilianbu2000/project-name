import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {

 @ApiProperty()
 @IsNotEmpty()
 @Length(3,8)
 name:string;





















}
