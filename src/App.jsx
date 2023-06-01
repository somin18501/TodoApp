import {Route,Routes} from "react-router-dom"
import './App.css'
import WelcomePage from "./pages/WelcomePage"
import Layout from './Layout'
import MainPage from "./pages/MainPage"
import CompletedPages from "./pages/CompletedPages"
import ImportantPage from "./pages/ImportantPage"

function App() {
  return (
    <Routes>
      <Route index element={<WelcomePage/>} />
      <Route path='/' element={<Layout />}>
        <Route path='/:str' element={<MainPage />}></Route>
        <Route path="/Completed/:str" element = {<CompletedPages/>}></Route>
        <Route path='/Important' element={<ImportantPage />}></Route>
      </Route>
    </Routes>
  )
}

export default App
