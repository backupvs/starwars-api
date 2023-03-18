import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({ unique: true })
    readonly username: string;

    @Column()
    readonly password: string;

    @Column()
    readonly role: 'user' | 'admin';
}