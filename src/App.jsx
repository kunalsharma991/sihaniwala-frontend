import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import OurWorkPage from './pages/OurWorkPage';
import ProjectsPage from './pages/ProjectsPage';
import GalleryPage from './pages/GalleryPage';
import VolunteerPage from './pages/VolunteerPage';
import ContactPage from './pages/ContactPage';
import DonatePage from './pages/DonatePage';
import NotFoundPage from './pages/NotFoundPage';
import DonationSuccessPage from './pages/DonationSuccessPage';
import DonationFailurePage from './pages/DonationFailurePage';

// Initiative Pages
import HospitalPage from './pages/initiatives/HospitalPage';
import MarriageSupportPage from './pages/initiatives/MarriageSupportPage';
import WaterSprayPage from './pages/initiatives/WaterSprayPage';
import EducationBPLPage from './pages/initiatives/EducationBPLPage';
import FinancialHelpPage from './pages/initiatives/FinancialHelpPage';
import SchoolAdoptionPage from './pages/initiatives/SchoolAdoptionPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminApplicationsPage from './pages/admin/AdminApplicationsPage';
import AdminDonationsPage from './pages/admin/AdminDonationsPage';
import AdminVolunteersPage from './pages/admin/AdminVolunteersPage';
import AdminGalleryPage from './pages/admin/AdminGalleryPage';
import AdminContactsPage from './pages/admin/AdminContactsPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminProjectsPage from './pages/admin/AdminProjectsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
        <Routes>
          {/* Public Routes with Header/Footer */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/our-work" element={<OurWorkPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/volunteer" element={<VolunteerPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/initiatives/hospital" element={<HospitalPage />} />
            <Route path="/initiatives/marriage-support" element={<MarriageSupportPage />} />
            <Route path="/initiatives/water-spray" element={<WaterSprayPage />} />
            <Route path="/initiatives/education-bpl" element={<EducationBPLPage />} />
            <Route path="/initiatives/financial-help" element={<FinancialHelpPage />} />
            <Route path="/initiatives/school-adoption" element={<SchoolAdoptionPage />} />
          </Route>

          {/* Admin Login (standalone page, no layout) */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Donation result pages (standalone, no layout) */}
          <Route path="/donation-success" element={<DonationSuccessPage />} />
          <Route path="/donation-failure" element={<DonationFailurePage />} />

          {/* Admin Routes (Protected + Admin Only) */}
          <Route path="/admin" element={
            <ProtectedRoute adminOnly>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboardPage />} />
            <Route path="applications" element={<AdminApplicationsPage />} />
            <Route path="donations" element={<AdminDonationsPage />} />
            <Route path="volunteers" element={<AdminVolunteersPage />} />
            <Route path="gallery" element={<AdminGalleryPage />} />
            <Route path="contacts" element={<AdminContactsPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="projects" element={<AdminProjectsPage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
