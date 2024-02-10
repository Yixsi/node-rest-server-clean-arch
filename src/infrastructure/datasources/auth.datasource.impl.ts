import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import {
  AuthDatasource,
  CustomError,
  RegisterUserDto,
  User,
} from "../../domain";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashedPassword: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {
  // dependency injection - this allows us to change the functions easily or define default functions
  constructor(
    private readonly hash: HashFunction = BcryptAdapter.hash,
    private readonly compare: CompareFunction = BcryptAdapter.compare
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const { name, email, password } = registerUserDto;
    try {
      const emailExists = await UserModel.findOne({ email });
      if (emailExists) throw CustomError.badRequest("Something went wrong");

      // hash password
      const user = await UserModel.create({
        name,
        email,
        password: this.hash(password),
      });
      await user.save();

      // map the response
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) throw error;

      throw CustomError.internalServer("Unexpected error");
    }
  }
}
