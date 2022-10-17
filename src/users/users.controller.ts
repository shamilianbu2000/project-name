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
  Put,
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
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
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
        this.logger.warn("can't get data-users/get");
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
        this.logger.info('successfully read-users/find');
        return res.status(HttpStatus.OK).json({
          success: true,
          data: getid,
        });
      } else {
        this.logger.warn('user not available-users/find');
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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  @Put('put/:id')
  async updateuser(
    @Param('id') id: number,
    @Body() createUsersDto: CreateUserDto,
    @Res() res: Response,
  ) {
    try {

      let updateDetail = await this.usersService.update(
        id,
        createUsersDto,
      );

      if (updateDetail.success) {
        
      this.logger.info('successfuly updated-users/put');
        res.status(HttpStatus.OK).json({
          success: true,
          data: updateDetail,
        });
      } else {

      this.logger.warn('could not find user-users/put');
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
          success: false,
          message: updateDetail.message,
        });
      }
    } catch (error) {
      this.logger.error('error occured-users/put');
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        success: false,
        message: 'something went wrong',
      });
    }
  }

  @Delete('deleted/:id')
  async remove(@Param('id') id: number, @Res() res: Response) {
    try {
      let deleting = await this.usersService.remove(+id);
      console.log('------------------>', deleting);
      if (deleting.success) {
        this.logger.error('successfuly deleted-users/delete');
        return res.status(HttpStatus.OK).json({
          success: true,
          data: deleting,
          message: deleting.message,
        });
      } else {
        this.logger.warn('could not find user-users/delete');
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
          success: false,
        });
      }
    } catch (error) {
      this.logger.error('errors occured-users/delete', error);
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        success: false,
        message: 'something went wrong',
      });
    }
  }
}
