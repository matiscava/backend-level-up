import { compare } from "bcrypt";
import { BaseService } from "../../../config/base/base.service";
import { encrypt } from "../../../shared/utils/bcrypt.handle";
import { UserDTO } from "../../user/dto/user.dto";
import { UserEntity } from "../../user/entities/user.entity";
import { UserService } from "../../user/services/user.service";
import { PayloadToken } from "../interfaces/auth.interface";
import jwt from "jsonwebtoken";

export class AuthService extends BaseService<UserEntity> {
  constructor(
    private userService : UserService = new UserService(),
  ) {
    super(UserEntity);
  }

  sign(payload: jwt.JwtPayload, secret: any) {
    return jwt.sign(payload, secret, {expiresIn: "1h"})
  }

  public async signUp ( user:UserDTO ) : Promise<UserEntity|null> {
    const userByEmail = await this.userService.findByEmail(user.email);

    if(userByEmail) return null;

    const pass = await encrypt(user.password);
    user.password = pass;

    return await this.userService.create(user);
  }

  public async signIn (username:string, password:string) : Promise<UserEntity | null> {
    const userByEmail = await this.userService.findByEmail(username);
    const userByUsername = await this.userService.findByUsername(username);

    if(userByEmail) {
      const isMatch = await compare(password,userByEmail.password);
      if (isMatch) return userByEmail;
    }

    if(userByUsername) {
      const isMatch = await compare(password,userByUsername.password);
      if (isMatch) return userByUsername;
    }

    return null;

  }

  public async generateJWT(user:UserEntity) : Promise<{accessToken: string, user:UserEntity}>{
    const userConsult = await this.userService.findWithRole(user.id, user.role);

    const payload : PayloadToken = {
      role: userConsult!.role,
      email: userConsult!.email,
      id: userConsult!.id,
    };

    if (userConsult) userConsult.password = "XXXXXXXXXX";

    return {
      accessToken: this.sign(payload, this.getEnvironment("JWT_SECRET")),
      user,
    }

  }

} 