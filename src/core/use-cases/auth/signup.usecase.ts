import { AuthCredentials } from "@/core/entities/user/authCredentials";
import { UserRepository } from "@/core/repositories/userRepository";
import { PasswordService } from "@/core/services/passwordService";
import { TokenService } from "@/core/services/tokenService";

export class SignUpUseCase {
  constructor(
    private userRepository: UserRepository,
    private tokenService: TokenService,
    private passwordService: PasswordService
  ) {}

  async execute(authCredentials: AuthCredentials) {
    const existingUser = await this.userRepository.findByEmail(authCredentials.email);
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await this.passwordService.hash(authCredentials.password);
    const newUser = await this.userRepository.create({
      ...authCredentials,
      password: hashedPassword,
    });

    return {
      user: { id: newUser.id, email: newUser.email },
      token: this.tokenService.generate({ userId: newUser.id }),
    };
  }
}
