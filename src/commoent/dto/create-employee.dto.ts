
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  MaxLength,
  MinLength,
  Length,
  IsNumber,
} from 'class-validator';



export class CreateEmployeeDto {

  @ApiProperty()
  // @IsNotEmpty()
  // @Length(2, 9)
  name:string;


  // @ApiProperty()
  // // @IsNumber()
  // // @Length(2,9)
  // isActive:boolean;

  // @ApiProperty()
  // @IsNumber()
  // // @Length(3,9)
  // id:number;

  
  // @ApiProperty()
  // isActive: any;
  // static id: number ;
}
