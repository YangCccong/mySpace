## 安装依赖

@nestjs/passport：模块将该框架包装在一个 Nest 风格的包中，使其易于集成到 Nest 应用程序中。
@nestjs/jwt ：身份认证
@types/passport-jwt：编写 TypeScript 代码时提供了帮助
passport-jwt：策略包（还有passport-local）
passport：是node目前最流行的身份认证库，与使用@nestjs/passport的nestjs结合使用非常简单。

`npm install @nestjs/jwt passport-jwt @types/passport-jwt @nestjs/passport passport`

## 创建资源 CRUD 生成器

`nest g resource **[name]**`


```
nest g resource **[name]**
**/**/ 简写 res
nest g res user
```

### SchemaTypes

* [String](http://www.mongoosejs.net/docs/api.html#schema-string-js)
* [Number](http://www.mongoosejs.net/docs/api.html#schema-number-js)
* [Date](http://www.mongoosejs.net/docs/api.html#schema-date-js)
* [Buffer](http://www.mongoosejs.net/docs/api.html#schema-buffer-js)
* Boolean
* Mixed
* [ObjectId](http://www.mongoosejs.net/docs/api.html#schema-objectid-js)
* Array
* Decimal128

### 菜单管理

### 角色管理

### 用户管理

### 请求负载

我们需要确认DTO（数据传输对象）模式，DTO是一个对象，他定义了如何通过网络发送数据

### Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
