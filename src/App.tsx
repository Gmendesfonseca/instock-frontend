import { AuthProvider } from '@/contexts/AuthContext';
import ProfileContextProvider from '@/contexts/ProfileContext';
import { ToastProvider } from '@/hooks/useToast';
import { RenderRoutes } from './router/router';
// import { PermissionsProvider } from '@/contexts/Permissions';

function App() {
  return (
    // <PermissionsProvider>
    <ProfileContextProvider>
      <AuthProvider>
        <ToastProvider>
          <RenderRoutes />
        </ToastProvider>
      </AuthProvider>
    </ProfileContextProvider>
    // </PermissionsProvider>
  );
}

export default App;
