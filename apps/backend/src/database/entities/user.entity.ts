import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum UserRole {
  CITIZEN = 'citizen',
  ANALYST = 'analyst',
  OFFICIAL = 'official',
  MODERATOR = 'moderator',
  ADMIN = 'admin',
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  phone: string;

  @Prop({ 
    type: String, 
    enum: UserRole, 
    default: UserRole.CITIZEN 
  })
  role: UserRole;

  @Prop({ default: 0 })
  reputation: number;

  @Prop()
  location: string;

  @Prop()
  avatar: string;

  @Prop({ type: [String], default: [] })
  badges: string[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop()
  lastLoginAt: Date;

  createdAt: Date;
  updatedAt: Date;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
