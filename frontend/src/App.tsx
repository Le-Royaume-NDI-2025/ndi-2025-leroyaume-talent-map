import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { TalentListPage } from './pages/TalentListPage';
import { TalentDetailPage } from './pages/TalentDetailPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { MyProfilePage } from './pages/MyProfilePage';
import { AdminTalentsPage } from './pages/AdminTalentsPage';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="talent-map-theme">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="talents" element={<TalentListPage />} />
              <Route path="talents/:id" element={<TalentDetailPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route
                path="me"
                element={
                  <ProtectedRoute>
                    <MyProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/talents"
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminTalentsPage />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;