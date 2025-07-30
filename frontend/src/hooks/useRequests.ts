import { useState, useEffect } from 'react';
import { useDataStore } from '../stores/dataStore';
import { useAppStore } from '../stores/appStore';
import { requestsApi } from '../services/api';
import type { Request, CreateRequestForm } from '../types';

export function useRequests() {
  const { requests, requestsLoaded, setRequests, addRequest, updateRequest, removeRequest } = useDataStore();
  const { setLoading, setError } = useAppStore();
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchRequests = async (params?: Record<string, any>) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await requestsApi.getWithRelations(params);
      setRequests(response.data);
      
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch requests';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createRequest = async (data: CreateRequestForm) => {
    try {
      setIsCreating(true);
      setError(null);
      
      const response = await requestsApi.create(data);
      addRequest(response.data);
      
      return { success: true, data: response.data };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to create request';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsCreating(false);
    }
  };

  const updateRequestById = async (id: number, data: Partial<Request>) => {
    try {
      setIsUpdating(true);
      setError(null);
      
      const response = await requestsApi.update(id, data);
      updateRequest(id, response.data);
      
      return { success: true, data: response.data };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to update request';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteRequest = async (id: number) => {
    try {
      setError(null);
      
      await requestsApi.delete(id);
      removeRequest(id);
      
      return { success: true };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to delete request';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Auto-fetch al montar si no están cargadas
  useEffect(() => {
    if (!requestsLoaded) {
      fetchRequests();
    }
  }, [requestsLoaded]);

  return {
    // Estado
    requests,
    requestsLoaded,
    isCreating,
    isUpdating,
    
    // Acciones
    fetchRequests,
    createRequest,
    updateRequest: updateRequestById,
    deleteRequest,
    
    // Helpers
    getRequestById: (id: number) => requests.find(r => r.id === id),
    getRequestsByStatus: (status: string) => requests.filter(r => r.status === status),
  };
}