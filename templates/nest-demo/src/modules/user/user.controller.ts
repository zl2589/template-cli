import { Controller, Get, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { QueryUserDto } from "./dto/user.dto";
import { Resp } from "src/interfaces/res.interface";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Get("/:id")
    async getUserById(@Param() params: QueryUserDto): Resp {
        const user = await this.userService.findById(params.id);
        return {
            data: user,
        };
    }
}