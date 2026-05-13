import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import RestaurantList from './pages/RestaurantList'
import RestaurantDetail from './pages/RestaurantDetail'
import Quiz from './pages/Quiz'
import QuizResult from './pages/QuizResult'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurants" element={<RestaurantList />} />
            <Route path="/restaurants/:id" element={<RestaurantDetail />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/quiz/result" element={<QuizResult />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
