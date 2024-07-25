import { Injectable } from '@nestjs/common';
import { DeskDto } from '../dto/desk.dto';
import { Desk } from '../entities/desk.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from '../entities/status.entity';

@Injectable()
export class DeskService {
  constructor(
    @InjectRepository(Desk)
    private readonly deskRepository: Repository<Desk>,
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
  ) {}

  async createDesk(deskDto: DeskDto): Promise<Desk> {
    const queryRunner =
      this.deskRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newDesk = this.deskRepository.create({
        name: deskDto.name,
        avatar_path: deskDto.avatar_path,
        author: { user_id: deskDto.author },
        statuses: deskDto.statuses.map(s => {
            const status = new Status();
            status.color = s.color;
            status.name = s.name;
            return status;
        })
      });

      const savedDesk = await queryRunner.manager.save(newDesk);

      await queryRunner.commitTransaction();
      return savedDesk;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
