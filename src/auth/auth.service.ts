import { InjectModel } from '@nestjs/mongoose'
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SuggestionsDto } from './dto/suggestions.dto';
import { Model } from 'mongoose';
import { Suggestions, SuggestionsDocument } from './schemas/suggestions.schema';
import { HttpException } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UserService, private jwtService: JwtService, @InjectModel('Suggestions') private suggestionsModel: Model<SuggestionsDocument>) { }
    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.getUser({ username });
        if (!user) {
            throw new HttpException('帐号或密码输入错误!', 200);
        }
        const passwordValid = await bcrypt.compare(password, user.password)
        // 密码验证成功
        if (user && passwordValid) {
            return user;
        } else {
            throw new HttpException('帐号或密码输入错误!', 200);
        }
    }
    async login(user: any) {
        const { username, password } = user
        console.log(await this.validateUser(username, password), '====!!!>>>')
        console.log(user)
        const payload = { username: user.username, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async validateToken(token: string): Promise<any> {  
        try {  
          const decoded = await this.jwtService.verifyAsync(token);  
          console.log(decoded, 'decoded ===>>> 校验token')
          return 123;
        //   return await this.userRepository.findOne({ id: decoded.sub });  
        } catch (error) {  
          return null;  
        }  
      }  
    async suggestions(suggestions: SuggestionsDto): Promise<Suggestions> {
        return this.suggestionsModel.create(suggestions);
    }
}