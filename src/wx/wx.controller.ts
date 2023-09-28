import { Controller, Post, Body } from '@nestjs/common';
import { WxService } from './wx.service';
import { LoginDTO } from './dto/login.dto';

@Controller('wx')
export class WxController {
  constructor(private readonly wxService: WxService) {}
  
  @Post('/login')
  login(@Body() loginDTO: LoginDTO) {
    return this.wxService.login(loginDTO);
  }
}
