import { Injectable, UploadedFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { identity } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateSignupDto } from './dto/create-signup.dto';
import { UpdateSignupDto } from './dto/update-signup.dto';
import { Signup } from './entities/signup.entity';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import * as bcrypt from 'bcryptjs';
import { config } from 'process';
import * as AWS from "aws-sdk";


@Injectable()
export class SignupService {
  constructor(
    @InjectRepository(Signup)
    private rep: Repository<Signup>,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async signUp(createSignupDto: CreateSignupDto) {
    const password = createSignupDto.password;
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    let data = { name: createSignupDto.name, email: createSignupDto.email,password:hash};
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
        


  }

 



  async uploadFile(databuffer:Buffer,filename:string,filemetatype:string){
    try{
      AWS.config.update({
       accessKeyId : 'AKIAVNJBABBZL5KKHZF7' ,

        secretAccessKey : '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'

      })
      const s3 =new AWS.S3()
const uploadResult=await s3.upload({
  Bucket: 'expensetracker-bucket' ,
  Key: filename,
  Body: databuffer,
  ContentType: filemetatype,
}).promise()
      
  return{
    key:uploadResult.Key,
    url:uploadResult.Location
  }
      
    }


    catch{

    }
  }

  async addImage(data){
    return this.rep.save(data)
  }














}  
