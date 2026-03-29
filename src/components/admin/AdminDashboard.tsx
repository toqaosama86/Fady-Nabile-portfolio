import React from 'react';
import { useProjects, useBrands, useTestimonials, useServices, useExperience, useTools } from '@/hooks/useDatabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Users, MessageSquare, Wrench, Building2, Hammer } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const { data: projects = [] } = useProjects();
  const { data: brands = [] } = useBrands();
  const { data: testimonials = [] } = useTestimonials();
  const { data: services = [] } = useServices();
  const { data: experience = [] } = useExperience();
  const { data: tools = [] } = useTools();

  const stats = [
    {
      label: 'Projects',
      value: projects.length,
      icon: Briefcase,
      color: 'text-blue-600',
      link: '/admin/projects',
    },
    {
      label: 'Brands',
      value: brands.length,
      icon: Users,
      color: 'text-green-600',
      link: '/admin/brands',
    },
    {
      label: 'Testimonials',
      value: testimonials.length,
      icon: MessageSquare,
      color: 'text-purple-600',
      link: '/admin/testimonials',
    },
    {
      label: 'Services',
      value: services.length,
      icon: Wrench,
      color: 'text-orange-600',
      link: '/admin/services',
    },
    {
      label: 'Experience',
      value: experience.length,
      icon: Building2,
      color: 'text-red-600',
      link: '/admin/experience',
    },
    {
      label: 'Tools',
      value: tools.length,
      icon: Hammer,
      color: 'text-indigo-600',
      link: '/admin/tools',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Welcome to Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage all your portfolio content in one place</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} to={stat.link}>
              <Card className="cursor-pointer hover:border-primary transition-colors h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">Click to manage</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>Start by managing your portfolio content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-border rounded-lg hover:bg-accent transition-colors">
              <h3 className="font-semibold mb-2">📝 Add Your First Project</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Showcase your best work by adding projects with images and descriptions.
              </p>
              <Link to="/admin/projects" className="text-primary hover:underline text-sm font-medium">
                Go to Projects →
              </Link>
            </div>
            <div className="p-4 border border-border rounded-lg hover:bg-accent transition-colors">
              <h3 className="font-semibold mb-2">⚙️ Configure Settings</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Set up your site title, contact information, and social links.
              </p>
              <Link to="/admin/settings" className="text-primary hover:underline text-sm font-medium">
                Go to Settings →
              </Link>
            </div>
            <div className="p-4 border border-border rounded-lg hover:bg-accent transition-colors">
              <h3 className="font-semibold mb-2">💼 Add Your Experience</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Share your professional background and work history.
              </p>
              <Link to="/admin/experience" className="text-primary hover:underline text-sm font-medium">
                Go to Experience →
              </Link>
            </div>
            <div className="p-4 border border-border rounded-lg hover:bg-accent transition-colors">
              <h3 className="font-semibold mb-2">🛠️ List Your Skills</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Add tools, technologies, and skills you're proficient in.
              </p>
              <Link to="/admin/tools" className="text-primary hover:underline text-sm font-medium">
                Go to Tools →
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Help Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg">💡 Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• Use the <strong>Display Order</strong> field to arrange items in the order they should appear</p>
          <p>• Mark projects as <strong>Featured</strong> to highlight them on your portfolio</p>
          <p>• Add <strong>Skills</strong> to your experience entries for better organization</p>
          <p>• Set <strong>Current Position</strong> for your ongoing job role in Experience</p>
          <p>• Use the <strong>Settings</strong> section to customize your portfolio metadata</p>
        </CardContent>
      </Card>
    </div>
  );
};
