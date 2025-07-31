import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Calendar,
  User,
  FileText,
  ChevronRight,
  Download
} from 'lucide-react';
import { useAuth } from '../../../hooks';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Badge from '../../../components/ui/Badge';
import EmptyState from '../../../components/ui/EmptyState';
import Loading from '../../../components/ui/Loading';
import Modal from '../../../components/ui/Modal';

// Mock data - en producción vendrá de la API filtrada por cliente
const mockProjects = [
  {
    id: 1,
    title: 'Podcast: Innovación en IA',
    description: 'Serie sobre inteligencia artificial y su impacto en la sociedad',
    status: 'published' as const,
    start_date: '2024-01-15',
    end_date: '2024-01-30',
    progress: 100,
    client_id: 'client-1',
    faculty: 'FISICC',
    project_type: 'Podcast',
    collaborators: ['Juan Pérez', 'María García'],
    deliverables: [
      { id: 1, name: 'Audio Final.mp3', type: 'audio', url: '#', completed: true },
      { id: 2, name: 'Thumbnail.png', type: 'image', url: '#', completed: true },
      { id: 3, name: 'Transcripción.pdf', type: 'document', url: '#', completed: true }
    ]
  },
  {
    id: 2,
    title: 'Podcast: Futuro de la Educación',
    description: 'Análisis de tendencias educativas digitales',
    status: 'draft' as const,
    start_date: '2024-01-20',
    end_date: '2024-02-05',
    progress: 75,
    client_id: 'client-1',
    faculty: 'FACIMED',
    project_type: 'Podcast',
    collaborators: ['Ana López'],
    deliverables: [
      { id: 4, name: 'Audio Rough Cut.mp3', type: 'audio', url: '#', completed: true },
      { id: 5, name: 'Guión Final.pdf', type: 'document', url: '#', completed: true },
      { id: 6, name: 'Música de Fondo.mp3', type: 'audio', url: '#', completed: false }
    ]
  },
  {
    id: 3,
    title: 'Video: Emprendimiento Digital',
    description: 'Documental sobre startup tecnológicas en Guatemala',
    status: 'archived' as const,
    start_date: '2023-12-01',
    end_date: '2024-01-10',
    progress: 100,
    client_id: 'client-1',
    faculty: 'FACOM',
    project_type: 'Video',
    collaborators: ['Carlos Ruiz', 'Sofia Mendez'],
    deliverables: [
      { id: 7, name: 'Video Final.mp4', type: 'video', url: '#', completed: true },
      { id: 8, name: 'Behind the Scenes.mp4', type: 'video', url: '#', completed: true }
    ]
  }
];

const statusOptions = [
  { value: '', label: 'Todos los estados' },
  { value: 'published', label: 'Publicado' },
  { value: 'draft', label: 'En progreso' },
  { value: 'archived', label: 'Archivado' }
];

const typeOptions = [
  { value: '', label: 'Todos los tipos' },
  { value: 'Podcast', label: 'Podcast' },
  { value: 'Video', label: 'Video' },
  { value: 'Audio', label: 'Audio' }
];

export default function ClientProjects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState(mockProjects);
  const [filteredProjects, setFilteredProjects] = useState(mockProjects);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);

  // Simular carga de datos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filtrar proyectos
  useEffect(() => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(project => project.status === statusFilter);
    }

    if (typeFilter) {
      filtered = filtered.filter(project => project.project_type === typeFilter);
    }

    setFilteredProjects(filtered);
  }, [projects, searchTerm, statusFilter, typeFilter]);

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
      case 'published': return 'Publicado';
      case 'draft': return 'En progreso';
      case 'archived': return 'Archivado';
      default: return status;
    }
  };

  const openProjectDetails = (project: any) => {
    setSelectedProject(project);
    setShowProjectModal(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loading variant="spinner" size="lg" text="Cargando mis proyectos..." />
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
            {filteredProjects.length} proyectos
          </Badge>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            
            <Select
              placeholder="Filtrar por tipo"
              options={typeOptions}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
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
              description="No tienes proyectos que coincidan con los filtros seleccionados."
              action={{
                label: "Limpiar filtros",
                onClick: () => {
                  setSearchTerm('');
                  setStatusFilter('');
                  setTypeFilter('');
                }
              }}
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
                        <p className="text-sm text-text-secondary mt-1">
                          {project.description}
                        </p>
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
                          {project.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-zinc-800 rounded-full h-2">
                        <motion.div
                          className="bg-white rounded-full h-2"
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="flex items-center justify-between text-sm text-text-secondary">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(project.start_date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{project.collaborators.length}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FileText className="h-4 w-4" />
                          <span>{project.deliverables.length}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <span className="text-xs text-text-secondary">
                        {project.faculty} • {project.project_type}
                      </span>
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
                    {selectedProject.progress}%
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary">Fecha inicio</label>
                <p className="text-text-primary">
                  {new Date(selectedProject.start_date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary">Fecha fin</label>
                <p className="text-text-primary">
                  {new Date(selectedProject.end_date).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium text-text-secondary">Descripción</label>
              <p className="text-text-primary mt-1">
                {selectedProject.description}
              </p>
            </div>

            {/* Collaborators */}
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

            {/* Deliverables */}
            <div>
              <label className="text-sm font-medium text-text-secondary">Entregables</label>
              <div className="space-y-2 mt-2">
                {selectedProject.deliverables.map((deliverable: any) => (
                  <div
                    key={deliverable.id}
                    className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        deliverable.completed ? 'bg-green-400' : 'bg-yellow-400'
                      }`} />
                      <span className="text-text-primary">{deliverable.name}</span>
                      <Badge variant="info" size="sm">
                        {deliverable.type}
                      </Badge>
                    </div>
                    {deliverable.completed && (
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}