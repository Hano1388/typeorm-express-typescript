import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { IsDateString, IsDefined, IsEmail, IsEmpty, IsString, MaxLength, MinLength } from 'class-validator';

import { Event } from './Event';
import { isString } from "util";

@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn("uuid")
    @IsEmpty({ always: true, message: "You do not need to send ID!!" })
    id: string;

    @Column()
    @IsDefined()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    first_name: string;

    @Column()
    @IsDefined()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    last_name: string;

    @Column({ unique: true, nullable: false })
    @IsEmail()
    @IsDefined()
    email: string;

    @Column()
    @IsDefined()
    @IsString()
    @MinLength(5)
    password: string


    @CreateDateColumn({ name: "created_at", default: () => "CURRENT_TIMESTAMP" })
    @IsDateString()
    created_at: Date;

    @UpdateDateColumn({ name: "updated_at", nullable: true })
    @IsDateString()
    updated_at: Date;

    @Column({ type: 'boolean', default: false })
    @IsEmpty({ always: true })
    is_admin: boolean;

    @OneToMany(type => Event, (event) => event.user, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    events: Event[]
}
