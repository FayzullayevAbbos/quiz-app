
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import StartQuiz from './pages/StartQuiz'
import CreateQuiz from './pages/CreateQuiz'

function App() {
    
  const router = createBrowserRouter([
    {
      element:<Home/>,
      path:'/'
    },
    {
      element:<StartQuiz/>,
      path:"/start"
    },
    {
      element:<CreateQuiz/>,
      path:'/create'
    }

  ])

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
