import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private rep: Repository<Users>,
  ) {}

  async postUser(createUserDto: CreateUserDto) {
    let findUser = await this.rep.findOne({
      select: ['id', 'name', 'isActive'],
      where: {
        name: createUserDto.name,
      },
    });
    let data = {
      name: createUserDto.name,
    };
    console.log(findUser);

    if (findUser == undefined) {
      let save = await this.rep.save(data);
      return {
        success: true,
        data: save,
        message: 'successfully user inserted',
      };
    } else {
      return {
        success: false,
        message: 'user already exists',
      };
    }
  }

  async findUsers() {
    let find = await this.rep.find();
    console.log(find);

    if (find) {
      return {
        success: true,
        data: find,
        message: 'values are get',
      };
    } else {
      return {
        success: true,
        message: 'error in servive file',
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
   
  

  async update(id: number, createUserDto: UpdateUserDto) {
    let save = await this.rep.update(
      { id: id },
      {
        name: createUserDto.name,
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



  async remove(id: number) {
    let deleting = await this.rep.update({ id: id }, { isActive: true });

    console.log(deleting);

    if (deleting) {
      return {
        success: true,
        data: deleting,
        message: 'Successfully deleted',
      };
    } else {
      return {
        success: false,
        message: 'someting went wrong',
      };
    }
  }

 
}















