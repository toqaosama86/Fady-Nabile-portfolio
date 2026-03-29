import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminLoginPage from "./pages/admin/Login";
import AdminHomePage from "./pages/admin/Home";
import AdminProjectsPage from "./pages/admin/Projects";
import AdminBrandsPage from "./pages/admin/Brands";
import AdminTestimonialsPage from "./pages/admin/Testimonials";
import AdminServicesPage from "./pages/admin/Services";
import AdminExperiencePage from "./pages/admin/Experience";
import AdminToolsPage from "./pages/admin/Tools";
import AdminSettingsPage from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminHomePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/projects" 
              element={
                <ProtectedRoute>
                  <AdminProjectsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/brands" 
              element={
                <ProtectedRoute>
                  <AdminBrandsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/testimonials" 
              element={
                <ProtectedRoute>
                  <AdminTestimonialsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/services" 
              element={
                <ProtectedRoute>
                  <AdminServicesPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/experience" 
              element={
                <ProtectedRoute>
                  <AdminExperiencePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/tools" 
              element={
                <ProtectedRoute>
                  <AdminToolsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/settings" 
              element={
                <ProtectedRoute>
                  <AdminSettingsPage />
                </ProtectedRoute>
              } 
            />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
