import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Dashboard from './pages/admin/dashboard';
import Trainers from './pages/admin/trainers';
import CourseDetail from './pages/CourseDetail';
import RegistrationForm from './pages/RegistrationForm';
import PaymentPage from './pages/PaymentPage';
import NotFound from './pages/NotFound';
import Legal from './pages/Legal';
import CookieConsent from './components/CookieConsent';
import Login from './pages/Login';
import Exercises from './pages/Exercises';
import AdminExercises from './pages/admin/Exercises';
import Registrations from './pages/admin/Registrations';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/login" element={<Login />} />
          <Route path="/legal" element={<Legal />} />
          
          {/* Админские маршруты */}
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/trainers" element={<Trainers />} />
          <Route path="/admin/exercises" element={<AdminExercises />} />
          <Route path="/admin/registrations" element={<Registrations />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default App;