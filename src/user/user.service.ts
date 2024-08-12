import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { UserKey } from 'src/entities/User.entity';
import { Repository } from 'typeorm';

export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  find(where?: Partial<User>, select?: UserKey[]) {
    return this.userRepo.find({ where, select });
  }

  findOne(where: Partial<User>, select?: UserKey[]) {
    return this.userRepo.findOne({ where, select });
  }
}
