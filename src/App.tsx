import { AuthProvider } from './header-app/contexts/AuthContext';
import ProfileContextProvider from './header-app/contexts/ProfileContext';
import { ToastProvider } from './header-app/hooks/toast';
import { RenderRoutes } from './router/router';
// import { PermissionsProvider } from './contexts/Permissions';
// import { AuthProvider } from './contexts/AuthContext';
// import ProfileContextProvider from './contexts/ProfileContext';

function App() {
  return (
    //     <PermissionsProvider>
    <ProfileContextProvider>
      <AuthProvider>
        <ToastProvider>
          <RenderRoutes />
        </ToastProvider>
      </AuthProvider>
    </ProfileContextProvider>
    //</PermissionsProvider>
  );
}

export default App;
