# Portfolio Integration Guide

## How to Connect Your Portfolio to the Admin Database

This guide shows you how to fetch content from your admin dashboard database and display it on your portfolio.

## General Pattern

All CRUD hooks follow this pattern:

```tsx
import { useProjects } from '@/hooks/useDatabase';

const { data: projects, isLoading, error } = useProjects();

// data contains your items
// isLoading is true while fetching
// error contains any error messages
```

## Projects Section

**File to update**: `src/components/sections/ProjectsSection.tsx`

```tsx
import { useProjects } from '@/hooks/useDatabase';

export const ProjectsSection = () => {
  const { data: projects = [], isLoading } = useProjects();

  if (isLoading) return <div>Loading projects...</div>;

  return (
    <section id="projects" className="py-20 px-4">
      <h2>Featured Work</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects
          .filter(p => p.is_featured) // Show featured projects first
          .map((project) => (
            <div key={project.id} className="card">
              {project.image_url && (
                <img src={project.image_url} alt={project.title} />
              )}
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              {project.link_url && (
                <a href={project.link_url} target="_blank">
                  View Project →
                </a>
              )}
            </div>
          ))}
      </div>
    </section>
  );
};
```

## Brands Section

**File to update**: `src/components/sections/BrandsSection.tsx`

```tsx
import { useBrands } from '@/hooks/useDatabase';

export const BrandsSection = () => {
  const { data: brands = [] } = useBrands();

  return (
    <section id="brands" className="py-20">
      <h2>Companies We Work With</h2>
      <div className="flex flex-wrap gap-8 justify-center">
        {brands.map((brand) => (
          <a
            key={brand.id}
            href={brand.link_url || '#'}
            target="_blank"
            rel="noopener noreferrer"
          >
            {brand.logo_url ? (
              <img src={brand.logo_url} alt={brand.name} className="h-12" />
            ) : (
              <span>{brand.name}</span>
            )}
          </a>
        ))}
      </div>
    </section>
  );
};
```

## Testimonials Section

**File to update**: `src/components/sections/TestimonialsSection.tsx`

```tsx
import { useTestimonials } from '@/hooks/useDatabase';

export const TestimonialsSection = () => {
  const { data: testimonials = [] } = useTestimonials();

  return (
    <section id="testimonials" className="py-20">
      <h2>What Clients Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="card">
            {/* Star Rating */}
            <div className="flex mb-2">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <span key={i}>⭐</span>
              ))}
            </div>
            
            <p className="italic mb-4">"{testimonial.content}"</p>
            
            <div className="flex items-center">
              {testimonial.author_image_url && (
                <img
                  src={testimonial.author_image_url}
                  alt={testimonial.author_name}
                  className="w-12 h-12 rounded-full mr-4"
                />
              )}
              <div>
                <p className="font-bold">{testimonial.author_name}</p>
                {testimonial.author_title && (
                  <p className="text-sm text-gray-600">
                    {testimonial.author_title}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
```

## Services Section

**File to update**: `src/components/sections/ServicesSection.tsx`

```tsx
import { useServices } from '@/hooks/useDatabase';

export const ServicesSection = () => {
  const { data: services = [] } = useServices();

  return (
    <section id="services" className="py-20">
      <h2>Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div key={service.id} className="card">
            {service.icon && <span className="text-4xl mb-4">{service.icon}</span>}
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            
            {Array.isArray(service.features) && service.features.length > 0 && (
              <ul className="mt-4 space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
```

## Experience Section

**File to update**: `src/components/sections/ExperienceSection.tsx`

```tsx
import { useExperience } from '@/hooks/useDatabase';

export const ExperienceSection = () => {
  const { data: experience = [] } = useExperience();

  return (
    <section id="experience" className="py-20">
      <h2>Experience</h2>
      <div className="space-y-8">
        {experience.map((exp) => (
          <div key={exp.id} className="border-l-4 border-primary pl-6">
            <div className="flex justify-between">
              <div>
                <h3>{exp.position}</h3>
                <p className="text-gray-600">{exp.company_name}</p>
              </div>
              {exp.is_current && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                  Current
                </span>
              )}
            </div>
            
            {exp.description && (
              <p className="mt-2 text-gray-700">{exp.description}</p>
            )}
            
            {exp.start_date && (
              <p className="text-sm text-gray-500 mt-2">
                {exp.start_date}
                {exp.end_date && ` - ${exp.end_date}`}
              </p>
            )}
            
            {Array.isArray(exp.skills) && exp.skills.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {exp.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
```

## Tools Section

**File to update**: `src/components/sections/ToolsSection.tsx`

```tsx
import { useTools } from '@/hooks/useDatabase';

export const ToolsSection = () => {
  const { data: tools = [] } = useTools();
  
  // Group by category
  const toolsByCategory = tools.reduce((acc, tool) => {
    const category = tool.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(tool);
    return acc;
  }, {} as Record<string, typeof tools>);

  return (
    <section id="tools" className="py-20">
      <h2>Skills & Technologies</h2>
      {Object.entries(toolsByCategory).map(([category, categoryTools]) => (
        <div key={category} className="mb-12">
          <h3 className="text-xl font-semibold mb-6">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryTools.map((tool) => (
              <div key={tool.id}>
                <div className="flex items-center mb-2">
                  {tool.icon_url && (
                    <img src={tool.icon_url} alt={tool.name} className="w-8 h-8 mr-2" />
                  )}
                  <span className="font-medium">{tool.name}</span>
                </div>
                
                {/* Proficiency Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${tool.proficiency_level}%` }}
                  />
                </div>
                
                {tool.years_of_experience && (
                  <p className="text-sm text-gray-600 mt-1">
                    {tool.years_of_experience} years experience
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};
```

## Using Settings

**File to use settings**: `src/pages/Index.tsx` or any component

```tsx
import { useSettings } from '@/hooks/useDatabase';

export const SomeComponent = () => {
  const { data: settings = [] } = useSettings();
  
  // Get a specific setting
  const siteTitle = settings.find(s => s.key === 'site_title')?.value;
  const email = settings.find(s => s.key === 'email')?.value;
  const resumeUrl = settings.find(s => s.key === 'resume_url')?.value;

  return (
    <div>
      <h1>{siteTitle}</h1>
      <a href={`mailto:${email}`}>{email}</a>
      <a href={resumeUrl} download>Download Resume</a>
    </div>
  );
};
```

## Helper: Create a Settings Hook

It's useful to create a custom hook to easily access settings:

**File**: `src/hooks/usePortfolioSettings.ts`

```tsx
import { useSettings } from '@/hooks/useDatabase';

export const usePortfolioSettings = () => {
  const { data: settings = [] } = useSettings();
  
  const settingsMap = settings.reduce((acc, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {} as Record<string, any>);
  
  return {
    title: settingsMap['site_title'],
    description: settingsMap['site_description'],
    email: settingsMap['email'],
    phone: settingsMap['phone'],
    resumeUrl: settingsMap['resume_url'],
    github: settingsMap['github_url'],
    linkedin: settingsMap['linkedin_url'],
    twitter: settingsMap['twitter_url'],
  };
};

// Then use it like:
export const ContactSection = () => {
  const settings = usePortfolioSettings();
  
  return (
    <section>
      <a href={`mailto:${settings.email}`}>Email: {settings.email}</a>
      <a href={settings.resume_url}>Download Resume</a>
    </section>
  );
};
```

## Tips & Best Practices

### 1. Always provide a fallback
```tsx
const { data: projects = [] } = useProjects();
// ^ = [] ensures data is always an array
```

### 2. Handle loading state
```tsx
const { isLoading } = useProjects();
if (isLoading) return <Skeleton />;
```

### 3. Sort by display_order
```tsx
const sorted = projects.sort((a, b) => a.display_order - b.display_order);
```

### 4. Filter featured items first
```tsx
const featured = projects.filter(p => p.is_featured);
const regular = projects.filter(p => !p.is_featured);
```

### 5. Cache-bust on demand
```tsx
const queryClient = useQueryClient();
const refreshData = () => {
  queryClient.invalidateQueries({ queryKey: ['projects'] });
};
```

## All Available Hooks

```tsx
// Queries (read data)
useProjects()
useBrands()
useTestimonials()
useServices()
useExperience()
useTools()
useSettings()

// Mutations (write data) - used in admin components
useCreateProject() / useUpdateProject() / useDeleteProject()
useCreateBrand() / useUpdateBrand() / useDeleteBrand()
useCreateTestimonial() / useUpdateTestimonial() / useDeleteTestimonial()
useCreateService() / useUpdateService() / useDeleteService()
useCreateExperience() / useUpdateExperience() / useDeleteExperience()
useCreateTool() / useUpdateTool() / useDeleteTool()
useCreateSetting() / useUpdateSetting() / useDeleteSetting()
```

That's it! Your portfolio is now connected to the admin dashboard. Update your sections and watch them live-update as you manage content from the admin panel 🎉
