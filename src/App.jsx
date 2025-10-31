import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Collection from "./components/Collection";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// App with React Router
function App() {
  return (
    <Router>
      <Layout>
        <div className="w-full py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Layout>
    </Router>
  );
}

export default App;
