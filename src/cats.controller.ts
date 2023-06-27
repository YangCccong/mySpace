import { Controller, Get } from "@nestjs/common";

@Controller('cats')

export class CatsController {
    @Get()
    // 自定义的方法
    // 必须声明一个绑定到路由的函数，但nest不会对所选的函数名称附加任何意义
    findAll(): string {
        return 'This action returns all cats';
    }
    /**
     *     findAll() 方法之前的 @Get() HTTP 请求方法装饰器高速 Nest 为 HTTP请求的特定端点
     * 创建处理程序。端点对应于 HTTP 请求方法（在本例中为GET）和路由路径（如GET/ customer）。
     *     什么是路由路径？
     *     一个处理程序的路由路径是通过连接为控制器（Controller）声明的（可选）
     */
    /**
     *     响应选项的概念
     *      标准
     *          使用这个内置方法，当请求处理程序返回一个Javascript 对象或数组事，它将自动序列化为 JSON。但是
     *          当他返回一个Javascript 基本类型（例如： string, number, boolean）是，Nest将只发送值，而
     *          不尝试序列化它。这使响应处理变得简单：只需要返回值，其余的由nest负责
     *      类库特有的
     *          我们可以在函数签名处通过 @Res() 注入库特定的响应对象（例如：EXpress）。使用此方法，你就能使用由
     *          该响应对象暴露的原生响应处理函数，例如，使用Express，可以使用 response.status(200).send() 构建
     *          响应。
     */
}