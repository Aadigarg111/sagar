import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

@Schema({ timestamps: true })
export class Prediction extends Document {
  @Prop({ 
    type: String, 
    enum: PredictionType, 
    required: true 
  })
  type: PredictionType;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ 
    type: {
      type: String,
      enum: ['Polygon'],
      default: 'Polygon'
    },
    coordinates: {
      type: [[[Number]]],
      required: true
    }
  })
  affectedArea: {
    type: string;
    coordinates: number[][][];
  };

  @Prop({ required: true })
  centerLatitude: number;

  @Prop({ required: true })
  centerLongitude: number;

  @Prop({ required: true })
  radius: number; // Radius in kilometers

  @Prop({ required: true })
  confidence: number; // AI confidence score (0-100)

  @Prop({ required: true })
  severity: number; // Predicted severity (0-100)

  @Prop({ 
    type: String, 
    enum: PredictionStatus, 
    default: PredictionStatus.ACTIVE 
  })
  status: PredictionStatus;

  @Prop({ required: true })
  predictedAt: Date; // When the event is predicted to occur

  @Prop()
  expiresAt: Date;

  @Prop({ type: Object, default: {} })
  modelData: Record<string, any>; // ML model inputs and outputs

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop()
  verificationNotes: string;

  @Prop({ default: 0 })
  accuracy: number; // Actual accuracy after verification (0-100)

  createdAt: Date;
  updatedAt: Date;

  get centerLocation(): [number, number] {
    return [this.centerLongitude, this.centerLatitude];
  }
}

export const PredictionSchema = SchemaFactory.createForClass(Prediction);
