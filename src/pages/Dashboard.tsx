import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Users, 
  FileText, 
  Calendar as CalendarIcon, 
  User, 
  Gift, 
  Download, 
  Upload, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Edit,
  Plus,
  UserPlus,
  Building,
  Heart,
  DollarSign,
  PlusCircle
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import VacationRequestModal from '@/components/VacationRequestModal';
import DocumentUploadModal from '@/components/DocumentUploadModal';
import EventModal from '@/components/EventModal';

const Dashboard = () => {
  const [isVacationModalOpen, setIsVacationModalOpen] = useState(false);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Panel de Empleado</h1>
        <div className="space-x-2">
          <Button onClick={() => setIsVacationModalOpen(true)}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            Solicitar Vacaciones
          </Button>
          <Button onClick={() => setIsDocumentModalOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Subir Documento
          </Button>
        </div>
      </div>

      <Tabs defaultValue="perfil" className="w-full">
        <TabsList>
          <TabsTrigger value="perfil">Perfil</TabsTrigger>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
          <TabsTrigger value="solicitudes">Solicitudes</TabsTrigger>
        </TabsList>
        <TabsContent value="perfil" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>Detalles básicos de tu cuenta.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nombre</Label>
                  <Input type="text" id="name" value="John Doe" disabled />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" id="email" value="john.doe@example.com" disabled />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="position">Posición</Label>
                  <Input type="text" id="position" value="Ingeniero de Software" disabled />
                </div>
                <div>
                  <Label htmlFor="department">Departamento</Label>
                  <Input type="text" id="department" value="Tecnología" disabled />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documentos" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Documentos Personales</CardTitle>
              <CardDescription>
                Lista de documentos importantes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="border rounded-md p-4 flex items-center justify-between">
                  <div>
                    <FileText className="inline-block h-5 w-5 mr-2" />
                    Contrato de Trabajo
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Descargar
                  </Button>
                </div>
                <div className="border rounded-md p-4 flex items-center justify-between">
                  <div>
                    <FileText className="inline-block h-5 w-5 mr-2" />
                    Certificado de Estudios
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Descargar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="solicitudes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Solicitudes</CardTitle>
              <CardDescription>
                Gestiona tus solicitudes de vacaciones y otros permisos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="border rounded-md p-4 flex items-center justify-between">
                  <div>
                    <CalendarIcon className="inline-block h-5 w-5 mr-2" />
                    Vacaciones - Diciembre 2024
                    <Badge className="ml-2">Pendiente</Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                </div>
                <div className="border rounded-md p-4 flex items-center justify-between">
                  <div>
                    <CalendarIcon className="inline-block h-5 w-5 mr-2" />
                    Permiso Médico - Noviembre 2024
                    <Badge variant="secondary" className="ml-2">Aprobado</Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <VacationRequestModal open={isVacationModalOpen} onOpenChange={setIsVacationModalOpen} />
      <DocumentUploadModal open={isDocumentModalOpen} onOpenChange={setIsDocumentModalOpen} />
      <EventModal />
    </div>
  );
};

export default Dashboard;
