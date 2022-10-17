import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Res, HttpStatus } from '@nestjs/common';
import { SignupService } from './signup.service';
import { CreateSignupDto } from './dto/create-signup.dto';
import { UpdateSignupDto } from './dto/update-signup.dto';
import { Response, request } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';


@Controller('signup')
export class SignupController {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,private readonly signupService: SignupService) {}

@Post('signup')
async signup(@Body() createSignupDto:CreateSignupDto,@Res() res:Response){
  try{
    let signUp = await this.signupService.signUp(createSignupDto)
    if (signUp.status) {
      this.logger.info('successfully user created')
      res.status(HttpStatus.OK).json({
        success: true,
        message: signUp.message,
      });
    } else {
      this.logger.warn('Error in creating user');
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: signUp.message,
      });
    }
  }
  catch(error){
    console.log("asdfghjkl",error)
    this.logger.error('Invalid signup', error);
    res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      success: false,
      message: 'Invalid Login. Try again',
    });
  }
  

}

}


















