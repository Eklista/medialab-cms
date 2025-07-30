import { useState, useEffect } from 'react';
import { useDataStore } from '../stores/dataStore';
import { useAppStore } from '../stores/appStore';
import { projectsApi } from '../services/api';
import type { Project, CreateProjectForm } from '../types';

export function useProjects() {
  const { projects, projectsLoaded, setProjects, addProject, updateProject, removeProject } = useDataStore();
  const { setLoading, setError } = useAppStore();
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchProjects = async (params?: Record<string, any>) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await projectsApi.getWithRelations(params);
      setProjects(response.data);
      
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch projects';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (data: CreateProjectForm) => {
    try {
      setIsCreating(true);
      setError(null);
      
      const response = await projectsApi.create(data);
      addProject(response.data);
      
      return { success: true, data: response.data };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to create project';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsCreating(false);
    }
  };

  const updateProjectById = async (id: number, data: Partial<Project>) => {
    try {
      setIsUpdating(true);
      setError(null);
      
      const response = await projectsApi.update(id, data);
      updateProject(id, response.data);
      
      return { success: true, data: response.data };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to update project';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteProject = async (id: number) => {
    try {
      setError(null);
      
      await projectsApi.delete(id);
      removeProject(id);
      
      return { success: true };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to delete project';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  useEffect(() => {
    if (!projectsLoaded) {
      fetchProjects();
    }
  }, [projectsLoaded]);

  return {
    // Estado
    projects,
    projectsLoaded,
    isCreating,
    isUpdating,
    
    // Acciones
    fetchProjects,
    createProject,
    updateProject: updateProjectById,
    deleteProject,
    
    // Helpers
    getProjectById: (id: number) => projects.find(p => p.id === id),
    getProjectsByStatus: (status: string) => projects.filter(p => p.status === status),
    getActiveProjects: () => projects.filter(p => p.status === 'published'),
  };
}