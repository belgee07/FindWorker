import { Schema, model, models, Document } from 'mongoose';
import { ApplicationStatus, ApplicationProcess, Application } from './application.interface';

const ApplicationSchema = new Schema<Application & Document>(
  {
    jobId: [
      { 
        type: Schema.Types.ObjectId, 
        ref: 'Job', 
        required: true 
      } 
    ],
    clientId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Client', 
      required: true 
    },  
    workerId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Worker', 
      required: true 
    },
    status: { 
      type: String, 
      enum: ['Pending', 'Accepted', 'Reject'], 
      required: true 
    }, 
    description: { 
      type: String, 
      required: true 
    },
    process: { 
      type: String, 
      enum: ['Ongoing', 'Done'], 
      required: true 
    }, 
  },
  { timestamps: true }  
);

export const ApplicationModel = models.Application || model<Application & Document>('Application', ApplicationSchema);
