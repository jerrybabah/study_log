import { model, Schema, Document } from 'mongoose';
import { ISubject } from './subject';
// import * as moment from 'moment-timezone';

export interface IStudy extends Document {
  datetime: Date,
  subject: ISubject['_id'],
  content?: string,
  isHelloWorld: boolean,
}

const studySchema = new Schema({
  datetime: { type: Date, required: true },
  subject: { type: Schema.Types.ObjectId, required: true },
  content: { type: String },
  isHelloWorld: { type: Boolean, required: true },
});

export default model<IStudy>('study', studySchema);