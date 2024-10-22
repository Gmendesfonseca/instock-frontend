import { AuthProvider } from './header-app/contexts/AuthContext';
import ProfileContextProvider from './header-app/contexts/ProfileContext';
import { ToastProvider } from './header-app/hooks/useToast';
import { RenderRoutes } from './router/router';
// import { PermissionsProvider } from './header-app/contexts/Permissions';

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
