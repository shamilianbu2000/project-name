import { createContextId } from "@nestjs/core";
import { createTracing } from "trace_events";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('users')
export class Users {

@PrimaryGeneratedColumn()
id: number;


@Column()
name: string;

@Column({default:false})
isActive: boolean;

@UpdateDateColumn()
updateAt: Date;


@CreateDateColumn()
createdAt:Date;

@DeleteDateColumn()
isdeleted: Date;


}

