import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: Partial<User>): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async findOne(where: FindOneOptions<User>): Promise<User> {
    const user = await this.userRepository.findOne(where);

    if (!user) {
      throw new NotFoundException(`There is no user with given credentials`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) : Promise<User> {
    const user = await this.userRepository.findOne({ where: { user_id: parseInt(id) } })

    if (!user) {
      throw new NotFoundException(`This user was not found`);
    }

    if (updateUserDto.avatar_path) {
      user.avatar_path = updateUserDto.avatar_path;
    }
    if (updateUserDto.first_name) {
      user.first_name = updateUserDto.first_name;
    }
    if (updateUserDto.last_name) {
      user.last_name = updateUserDto.last_name;
    }

    const updatedUser = await this.userRepository.save(user)

    return updatedUser;
  }
}
