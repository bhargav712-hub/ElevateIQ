import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('edu_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Create a safe user object to store
        const safeUser = {
          id: data.id,
          name: data.name,
          email: data.username, // using username as email based on backend
          role: data.role,
          token: data.token,
          // Assign some default avatars based on role since backend doesn't provide them yet
          avatar: data.role === 'student' ? '🎓' : data.role === 'trainer' ? '👩‍🏫' : data.role === 'employee' ? '👨‍💼' : '👩‍💻'
        };
        setUser(safeUser);
        localStorage.setItem('edu_user', JSON.stringify(safeUser));
        setLoading(false);
        return safeUser;
      } else {
        setLoading(false);
        throw new Error(data.message || 'Invalid credentials');
      }
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('edu_user');
  };

  const register = async (data) => {
    setLoading(true);
    try {
      // Backend expects: name, email, password, role
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role
        }),
      });

      const resData = await response.json();

      if (response.ok) {
        setLoading(false);
        // After registration, we should ideally log them in. 
        // For now, we will just return success. 
        // They will be redirected to login or we can log them in automatically.
        // Let's automatically log them in so it works exactly like the mock!
        return await login(data.email, data.password);
      } else {
        setLoading(false);
        throw new Error(resData.message || 'Registration failed');
      }
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
