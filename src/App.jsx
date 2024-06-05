import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Landing } from "./pages/Index";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { Analytics } from "./pages/Analytics";
import { Admin } from "./pages/Admin";
import { ProtectedRoute } from "./components/protectedRoute";
import { useState } from "react";

function App() {

  const [user, setUser] = useState(null)

  const login = () => {
    // luego de hacer la petición al servidor y todo haya ido bien
    setUser({
      id: 1,
      name: "Valeria",
      permissions: ['analize'],
      rol: ['Admin']
    })
  }

  const logout = () => setUser(null)
  

  return (
    <>
      <BrowserRouter>

      <Navigation/>
        {
          user ? (
            
            <button onClick={logout}>Logout</button>
          ) : (
            <button onClick={login}>Login</button>
          )
        }

        <Routes>
          <Route index element={<Landing />} />
          <Route path="/" element={<Landing/>} />

          <Route element={<ProtectedRoute isAllowed={!!user}/>}>
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>         

          <Route path="/analytics" element={
            <ProtectedRoute 
              isAllowed={!!user && user.permissions.includes('analize')} 
              redirectTo="/home" >
              <Analytics />
            </ProtectedRoute>
          } />
          
          <Route path="/admin" element={
            <ProtectedRoute
              isAllowed={!!user && user.rol.includes('Admin')}
              redirectTo="/home"
            >
              <Admin/>
            </ProtectedRoute>
          } />

        </Routes>
      </BrowserRouter>
    </>
  )
}

function Navigation() {
  return(

  <nav>
      <ul>
        <li>
          <Link to="">Landing</Link>
        </li>
        <li>
          <Link to="home">Home</Link>
        </li>
        <li>
          <Link to="dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="analytics">Analytics</Link>
        </li>
        <li>
          <Link to="admin">Admin</Link>
        </li>
      </ul>
    </nav>

  )
  

  
}


export default App
