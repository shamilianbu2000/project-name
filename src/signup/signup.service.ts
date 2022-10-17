import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { identity } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateSignupDto } from './dto/create-signup.dto';
import { UpdateSignupDto } from './dto/update-signup.dto';
import { Signup } from './entities/signup.entity';

@Injectable()
export class SignupService {
 
  constructor(
    @InjectRepository(Signup)
    private rep: Repository<Signup>,
  ) {}


  async signUp(createSignupDto:CreateSignupDto){
    let data = {name : createSignupDto.name, email : createSignupDto.email}
    if(data){
      let checkMail = await this.rep.findOne({
        select: ['id','name','email'],
        where:{ email : createSignupDto.email}   
      })
      console.log(checkMail)
      if(!checkMail){
        let createUser = await this.rep.save(data)
      }
      let token:
    }
    
    

  } 




























}
