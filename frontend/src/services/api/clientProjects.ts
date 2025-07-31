import apiClient from './client';
import type { ApiListResponse, ApiResponse } from './client';
import type { ClientProject, ProjectFilters } from '../../types';

export const clientProjectsApi = {
  // Obtener proyectos del cliente autenticado
  getMyProjects: (filters?: ProjectFilters) => {
    const params: Record<string, any> = {
      // Campos que queremos incluir con relaciones
      fields: [
        '*',
        'faculty.name',
        'faculty.short_name',
        'project_type.name',
        'project_type.description',
        'tasks.id',
        'tasks.title',
        'tasks.status',
        'tasks.assignee.first_name',
        'tasks.assignee.last_name',
        'tasks.deliverables.id',
        'tasks.deliverables.label',
        'tasks.deliverables.url',
        'tasks.deliverables.deliverable_type.name',
        'tasks.deliverables.deliverable_type.icon'
      ].join(','),
      
      // Filtrar por usuario actual - esto dependerá de tu estructura en Directus
      filter: {
        // Opción 1: Si tienes campo client_id directo
        client_id: { _eq: '$CURRENT_USER' },
        
        // Opción 2: Si está relacionado a través de requests
        // 'request.user_created': { _eq: '$CURRENT_USER' }
        
        // Opción 3: Si usas una tabla many-to-many
        // 'project_clients.client': { _eq: '$CURRENT_USER' }
      },
      
      sort: '-date_created'
    };

    // Aplicar filtros adicionales
    if (filters?.search) {
      params.search = filters.search;
    }

    if (filters?.status) {
      params.filter.status = { _eq: filters.status };
    }

    if (filters?.project_type) {
      params.filter.project_type = { _eq: filters.project_type };
    }

    if (filters?.faculty) {
      params.filter.faculty = { _eq: filters.faculty };
    }

    if (filters?.date_range) {
      params.filter.start_date = {
        _gte: filters.date_range.start,
        _lte: filters.date_range.end
      };
    }

    return apiClient.get<ApiListResponse<ClientProject>>('/items/projects', params);
  },

  // Obtener un proyecto específico con todos los detalles
  getProjectById: (id: number) =>
    apiClient.get<ApiResponse<ClientProject>>(`/items/projects/${id}`, {
      fields: [
        '*',
        'faculty.*',
        'project_type.*',
        'tasks.id',
        'tasks.title',
        'tasks.status',
        'tasks.category',
        'tasks.due_date',
        'tasks.assignee.first_name',
        'tasks.assignee.last_name',
        'tasks.assignee.email',
        'tasks.deliverables.id',
        'tasks.deliverables.label',
        'tasks.deliverables.url',
        'tasks.deliverables.status',
        'tasks.deliverables.deliverable_type.name',
        'tasks.deliverables.deliverable_type.icon',
        'tasks.deliverables.deliverable_type.color'
      ].join(','),
      
      filter: {
        // Asegurar que el usuario solo puede ver sus proyectos
        client_id: { _eq: '$CURRENT_USER' }
      }
    }),

  // Obtener estadísticas de proyectos del cliente
  getProjectStats: () =>
    apiClient.get<ApiResponse<{
      total: number;
      by_status: Record<string, number>;
      by_type: Record<string, number>;
      recent_activity: number;
    }>>('/items/projects', {
      aggregate: {
        count: '*',
        countDistinct: 'status,project_type'
      },
      filter: {
        client_id: { _eq: '$CURRENT_USER' }
      },
      groupBy: 'status,project_type'
    }),

  // Descargar un deliverable
  downloadDeliverable: (deliverableId: number) =>
    apiClient.get(`/items/task_deliverables/${deliverableId}/download`, {
      // Verificar que el deliverable pertenece a un proyecto del cliente
      filter: {
        'task.project.client_id': { _eq: '$CURRENT_USER' }
      }
    }),

  // Obtener el progreso de un proyecto
  getProjectProgress: (projectId: number) =>
    apiClient.get<ApiResponse<{
      total_tasks: number;
      completed_tasks: number;
      percentage: number;
      deliverables_completed: number;
      total_deliverables: number;
    }>>(`/items/projects/${projectId}/progress`, {
      filter: {
        client_id: { _eq: '$CURRENT_USER' }
      }
    })
};