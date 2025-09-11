import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

export enum HazardType {
  TSUNAMI_WARNING = 'tsunami_warning',
  HIGH_WAVE = 'high_wave',
  STORM_SURGE = 'storm_surge',
  FLOODING = 'flooding',
  EROSION = 'erosion',
  OIL_SPILL = 'oil_spill',
  MARINE_POLLUTION = 'marine_pollution',
  OTHER = 'other',
}

export enum SeverityLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum ReportStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
  INVESTIGATING = 'investigating',
}

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: HazardType
  })
  type: HazardType;

  @Column({
    type: 'enum',
    enum: SeverityLevel
  })
  severity: SeverityLevel;

  @Column()
  description: string;

  @Column('json')
  location: {
    type: string;
    coordinates: [number, number];
  };

  @Column('decimal', { precision: 10, scale: 8 })
  latitude: number;

  @Column('decimal', { precision: 11, scale: 8 })
  longitude: number;

  @Column({
    type: 'enum',
    enum: ReportStatus,
    default: ReportStatus.PENDING
  })
  status: ReportStatus;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  verifiedBy: string;

  @Column({ nullable: true })
  verifiedAt: Date;

  @Column({ nullable: true })
  verificationNotes: string;

  @Column({ default: 0 })
  upvotes: number;

  @Column({ default: 0 })
  downvotes: number;

  @Column('json', { default: {} })
  metadata: Record<string, any>;

  @Column({ nullable: true })
  nlpAnalysis: string; // JSON string of NLP analysis results

  @Column({ default: 0 })
  aiConfidence: number; // AI confidence score (0-100)

  @ManyToOne(() => User)
  @JoinColumn({ name: 'reporterId' })
  reporter: User;

  @Column()
  reporterId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  get locationArray(): [number, number] {
    return [this.longitude, this.latitude];
  }
}
