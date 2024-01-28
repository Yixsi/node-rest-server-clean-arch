import {
  AuthDatasource,
  CustomError,
  RegisterUserDto,
  User,
} from "../../domain";

export class AuthDatasourceImpl implements AuthDatasource {
  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const { name, email, password } = registerUserDto;
    try {
      // verify email
      // hash password
      // map the response to the enity

      return new User("1", name, email, password, ["ADMIN"]);
    } catch (error) {
      if (error instanceof CustomError) throw error;

      throw CustomError.internalServer("Unexpected error");
    }
  }
}
