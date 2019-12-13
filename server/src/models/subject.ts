import { model, Schema, Document } from 'mongoose';

export interface ISubject extends Document {
  guid: string,
  name?: string,
  tags?: string[],
}

const subjectSchema = new Schema({
  guid: { type: String, required: true, unique: true },
  name: { type: String },
  tags: { type: [String] },
});

export default model<ISubject>('subject', subjectSchema);