import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from "@nestjs/common";
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map(data => {
                return {
                    data,
                    code: 20000,
                    message: '请求成功!',
                    success: true,
                }
            })
        )
    }
}