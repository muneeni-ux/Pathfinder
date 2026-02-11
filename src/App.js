import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import CustomToaster from "./components/CustomToaster";
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
import Club from "./pages/Club";
import Programs from "./pages/Programs";
import Testimonials from "./pages/Testimonials";
import ViewMore from "./pages/ViewMore";
// Admin Imports
import AdminLogin from "./Admin/AdminLogin";
import ProtectedRoute from "./Admin/ProtectedRoute";
import AdminDashboard from "./Admin/AdminDashboard";
import UsersDetails from "./Admin/UserDetails";
import ManageRegistration from "./Admin/ManageRegistration";
import ManageTracker from "./Admin/ManageTracker";
import ManageNewsUpdates from "./Admin/ManageNewsUpdates";
import ManageDonations from "./Admin/ManageDonations";
import ManageDocs from "./Admin/ManageDocs";
import ManageMedia from "./Admin/ManageMedia";
import ManageTestimonials from "./Admin/ManageTestimonials";
import ManageProfiles from "./Admin/ManageProfiles";
import ManageThemes from "./Admin/ManageThemes";
// import AdminDashboard etc later

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      <CustomToaster />
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
      <Route path="/programs" element={<Programs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/tracker" element={<Tracker />} />
      <Route path="/media" element={<Media />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/get-involved" element={<Registration />} />
      <Route path="/news-updates" element={<NewUpdates />} />
      <Route path="/view-more/:id" element={<ViewMore />} />
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/policies" element={<Policies />} />
      <Route path="/document-center" element={<Docs />} />
      <Route path="/profiles" element={<Profiles />} />
      <Route path="/clubs" element={<Club />} />
      <Route path="*" element={<NotFound />} />

      {/* Admin routes */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard/*"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="visitors" replace />} />
        <Route path="visitors" element={<UsersDetails />} />
        <Route path="registration" element={<ManageRegistration />} />
        <Route path="tracker" element={<ManageTracker />} />
        <Route path="news-updates" element={<ManageNewsUpdates />} />
        <Route path="donations" element={<ManageDonations />} />
        <Route path="resources" element={<ManageDocs />} />
        <Route path="media" element={<ManageMedia />} />
        <Route path="testimonials" element={<ManageTestimonials />} />
        <Route path="leaders" element={<ManageProfiles />} />
        <Route path="honor-themes" element={<ManageThemes />} />
        <Route path="*" element={<Navigate to="visitors" replace />} />
      </Route>
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
