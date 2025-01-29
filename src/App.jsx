import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useReducer } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";
import Favorites from "./pages/Favorites/Favorites";
import Suggestions from "./pages/Suggestions/Suggestions";
import ParticlesBackground from "./components/ParticlesBackground/ParticlesBackground";
import { gameReducer, initialState } from "./reducers/gameReducer";

export const GameContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      <div className="app">
        <ParticlesBackground />
        <Router>
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/game/:name" element={<Game />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/suggestions" element={<Suggestions />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </div>

      {/* ✅ ToastContainer para mostrar notificaciones */}
      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
    </GameContext.Provider>
  );
};

export default App;
