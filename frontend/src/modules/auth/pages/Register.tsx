import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';

import AuthLayout from '../components/AuthLayout';
import { useToast } from '../../../components/ui/Toast';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Checkbox from '../../../components/ui/Checkbox';
import Alert from '../../../components/ui/Alert';

const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, 'El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastName: z
    .string()
    .min(1, 'El apellido es requerido')
    .min(2, 'El apellido debe tener al menos 2 caracteres'),
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Ingresa un email válido'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'La contraseña debe contener al menos una mayúscula, una minúscula y un número'),
  confirmPassword: z
    .string()
    .min(1, 'Confirma tu contraseña'),
  role: z
    .string()
    .min(1, 'Selecciona un rol'),
  terms: z
    .boolean()
    .refine(val => val === true, 'Debes aceptar los términos y condiciones'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { toast } = useToast();

  const roleOptions = [
    { value: 'client', label: 'Cliente' },
    { value: 'collaborator', label: 'Colaborador' },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
      terms: false,
    },
  });

  const onSubmit = async (_data: RegisterFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      // Simular registro (aquí iría la llamada al API)
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        variant: 'success',
        title: '¡Cuenta creada!',
        description: 'Tu cuenta ha sido creada exitosamente.',
      });

      navigate('/auth/login');
    } catch (err) {
      setError('Error al crear la cuenta. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Crear Cuenta"
      subtitle="Únete al equipo de Medialab"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <Alert
            variant="error"
            title="Error en el registro"
            description={error}
            dismissible
            onDismiss={() => setError(null)}
          />
        )}

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Nombre"
            placeholder="Juan"
            error={errors.firstName?.message}
            {...register('firstName')}
          />
          
          <Input
            label="Apellido"
            placeholder="Pérez"
            error={errors.lastName?.message}
            {...register('lastName')}
          />
        </div>

        <Input
          label="Email"
          type="email"
          placeholder="juan@galileo.edu"
          error={errors.email?.message}
          {...register('email')}
        />

        <Select
          label="Rol"
          placeholder="Selecciona tu rol"
          options={roleOptions}
          error={errors.role?.message}
          {...register('role')}
        />

        <div className="relative">
          <Input
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            error={errors.password?.message}
            hint="Mínimo 8 caracteres, una mayúscula, una minúscula y un número"
            {...register('password')}
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-text-secondary hover:text-text-primary transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        <div className="relative">
          <Input
            label="Confirmar Contraseña"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-text-secondary hover:text-text-primary transition-colors"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        <Checkbox
          label="Acepto los términos y condiciones"
          description="Al registrarte, aceptas nuestros términos de uso y política de privacidad."
          error={errors.terms?.message}
          {...register('terms')}
        />

        <Button
          type="submit"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
        </Button>

        <div className="text-center pt-4 border-t border-border">
          <p className="text-text-secondary text-sm">
            ¿Ya tienes una cuenta?{' '}
            <Link
              to="/auth/login"
              className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}