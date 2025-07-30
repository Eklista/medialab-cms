import { useEffect } from 'react';
import { useAppStore } from '../stores/appStore';
import { catalogsApi } from '../services/api';

export function useCatalogs() {
  const {
    faculties,
    services,
    serviceCategories,
    projectTypes,
    deliverableTypes,
    catalogsLoaded,
    setCatalogs,
    setLoading,
    setError,
  } = useAppStore();

  const fetchCatalogs = async () => {
    if (catalogsLoaded) return;

    try {
      setLoading(true);
      setError(null);

      const [
        facultiesResponse,
        servicesResponse,
        serviceCategoriesResponse,
        projectTypesResponse,
        deliverableTypesResponse,
      ] = await Promise.all([
        catalogsApi.getFaculties(),
        catalogsApi.getServices(),
        catalogsApi.getServiceCategories(),
        catalogsApi.getProjectTypes(),
        catalogsApi.getDeliverableTypes(),
      ]);

      setCatalogs({
        faculties: facultiesResponse.data,
        services: servicesResponse.data,
        serviceCategories: serviceCategoriesResponse.data,
        projectTypes: projectTypesResponse.data,
        deliverableTypes: deliverableTypesResponse.data,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch catalogs';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalogs();
  }, []);

  return {
    // Estado
    faculties,
    services,
    serviceCategories,
    projectTypes,
    deliverableTypes,
    catalogsLoaded,
    
    // Acciones
    fetchCatalogs,
    
    // Helpers
    getFacultyById: (id: number) => faculties.find(f => f.id === id),
    getServiceById: (id: number) => services.find(s => s.id === id),
    getServicesByCategory: (categoryId: number) => services.filter(s => s.category === categoryId),
    getProjectTypeById: (id: number) => projectTypes.find(pt => pt.id === id),
    getDeliverableTypeById: (id: number) => deliverableTypes.find(dt => dt.id === id),
  };
}