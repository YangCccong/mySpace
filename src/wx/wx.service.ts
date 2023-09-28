import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WxService {
  constructor() { }
  // private readonly httpService: HttpService
  private appid = 'wx72467eea87bedff2'
  private secret = 'b449fd44e3ab0869ecae4a7cbbeb10f0'
  private grant_type = 'authorization_code'
  async login(loginDTO): Promise<any> {
    console.log(loginDTO, 'loginDTO ===>>>')
    const { code, iv, encryptedData } = loginDTO
    console.log(1111, code, 'code ====>>>> ')
    const url = `https://api.weixin.qq.com/sns/jscode2session?grant_type=${this.grant_type}&appid=${this.appid}&secret=${this.secret}&js_code=${code}`
    const info = await axios.get(url) // 获取openid和session_key
    let token = ''
    console.log(info)
    // 如果openid不存在则为新用户
    // const hasUser = await this.userRepository.findOne({ where: { openid: info.data.openid } });
    // if (hasUser) {
    //   // 直接取用户token
    //   token = hasUser.token
    // } else {
    //   // 注册插入一条新信息
    //   const pc = new WXBizDataCrypt(this.appid, info.data?.session_key)
    //   const data = pc.decryptData(encryptedData, iv)
    //   const newUser: User = new User();
    //   newUser.openid = info.data.openid
    //   newUser.nickname = data.nickName
    //   newUser.appid = this.appid
    //   newUser.avatar = data.avatarUrl
    //   newUser.gender = data.gender
    //   token = await this.certificate(newUser)
    //   newUser.token = token
    //   await this.userRepository.save(newUser);
    // }
    return info.data
  }
}
