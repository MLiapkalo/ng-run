import { Author } from '../interfaces/User';

export class AuthorModel implements Author {
  constructor(
    public id: number,
    public name: string
  ) {}
}
