import { motion } from 'framer-motion';
import { 
  Mic, 
  FileText, 
  Clock, 
  CheckCircle,
  Plus,
  TrendingUp
} from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';

const statsCards = [
  {
    title: 'Mis Podcasts',
    value: '12',
    change: '+2 este mes',
    icon: Mic,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  {
    title: 'Solicitudes',
    value: '8',
    change: '3 pendientes',
    icon: FileText,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
  },
  {
    title: 'En Producción',
    value: '3',
    change: 'Esta semana',
    icon: Clock,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
  },
  {
    title: 'Completados',
    value: '24',
    change: 'Total',
    icon: CheckCircle,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
  },
];

const recentPodcasts = [
  {
    id: 1,
    title: 'Innovación en IA',
    status: 'published',
    date: '2024-01-25',
    duration: '45:30',
  },
  {
    id: 2,
    title: 'Futuro de la Educación',
    status: 'draft',
    date: '2024-01-20',
    duration: '38:15',
  },
  {
    id: 3,
    title: 'Emprendimiento Digital',
    status: 'published',
    date: '2024-01-18',
    duration: '52:40',
  },
];

const recentRequests = [
  {
    id: 1,
    podcast: 'Tecnología Emergente',
    status: 'En revisión',
    date: '2024-01-25',
    priority: 'high',
  },
  {
    id: 2,
    podcast: 'Sostenibilidad',
    status: 'En producción',
    date: '2024-01-23',
    priority: 'medium',
  },
  {
    id: 3,
    podcast: 'Ciencia y Sociedad',
    status: 'Completado',
    date: '2024-01-20',
    priority: 'low',
  },
];

export default function ClientDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Bienvenido de vuelta
          </h1>
          <p className="text-text-secondary">
            Gestiona tus podcasts y solicitudes de producción
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 sm:mt-0"
        >
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Podcast
          </Button>
        </motion.div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
          >
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-secondary truncate">
                    {stat.title}
                  </p>
                  <p className="text-xl font-bold text-text-primary">
                    {stat.value}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {stat.change}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Podcasts */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Podcasts Recientes
              </h3>
              <Button variant="ghost" size="sm">
                Ver todos
              </Button>
            </div>
            
            <div className="space-y-3">
              {recentPodcasts.map((podcast) => (
                <div
                  key={podcast.id}
                  className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-zinc-700 rounded-lg flex items-center justify-center">
                      <Mic className="h-5 w-5 text-text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary">
                        {podcast.title}
                      </h4>
                      <p className="text-sm text-text-secondary">
                        {podcast.duration} • {podcast.date}
                      </p>
                    </div>
                  </div>
                  <Badge variant={podcast.status as any}>
                    {podcast.status === 'published' ? 'Publicado' : 'Borrador'}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Recent Requests */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Solicitudes Recientes
              </h3>
              <Button variant="ghost" size="sm">
                Ver todas
              </Button>
            </div>
            
            <div className="space-y-3">
              {recentRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-zinc-700 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary">
                        {request.podcast}
                      </h4>
                      <p className="text-sm text-text-secondary">
                        {request.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={
                        request.status === 'Completado' ? 'success' :
                        request.status === 'En producción' ? 'warning' : 'info'
                      }
                    >
                      {request.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card>
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Acciones Rápidas
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Button variant="secondary" className="h-20 flex-col space-y-2">
              <Plus className="h-6 w-6" />
              <span className="text-sm">Nuevo Podcast</span>
            </Button>
            <Button variant="secondary" className="h-20 flex-col space-y-2">
              <FileText className="h-6 w-6" />
              <span className="text-sm">Nueva Solicitud</span>
            </Button>
            <Button variant="secondary" className="h-20 flex-col space-y-2">
              <TrendingUp className="h-6 w-6" />
              <span className="text-sm">Analytics</span>
            </Button>
            <Button variant="secondary" className="h-20 flex-col space-y-2">
              <Clock className="h-6 w-6" />
              <span className="text-sm">Historial</span>
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}