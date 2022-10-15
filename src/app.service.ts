import { Injectable } from '@nestjs/common';
import {DataSource} from 'typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor( private readonly connection:DataSource){}
 

  get () {

    return 'hi';
  } 
  

 
}
