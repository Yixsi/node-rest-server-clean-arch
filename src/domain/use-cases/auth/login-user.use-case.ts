import { JwtAdapter } from "../../../config";
import { LoginUserDto } from "../../dtos";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";
import { UserToken } from "./register-user.use-case";

interface LoginUserUseCase {
  execute(LoginUserDto: LoginUserDto): Promise<UserToken>;
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

export class LoginUser implements LoginUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute(LoginUserDto: LoginUserDto): Promise<UserToken> {
    const user = await this.authRepository.login(LoginUserDto);

    const token = await this.signToken({ id: user.id }, "2h");
    if (!token) throw CustomError.internalServer("An error occurred");

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
