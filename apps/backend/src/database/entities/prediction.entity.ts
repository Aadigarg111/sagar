import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum PredictionType {
  STORM_SURGE = 'storm_surge',
  HIGH_WAVE = 'high_wave',
  FLOODING = 'flooding',
  EROSION = 'erosion',
  TSUNAMI = 'tsunami',
  WEATHER = 'weather',
}

export enum PredictionStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  FULFILLED = 'fulfilled',
  CANCELLED = 'cancelled',
}

@Entity('predictions')
export class Prediction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: PredictionType
  })
  type: PredictionType;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('json')
  affectedArea: {
    type: string;
    coordinates: number[][][];
  };

  @Column('decimal', { precision: 10, scale: 8 })
  centerLatitude: number;

  @Column('decimal', { precision: 11, scale: 8 })
  centerLongitude: number;

  @Column()
  radius: number; // Radius in kilometers

  @Column()
  confidence: number; // AI confidence score (0-100)

  @Column()
  severity: number; // Predicted severity (0-100)

  @Column({
    type: 'enum',
    enum: PredictionStatus,
    default: PredictionStatus.ACTIVE
  })
  status: PredictionStatus;

  @Column()
  predictedAt: Date; // When the event is predicted to occur

  @Column({ nullable: true })
  expiresAt: Date;

  @Column('json', { default: {} })
  modelData: Record<string, any>; // ML model inputs and outputs

  @Column('json', { default: {} })
  metadata: Record<string, any>;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  verificationNotes: string;

  @Column({ default: 0 })
  accuracy: number; // Actual accuracy after verification (0-100)

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  get centerLocation(): [number, number] {
    return [this.centerLongitude, this.centerLatitude];
  }
}
