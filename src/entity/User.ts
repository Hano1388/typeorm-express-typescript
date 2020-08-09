import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, BeforeInsert } from "typeorm";
import { IsDateString, IsDefined, IsEmail, IsEmpty, IsString, MaxLength, MinLength } from 'class-validator';

import { Event } from './Event';
import { setAddressFields } from './hooks/setAddressFields';
import { SharedProps } from "./SharedProps.helper";

@Entity({ name: "users" })
export class User extends SharedProps {

    @BeforeInsert()
    async setUserAddressFields() {
        await setAddressFields(this);
    }

    constructor(
        first_name: string,
        last_name: string,
        email: string,
        password: string,
    ) {
        super();
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }

    @PrimaryGeneratedColumn("uuid")
    @IsEmpty({ always: true, message: "You do not need to send ID!!" })
    id: string;

    @Column({ nullable: true })
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    first_name: string;

    @Column({ nullable: true })
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


    @Column({ type: 'boolean', default: false })
    @IsEmpty({ always: true })
    is_admin: boolean;

    @Column({ name: 'address', nullable: true })
    address: string;

    @Column({ type: 'decimal', name: 'latitude', nullable: true })
    latitude: number;

    @Column({ type: 'decimal', name: 'longitude', nullable: true })
    longitude: number;

    @OneToMany(() => Event, (event: Event) => event.user, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    events: Array<Event>;
}
