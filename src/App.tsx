import { RenderRoutes } from './router/router';
// import { PermissionsProvider } from './contexts/Permissions';
// import { AuthProvider } from './contexts/AuthContext';
// import ProfileContextProvider from './contexts/ProfileContext';

function App() {
  return (
    // <AuthProvider>
    //   <ProfileContextProvider>
    //     <PermissionsProvider>
    <RenderRoutes />
    //     </PermissionsProvider>
    //   </ProfileContextProvider>
    // </AuthProvider>
  );
}

export default App;
