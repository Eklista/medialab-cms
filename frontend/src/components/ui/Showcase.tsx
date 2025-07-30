import { useState } from 'react';
import Button from './Button';
import Input from './Input';
import Label from './Label';
import Select from './Select';
import Textarea from './Textarea';
import Checkbox from './Checkbox';
import Card, { CardHeader, CardTitle, CardContent } from './Card';
import Badge from './Badge';
import Modal from './Modal';
import Loading from './Loading';
import Alert from './Alert';

export default function UIShowcase() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(false);
  
  // Estados para todos los checkboxes
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(true);
  const [modalCheckbox, setModalCheckbox] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [showFullScreenLoading, setShowFullScreenLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const handleFullScreenLoading = () => {
    setShowFullScreenLoading(true);
    setTimeout(() => setShowFullScreenLoading(false), 3000);
  };

  const facultyOptions = [
    { value: '1', label: 'FISICC' },
    { value: '2', label: 'FACIMED' },
    { value: '3', label: 'FACOM' },
    { value: '4', label: 'FAFIDE' },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 
            className="text-4xl font-bold text-text-primary mb-4"
            style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}
          >
            UI Components Showcase
          </h1>
          <p className="text-text-secondary">
            Todos los componentes base del sistema de diseño
          </p>
        </div>

        {/* Alerts */}
        {showAlert && (
          <Alert
            variant="info"
            title="Componentes UI Listos"
            description="Todos los componentes están funcionando correctamente."
            dismissible
            onDismiss={() => setShowAlert(false)}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Alert variant="success" title="¡Éxito!" description="Operación completada." />
          <Alert variant="warning" title="Advertencia" description="Revisa los datos ingresados." />
          <Alert variant="error" title="Error" description="Algo salió mal." />
          <Alert variant="info">
            <p>Alert sin título, solo con contenido personalizado.</p>
          </Alert>
        </div>

        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Botones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button loading={loading} onClick={handleLoadingDemo}>
                  {loading ? 'Loading...' : 'Click for Loading'}
                </Button>
                <Button disabled>Disabled</Button>
                <Button fullWidth>Full Width</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Labels */}
        <Card>
          <CardHeader>
            <CardTitle>Labels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Label size="sm">Label pequeño</Label>
              <Label size="md">Label mediano</Label>
              <Label size="lg">Label grande</Label>
              <Label required>Campo requerido</Label>
              <Label optional>Campo opcional</Label>
            </div>
          </CardContent>
        </Card>

        {/* Form Components */}
        <Card>
          <CardHeader>
            <CardTitle>Formularios Completos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <Label htmlFor="name-input" required>Nombre completo</Label>
                <Input
                  id="name-input"
                  placeholder="Ingresa tu nombre"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="faculty-select" required>Facultad</Label>
                <Select
                  id="faculty-select"
                  placeholder="Selecciona una facultad"
                  options={facultyOptions}
                  value={selectValue}
                  onChange={(e) => setSelectValue(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="description-textarea" optional>Descripción</Label>
                <Textarea
                  id="description-textarea"
                  placeholder="Describe tu solicitud..."
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                  hint="Máximo 500 caracteres"
                />
              </div>

              <Checkbox
                checked={checkboxValue}
                onChange={(e) => setCheckboxValue(e.target.checked)}
                label="Acepto los términos y condiciones"
                description="Al marcar esta casilla, aceptas nuestros términos de servicio."
              />
            </div>
          </CardContent>
        </Card>

        {/* Inputs Standalone */}
        <Card>
          <CardHeader>
            <CardTitle>Inputs & Form Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Input
                  label="Input normal"
                  placeholder="Escribe algo..."
                />
                
                <Input
                  label="Input con error"
                  placeholder="test@email.com"
                  error="Este email ya está en uso"
                  defaultValue="invalid-email"
                />
                
                <Input
                  label="Input con hint"
                  type="password"
                  placeholder="••••••••"
                  hint="Mínimo 8 caracteres"
                />
              </div>

              <div className="space-y-4">
                <Select
                  label="Select standalone"
                  placeholder="Elige una opción"
                  options={[
                    { value: 'opt1', label: 'Opción 1' },
                    { value: 'opt2', label: 'Opción 2' },
                    { value: 'opt3', label: 'Opción 3', disabled: true },
                  ]}
                />

                <Textarea
                  label="Textarea"
                  placeholder="Escribe tu mensaje..."
                  rows={3}
                />

                <div className="space-y-3">
                  <Checkbox 
                    label="Checkbox simple" 
                    checked={checkbox1}
                    onChange={(e) => setCheckbox1(e.target.checked)}
                  />
                  <Checkbox 
                    label="Checkbox con descripción"
                    description="Esta es una descripción del checkbox"
                    checked={checkbox2}
                    onChange={(e) => setCheckbox2(e.target.checked)}
                  />
                  <Checkbox 
                    checked={checkbox3}
                    onChange={(e) => setCheckbox3(e.target.checked)}
                    label="Checkbox marcado"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Badge variant="published">Publicado</Badge>
                <Badge variant="draft">Borrador</Badge>
                <Badge variant="archived">Archivado</Badge>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Badge variant="success">Éxito</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="warning">Advertencia</Badge>
                <Badge variant="info">Info</Badge>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Badge size="sm">Small</Badge>
                <Badge size="md">Medium</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loading States */}
        <Card>
          <CardHeader>
            <CardTitle>Loading States</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-3">Spinners</h4>
                <div className="flex items-center gap-6">
                  <Loading size="sm" />
                  <Loading size="md" />
                  <Loading size="lg" />
                  <Loading size="xl" />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-text-primary mb-3">Dots</h4>
                <div className="flex items-center gap-6">
                  <Loading variant="dots" size="sm" />
                  <Loading variant="dots" size="md" />
                  <Loading variant="dots" size="lg" />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-text-primary mb-3">Pulse</h4>
                <div className="flex items-center gap-6">
                  <Loading variant="pulse" size="sm" />
                  <Loading variant="pulse" size="md" />
                  <Loading variant="pulse" size="lg" />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-text-primary mb-3">Con texto</h4>
                <Loading variant="spinner" size="md" text="Cargando datos..." />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  onClick={handleFullScreenLoading}
                >
                  Full Screen Loading
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="default">
            <CardHeader>
              <CardTitle>Card Default</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary">
                Esta es una card con el estilo por defecto.
              </p>
            </CardContent>
          </Card>

          <Card variant="hover">
            <CardHeader>
              <CardTitle>Card Hover</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary">
                Esta card tiene efecto hover. ¡Pasa el mouse!
              </p>
            </CardContent>
          </Card>

          <Card variant="bordered" padding="lg">
            <CardHeader>
              <CardTitle>Card Bordered</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary">
                Card con borde más grueso y padding grande.
              </p>
            </CardContent>
          </Card>

          <Card padding="sm">
            <CardContent>
              <h3 className="font-semibold text-text-primary mb-2">Sin Header</h3>
              <p className="text-text-secondary text-sm">
                Card simple sin header, con padding pequeño.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Modal Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Modal</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setIsModalOpen(true)}>
              Abrir Modal
            </Button>
          </CardContent>
        </Card>

        {/* Color Palette */}
        <Card>
          <CardHeader>
            <CardTitle>Paleta de Colores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="w-full h-12 bg-background border border-border rounded"></div>
                <p className="text-xs text-text-secondary">Background</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-12 bg-surface rounded"></div>
                <p className="text-xs text-text-secondary">Surface</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-12 bg-white rounded"></div>
                <p className="text-xs text-text-secondary">Primary Button</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-12 bg-zinc-800 rounded"></div>
                <p className="text-xs text-text-secondary">Secondary</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Demo Modal Completo"
          description="Modal con todos los componentes integrados."
          size="md"
        >
          <div className="space-y-4">
            <Alert variant="info" title="Formulario Modal">
              Este modal contiene un formulario completo con todos los componentes.
            </Alert>
            
            <div className="space-y-4">
              <Input
                label="Nombre"
                placeholder="Tu nombre completo"
              />
              
              <Select
                label="Facultad"
                placeholder="Selecciona tu facultad"
                options={facultyOptions}
              />
              
              <Textarea
                label="Comentarios"
                placeholder="Escribe tus comentarios..."
                rows={3}
                hint="Opcional"
              />
              
              <Checkbox 
                label="Notificaciones"
                description="Recibir notificaciones por email"
                checked={modalCheckbox}
                onChange={(e) => setModalCheckbox(e.target.checked)}
              />
            </div>
            
            <div className="flex gap-3 justify-end pt-4">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>
                Guardar
              </Button>
            </div>
          </div>
        </Modal>

        {/* Full Screen Loading */}
        {showFullScreenLoading && (
          <Loading 
            fullScreen 
            variant="spinner" 
            size="lg" 
            text="Cargando aplicación..." 
          />
        )}
      </div>
    </div>
  );
}