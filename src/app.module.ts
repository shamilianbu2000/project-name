import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { CommoentModule } from './commoent/commoent.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersModule } from './users/users.module';
import { EmployeeModule } from './commoent/employee.module';
import { Employee } from './commoent/entities/employee.entity';
import { WinstonModule } from 'nest-winston';

import * as winston from 'winston';
import { Users } from './users/entities/user.entity';
import { SignupModule } from './signup/signup.module';
import { Signup } from './signup/entities/signup.entity';

import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail/mail.service';
import { join} from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',

      host: 'localhost',

      port: 3306,

      username: 'shamili',

      password: 'Password@123',

      database: 'nest',
      // host: process.env.DATABASE_HOST,
      // port: 3306,
      // username: process.env.DATABASE_USER,
      // password: process.env.DATABASE_PASSWORD,
      // database: process.env.DATABASE_NAME,
      entities: [Users, Employee, Signup],

       synchronize: true,
    }),

 
    MailerModule.forRoot({

      transport: {
        host: 'smtp.mailtrap.io',
        secure: false,
        auth: {
          user: '0dcd2cbd8bd831',
          pass: 'f661df06e996d3',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: join(__dirname, 'Templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
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
   
    SignupModule,
  ],

  controllers: [AppController],
  providers: [AppService,MailService],
})
export class AppModule {}
