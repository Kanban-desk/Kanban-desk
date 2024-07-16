import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('priorities')
export class Priority {
    @PrimaryGeneratedColumn()
    priority_id: number

    @Column({ type:"nvarchar", length: 32 })
    name: string

    @Column({ type:"nvarchar", length: 7 })
    color: string
}