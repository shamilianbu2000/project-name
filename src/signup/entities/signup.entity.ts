import { createContextId } from '@nestjs/core';
import { createTracing } from 'trace_events';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('signup')
export class Signup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  name: string;

  @Column({ default: null })
  token: string;

  @Column({nullable:true})
  email: string;

  @Column({ default: false })
  isActive: boolean;

  @CreateDateColumn({ default: null })
  createdAt: Date;

  @UpdateDateColumn({ default: null })
  updatedAt: Date;

  @DeleteDateColumn({ default: null })
  deletedAt: Date;
  length: number;

  @Column({ default: null })
  password: string;
  
  @Column()
  img: string;
}
