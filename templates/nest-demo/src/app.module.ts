import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root123456",
    database: "typeorm_draft",
    autoLoadEntities: true,
  }), UserModule],
  controllers: [],
  providers: [{
    /**
     * 全局注册统一接口返回 格式拦截器
     */
    provide: 'APP_INTERCEPTOR',
    useClass: ResponseInterceptor,
  }],
})
export class AppModule { }
