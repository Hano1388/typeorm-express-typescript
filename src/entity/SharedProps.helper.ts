import { CreateDateColumn, UpdateDateColumn } from "typeorm";


export class SharedProps {
    @CreateDateColumn({
        default: () => 'CURRENT_TIMESTAMP',
        type: 'timestamp',
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        default: () => 'CURRENT_TIMESTAMP',
        type: 'timestamp',
        name: 'updated_at',
    })
    updatedAt: Date;
}