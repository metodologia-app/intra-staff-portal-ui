import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Users, 
  Gift, 
  FileText, 
  Calendar, 
  DollarSign, 
  Bell, 
  Settings,
  LogOut,
  Menu,
  X,
  Clock,
  MapPin,
  Download,
  Eye,
  CalendarDays,
  Plus,
  Search
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated');
    if (!isAuth) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión exitosamente",
    });
    navigate('/login');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Panel Principal', icon: Building2 },
    { id: 'rrhh', label: 'Recursos Humanos', icon: Users },
    { id: 'beneficios', label: 'Beneficios', icon: Gift },
    { id: 'documentos', label: 'Documentos', icon: FileText },
    { id: 'calendario', label: 'Calendario', icon: Calendar },
    { id: 'perfil', label: 'Mi Perfil', icon: Settings },
  ];

  const userName = localStorage.getItem('userName') || 'Usuario';
  const userEmail = localStorage.getItem('userEmail') || '';

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">¡Bienvenido, {userName}!</h1>
                <p className="text-gray-600">Aquí tienes un resumen de tu actividad</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{new Date().toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Días de vacaciones</p>
                      <p className="text-2xl font-bold text-blue-600">15</p>
                    </div>
                    <Calendar className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Horas trabajadas</p>
                      <p className="text-2xl font-bold text-green-600">160</p>
                    </div>
                    <Clock className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Beneficios activos</p>
                      <p className="text-2xl font-bold text-purple-600">8</p>
                    </div>
                    <Gift className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Notificaciones</p>
                      <p className="text-2xl font-bold text-orange-600">3</p>
                    </div>
                    <Bell className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Próximos Eventos</CardTitle>
                  <CardDescription>Reuniones y fechas importantes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: "Reunión de equipo", date: "Hoy 14:00", type: "meeting" },
                    { title: "Evaluación anual", date: "15 Mar", type: "evaluation" },
                    { title: "Día libre por cumpleaños", date: "20 Mar", type: "holiday" }
                  ].map((event, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-gray-600">{event.date}</p>
                      </div>
                      <Badge variant={event.type === 'meeting' ? 'default' : event.type === 'evaluation' ? 'destructive' : 'secondary'}>
                        {event.type === 'meeting' ? 'Reunión' : event.type === 'evaluation' ? 'Evaluación' : 'Libre'}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Accesos Rápidos</CardTitle>
                  <CardDescription>Herramientas más utilizadas</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Solicitar Vacaciones", icon: Calendar, action: () => setActiveSection('rrhh') },
                    { label: "Ver Beneficios", icon: Gift, action: () => setActiveSection('beneficios') },
                    { label: "Documentos", icon: FileText, action: () => setActiveSection('documentos') },
                    { label: "Mi Perfil", icon: Settings, action: () => setActiveSection('perfil') }
                  ].map((item, i) => (
                    <Button 
                      key={i}
                      variant="outline" 
                      className="h-20 flex flex-col gap-2"
                      onClick={item.action}
                    >
                      <item.icon className="w-6 h-6" />
                      <span className="text-xs">{item.label}</span>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'documentos':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h1 className="text-3xl font-bold text-gray-900">Documentos</h1>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Subir Documento
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">Filtros</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">Categoría</label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>Todos</option>
                      <option>Contratos</option>
                      <option>Certificados</option>
                      <option>Políticas</option>
                      <option>Manuales</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">Estado</label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>Todos</option>
                      <option>Activo</option>
                      <option>Vencido</option>
                      <option>Pendiente</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              <div className="lg:col-span-3 space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Buscar documentos..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {[
                    {
                      name: "Contrato de Trabajo",
                      type: "PDF",
                      size: "2.4 MB",
                      date: "15 Mar 2024",
                      status: "Activo",
                      category: "Contratos"
                    },
                    {
                      name: "Certificado Médico",
                      type: "PDF", 
                      size: "1.2 MB",
                      date: "10 Mar 2024",
                      status: "Válido",
                      category: "Certificados"
                    },
                    {
                      name: "Manual del Empleado",
                      type: "PDF",
                      size: "5.8 MB", 
                      date: "01 Mar 2024",
                      status: "Actualizado",
                      category: "Manuales"
                    },
                    {
                      name: "Política de Privacidad",
                      type: "PDF",
                      size: "800 KB",
                      date: "28 Feb 2024", 
                      status: "Vigente",
                      category: "Políticas"
                    },
                    {
                      name: "Evaluación Anual 2023",
                      type: "PDF",
                      size: "1.5 MB",
                      date: "20 Feb 2024",
                      status: "Completado", 
                      category: "Evaluaciones"
                    }
                  ].map((doc, i) => (
                    <Card key={i} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{doc.name}</h3>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>{doc.type} • {doc.size}</span>
                                <span>{doc.date}</span>
                                <Badge variant="secondary">{doc.category}</Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={
                              doc.status === 'Activo' || doc.status === 'Válido' || doc.status === 'Vigente' ? 'default' : 
                              doc.status === 'Completado' || doc.status === 'Actualizado' ? 'secondary' : 'destructive'
                            }>
                              {doc.status}
                            </Badge>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              Ver
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-1" />
                              Descargar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'calendario':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h1 className="text-3xl font-bold text-gray-900">Calendario</h1>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Evento
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">Marzo 2024</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-1 text-center text-sm">
                    {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(day => (
                      <div key={day} className="p-2 font-medium text-gray-500">{day}</div>
                    ))}
                    {Array.from({length: 31}, (_, i) => (
                      <div 
                        key={i + 1} 
                        className={`p-2 hover:bg-blue-50 rounded cursor-pointer ${
                          i + 1 === 15 ? 'bg-blue-600 text-white' : 
                          [10, 20, 25].includes(i + 1) ? 'bg-blue-100 text-blue-600' : ''
                        }`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="lg:col-span-3 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Eventos de Hoy</CardTitle>
                    <CardDescription>Viernes, 15 de Marzo 2024</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        time: "09:00 - 10:00",
                        title: "Reunión de Equipo",
                        type: "Reunión", 
                        location: "Sala de Conferencias A",
                        attendees: 8
                      },
                      {
                        time: "14:00 - 15:30", 
                        title: "Evaluación de Desempeño",
                        type: "Evaluación",
                        location: "Oficina de RR.HH.",
                        attendees: 2
                      },
                      {
                        time: "16:00 - 17:00",
                        title: "Capacitación en Seguridad",
                        type: "Capacitación",
                        location: "Aula Virtual", 
                        attendees: 25
                      }
                    ].map((event, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-2 h-12 bg-blue-600 rounded"></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900">{event.title}</h3>
                            <Badge variant="outline">{event.type}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {event.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </span>
                            <span>{event.attendees} participantes</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Próximos Eventos</CardTitle>
                    <CardDescription>Esta semana</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        date: "Lun 18 Mar",
                        title: "Presentación de Proyecto",
                        time: "10:00",
                        type: "Presentación"
                      },
                      {
                        date: "Mié 20 Mar", 
                        title: "Día Libre por Cumpleaños",
                        time: "Todo el día",
                        type: "Libre"
                      },
                      {
                        date: "Vie 22 Mar",
                        title: "Reunión Mensual",
                        time: "15:00",
                        type: "Reunión"
                      }
                    ].map((event, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm text-gray-600">{event.date} • {event.time}</p>
                        </div>
                        <Badge variant={
                          event.type === 'Reunión' ? 'default' : 
                          event.type === 'Libre' ? 'secondary' : 'outline'
                        }>
                          {event.type}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );

      case 'rrhh':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Recursos Humanos</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Solicitudes</CardTitle>
                  <CardDescription>Gestiona tus solicitudes de RR.HH.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Solicitar Vacaciones
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Certificado Laboral
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Clock className="w-4 h-4 mr-2" />
                    Reporte de Horas
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estado de Solicitudes</CardTitle>
                  <CardDescription>Revisa el estado de tus solicitudes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { type: "Vacaciones", status: "Aprobado", date: "01 Mar" },
                    { type: "Certificado", status: "Pendiente", date: "05 Mar" },
                    { type: "Horas extra", status: "Rechazado", date: "10 Mar" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{item.type}</p>
                        <p className="text-sm text-gray-600">{item.date}</p>
                      </div>
                      <Badge variant={
                        item.status === 'Aprobado' ? 'default' : 
                        item.status === 'Pendiente' ? 'secondary' : 'destructive'
                      }>
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'beneficios':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Beneficios</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  title: "Seguro Médico", 
                  description: "Cobertura médica completa",
                  status: "Activo",
                  icon: "🏥"
                },
                { 
                  title: "Seguro Dental", 
                  description: "Atención dental preventiva",
                  status: "Activo",
                  icon: "🦷"
                },
                { 
                  title: "Gym Corporativo", 
                  description: "Acceso a gimnasio empresarial",
                  status: "Activo",
                  icon: "🏋️"
                },
                { 
                  title: "Descuentos", 
                  description: "Descuentos en tiendas afiliadas",
                  status: "Disponible",
                  icon: "🛍️"
                },
                { 
                  title: "Capacitaciones", 
                  description: "Cursos y certificaciones",
                  status: "Disponible",
                  icon: "📚"
                },
                { 
                  title: "Transporte", 
                  description: "Subsidio de transporte",
                  status: "Activo",
                  icon: "🚌"
                }
              ].map((benefit, i) => (
                <Card key={i} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{benefit.icon}</span>
                      <div>
                        <CardTitle className="text-lg">{benefit.title}</CardTitle>
                        <Badge variant={benefit.status === 'Activo' ? 'default' : 'secondary'}>
                          {benefit.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{benefit.description}</p>
                    <Button variant="outline" className="w-full">
                      Ver Detalles
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'perfil':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                  <CardDescription>Actualiza tus datos personales</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Nombre Completo</label>
                      <p className="text-lg font-medium">{userName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email</label>
                      <p className="text-lg font-medium">{userEmail}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Departamento</label>
                      <p className="text-lg font-medium">Tecnología</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Cargo</label>
                      <p className="text-lg font-medium">Desarrollador Senior</p>
                    </div>
                  </div>
                  <Button className="mt-6">Editar Perfil</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Configuración</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="w-4 h-4 mr-2" />
                    Notificaciones
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Preferencias
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                    <LogOut className="w-4 h-4 mr-2" />
                    Cambiar Contraseña
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Sección en Desarrollo</h1>
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-600">Esta sección estará disponible próximamente.</p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center gap-2">
            <Building2 className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Panel</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-6 py-3 text-left transition-colors ${
                activeSection === item.id
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-start text-red-600 hover:text-red-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white shadow-sm border-b h-16 flex items-center justify-between px-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <Building2 className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-gray-900">Panel</span>
          </div>
          <div className="w-10" /> {/* Spacer */}
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
