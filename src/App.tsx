import { AuthProvider } from './header-app/contexts/AuthContext';
import ProfileContextProvider from './header-app/contexts/ProfileContext';
import { RenderRoutes } from './router/router';
// import { PermissionsProvider } from './contexts/Permissions';

function App() {
  return (
    //     <PermissionsProvider>
    <ProfileContextProvider>
      <AuthProvider>
        <RenderRoutes />
      </AuthProvider>
    </ProfileContextProvider>
    //</PermissionsProvider>
  );
}

export default App;
