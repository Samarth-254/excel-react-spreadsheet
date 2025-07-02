export interface JobRequest {
  id: number;
  jobRequest: string;
  submitted: string;
  status: 'In-progress' | 'Need to start' | 'Complete' | 'Blocked' | '';
  submitter: string;
  url: string;
  assigned: string;
  priority: 'High' | 'Medium' | 'Low' | '';
  dueDate: string;
  estValue: string;
}

export type TabType = 'All Orders' | 'Pending' | 'Reviewed' | 'Arrived';
