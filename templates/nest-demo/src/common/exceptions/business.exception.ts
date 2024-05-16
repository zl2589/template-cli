import { HttpException, HttpStatus } from "@nestjs/common";
import { ResponseData } from "src/interfaces/res.interface";

export class BusinessException extends HttpException {
    constructor(params: ResponseData, e?: unknown) {
        super({
            success: false,
            code: params?.code ?? undefined,
            data: params?.data ?? null,
            message: params?.message || '业务异常',
        }, HttpStatus.OK);
        if (e instanceof Error) {
            this.message = e.message;
        }
    }
}