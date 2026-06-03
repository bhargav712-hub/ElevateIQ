import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const MOCK_USERS = [
  { id: 1, email: 'student@test.com', password: 'test123', name: 'Rahul Verma', role: 'student', avatar: '🎓', enrolledCourses: [1, 2] },
  { id: 2, email: 'trainer@test.com', password: 'test123', name: 'Anita Sharma', role: 'trainer', avatar: '👩‍🏫', assignedCourses: [1, 3] },
  { id: 3, email: 'employee@test.com', password: 'test123', name: 'Vikram Singh', role: 'employee', avatar: '👨‍💼', department: 'Placement' },
  { id: 4, email: 'admin@test.com', password: 'test123', name: 'Dr. Meera Patel', role: 'admin', avatar: '👩‍💻' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('edu_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (email, password) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const found = MOCK_USERS.find(u => u.email === email && u.password === password);
        if (found) {
          const { password: _, ...safeUser } = found;
          setUser(safeUser);
          localStorage.setItem('edu_user', JSON.stringify(safeUser));
          setLoading(false);
          resolve(safeUser);
        } else {
          setLoading(false);
          reject(new Error('Invalid credentials'));
        }
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('edu_user');
  };

  const register = (data) => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { id: Date.now(), ...data, enrolledCourses: [] };
        const { password: _, ...safeUser } = newUser;
        setUser(safeUser);
        localStorage.setItem('edu_user', JSON.stringify(safeUser));
        setLoading(false);
        resolve(safeUser);
      }, 800);
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
