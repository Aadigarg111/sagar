import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

export enum ReputationAction {
  REPORT_VERIFIED = 'report_verified',
  REPORT_REJECTED = 'report_rejected',
  REPORT_UPVOTED = 'report_upvoted',
  REPORT_DOWNVOTED = 'report_downvoted',
  ALERT_CREATED = 'alert_created',
  COMMUNITY_HELP = 'community_help',
  FIRST_REPORT = 'first_report',
  ACCURATE_PREDICTION = 'accurate_prediction',
  SPAM_REPORT = 'spam_report',
  MISINFORMATION = 'misinformation',
}

@Entity('user_reputations')
export class UserReputation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ReputationAction
  })
  action: ReputationAction;

  @Column()
  points: number; // Can be positive or negative

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  referenceId: string; // ID of the related report, alert, etc.

  @Column('json', { nullable: true })
  metadata: Record<string, any>;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
