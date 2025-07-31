import apiClient from './client';
import type { ApiListResponse, ApiResponse } from './client';
import type {
  Request,
  Project,
  Task,
  TaskDeliverable,
  Faculty,
  Service,
  ServiceCategory,
  ProjectType,
  DeliverableType,
  CreateRequestForm,
  CreateProjectForm,
  CreateTaskForm
} from '../../types';

export const requestsApi = {
  getAll: (params?: Record<string, any>) =>
    apiClient.get<ApiListResponse<Request>>('/items/requests', params),
  
  getById: (id: number) =>
    apiClient.get<ApiResponse<Request>>(`/items/requests/${id}`),
  
  create: (data: CreateRequestForm) =>
    apiClient.post<ApiResponse<Request>>('/items/requests', data),
  
  update: (id: number, data: Partial<Request>) =>
    apiClient.patch<ApiResponse<Request>>(`/items/requests/${id}`, data),
  
  delete: (id: number) =>
    apiClient.delete(`/items/requests/${id}`),

  getWithRelations: (params?: Record<string, any>) =>
    apiClient.get<ApiListResponse<Request>>('/items/requests', {
      fields: '*,department_name.*,services.*',
      ...params
    })
};

export const projectsApi = {
  getAll: (params?: Record<string, any>) =>
    apiClient.get<ApiListResponse<Project>>('/items/projects', params),
  
  getById: (id: number) =>
    apiClient.get<ApiResponse<Project>>(`/items/projects/${id}`),
  
  create: (data: CreateProjectForm) =>
    apiClient.post<ApiResponse<Project>>('/items/projects', data),
  
  update: (id: number, data: Partial<Project>) =>
    apiClient.patch<ApiResponse<Project>>(`/items/projects/${id}`, data),
  
  delete: (id: number) =>
    apiClient.delete(`/items/projects/${id}`),

  getWithRelations: (params?: Record<string, any>) =>
    apiClient.get<ApiListResponse<Project>>('/items/projects', {
      fields: '*,faculty.*,project_type.*',
      ...params
    }),

  // Nuevo: Obtener proyectos con tareas y entregables
  getWithFullRelations: (params?: Record<string, any>) =>
    apiClient.get<ApiListResponse<Project>>('/items/projects', {
      fields: [
        '*',
        'faculty.id,faculty.name,faculty.short_name',
        'project_type.id,project_type.name,project_type.description'
      ].join(','),
      ...params
    })
};

export const tasksApi = {
  getAll: (params?: Record<string, any>) =>
    apiClient.get<ApiListResponse<Task>>('/items/tasks', params),
  
  getById: (id: number) =>
    apiClient.get<ApiResponse<Task>>(`/items/tasks/${id}`),
  
  create: (data: CreateTaskForm) =>
    apiClient.post<ApiResponse<Task>>('/items/tasks', data),
  
  update: (id: number, data: Partial<Task>) =>
    apiClient.patch<ApiResponse<Task>>(`/items/tasks/${id}`, data),
  
  delete: (id: number) =>
    apiClient.delete(`/items/tasks/${id}`),

  getByProject: (projectId: number) =>
    apiClient.get<ApiListResponse<Task>>('/items/tasks', {
      filter: { project: { _eq: projectId } },
      fields: '*,assignee.first_name,assignee.last_name,assignee.email'
    }),

  getByAssignee: (assigneeId: string) =>
    apiClient.get<ApiListResponse<Task>>('/items/tasks', {
      filter: { assignee: { _eq: assigneeId } },
      fields: '*,project.*'
    })
};

export const deliverablesApi = {
  getAll: (params?: Record<string, any>) =>
    apiClient.get<ApiListResponse<TaskDeliverable>>('/items/task_deliverables', params),
  
  getById: (id: number) =>
    apiClient.get<ApiResponse<TaskDeliverable>>(`/items/task_deliverables/${id}`),
  
  create: (data: Partial<TaskDeliverable>) =>
    apiClient.post<ApiResponse<TaskDeliverable>>('/items/task_deliverables', data),
  
  update: (id: number, data: Partial<TaskDeliverable>) =>
    apiClient.patch<ApiResponse<TaskDeliverable>>(`/items/task_deliverables/${id}`, data),
  
  delete: (id: number) =>
    apiClient.delete(`/items/task_deliverables/${id}`),

  getByTask: (taskId: number) =>
    apiClient.get<ApiListResponse<TaskDeliverable>>('/items/task_deliverables', {
      filter: { task: { _eq: taskId } },
      fields: '*,deliverable_type.*'
    })
};

export const catalogsApi = {
  getFaculties: () =>
    apiClient.get<ApiListResponse<Faculty>>('/items/faculties'),
  
  getServices: () =>
    apiClient.get<ApiListResponse<Service>>('/items/services', {
      fields: '*,category.*'
    }),
  
  getServiceCategories: () =>
    apiClient.get<ApiListResponse<ServiceCategory>>('/items/service_categories'),
  
  getProjectTypes: () =>
    apiClient.get<ApiListResponse<ProjectType>>('/items/project_types'),
  
  getDeliverableTypes: () =>
    apiClient.get<ApiListResponse<DeliverableType>>('/items/deliverable_types')
};

// Nuevos endpoints específicos para el cliente
export const clientApi = {
  // Obtener proyectos del cliente (cuando implementes la relación)
  getMyProjects: () =>
    apiClient.get<ApiListResponse<Project>>('/items/projects', {
      fields: [
        '*',
        'faculty.id,faculty.name,faculty.short_name',
        'project_type.id,project_type.name'
      ].join(','),
      // TODO: Agregar filtro por cliente cuando definas la relación
      // filter: { client_id: { _eq: '$CURRENT_USER' } }
    }),

  // Obtener tareas de un proyecto específico
  getProjectTasks: (projectId: number) =>
    apiClient.get<ApiListResponse<Task>>('/items/tasks', {
      filter: { project: { _eq: projectId } },
      fields: [
        '*',
        'assignee.id,assignee.first_name,assignee.last_name'
      ].join(',')
    }),

  // Obtener entregables de una tarea
  getTaskDeliverables: (taskId: number) =>
    apiClient.get<ApiListResponse<TaskDeliverable>>('/items/task_deliverables', {
      filter: { task: { _eq: taskId } },
      fields: [
        '*',
        'deliverable_type.id,deliverable_type.name,deliverable_type.icon,deliverable_type.color'
      ].join(',')
    })
};