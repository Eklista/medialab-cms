import { create } from 'zustand';
import type { Request, Project, Task, TaskDeliverable } from '../types';

interface DataState {
  requests: Request[];
  projects: Project[];
  tasks: Task[];
  deliverables: TaskDeliverable[];
  
  requestsLoaded: boolean;
  projectsLoaded: boolean;
  tasksLoaded: boolean;
  deliverablesLoaded: boolean;
}

interface DataActions {
  setRequests: (requests: Request[]) => void;
  addRequest: (request: Request) => void;
  updateRequest: (id: number, updates: Partial<Request>) => void;
  removeRequest: (id: number) => void;
  
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (id: number, updates: Partial<Project>) => void;
  removeProject: (id: number) => void;
  
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (id: number, updates: Partial<Task>) => void;
  removeTask: (id: number) => void;
  
  setDeliverables: (deliverables: TaskDeliverable[]) => void;
  addDeliverable: (deliverable: TaskDeliverable) => void;
  updateDeliverable: (id: number, updates: Partial<TaskDeliverable>) => void;
  removeDeliverable: (id: number) => void;
  
  clearAll: () => void;
}

interface DataStore extends DataState, DataActions {}

export const useDataStore = create<DataStore>((set) => ({
  requests: [],
  projects: [],
  tasks: [],
  deliverables: [],
  
  requestsLoaded: false,
  projectsLoaded: false,
  tasksLoaded: false,
  deliverablesLoaded: false,

  setRequests: (requests) => set({ requests, requestsLoaded: true }),
  
  addRequest: (request) => set((state) => ({ 
    requests: [...state.requests, request] 
  })),
  
  updateRequest: (id, updates) => set((state) => ({
    requests: state.requests.map(r => r.id === id ? { ...r, ...updates } : r)
  })),
  
  removeRequest: (id) => set((state) => ({
    requests: state.requests.filter(r => r.id !== id)
  })),

  setProjects: (projects) => set({ projects, projectsLoaded: true }),
  
  addProject: (project) => set((state) => ({ 
    projects: [...state.projects, project] 
  })),
  
  updateProject: (id, updates) => set((state) => ({
    projects: state.projects.map(p => p.id === id ? { ...p, ...updates } : p)
  })),
  
  removeProject: (id) => set((state) => ({
    projects: state.projects.filter(p => p.id !== id)
  })),

  setTasks: (tasks) => set({ tasks, tasksLoaded: true }),
  
  addTask: (task) => set((state) => ({ 
    tasks: [...state.tasks, task] 
  })),
  
  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map(t => t.id === id ? { ...t, ...updates } : t)
  })),
  
  removeTask: (id) => set((state) => ({
    tasks: state.tasks.filter(t => t.id !== id)
  })),

  setDeliverables: (deliverables) => set({ deliverables, deliverablesLoaded: true }),
  
  addDeliverable: (deliverable) => set((state) => ({ 
    deliverables: [...state.deliverables, deliverable] 
  })),
  
  updateDeliverable: (id, updates) => set((state) => ({
    deliverables: state.deliverables.map(d => d.id === id ? { ...d, ...updates } : d)
  })),
  
  removeDeliverable: (id) => set((state) => ({
    deliverables: state.deliverables.filter(d => d.id !== id)
  })),

  clearAll: () => set({
    requests: [],
    projects: [],
    tasks: [],
    deliverables: [],
    requestsLoaded: false,
    projectsLoaded: false,
    tasksLoaded: false,
    deliverablesLoaded: false,
  }),
}));