import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

export enum AlertType {
  TSUNAMI_WARNING = 'tsunami_warning',
  HIGH_WAVE = 'high_wave',
  STORM_SURGE = 'storm_surge',
  FLOODING = 'flooding',
  EROSION = 'erosion',
  OIL_SPILL = 'oil_spill',
  MARINE_POLLUTION = 'marine_pollution',
  EVACUATION = 'evacuation',
  WEATHER = 'weather',
  OTHER = 'other',
}

export enum AlertSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum AlertStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
}

@Entity('alerts')
export class Alert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: AlertType
  })
  type: AlertType;

  @Column({
    type: 'enum',
    enum: AlertSeverity
  })
  severity: AlertSeverity;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  instructions: string;

  @Column('json', { nullable: true })
  affectedArea: {
    type: string;
    coordinates: number[][][];
  };

  @Column('decimal', { precision: 10, scale: 8, nullable: true })
  centerLatitude: number;

  @Column('decimal', { precision: 11, scale: 8, nullable: true })
  centerLongitude: number;

  @Column({ nullable: true })
  radius: number; // Radius in kilometers

  @Column({
    type: 'enum',
    enum: AlertStatus,
    default: AlertStatus.ACTIVE
  })
  status: AlertStatus;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  source: string; // e.g., 'INCOIS', 'IMD', 'User Report', 'AI Prediction'

  @Column('json', { default: {} })
  metadata: Record<string, any>;

  @Column({ nullable: true })
  expiresAt: Date;

  @Column({ default: 0 })
  viewCount: number;

  @Column({ default: 0 })
  shareCount: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdById' })
  createdBy: User;

  @Column({ nullable: true })
  createdById: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  get centerLocation(): [number, number] {
    return [this.centerLongitude, this.centerLatitude];
  }
}
