import { User } from './User';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne, BeforeInsert
} from "typeorm";
import { IsDefined, MinLength } from 'class-validator';
import { setAddressFields } from './hooks/setAddressFields';
import { SharedProps } from './SharedProps.helper';

@Entity({ name: "events" })
export class Event extends SharedProps {
    remove() {
        throw new Error('Method not implemented.');
    }
    @BeforeInsert()
    async setEventAddressFields() {
        await setAddressFields(this);
    }

    constructor(
        title: string,
        description: string,
        address: string,
        event_date: Date
    ) {
        super();
        this.title = title;
        this.description = description;
        this.address = address;
        this.event_date = event_date;
    }

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 20 })
    @IsDefined()
    @MinLength(10)
    title: string;

    @Column({ type: "varchar", length: 500 })
    @IsDefined()
    @MinLength(20)
    description: string;

    @Column({ name: 'address', nullable: true })
    address: string;

    @Column({ type: 'decimal', name: 'latitude', nullable: true })
    latitude: number;

    @Column({ type: 'decimal', name: 'longitude', nullable: true })
    longitude: number;

    @CreateDateColumn({ type: "timestamp", name: "event_date" })
    @IsDefined()
    event_date: Date;

    @ManyToOne((type) => User, (user) => user.events)
    user: User;
}