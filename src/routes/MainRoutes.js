import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const PeopleManagement = Loadable(lazy(() => import('views/People')));
const ContactManagement = Loadable(lazy(() => import('views/Service')));
const ManageForm = Loadable(lazy(() => import('views/ManageForm')));
const History = Loadable(lazy(() => import('views/History')));
const Case = Loadable(lazy(() => import('views/Case')));
const Metting = Loadable(lazy(() => import('views/Metting')));
const Mail = Loadable(lazy(() => import('views/Mail')));
const NewReferral = Loadable(lazy(() => import('views/NewReferral')));
const Configuration = Loadable(lazy(() => import('views/Configuration')));
const Document = Loadable(lazy(() => import('views/Documents')));
const Calender = Loadable(lazy(() => import('views/Calender')));
const Report = Loadable(lazy(() => import('views/Report')));
const AddTemplates = Loadable(lazy(() => import('views/EmailTemplates/AddTemplates')));
const BulkUpload = Loadable(lazy(() => import('views/BulkUpload')));
const BulkDelete = Loadable(lazy(() => import('views/BulkDelete')));
const Archives = Loadable(lazy(() => import('views/Archives')));
const Duplicate = Loadable(lazy(() => import('views/Duplicate')));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'people',
          element: <PeopleManagement />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'services',
          element: <ContactManagement />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'case',
          element: <Case />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'manage-form',
          element: <ManageForm />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'appearance',
          element: <ManageForm />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'history',
          element: <History />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'referral',
          element: <NewReferral />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'mail',
          element: <Mail />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'meeting',
          element: <Metting />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'calender',
          element: <Calender />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'document',
          element: <Document />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'configuration',
          element: <Configuration />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'tags',
          element: <Configuration />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'users',
          element: <Configuration />
        }
      ]
    },
     {
      path: 'dashboard',
      children: [
        {
          path: 'account',
          element: <Configuration />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'report',
          element: <Report />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'bulkupload',
          element: <BulkUpload />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'duplicate',
          element: <Duplicate />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'archives',
          element: <Archives />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'bulkdelete',
          element: <BulkDelete />
        }
      ]
    }
  ]
};

export default MainRoutes;
