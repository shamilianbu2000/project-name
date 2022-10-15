import { Controller, Get, Post } from '@nestjs/common';
import { get } from 'http';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('tt')
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  // @Get('hi')
  // get():string{
  //   return this.appService.get();
  // }



}
