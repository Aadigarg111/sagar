import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

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

@Schema({ timestamps: true })
export class Alert extends Document {
  @Prop({ 
    type: String, 
    enum: AlertType, 
    required: true 
  })
  type: AlertType;

  @Prop({ 
    type: String, 
    enum: AlertSeverity, 
    required: true 
  })
  severity: AlertSeverity;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  instructions: string;

  @Prop({ 
    type: {
      type: String,
      enum: ['Polygon'],
      default: 'Polygon'
    },
    coordinates: {
      type: [[[Number]]],
      required: false
    }
  })
  affectedArea: {
    type: string;
    coordinates: number[][][];
  };

  @Prop()
  centerLatitude: number;

  @Prop()
  centerLongitude: number;

  @Prop()
  radius: number; // Radius in kilometers

  @Prop({ 
    type: String, 
    enum: AlertStatus, 
    default: AlertStatus.ACTIVE 
  })
  status: AlertStatus;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop()
  source: string; // e.g., 'INCOIS', 'IMD', 'User Report', 'AI Prediction'

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;

  @Prop()
  expiresAt: Date;

  @Prop({ default: 0 })
  viewCount: number;

  @Prop({ default: 0 })
  shareCount: number;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdById: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;

  get centerLocation(): [number, number] {
    return [this.centerLongitude, this.centerLatitude];
  }
}

export const AlertSchema = SchemaFactory.createForClass(Alert);
