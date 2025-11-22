import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/scrollTop";
import VisitorTracker from "./components/VisitorTracker";
import Tracker from "./pages/Tracker";
import Media from "./pages/Media";
import Donate from "./pages/Donate";
import Registration from "./pages/Registration";
import NotFound from "./pages/NotFound";
import NewUpdates from "./pages/New-Updates";
import Policies from "./pages/Policies";
import Docs from "./pages/Docs";
import Profiles from "./pages/Profiles";
import Testimonials from "./pages/Testimonials";
// import AdminDashboard etc later

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      <Toaster
        position="top-right"
        toastOptions={{
          success: { style: { background: "#D1FAE5", color: "#065F46" } },
          error: { style: { background: "#FEE2E2", color: "#991B1B" } },
        }}
      />
      <VisitorTracker />

      {!isAdminRoute && <Navbar />}
      <main className="min-h-screen bg-cream pt-20">
        <AppRoutes />
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/tracker" element={<Tracker />} />
      <Route path="/media" element={<Media />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/get-involved" element={<Registration />} />
      <Route path="/news-updates" element={<NewUpdates />} />
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/policies"element={<Policies />} />
      <Route path="/document-center" element={<Docs />} />
      <Route path="/profiles" element={<Profiles />} />
      {/* Admin Routes can be added here later */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
