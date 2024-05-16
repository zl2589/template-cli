/**
 * typeorm
 * ORM允许开发者使用面向对象的编程概念来操作数据库，而不是直接编写SQL语句
 */

import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {
    @Column({
        name: 'name',
        type: 'varchar',
    })
    @IsNotEmpty({ message: '姓名不能为空' })
    @IsString({ message: '姓名错误' })
    name: string;
}

export type PartialUserEntity = Partial<UserEntity>;
