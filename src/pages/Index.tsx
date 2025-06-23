
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, Shield, Clock } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Panel de Empleados
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Accede a todas las herramientas y recursos que necesitas para gestionar 
            tu experiencia laboral de manera eficiente y profesional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Recursos Humanos</CardTitle>
              <CardDescription>
                Gestiona solicitudes, consulta beneficios y accede a documentos importantes
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Seguro y Confiable</CardTitle>
              <CardDescription>
                Tu información está protegida con los más altos estándares de seguridad
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Clock className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Disponible 24/7</CardTitle>
              <CardDescription>
                Accede a tu panel desde cualquier lugar y en cualquier momento
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-center">Comienza Ahora</CardTitle>
              <CardDescription className="text-center">
                Accede a tu cuenta o regístrate como nuevo empleado
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={() => navigate('/login')}
                className="w-full"
                size="lg"
              >
                Iniciar Sesión
              </Button>
              <Button 
                onClick={() => navigate('/register')}
                variant="outline"
                className="w-full"
                size="lg"
              >
                Registrarse
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-500">
            ¿Necesitas ayuda? Contacta al departamento de IT
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
