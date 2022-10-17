import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { identity } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateSignupDto } from './dto/create-signup.dto';
import { UpdateSignupDto } from './dto/update-signup.dto';
import { Signup } from './entities/signup.entity';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service'; 


@Injectable()
export class SignupService {
  constructor(
    @InjectRepository(Signup)
    private rep: Repository<Signup>,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async signUp(createSignupDto: CreateSignupDto) {
    let data = { name: createSignupDto.name, email: createSignupDto.email };
    if (data) {
      let checkMail = await this.rep.findOne({
        select: ['id', 'name', 'email'],
        where: { email: createSignupDto.email },
      });
      console.log(checkMail);
      if (!checkMail) {
        let createUser = await this.rep.save(data);
        let userDataEmail = await this.rep.findOne({
          select: ['id', 'name', 'email'],
          where: { email: createSignupDto.email }})
         
    
      let payload = { id:userDataEmail.id, email: userDataEmail.email };

      console.log(payload);
      

      let generateToken = this.jwtService.sign(payload);

      console.log(generateToken);
      let updateToken = await this.rep.update(
        { id:userDataEmail.id },
         { token :generateToken }
      );


      await this.mailService.sendUserConfirmation(createSignupDto,generateToken);
      console.log("mail sent");
    
      return {
        status: true,
        message: 'Signed Up Successfully And Check Your Mail And Verify It',
      }       

    }
          return{
            status:false,
            message:'user already exist'
          }
      
    }
        
  }}  
