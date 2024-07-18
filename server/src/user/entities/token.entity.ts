import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('tokens')
export class Token {
  @PrimaryGeneratedColumn()
  token_id: number;

  @Column({ type: 'varchar', length: 512, unique: true })
  token: string;

  @Column({ type: "datetime2" })
  expires_at: Date;

  @Column({ type: "datetime2", default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: "datetime2", nullable: true })
  revoked_at: Date;

  @Column({ default: false })
  is_revoked: boolean;

  @ManyToOne(() => User)
  user: User;
}
