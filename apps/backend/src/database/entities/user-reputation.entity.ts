import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

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

@Schema({ timestamps: true })
export class UserReputation extends Document {
  @Prop({ 
    type: String, 
    enum: ReputationAction, 
    required: true 
  })
  action: ReputationAction;

  @Prop({ required: true })
  points: number; // Can be positive or negative

  @Prop()
  description: string;

  @Prop()
  referenceId: string; // ID of the related report, alert, etc.

  @Prop({ type: Object })
  metadata: Record<string, any>;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

export const UserReputationSchema = SchemaFactory.createForClass(UserReputation);
