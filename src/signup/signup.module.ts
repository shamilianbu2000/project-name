import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { Signup } from './entities/signup.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Signup]),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '3660s' },
    }),
  ],

  controllers: [SignupController],
  providers: [SignupService, MailService]
})
export class SignupModule {}
