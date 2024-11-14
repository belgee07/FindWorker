import { Types } from 'mongoose';

export type ApplicationStatus = 'Pending' | 'Accepted' | 'Reject';
export type ApplicationProcess = 'Ongoing' | 'Done';


export interface Application {
  _id: Types.ObjectId; 
  jobId: Types.ObjectId[];  
  clientId: Types.ObjectId; 
  workerId: Types.ObjectId; 
  status: ApplicationStatus;
  description: string;
  process: ApplicationProcess;
  createdAt: Date;
  updatedAt: Date;
}
