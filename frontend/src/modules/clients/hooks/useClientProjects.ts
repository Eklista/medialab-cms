import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks';
import { projectsApi } from '../../../services/api';
import type { Project } from '../../../types';

interface UseClientProjectsReturn {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  getProjectsByStatus: (status: string) => Project[];
  getProjectStats: () => {
    total: number;
    published: number;
    draft: number;
    archived: number;
  };
}

export function useClientProjects(): UseClientProjectsReturn {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClientProjects = async () => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Filtrar proyectos por el ID del cliente
      // En Directus, esto sería algo como filtrar por client_id o created_by
      const response = await projectsApi.getWithRelations({
        filter: {
          // Esto depende de cómo esté estructurada tu relación en Directus
          // Opción 1: Si tienes un campo client_id directamente
          client_id: { _eq: user.id },
          
          // Opción 2: Si está relacionado a través de las requests
          // request: { user_created: { _eq: user.id } }
          
          // Opción 3: Si tienes una tabla de relación many-to-many
          // project_clients: { client: { _eq: user.id } }
        },
        fields: [
          '*',
          'faculty.name',
          'project_type.name',
          'tasks.assignee.*',
          'tasks.deliverables.*'
        ].join(','),
        sort: '-date_created'
      });

      setProjects(response.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al cargar proyectos';
      setError(errorMessage);
      console.error('Error fetching client projects:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getProjectsByStatus = (status: string) => {
    return projects.filter(project => project.status === status);
  };

  const getProjectStats = () => {
    return {
      total: projects.length,
      published: projects.filter(p => p.status === 'published').length,
      draft: projects.filter(p => p.status === 'draft').length,
      archived: projects.filter(p => p.status === 'archived').length,
    };
  };

  useEffect(() => {
    fetchClientProjects();
  }, [user?.id]);

  return {
    projects,
    isLoading,
    error,
    refetch: fetchClientProjects,
    getProjectsByStatus,
    getProjectStats,
  };
}