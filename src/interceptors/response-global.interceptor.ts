import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/*I created this interceptor to send a uniform response to frontend 
so the frontend devs know what kind of response structure to expect*/

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => ({
                statusCode: context.switchToHttp().getResponse().statusCode,
                result: [data],
                message: ['Success'],
            })),
            catchError((err) =>
                throwError(() => ({
                    message:
                        typeof err?.response?.message == 'string'
                            ? [err.response.message]
                            : err.response.message.flat(),
                    statusCode: err.response.statusCode,
                })),
            ),
        );
    }
}