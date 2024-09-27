import { ProtectedRoute } from "./assets/services/protectedRoute";
import Hero from "./components/Hero"
import ProfileCard from "./components/ProfileCard";
import { useAuth } from "./context/authContext"

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated ?
        <ProtectedRoute>
          <ProfileCard />
        </ProtectedRoute>
        :
        <Hero />
      }
    </>
  )
}

export default App
