import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    @ApiProperty({ type: Number, description: '主键' })
    id: number;

    // @Column({
    //     name: 'update_user',
    //     type: 'int',
    //     comment: '记录更新者主键',
    // })
    // @ApiProperty({ type: Number, description: '修改人主键' })
    // updateUser: number;

    // @Column({
    //     name: 'create_user',
    //     type: 'int',
    //     comment: '记录创建者主键',
    // })
    // @ApiProperty({ type: Number, description: '创建人主键' })
    // createUser: number;

    // @CreateDateColumn({
    //     name: 'create_time',
    //     type: 'datetime',
    //     comment: '创建时间',
    // })
    // @ApiProperty({ type: Date, description: '创建日期' })
    // createTime: Date;

    // @UpdateDateColumn({
    //     name: 'update_time',
    //     type: 'datetime',
    //     comment: '更新时间',
    // })
    // @ApiProperty({ type: Date, description: '修改日期' })
    // updateTime: Date;
}
