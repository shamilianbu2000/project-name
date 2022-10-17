import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  getHello(): string {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Employee)
    private rep: Repository<Employee>,
  ) {}

  // async created(CreateCommoentDto) {
  //   let data = {
  //     name:CreateCommoentDto.name,

  //     isActive:CreateCommoentDto.is_Active
  //   }
  //   let save = await this.rep.save(data)
  //   return save;

  // }

  // async created(CreateCommoentDto:any) {
  //   let datas = {
  //     first_name:CreateCommoentDto.first_name,
  //     last_name:CreateCommoentDto.last_name,
  //     isActive:CreateCommoentDto.is_Active
  //   }
  //   let userCheck = await this.rep.findOne({
  //      select:[],
  //     where :{
  //       name: CreateEmployeeDto.name
  //     }})
  //     console.log("userCheck",userCheck)
  //     if(!userCheck){
  //       let save = await this.rep.save(datas)
  //       return{
  //         status: true,
  //         message: 'Login Successfully',
  //         data:save

  //       }
  //     }else{
  //       return {
  //         status:false,
  //         message:"User Alreasy exitsted"
  //       }
  //     }

  // }

  async created(createEmployeeDto: CreateEmployeeDto) {
    let findingone = await this.rep.findOne({
      select: ['id', 'name', 'isActive'],
      where: { name: createEmployeeDto.name },
    });

    console.log(findingone);

    let data = {
      // id: createEmployeeDto.id,
      name: createEmployeeDto.name,
      isActive: true,
    };

    if (findingone == undefined) {
      let save = await this.rep.save(data);

      return {
        success: true,

        data: save,

        message: 'User Successfully Inserted',
      };
    } else {
      return {
        success: false,
        message: 'User Already Exist',
      };
    }
  }
  //////////////////////put////////////////////////////////
  async update(id: number, createEmployeeDto: UpdateEmployeeDto) {
    let save = await this.rep.update(
      { id: id },
      {
        name: createEmployeeDto.name,
      },
    );

    if (save) {
      return {
        success: true,

        data: save,

        message: 'User data update success',
      };
    } else {
      return {
        success: false,

        message: 'hi',
      };
    }
  }

  //////////////////get//////////////////////////////////////////////////
  async findAll() {
    let find = await this.rep.find();
    console.log(find);

    if (find) {
      return {
        success: true,

        data: find,

        message: 'value get',
      };
    } else {
      return {
        success: true,

        message: 'someting went wrong',
      };
    }
  }

  async findOne(id: number) {
    let find = await this.rep.findOne({
      select: ['id', 'name', 'isActive'],

      where: { id: id },
    });

    console.log('--------------------->', find);

    if (find) {
      return {
        success: true,

        data: find,

        message: 'value get',
      };
    } else {
      return {
        success: true,

        message: 'someting went wrong',
      };
    }
  }

  // ///////delete///////////////////////////////////////////////////////////

  async removed(id: any) {
    let deleting = await this.rep.update({ id: id }, { isActive: true });
    console.log(deleting);
    if (deleting) {
      return {
        success: true,
        data: deleting,
        message: 'value get',
      };
    } else {
      return {
        success: false,

        message: 'someting went wrong',
      };
    }
  }
}
