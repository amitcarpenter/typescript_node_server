import { Schema, model, Document } from 'mongoose';

interface IAuditLog extends Document {
  action: string;
  user: Schema.Types.ObjectId;
  details: string;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>({
  action: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  details: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const AuditLog = model<IAuditLog>('AuditLog', AuditLogSchema);
