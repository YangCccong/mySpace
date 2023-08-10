import { InjectModel } from '@nestjs/mongoose'
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SuggestionsDto } from './dto/suggestions.dto';
import { Model } from 'mongoose';
import { Suggestions, SuggestionsDocument } from './schemas/suggestions.schema';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UserService, private jwtService: JwtService, @InjectModel('Suggestions') private suggestionsModel: Model<SuggestionsDocument>) { }
    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.getUser({ username });
        if (!user) return null;
        const passwordValid = await bcrypt.compare(password, user.password)
        if (!user) {
            throw new NotAcceptableException('could not find the user');
        }
        if (user && passwordValid) {
            return user;
        }
        return null;
    }
    async login(user: any) {
        const payload = { username: user.username, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async suggestions(suggestions: SuggestionsDto): Promise<Suggestions> {
        return this.suggestionsModel.create(suggestions);
    }
}