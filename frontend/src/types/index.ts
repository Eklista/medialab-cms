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

// Extender los tipos base para incluir información de proyectos del cliente
export interface ClientProject extends Project {
  // Información adicional para la vista del cliente
  client_id?: string;
  progress?: number;
  collaborators?: string[];
  deliverables?: ProjectDeliverable[];
  request_id?: number; // ID de la solicitud que originó este proyecto
}

export interface ProjectDeliverable {
  id: number;
  name: string;
  type: 'audio' | 'video' | 'image' | 'document' | 'other';
  url?: string;
  completed: boolean;
  file_size?: number;
  mime_type?: string;
  download_count?: number;
  uploaded_at?: string;
}

export interface ProjectProgress {
  total_tasks: number;
  completed_tasks: number;
  percentage: number;
  last_updated: string;
}

export interface ProjectStats {
  total: number;
  published: number;
  draft: number;
  archived: number;
  in_progress: number;
}

// Filtros para proyectos
export interface ProjectFilters {
  search?: string;
  status?: 'published' | 'draft' | 'archived' | '';
  project_type?: string;
  faculty?: string;
  date_range?: {
    start: string;
    end: string;
  };
}