import { CallHandler, ExecutionContext, Injectable } from "@nestjs/common";
import { isBoolean } from "class-validator";
import { Observable, map } from "rxjs";

@Injectable()
export class ResponseInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((errRes) => {
                const data = errRes.data;
                const code = errRes.code;
                const success = !isBoolean(errRes.success);
                const message = errRes.message;
                return {
                    data,
                    code,
                    success,
                    message,
                };
            }),
        );
    }
}