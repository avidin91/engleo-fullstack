import { User } from './user.entity';
import { Words } from '../../words/entities/words.entity';
export declare class UserWordProgress {
    id: number;
    user: User;
    word: Words;
    endTime: Date;
    status: number;
}
