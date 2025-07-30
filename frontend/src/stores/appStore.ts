import { create } from 'zustand';
import type { Faculty, Service, ServiceCategory, ProjectType, DeliverableType } from '../types';

interface AppState {
  isLoading: boolean;
  error: string | null;
  
  faculties: Faculty[];
  services: Service[];
  serviceCategories: ServiceCategory[];
  projectTypes: ProjectType[];
  deliverableTypes: DeliverableType[];
  
  catalogsLoaded: boolean;
}

interface AppActions {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCatalogs: (data: {
    faculties: Faculty[];
    services: Service[];
    serviceCategories: ServiceCategory[];
    projectTypes: ProjectType[];
    deliverableTypes: DeliverableType[];
  }) => void;
  clearError: () => void;
}

interface AppStore extends AppState, AppActions {}

export const useAppStore = create<AppStore>((set) => ({
  isLoading: false,
  error: null,
  
  faculties: [],
  services: [],
  serviceCategories: [],
  projectTypes: [],
  deliverableTypes: [],
  
  catalogsLoaded: false,

  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
  
  clearError: () => set({ error: null }),
  
  setCatalogs: (data) => set({ 
    ...data, 
    catalogsLoaded: true 
  }),
}));