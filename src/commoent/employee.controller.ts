import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Response, request } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller('employee')
export class EmployeeController {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger:Logger,private readonly employeeService: EmployeeService) {}

 
  //  async create(@Body() createEmployeeDto: CreateEmployeeDto,@Res() res:Response) {

  //     try{
  //     let  usersList =await this.employeeService.created(createEmployeeDto);
  //     if (usersList.status) {
  //       res.status(HttpStatus.OK).json({
  //         success: true,
  //         message: usersList.message,
  //         data:usersList
  //       });
  //     }}
  //       catch (error) {
  //       console.log(error);

  //         res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
  //           success: false,
  //           message: 'Invalid Login. Try again',
  //         });
  //     }
  //   }
  @Post('post')
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
    @Res() res: Response,
  ) {
    try {
      let userList = await this.employeeService.created(createEmployeeDto);
      this.logger.info("sucessfully created/employee/post")

      if (userList.success) {
        res.status(HttpStatus.OK).json({
          success: true,

          data: userList,
        });

      }

        else{
          res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
            success: false,
            message: userList.message,
          });

      }
    } catch(error) {
      this.logger.error('Error in creating user/employee/post', +error);
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        success: false,
        message:"something went wrong"
        
      });
    }
  }
////////////////////////////////////put/////////////////////////////////////////
  @Patch('update/:id')
  async updateuser(
    @Param('id') id:number,
    @Body() createEmployeeDto: CreateEmployeeDto,
    @Res() res: Response,
  )
   {
    try {
      let updateDetail = await this.employeeService.update(
        id,
        createEmployeeDto
      )

      if (updateDetail.success) {
        res.status(HttpStatus.OK).json({
          success: true,
          data: updateDetail
        });
      }
    
    else{
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        success: false,
        message: updateDetail.message,
      });

  }
} catch(error) {
  res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
    success: false,
    message:"something went wrong"
    
  });
}
}

  
  //////////////get////////////////////////////////////////////
  @Get('get')
  async find(@Res() res: Response) {

    try {
      let get = await this.employeeService.findAll();
      console.log('------------------>', get);
      if (get.success) {
        return res.status(HttpStatus.OK).json({
          success: true,
          data: get,
        });
      } else {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
          success: false,
        });
      }
    } catch (err) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        success: false,
        message: 'not get value',
      });
    }
  }
   



  @Get('anyone/:id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    try {
      let get = await this.employeeService.findOne(id);
      console.log('------------------>', get);
      if (get.success) {
        return res.status(HttpStatus.OK).json({
          success: true,
          data: get,
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
    }
  }
////////////////delete////////////////////////////////////////////////
  @Delete('delete/:id')
  async remove(@Param('id') id:number,@Res() res:Response ) {

  try {
    let deleting = await this.employeeService.removed(+id);
    console.log('------------------>', deleting);
    if (deleting.success) {
      return res.status(HttpStatus.OK).json({
        success: true,
        data: deleting,
        message:deleting.message
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
  }
}








































//   return this.employeeService.removed(id);//update we will use




  // @Get('getin/:id')
  // findone(@Param('id') id, @Body() createEmployeeDto: CreateEmployeeDto) {
  //   return this.employeeService.findOne(id);
  // }

  // @Get('getid/:id')
  // findOne(@Param('id')id,@Body() createEmployeeDto: CreateEmployeeDto) {
  //   return this.employeeService.findOne(id);
  // }

  // @Put('update/:id')
  // updateuser(@Param('id')id, @Body() createCommoentDto:any){
  //   return this.employeeService.update(id,CreateEmployeeDto);
  // }

  // @Put('updateuser/:id')
  // updateuser(@Param('id')id, @Body() createCommoentDto:any){
  //   return this.employeeService.update1(id,createCommoentDto,);
}

// @Patch(':id')
// update(@Param('id') id: string, @Body() updateCommoentDto: UpdateCommoentDto) {
//   return this.employeeService.update(+id, updateCommoentDto);
// }

// @Delete('delete/:id')
// remove(@Param('id')id ) {
//   return this.employeeService.removed(id);//update we will use
// }
