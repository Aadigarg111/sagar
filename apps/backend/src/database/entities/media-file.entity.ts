import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  DOCUMENT = 'document',
}

@Schema({ timestamps: true })
export class MediaFile extends Document {
  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  originalName: string;

  @Prop({ required: true })
  mimeType: string;

  @Prop({ required: true })
  size: number;

  @Prop({ 
    type: String, 
    enum: MediaType, 
    required: true 
  })
  type: MediaType;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  bucket: string;

  @Prop({ required: true })
  key: string;

  @Prop({ type: Object })
  metadata: Record<string, any>; // EXIF data, dimensions, etc.

  @Prop()
  thumbnailUrl: string;

  @Prop({ default: false })
  isProcessed: boolean;

  @Prop()
  aiAnalysis: string; // JSON string of AI analysis results

  @Prop({ type: Types.ObjectId, ref: 'Report', required: true })
  reportId: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

export const MediaFileSchema = SchemaFactory.createForClass(MediaFile);
