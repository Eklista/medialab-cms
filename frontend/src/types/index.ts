export interface BaseEntity {
  id: number;
  status: 'published' | 'draft' | 'archived';
}

export interface Request extends BaseEntity {
  request_date: string;
  department_name: number;
  requester_name: string;
  email: string;
  phone: string;
  event_name: string;
  start_time: string;
  end_time: string;
  event_date: string;
  location: string;
  notes: string;
  converted_project: number | null;
  services: number[];
}

export interface Project extends BaseEntity {
  title: string;
  project_type: number;
  faculty: number;
  start_date: string;
  end_date: string;
  description: string;
}

export interface Task extends BaseEntity {
  project: number;
  title: string;
  category: string;
  assignee: string;
  due_date: string;
}

export interface TaskDeliverable extends BaseEntity {
  task: number;
  label: string;
  url: string;
  deliverable_type: number;
}

export interface DeliverableType extends BaseEntity {
  code: string;
  name: string;
  color: string;
  icon: string;
}

export interface ServiceCategory extends BaseEntity {
  name: string;
  description: string;
}

export interface Service extends BaseEntity {
  name: string;
  category: number;
  description: string;
}

export interface Faculty extends BaseEntity {
  name: string;
  short_name: string;
  email: string | null;
  notes: string | null;
}

export interface ProjectType extends BaseEntity {
  name: string;
  description: string | null;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  role: 'admin' | 'collaborator' | 'client' | null;
  isAuthenticated: boolean;
}

export interface CreateRequestForm {
  department_name: number;
  requester_name: string;
  email: string;
  phone: string;
  event_name: string;
  start_time: string;
  end_time: string;
  event_date: string;
  location: string;
  notes: string;
  services: number[];
}

export interface CreateProjectForm {
  title: string;
  project_type: number;
  faculty: number;
  start_date: string;
  end_date: string;
  description: string;
}

export interface CreateTaskForm {
  project: number;
  title: string;
  category: string;
  assignee: string;
  due_date: string;
}