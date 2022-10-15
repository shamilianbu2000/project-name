import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response, request } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly usersService: UsersService,
  ) {}

  @Post('post')
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    try {
      let post = await this.usersService.postUser(createUserDto);
      console.log(post);

      if (post.success) {
        this.logger.info('successfully user inserted-users/post');
        res.status(HttpStatus.OK).json({
          success: true,
          data: post,
        });
      } else {
        this.logger.warn('user already exist-users/post');
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
          success: false,
        });
      }
    } catch (error) {
      this.logger.error('errors occured-users/post', error);
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        success: false,
        message: 'something went wrong',
      });
    }
  }


  
  @Get('get')
  async findUser(@Res() res: Response) {
    let getUser = await this.usersService.findUsers();
    console.log(getUser);
    try {
      if (getUser.success) {
        this.logger.info('successfully read-users/get');
        res.status(HttpStatus.OK).json({
          success: true,
          data: getUser,
        });
      } else {
        this.logger.warn('-users/get');
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
          success: false,
        });
      }
    } catch (error) {
      this.logger.error('errors occured-users/get', error);
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        success: false,
        message: 'something went wrong',
      });
    }
  }



  @Get('find/:id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    try {
      let getid = await this.usersService.findOne(id);
      console.log('------------------>', getid);
      if (getid.success) {
        return res.status(HttpStatus.OK).json({
          success: true,
          data: getid,
        });
      } else {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
          success: false,
        });
      }
    } catch (err) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        success: false,
        message: 'something went wrong',
      });
    

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
