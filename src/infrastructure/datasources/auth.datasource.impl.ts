import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
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
      const emailExists = await UserModel.findOne({ email });
      if (emailExists) throw CustomError.badRequest("User already exists");

      // hash password
      const user = await UserModel.create({
        name,
        email,
        password: BcryptAdapter.hash(password),
      });
      await user.save();

      // map the response
      return new User(user.id, name, email, password, ["ADMIN"]);
    } catch (error) {
      if (error instanceof CustomError) throw error;

      throw CustomError.internalServer("Unexpected error");
    }
  }
}
