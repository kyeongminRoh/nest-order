import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/auth.entity';
import { AccessLog } from '../entity/accesslog.entity';

@Injectable()
export class AccessLoginRepository extends Repository<UserEntity>  {
  constructor(
    @InjectRepository(UserEntity)
    private readonly accessLogRepository: Repository<UserEntity>,
  ) {
    super(accessLogRepository.target, accessLogRepository.manager, accessLogRepository.queryRunner);
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return this.accessLogRepository.findOneBy({ email });
  }

  async createAccessLog(loginUser: UserEntity): Promise<void> {
    const accessLog = new AccessLog();
    accessLog.ua = loginUser.name;
    accessLog.endpoint = loginUser.email;
    accessLog.ip = loginUser.password;
    await this.accessLogRepository.save(accessLog);
  }
}

