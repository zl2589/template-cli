import { Injectable } from "@nestjs/common";
import { BusinessException } from "src/common/exceptions/business.exception";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>) { }
    /** 查找用户详情 */
    async findById(userId: number) {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    id: userId
                }
            });
            return user;
        } catch (e) {
            throw new BusinessException({ message: '查询失败' }, e);
        }
    }
}