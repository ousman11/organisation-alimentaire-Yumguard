import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private userRepo;
    constructor(userRepo: Repository<User>);
    create(email: string, password: string): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
}
