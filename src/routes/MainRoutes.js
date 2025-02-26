import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const PeopleManagement = Loadable(lazy(() => import('views/People')));
const ContactManagement = Loadable(lazy(() => import('views/Service')));
const Call = Loadable(lazy(() => import('views/Calls')));
const Case = Loadable(lazy(() => import('views/Case')));
const Metting = Loadable(lazy(() => import('views/Metting')));
const Mail = Loadable(lazy(() => import('views/Mail')));
const NewReferral = Loadable(lazy(() => import('views/NewReferral')));
const EmailTemplates = Loadable(lazy(() => import('views/EmailTemplates')));
const Document = Loadable(lazy(() => import('views/Documents')));
const Calender = Loadable(lazy(() => import('views/Calender')));
const AddTemplates = Loadable(lazy(() => import('views/EmailTemplates/AddTemplates')));

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
    // {
    //   path: 'dashboard',
    //   children: [
    //     {
    //       path: 'policy',
    //       element: <Policy />
    //     }
    //   ]
    // },
    // {
    //   path: 'dashboard',
    //   children: [
    //     {
    //       path: 'policy',
    //       element: <Policy />
    //     }
    //   ]
    // },
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
          path: 'emailtemplate',
          element: <EmailTemplates />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'emailtemplate/addTemplates',
          element: <AddTemplates />
        }
      ]
    }
  ]
};

export default MainRoutes;
