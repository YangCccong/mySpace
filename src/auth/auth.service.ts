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
    constructor(private readonly usersService: UserService, private jwtService: JwtService, @InjectModel('Suggestions') private suggestionsModel: Model<SuggestionsDocument>) {}
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
        await this.validateUser(username, password)
        // console.log(await this.validateUser(username, password), '====!!!>>>')
        // console.log(user)
        const payload = { username: user.username, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateToken(token: string): Promise<any> {  
        console.log('校验 token  ====>>> ', token)
        try {  
          const decoded = await this.jwtService.verifyAsync(token);  
          console.log(decoded, 'decoded ===>>> 校验token')
          return decoded;
        //   return await this.userRepository.findOne({ id: decoded.sub });  
        } catch (error) {  
          return null;  
        }  
    }
    async generateToken(userId: string): Promise<string> {
        const payload = { sub: userId };
        return this.jwtService.signAsync(payload);
    }
    
    async jwtGetInfo(token: string) {
        return await this.jwtService.verify(token); 
    }
    async suggestions(suggestions: SuggestionsDto): Promise<Suggestions> {
        return this.suggestionsModel.create(suggestions);
    }
}