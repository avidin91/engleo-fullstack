import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Groups {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', unique: true, nullable: false })
    title: string;

    @Column({ type: 'text', unique: true, nullable: false })
    slug: string;
}
