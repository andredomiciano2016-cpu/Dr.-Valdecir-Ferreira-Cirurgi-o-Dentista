import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Scheduling from './pages/Scheduling';
import Feedback from './pages/Feedback';
import ServiceDetail from './pages/ServiceDetail';
import Blog from './pages/Blog';
import BlogPostDetail from './pages/BlogPostDetail';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agendamento" element={<Scheduling />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/servico/:id" element={<ServiceDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPostDetail />} />
        {/* Support the literal .html extension if requested */}
        <Route path="/agendamento.html" element={<Scheduling />} />
        <Route path="/agendamento-odonto.html" element={<Scheduling />} />
      </Routes>
    </Router>
  );
}
