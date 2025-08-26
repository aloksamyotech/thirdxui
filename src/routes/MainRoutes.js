import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import PrivateRoutes from './PrivateRoute';
import { element } from 'prop-types';
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const PeopleManagement = Loadable(lazy(() => import('views/People')));
const Volunteer = Loadable(lazy(() => import('views/Volunteer')));
const NewReferral = Loadable(lazy(() => import('views/NewReferral')));
const ServiceManagement = Loadable(lazy(() => import('views/Service')));
const Case = Loadable(lazy(() => import('views/Case')));
const Mail = Loadable(lazy(() => import('views/Mail')));
const Donor = Loadable(lazy(() => import('views/Donor')));
const Financial = Loadable(lazy(() => import('views/Financial')));
const MailingList = Loadable(lazy(() => import('views/MailingList')));
const ManageForm = Loadable(lazy(() => import('views/ManageForm')));
const Submission = Loadable(lazy(() => import('views/Submission')));
const History = Loadable(lazy(() => import('views/History')));
const Report = Loadable(lazy(() => import('views/Report')));
const BulkUpload = Loadable(lazy(() => import('views/BulkUpload')));
const Duplicate = Loadable(lazy(() => import('views/Duplicate')));
const BulkDelete = Loadable(lazy(() => import('views/BulkDelete')));
const Archives = Loadable(lazy(() => import('views/Archives')));
const Configuration = Loadable(lazy(() => import('views/Configuration')));
const Tag = Loadable(lazy(() => import('views/Tag')));
const UserAccount = Loadable(lazy(() => import('views/UserAccount')));
const User = Loadable(lazy(() => import('views/User')));
const ViewService = Loadable(lazy(() => import('views/ViewService')));
const ViewServiceUser = Loadable(lazy(() => import('views/ViewServiceUser')));
const AddServiceUser = Loadable(lazy(() => import('views/AddServiceUser')));
const AddUser = Loadable(lazy(() => import('views/AddUser')));
const AddVolunteer = Loadable(lazy(() => import('views/AddVolunteer')));
const AddService = Loadable(lazy(() => import('views/AddService')));
const AddCase = Loadable(lazy(() => import('views/AddCase')));
const AddMail = Loadable(lazy(() => import('views/AddMail')));
const AddDonor = Loadable(lazy(() => import('views/AddDonor')));
const AddDonorCompany = Loadable(lazy(() => import('views/AddDonorCompany')));
const AddTransaction = Loadable(lazy(() => import('views/AddTransaction')));
const AddTag = Loadable(lazy(() => import('views/AddTag')));
const AddSession = Loadable(lazy(() => import('views/AddSession')));
const ViewCase = Loadable(lazy(() => import('views/ViewCase')));
const ViewSession = Loadable(lazy(() => import('views/ViewSession')));
const ViewServices = Loadable(lazy(() => import('views/viewServices')));
const Attendees = Loadable(lazy(() => import('views/Attendees')));
const ViewDonor = Loadable(lazy(() => import('views/ViewDonor')));
const ViewSubmission = Loadable(lazy(() => import('views/ViewSubmission')));
const AboutCase = Loadable(lazy(() => import('views/AboutCase')));
const AboutCaseNote = Loadable(lazy(() => import('views/AboutCaseNote')));
const AddListForm = Loadable(lazy(() => import('views/List/AddList')));
const ListView = Loadable(lazy(() => import('views/List/Listview')));
const List = Loadable(lazy(() => import('views/List')));
const AddConfigUser = Loadable(lazy(() => import('views/AddConfigUser')));
const DuplicatesView = Loadable(lazy(() => import('views/Duplicate/view')));
const ViewMailingListData = Loadable(lazy(() => import('views/ViewMailingListData')));
const ViewTransaction = Loadable(lazy(() => import('views/ViewTransactionInfo')));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <PrivateRoutes />,
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
          path: 'people',
          element: <PeopleManagement />
        },
        {
          path: 'view-people',
          element: <ViewServiceUser />
        },
        {
          path: 'add-serviceuser',
          element: <AddServiceUser />
        },
        {
          path: 'add-user',
          element: <AddUser />
        },
        {
          path: 'add-volunteer',
          element: <AddVolunteer />
        },
        {
          path: 'volunteer',
          element: <Volunteer />
        },
        {
          path: 'referral',
          element: <NewReferral />
        },
        {
          path: 'services',
          element: <ServiceManagement />
        },
        {
          path: 'add-service',
          element: <AddService />
        },
        {
          path: 'case',
          element: <Case />
        },
        {
          path: 'add-case',
          element: <AddCase />
        },
        {
          path: 'mail',
          element: <Mail />
        },
        {
          path: 'add-mail',
          element: <AddMail />
        },
        {
          path: 'donor',
          element: <Donor />
        },
        {
          path: 'add-donor',
          element: <AddDonor />
        },
        {
          path: 'add-donorCompany',
          element: <AddDonorCompany />
        },
        {
          path: 'financial',
          element: <Financial />
        },
        {
          path: 'add-transaction',
          element: <AddTransaction />
        },
        {
          path: 'mailing-list',
          element: <MailingList />
        },
        {
          path: 'manage-form',
          element: <ManageForm />
        },
        {
          path: 'submission',
          element: <Submission />
        },
        {
          path: 'history',
          element: <History />
        },
        {
          path: 'report',
          element: <Report />
        },
        {
          path: 'bulkupload',
          element: <BulkUpload />
        },
        {
          path: 'duplicate',
          element: <Duplicate />
        },
        {
          path: 'bulkdelete',
          element: <BulkDelete />
        },
        {
          path: 'archives',
          element: <Archives />
        },
        {
          path: 'list',
          element: <List />
        },
        {
          path: 'add-list',
          element: <AddListForm />
        },
        {
          path: 'list-view',
          element: <ListView />
        },
        {
          path: 'configuration',
          element: <Configuration />
        },
        {
          path: 'tags',
          element: <Tag />
        },
        {
          path: 'add-tag',
          element: <AddTag />
        },
        {
          path: 'users',
          element: <User />
        },
        {
          path: 'account',
          element: <UserAccount />
        },
        {
          path: 'view-service',
          element: <ViewService />
        },
        {
          path: 'add-session',
          element: <AddSession />
        },
        {
          path: 'view-case',
          element: <ViewCase />
        },
        {
          path: 'view-serviceDetails',
          element: <ViewServices />
        },
        {
          path: 'view-session',
          element: <ViewSession />
        },
        {
          path: 'attendees',
          element: <Attendees />
        },
        {
          path: 'view-donor',
          element: <ViewDonor />
        },
        {
          path: 'submission/:id',
          element: <ViewSubmission />
        },
        {
          path: 'about-case',
          element: <AboutCase />
        },
        {
          path: 'about-case-note',
          element: <AboutCaseNote />
        },
        {
          path: 'add-config-user',
          element: <AddConfigUser />
        },
        {
          path: 'view-duplicates',
          element: <DuplicatesView />
        },
        {
          path: 'view-mailing-data',
          element: <ViewMailingListData />
        },
        {
          path: 'view-transaction',
          element: <ViewTransaction />
        }
      ]
    }
  ]
};

export default MainRoutes;
