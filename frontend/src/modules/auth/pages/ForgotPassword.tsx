import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Mail } from 'lucide-react';

import AuthLayout from '../components/AuthLayout';
import { useToast } from '../../../components/ui/Toast';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Alert from '../../../components/ui/Alert';

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Ingresa un email válido'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (_data: ForgotPasswordFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      // Simular envío de email (aquí iría la llamada al API)
      await new Promise(resolve => setTimeout(resolve, 2000));

      setIsEmailSent(true);
      
      toast({
        variant: 'success',
        title: 'Email enviado',
        description: 'Revisa tu bandeja de entrada para restablecer tu contraseña.',
      });
    } catch (err) {
      setError('Error al enviar el email. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    const email = getValues('email');
    if (!email) return;

    try {
      setIsLoading(true);
      
      // Simular reenvío
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        variant: 'success',
        title: 'Email reenviado',
        description: 'Hemos enviado nuevamente el email de recuperación.',
      });
    } catch (err) {
      toast({
        variant: 'error',
        title: 'Error',
        description: 'No se pudo reenviar el email.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <AuthLayout 
        title="Revisa tu email"
        subtitle="Te hemos enviado las instrucciones"
      >
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto">
            <Mail className="w-8 h-8 text-blue-400" />
          </div>

          <div>
            <p className="text-text-secondary mb-4">
              Hemos enviado un enlace de recuperación a:
            </p>
            <p className="text-text-primary font-medium">
              {getValues('email')}
            </p>
          </div>

          <Alert
            variant="info"
            description="Si no recibes el email en unos minutos, revisa tu carpeta de spam."
          />

          <div className="space-y-3">
            <Button
              variant="secondary"
              fullWidth
              onClick={handleResendEmail}
              loading={isLoading}
            >
              Reenviar email
            </Button>

            <Link to="/auth/login">
              <Button variant="ghost" fullWidth>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al inicio de sesión
              </Button>
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Recuperar Contraseña"
      subtitle="Te enviaremos un enlace para restablecerla"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <Alert
            variant="error"
            title="Error"
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
            hint="Ingresa el email asociado a tu cuenta"
            {...register('email')}
          />
        </div>

        <Button
          type="submit"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Enviando...' : 'Enviar enlace de recuperación'}
        </Button>

        <div className="text-center pt-4 border-t border-border">
          <Link
            to="/auth/login"
            className="text-text-secondary hover:text-text-primary transition-colors text-sm inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Volver al inicio de sesión
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}