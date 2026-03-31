import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [errorDetails, setErrorDetails] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Memoize submit handler to prevent re-renders
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setErrorDetails('');
    setShowDetails(false);
    setIsLoading(true);

    try {
      console.log('[LoginUI] Starting sign-in process...');
      await signIn(email, password);
      // Successfully logged in - context state updated immediately
      console.log('[LoginUI] Sign-in successful, navigating to /admin');
      navigate('/admin', { replace: true });
    } catch (err: any) {
      console.error('[LoginUI] Sign-in error caught:', err);
      let errorMsg = 'Invalid email or password';
      let details = '';

      // Detailed error handling
      if (err instanceof Error) {
        errorMsg = err.message;
        
        // Catch specific error patterns
        if (err.message.includes('Could not verify admin access')) {
          details = '✓ Email & password correct, but admin check failed. Check console logs. Verify your user ID is in admin_users table.';
        } else if (err.message.includes('not authorized')) {
          details = '✓ Email & password correct, but you do not have admin privileges. Only administrators can access this area.';
        } else if (err.message.includes('Wrong email')) {
          details = '✗ The email or password you entered is incorrect. Please verify and try again.';
        } else if (err.message.includes('network') || err.message.includes('fetch')) {
          details = '✗ Network connection error. Check your internet and verify Supabase URL is correct.';
        } else if (err.message.includes('Supabase') || err.message.includes('RPC')) {
          details = '✗ Server/Database error. Check Supabase project and verify environment variables in Vercel.';
        }
      } else if (typeof err === 'object' && err !== null) {
        // Handle network errors or other fetch errors
        if ('status' in err) {
          errorMsg = `Server Error (${err.status})`;
          details = err.statusText || 'Unable to connect to the server.';
        } else {
          errorMsg = err.toString?.() || 'An unexpected error occurred';
        }
      }

      setError(errorMsg);
      setErrorDetails(details);
      
      toast({
        title: 'Login Failed',
        description: errorMsg,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [email, password, signIn, navigate, toast]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Sign in to manage your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            {error && (
              <div className="space-y-2">
                <div className="text-sm text-destructive bg-destructive/10 p-3 rounded border border-destructive/20">
                  <div className="font-medium">{error}</div>
                  {errorDetails && (
                    <div className="text-xs mt-1 opacity-90">{errorDetails}</div>
                  )}
                </div>
                {errorDetails && (
                  <button
                    type="button"
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-xs text-muted-foreground hover:text-foreground underline"
                  >
                    {showDetails ? 'Hide' : 'Show'} troubleshooting tips
                  </button>
                )}
                {showDetails && (
                  <div className="text-xs bg-muted p-2 rounded space-y-1">
                    <p className="font-medium">🔍 Troubleshooting:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Open browser console (F12) and check for [Auth] logs</li>
                      <li>Verify your email and password are correct</li>
                      <li>Check admin_users table has your user in Supabase</li>
                      <li>Verify Supabase URL Configuration has your domain</li>
                      <li>Clear browser cache and try again</li>
                      <li>Read SUPABASE_CONFIG.md for detailed setup</li>
                    </ul>
                  </div>
                )}
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Don't have an account? Contact the administrator to create one.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
