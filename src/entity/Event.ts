import { User } from './User';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
} from "typeorm";

@Entity({ name: "events" })
export class Event {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 20 })
    title: string;

    @Column({ type: "varchar", length: 500 })
    description: string;

    @CreateDateColumn({ name: "created_at", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @UpdateDateColumn({ name: "updated_at", nullable: true })
    updated_at: Date;

    @ManyToOne((type) => User, (user) => user.events)
    user: User;

}