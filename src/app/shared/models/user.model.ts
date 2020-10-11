import { User } from '../interfaces/user';

export class UserModel implements User {
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string
    ) {}
}