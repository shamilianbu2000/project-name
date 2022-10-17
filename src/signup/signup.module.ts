import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { Signup } from './entities/signup.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Signup])],
  controllers: [SignupController],
  providers: [SignupService]
})
export class SignupModule {}
