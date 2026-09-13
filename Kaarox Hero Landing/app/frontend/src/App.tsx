import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import BlogRoutes from './blog-routes';
import Index from './pages/Index';
import AuthCallback from './pages/AuthCallback';
import AuthError from './pages/AuthError';
// MODULE_IMPORTS_START
// MODULE_IMPORTS_END

const queryClient = new QueryClient();

const routerBasename =
  import.meta.env.BASE_URL === '/'
    ? '/'
    : import.meta.env.BASE_URL.replace(/\/$/, '');

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />

    {/* Blog routes */}
    {/* <Route path="/blog/*" element={<BlogRoutes />} /> */}

    <Route
      path="/auth/callback"
      element={<AuthCallback />}
    />

    <Route
      path="/auth/error"
      element={<AuthError />}
    />

    {/* MODULE_ROUTES_START */}
    {/* MODULE_ROUTES_END */}

    {/* Unknown routes return to the Kaarox homepage */}
    <Route
      path="*"
      element={<Navigate to="/" replace />}
    />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* MODULE_PROVIDERS_START */}
    {/* MODULE_PROVIDERS_END */}

    <TooltipProvider>
      <Toaster />

      <BrowserRouter basename={routerBasename}>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>

    {/* MODULE_PROVIDERS_CLOSE */}
  </QueryClientProvider>
);

export default App;
export { AppRoutes };
