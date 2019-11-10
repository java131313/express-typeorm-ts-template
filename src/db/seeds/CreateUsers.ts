import { Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';

import { User } from '../../entity/UserEntity';

export class CreateUsers {
  public async seed(factory: Factory, _connection: Connection): Promise<any> {
    await factory(User)().seedMany(10);
  }
}
