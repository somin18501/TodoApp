import {Route,Routes} from "react-router-dom"
import './App.css'
import WelcomePage from "./pages/WelcomePage"
import Layout from './Layout'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<WelcomePage/>} />
      </Route>
    </Routes>
  )
}

export default App
