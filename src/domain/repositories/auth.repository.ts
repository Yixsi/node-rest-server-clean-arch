import { RegisterUserDto } from "../dtos";
import { User } from "../entities";

export abstract class AuthRepository {
  // we use abstract to not allow having instances of this class

  abstract register(registerUserDto: RegisterUserDto): Promise<User>;
  // it returns a Promise as the requests are async, and the type is User which is our entity
}

// The repository will receive the datasource to modify it
