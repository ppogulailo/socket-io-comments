import { Injectable } from '@nestjs/common';

@Injectable()
export class GenericService {
  pcoket: any;
  constructor() {
    this.pcoket = Object.create(null);
  }
}
