import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

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

@Schema({ timestamps: true })
export class Report extends Document {
  @Prop({ 
    type: String, 
    enum: HazardType, 
    required: true 
  })
  type: HazardType;

  @Prop({ 
    type: String, 
    enum: SeverityLevel, 
    required: true 
  })
  severity: SeverityLevel;

  @Prop({ required: true })
  description: string;

  @Prop({ 
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  })
  location: {
    type: string;
    coordinates: [number, number];
  };

  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;

  @Prop({ 
    type: String, 
    enum: ReportStatus, 
    default: ReportStatus.PENDING 
  })
  status: ReportStatus;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop()
  verifiedBy: string;

  @Prop()
  verifiedAt: Date;

  @Prop()
  verificationNotes: string;

  @Prop({ default: 0 })
  upvotes: number;

  @Prop({ default: 0 })
  downvotes: number;

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;

  @Prop()
  nlpAnalysis: string; // JSON string of NLP analysis results

  @Prop({ default: 0 })
  aiConfidence: number; // AI confidence score (0-100)

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  reporterId: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;

  get locationArray(): [number, number] {
    return [this.longitude, this.latitude];
  }
}

export const ReportSchema = SchemaFactory.createForClass(Report);
