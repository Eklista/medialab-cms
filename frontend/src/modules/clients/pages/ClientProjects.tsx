import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Calendar,
  Clock,
  User,
  FileText,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../../hooks';
import { useClientProjects } from '../hooks/useClientProjects';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Badge from '../../../components/ui/Badge';
import EmptyState from '../../../components/ui/EmptyState';
import Loading from '../../../components/ui/Loading';
import Modal from '../../../components/ui/Modal';

const statusOptions = [
  { value: '', label: 'Todos los estados' },
  { value: 'published', label: 'Activo' },
  { value: 'draft', label: 'Borrador' },
  { value: 'archived', label: 'Completado' }
];

export default function ClientProjects() {
  useAuth();
  const { projects, isLoading, error, refetch } = useClientProjects();
  
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);

  // Filtrar proyectos cuando cambien los filtros
  useEffect(() => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(project => project.status === statusFilter);
    }

    setFilteredProjects(filtered);
  }, [projects, searchTerm, statusFilter]);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'published': return 'success';
      case 'draft': return 'warning';
      case 'archived': return 'info';
      default: return 'info';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published': return 'Activo';
      case 'draft': return 'Borrador';
      case 'archived': return 'Completado';
      default: return status;
    }
  };

  const openProjectDetails = (project: any) => {
    setSelectedProject(project);
    setShowProjectModal(true);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'No definida';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loading variant="spinner" size="lg" text="Cargando mis proyectos..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <EmptyState
          icon="error"
          title="Error al cargar proyectos"
          description={error}
          action={{
            label: "Reintentar",
            onClick: refetch
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Mis Proyectos
          </h1>
          <p className="text-text-secondary">
            Proyectos creados a partir de tus solicitudes
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          <Badge variant="info" className="text-xs">
            {filteredProjects.length} de {projects.length} proyectos
          </Badge>
          <Button variant="ghost" size="sm" onClick={refetch}>
            Actualizar
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
              <Input
                placeholder="Buscar proyectos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select
              placeholder="Filtrar por estado"
              options={statusOptions}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
          </div>
        </Card>
      </motion.div>

      {/* Projects Grid */}
      <AnimatePresence>
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <EmptyState
              icon="file"
              title="No se encontraron proyectos"
              description={searchTerm || statusFilter 
                ? "No tienes proyectos que coincidan con los filtros seleccionados."
                : "Aún no tienes proyectos asignados. Los proyectos se crean cuando los administradores aprueban tus solicitudes."
              }
              action={searchTerm || statusFilter ? {
                label: "Limpiar filtros",
                onClick: () => {
                  setSearchTerm('');
                  setStatusFilter('');
                }
              } : undefined}
            />
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
                  <div className="p-6 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-text-primary group-hover:text-white transition-colors">
                          {project.title}
                        </h3>
                        {project.description && (
                          <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                            {project.description}
                          </p>
                        )}
                      </div>
                      <Badge variant={getStatusVariant(project.status) as any}>
                        {getStatusLabel(project.status)}
                      </Badge>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Progreso</span>
                        <span className="text-text-primary font-medium">
                          {project.progress || 0}%
                        </span>
                      </div>
                      <div className="w-full bg-zinc-800 rounded-full h-2">
                        <motion.div
                          className="bg-white rounded-full h-2"
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress || 0}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="grid grid-cols-2 gap-4 text-sm text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(project.start_date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{formatDate(project.end_date)}</span>
                      </div>
                      {project.collaborators && project.collaborators.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{project.collaborators.length} colaborador{project.collaborators.length !== 1 ? 'es' : ''}</span>
                        </div>
                      )}
                      {project.deliverables && (
                        <div className="flex items-center space-x-1">
                          <FileText className="h-4 w-4" />
                          <span>{project.deliverables.length} entregable{project.deliverables.length !== 1 ? 's' : ''}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="text-xs text-text-secondary">
                        {project.faculty?.short_name || 'Sin facultad'} • {project.project_type?.name || 'Sin tipo'}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openProjectDetails(project)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Ver detalles
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Project Details Modal */}
      <Modal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        title={selectedProject?.title}
        size="lg"
      >
        {selectedProject && (
          <div className="space-y-6">
            {/* Project Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-text-secondary">Estado</label>
                <div className="mt-1">
                  <Badge variant={getStatusVariant(selectedProject.status) as any}>
                    {getStatusLabel(selectedProject.status)}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary">Progreso</label>
                <div className="mt-1">
                  <span className="text-lg font-semibold text-text-primary">
                    {selectedProject.progress || 0}%
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary">Fecha inicio</label>
                <p className="text-text-primary">
                  {formatDate(selectedProject.start_date)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary">Fecha fin</label>
                <p className="text-text-primary">
                  {formatDate(selectedProject.end_date)}
                </p>
              </div>
            </div>

            {/* Description */}
            {selectedProject.description && (
              <div>
                <label className="text-sm font-medium text-text-secondary">Descripción</label>
                <p className="text-text-primary mt-1">
                  {selectedProject.description}
                </p>
              </div>
            )}

            {/* Faculty and Type */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-text-secondary">Facultad</label>
                <p className="text-text-primary">
                  {selectedProject.faculty?.name || 'No especificada'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary">Tipo de proyecto</label>
                <p className="text-text-primary">
                  {selectedProject.project_type?.name || 'No especificado'}
                </p>
              </div>
            </div>

            {/* Collaborators */}
            {selectedProject.collaborators && selectedProject.collaborators.length > 0 && (
              <div>
                <label className="text-sm font-medium text-text-secondary">Equipo</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedProject.collaborators.map((collaborator: string, index: number) => (
                    <Badge key={index} variant="info">
                      {collaborator}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Deliverables */}
            {selectedProject.deliverables && selectedProject.deliverables.length > 0 && (
              <div>
                <label className="text-sm font-medium text-text-secondary">Entregables</label>
                <div className="space-y-2 mt-2">
                  {selectedProject.deliverables.map((deliverable: any) => (
                    <div
                      key={deliverable.id}
                      className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                        <span className="text-text-primary">{deliverable.label}</span>
                        {deliverable.deliverable_type && (
                          <Badge variant="info" size="sm">
                            {deliverable.deliverable_type.name}
                          </Badge>
                        )}
                      </div>
                      {deliverable.url && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => window.open(deliverable.url, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}