import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  user: any;
  isAdmin: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Cache admin status with TTL (5 minutes)
const ADMIN_CACHE_KEY = 'admin_cache';
const ADMIN_CACHE_TTL = 5 * 60 * 1000;

const getCachedAdminStatus = (userId: string): boolean | null => {
  try {
    const cached = localStorage.getItem(`${ADMIN_CACHE_KEY}_${userId}`);
    if (cached) {
      const { isAdmin, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < ADMIN_CACHE_TTL) {
        return isAdmin;
      }
    }
  } catch {}
  return null;
};

const setCachedAdminStatus = (userId: string, isAdmin: boolean) => {
  try {
    localStorage.setItem(`${ADMIN_CACHE_KEY}_${userId}`, JSON.stringify({
      isAdmin,
      timestamp: Date.now()
    }));
  } catch {}
};

const clearAdminCache = (userId: string) => {
  try {
    localStorage.removeItem(`${ADMIN_CACHE_KEY}_${userId}`);
  } catch {}
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const checkingAdminRef = useRef<Promise<boolean> | null>(null);

  // Optimized admin check with caching and deduplication
  const checkAdminStatus = async (userId: string): Promise<boolean> => {
    // Check cache first
    const cached = getCachedAdminStatus(userId);
    if (cached !== null) {
      return cached;
    }

    // Deduplicate concurrent requests
    if (checkingAdminRef.current) {
      return checkingAdminRef.current;
    }

    // Make the query
    checkingAdminRef.current = (async () => {
      try {
        const { data } = await supabase
          .from('admin_users')
          .select('user_id')
          .eq('user_id', userId)
          .eq('is_active', true)
          .maybeSingle();
        
        const isAdminUser = !!data;
        setCachedAdminStatus(userId, isAdminUser);
        return isAdminUser;
      } finally {
        checkingAdminRef.current = null;
      }
    })();

    return checkingAdminRef.current;
  };

  useEffect(() => {
    let isMounted = true;

    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!isMounted) return;

        setSession(session);
        
        if (session?.user) {
          setUser(session.user);
          const adminStatus = await checkAdminStatus(session.user.id);
          if (isMounted) {
            setIsAdmin(adminStatus);
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;

        setSession(session);
        
        if (session?.user) {
          setUser(session.user);
          const adminStatus = await checkAdminStatus(session.user.id);
          if (isMounted) {
            setIsAdmin(adminStatus);
          }
        } else {
          setUser(null);
          setIsAdmin(false);
        }
      }
    );

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    // Step 1: Authenticate with password
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error("Wrong email or password");
    }

    const authUser = data.user;
    if (!authUser) {
      throw new Error("Login failed");
    }

    // Step 2: Verify admin access
    const { data: adminRow, error: adminError } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", authUser.id)
      .maybeSingle();

    if (adminError) {
      throw new Error("Could not verify admin access");
    }

    if (!adminRow) {
      throw new Error("You are not authorized to access admin");
    }

    // Step 3: Immediately update context state (don't wait for listener)
    setSession(data.session);
    setUser(authUser);
    setIsAdmin(true);
    setCachedAdminStatus(authUser.id, true);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    if (user?.id) {
      clearAdminCache(user.id);
    }
    
    setSession(null);
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        user,
        isAdmin,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
