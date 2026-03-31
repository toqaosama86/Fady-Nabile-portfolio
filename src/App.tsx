import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { useFaviconLoader } from "@/hooks/useFaviconLoader";
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
import AdminMessagesPage from "./pages/admin/Messages";
import AdminSettingsPage from "./pages/admin/Settings";

// Optimized QueryClient config with longer caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false, // Prevent refetch on window focus
      refetchOnReconnect: "stale", // Only refetch if data is stale
    },
  },
});

const AppContent = () => {
  useFaviconLoader();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<ProtectedRoute><AdminHomePage /></ProtectedRoute>} />
        <Route path="/admin/projects" element={<ProtectedRoute><AdminProjectsPage /></ProtectedRoute>} />
        <Route path="/admin/brands" element={<ProtectedRoute><AdminBrandsPage /></ProtectedRoute>} />
        <Route path="/admin/testimonials" element={<ProtectedRoute><AdminTestimonialsPage /></ProtectedRoute>} />
        <Route path="/admin/services" element={<ProtectedRoute><AdminServicesPage /></ProtectedRoute>} />
        <Route path="/admin/experience" element={<ProtectedRoute><AdminExperiencePage /></ProtectedRoute>} />
        <Route path="/admin/tools" element={<ProtectedRoute><AdminToolsPage /></ProtectedRoute>} />
        <Route path="/admin/messages" element={<ProtectedRoute><AdminMessagesPage /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><AdminSettingsPage /></ProtectedRoute>} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
