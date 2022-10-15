import { Injectable } from '@nestjs/common';
import {DataSource} from 'typeorm';

@Injectable()
export class AppService {
  constructor( private readonly connection:DataSource){}
  getHello(): string {
    return 'Hello World!';
  }

  async function() {

    return this.connection.query('select * from fun');
  } 
  

 
}
