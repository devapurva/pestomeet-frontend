import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component: any) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          )
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> }
      ]
    },

    // Dashboard Routes
    {
      path: '/',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { path: '/', element: <Navigate to="/dashboard/overview" replace /> },
        { path: '/dashboard', element: <Navigate to="/dashboard/overview" replace /> },
        { path: '/dashboard/overview', element: <GeneralApp /> },
        {
          path: '/dashboard/mentor',
          children: [{ path: '/', element: <MentorList /> }]
        },
        {
          path: '/dashboard/student',
          children: [{ path: '/', element: <StudentList /> }]
        },
        {
          path: '/dashboard/batch',
          children: [{ path: '/', element: <Batches /> }]
        },
        {
          path: '/dashboard/team-mentor',
          children: [{ path: '/', element: <MentorTeams /> }]
        },
        {
          path: '/dashboard/buddy-pairing',
          children: [{ path: '/', element: <BuddyPairing /> }]
        },
        { path: '/dashboard/calendar', element: <Calendar /> }
      ]
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'maintenance', element: <Maintenance /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const Register = Loadable(lazy(() => import('../pages/authentication/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/authentication/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/authentication/VerifyCode')));
// Dashboard
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const StudentList = Loadable(lazy(() => import('../pages/dashboard/StudentList')));
const MentorList = Loadable(lazy(() => import('../pages/dashboard/MentorList')));
const Batches = Loadable(lazy(() => import('../pages/dashboard/Batches')));
const MentorTeams = Loadable(lazy(() => import('../pages/dashboard/MentorTeam')));
const BuddyPairing = Loadable(lazy(() => import('../pages/dashboard/BuddyPairing')));
const Calendar = Loadable(lazy(() => import('../pages/dashboard/Calendar')));
// Main
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
