import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, type User } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userId: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    checkUser();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          // Get user profile from our users table
          const { data } = await supabase
            .from('users')
            .select('*')
            .eq('phone_number', session.user.phone)
            .single();

          if (data) {
            setUser(data);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    console.log('AuthContext: Checking user...');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('AuthContext: Session:', session);

      if (session?.user?.phone) {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('phone_number', session.user.phone)
          .single();

        console.log('AuthContext: User data:', data, 'Error:', error);

        if (data) {
          setUser(data);
        }
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      console.log('AuthContext: Loading complete');
      setLoading(false);
    }
  };

  const login = async (userId: string) => {
    try {
      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (data) {
        setUser(data);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
