import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Mock user data for demonstration
    const mockUserData = {
      ...userData,
      name: userData.name || 'John Doe',
      bio: 'Passionate developer with expertise in web technologies',
      skills: ['JavaScript', 'React', 'Node.js', 'Python'],
      experience: 'Senior Developer at Tech Corp (2020-Present)',
      education: 'B.Tech in Computer Science',
      location: 'New York, USA',
      phone: '+1 234 567 8900',
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      website: 'https://johndoe.dev'
    };
    setUser(mockUserData);
    localStorage.setItem('user', JSON.stringify(mockUserData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Check for stored user data on initial load
  useState(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 