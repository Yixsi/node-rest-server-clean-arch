import { RegisterUserDto } from "../dtos";
import { User } from "../entities";

export abstract class AuthDatasource {
  // we use abstract to not allow having instances of this class

  abstract register(registerUserDto: RegisterUserDto): Promise<User>;
  // it returns a Promise as the requests are async, and the type is User which is our entity
}

/**
 * Datasources define the rules for obtaining the data
 * Using the DTO over passing the parameters we can modify the DTO without afecting other parts as the DB
 */
