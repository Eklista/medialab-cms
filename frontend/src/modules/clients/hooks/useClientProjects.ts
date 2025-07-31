import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks';
import { projectsApi } from '../../../services/api';

interface ProjectWithRelations {
  id: number;
  status: 'published' | 'draft' | 'archived';
  title: string;
  description?: string;
  start_date: string;
  end_date: string;
  faculty?: {
    id: number;
    name: string;
    short_name: string;
  };
  project_type?: {
    id: number;
    name: string;
    description?: string;
  };
  tasks?: Array<{
    id: number;
    title: string;
    status: string;
    category: string;
    assignee?: {
      id: string;
      first_name: string;
      last_name: string;
    };
    deliverables?: Array<{
      id: number;
      label: string;
      url: string;
      deliverable_type?: {
        name: string;
        color: string;
        icon: string;
      };
    }>;
  }>;
  // Campos calculados
  progress?: number;
  collaborators?: string[];
  deliverables?: Array<{
    id: number;
    label: string;
    url: string;
    deliverable_type?: {
      name: string;
      color: string;
      icon: string;
    };
  }>;
}

interface UseClientProjectsReturn {
  projects: ProjectWithRelations[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  getProjectsByStatus: (status: string) => ProjectWithRelations[];
  getProjectStats: () => {
    total: number;
    published: number;
    draft: number;
    archived: number;
  };
}

export function useClientProjects(): UseClientProjectsReturn {
  const { user } = useAuth();
  const [projects, setProjects] = useState<ProjectWithRelations[]>([]);
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

      // Obtener proyectos con relaciones según tu estructura
      const response = await projectsApi.getWithRelations({
        fields: [
          '*',
          'faculty.id',
          'faculty.name', 
          'faculty.short_name',
          'project_type.id',
          'project_type.name',
          'project_type.description'
        ].join(','),
        sort: '-date_created'
      });

      console.log('Projects from API:', response.data);
      
      // Transformar los datos para que coincidan con nuestra interface
      const transformedProjects: ProjectWithRelations[] = response.data.map((project: any) => ({
        id: project.id,
        status: project.status,
        title: project.title,
        description: project.description,
        start_date: project.start_date,
        end_date: project.end_date,
        faculty: project.faculty,
        project_type: project.project_type,
        tasks: [],
        progress: project.status === 'archived' ? 100 : project.status === 'published' ? 50 : 0,
        collaborators: [],
        deliverables: []
      }));

      setProjects(transformedProjects);
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