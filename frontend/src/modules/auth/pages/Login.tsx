import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';

import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../../../hooks';
import { useToast } from '../../../components/ui/Toast';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Checkbox from '../../../components/ui/Checkbox';
import Alert from '../../../components/ui/Alert';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Ingresa un email válido'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await login(data.email, data.password);

      if (result.success) {
        toast({
          variant: 'success',
          title: '¡Bienvenido!',
          description: 'Has iniciado sesión correctamente.',
        });
        navigate('/dashboard');
      } else {
        setError(result.error || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('Error de conexión. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Iniciar Sesión"
      subtitle="Ingresa a tu cuenta de Medialab"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <Alert
            variant="error"
            title="Error de autenticación"
            description={error}
            dismissible
            onDismiss={() => setError(null)}
          />
        )}

        <div>
          <Input
            label="Email"
            type="email"
            placeholder="tu@email.com"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>

        <div>
          <div className="relative">
            <Input
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              error={errors.password?.message}
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
        </div>

        <div className="flex items-center justify-between">
          <Checkbox
            label="Recordarme"
            {...register('rememberMe')}
          />
          
          <Link
            to="/auth/forgot-password"
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <Button
          type="submit"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </Button>

        <div className="text-center pt-4 border-t border-border">
          <p className="text-text-secondary text-sm">
            ¿No tienes una cuenta?{' '}
            <Link
              to="/auth/register"
              className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}