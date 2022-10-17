import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { CommoentModule } from './commoent/commoent.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersModule } from "./users/users.module";
 import { EmployeeModule } from './commoent/employee.module';
 import { Employee } from './commoent/entities/employee.entity';
import { WinstonModule } from 'nest-winston';

import * as winston from 'winston';
import { Users } from './users/entities/user.entity';




@Module({




  imports: [
    
    TypeOrmModule.forRoot({
      type: 'mysql',

      host: 'localhost',

      port: 3306,

      username: 'shamili',

      password: 'Password@123',

      database: 'nest',

     entities:[Users,Employee],

      synchronize: false,
    }),

    EmployeeModule,
    UsersModule,
    
    WinstonModule.forRoot({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.colorize(),
        winston.format.errors(),
      ),

      // level: "warn",
      // format: winston.format.combine(
      // winston.format.timestamp(),
      // winston.format.json(),
      // winston.format.colorize(),
      // winston.format.errors()),

      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: 'logs/activity.log',
          level: 'info',
          format: winston.format.colorize(),
        }),
        new winston.transports.File({
          filename: 'logs/warn.log',
          level: 'warn',
          format: winston.format.colorize(),
        }),
        new winston.transports.Console(),
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
          format: winston.format.colorize(),
        }),
        new winston.transports.Console(),
        new winston.transports.File({
          filename: 'logs/debug.log',
          level: 'debug',
          format: winston.format.colorize(),
        }),
      ],
    }),

  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
