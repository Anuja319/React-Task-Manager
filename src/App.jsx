import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import TaskDetails from "./pages/TaskDetails";
import TaskForm from "./pages/TaskForm";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/tasks/:id" element={<TaskDetails />} />

        <Route path="/create" element={<TaskForm />} />

        <Route path="/edit/:id" element={<TaskForm />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
