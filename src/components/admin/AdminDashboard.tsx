import React from 'react';
import { useProjects, useBrands, useTestimonials, useServices, useExperience, useTools, useContactMessages } from '@/hooks/useDatabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Users, MessageSquare, Wrench, Building2, Hammer, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const { data: projects = [] } = useProjects();
  const { data: brands = [] } = useBrands();
  const { data: testimonials = [] } = useTestimonials();
  const { data: services = [] } = useServices();
  const { data: experience = [] } = useExperience();
  const { data: tools = [] } = useTools();
  const { data: messages = [] } = useContactMessages();

  const stats = [
    { label: 'Projects', value: projects.length, icon: Briefcase, color: 'text-blue-500', link: '/admin/projects' },
    { label: 'Brands', value: brands.length, icon: Users, color: 'text-green-500', link: '/admin/brands' },
    { label: 'Testimonials', value: testimonials.length, icon: MessageSquare, color: 'text-purple-500', link: '/admin/testimonials' },
    { label: 'Services', value: services.length, icon: Wrench, color: 'text-orange-500', link: '/admin/services' },
    { label: 'Experience', value: experience.length, icon: Building2, color: 'text-red-500', link: '/admin/experience' },
    { label: 'Tools', value: tools.length, icon: Hammer, color: 'text-indigo-500', link: '/admin/tools' },
    { label: 'Messages', value: messages.length, icon: Mail, color: 'text-cyan-500', link: '/admin/messages' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Welcome to Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage all your portfolio content in one place</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">📝 Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/admin/projects" className="block p-3 border border-border rounded-lg hover:bg-accent transition-colors">
              <span className="font-medium">Add Project</span>
              <span className="text-sm text-muted-foreground block">Showcase your best work</span>
            </Link>
            <Link to="/admin/settings" className="block p-3 border border-border rounded-lg hover:bg-accent transition-colors">
              <span className="font-medium">Edit Site Settings</span>
              <span className="text-sm text-muted-foreground block">Update titles, images, social links</span>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">💡 Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Go to <strong>Settings</strong> to change your name, title, images, and social media links</p>
            <p>• Use <strong>Display Order</strong> to arrange items on the portfolio</p>
            <p>• Mark projects as <strong>Featured</strong> to highlight them</p>
            <p>• Check <strong>Messages</strong> for contact form submissions</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
