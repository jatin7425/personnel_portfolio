export interface Timeline {
  from: string;
  to: string;
}

export interface EducationType {
  _id?: string;
  course: string;
  organisation: string;
  timeline: Timeline;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
