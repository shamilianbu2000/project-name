

import { createContextId } from "@nestjs/core";
import { createTracing } from "trace_events";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('signup')
export class Signup {
    
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @Column({ default:null })
    token:string;

     @Column()
     email: string;
  
    @Column({ default: false })
    isActive: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date;
    length: number;

}
