import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Report } from './report.entity';

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  DOCUMENT = 'document',
}

@Entity('media_files')
export class MediaFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  filename: string;

  @Column()
  originalName: string;

  @Column()
  mimeType: string;

  @Column()
  size: number;

  @Column({
    type: 'enum',
    enum: MediaType
  })
  type: MediaType;

  @Column()
  url: string;

  @Column()
  bucket: string;

  @Column()
  key: string;

  @Column('json', { nullable: true })
  metadata: Record<string, any>; // EXIF data, dimensions, etc.

  @Column({ nullable: true })
  thumbnailUrl: string;

  @Column({ default: false })
  isProcessed: boolean;

  @Column({ nullable: true })
  aiAnalysis: string; // JSON string of AI analysis results

  @ManyToOne(() => Report)
  @JoinColumn({ name: 'reportId' })
  report: Report;

  @Column()
  reportId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
