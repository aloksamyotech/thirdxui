// assets
import {
  IconHome,
  IconSettingsAutomation,
  IconChartBar,
  IconRefresh,
  IconFileUpload,
  IconFileInvoice,
  IconSettings,
  IconAntennaBars5,
  IconClipboardData,
  IconNotebook,
  IconPhoneCheck,
  IconUser,
  IconMail,
  IconSeeding
} from '@tabler/icons';

// constant
const icons = {
  IconHome,
  IconSettingsAutomation,
  IconChartBar,
  IconRefresh,
  IconFileUpload,
  IconFileInvoice,
  IconSettings,
  IconAntennaBars5,
  IconClipboardData,
  IconNotebook,
  IconPhoneCheck,
  IconUser,
  IconMail,
  IconSeeding
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconHome,
      breadcrumbs: false
    },
    {
      id: '01',
      title: 'People',
      type: 'collapse',
      icon: icons.IconUser,
      children: [
        {
          id: '02',
          parentId: '01',
          title: 'Service Users',
          type: 'item',
          url: '/people',
          breadcrumbs: false,
          role: 'service_user',
          childrenUrls: ['/add-serviceuser', '/view-people']
        },
        {
          id: '03',
          parentId: '01',
          title: 'Volunteers',
          type: 'item',
          url: '/volunteer',
          breadcrumbs: false,
          role: 'volunteer',
          childrenUrls: ['/add-volunteer', '/view-people']
        }
        // {
        //   id: '04',
        //   parentId: '01',
        //   title: 'New Referral',
        //   type: 'item',
        //   url: '/referral',
        //   breadcrumbs: false
        // }
      ]
    },

    {
      id: '05',
      title: 'Services',
      type: 'item',
      url: '/services',
      icon: icons.IconSettingsAutomation,
      breadcrumbs: false,
      childrenUrls: ['/add-service', '/view-service', '/add-session', '/view-session', '/attendees']
    },
    {
      id: '06',
      title: 'Cases',
      type: 'item',
      url: '/case',
      icon: icons.IconFileInvoice,
      breadcrumbs: false,
      childrenUrls: ['/add-case', '/view-case']
    },
    {
      id: '08',
      title: 'Donor Management',
      type: 'collapse',
      icon: icons.IconSeeding,
      children: [
        {
          id: '09',
          parentId: '08',
          title: 'Donors',
          type: 'item',
          url: '/donor',
          breadcrumbs: false,
          childrenUrls: ['/add-donor', '/view-donor', '/add-donorCompany']
        },
        {
          id: '10',
          parentId: '08',
          title: 'Financial',
          type: 'item',
          url: '/financial',
          breadcrumbs: false,
          childrenUrls: ['/add-transaction']
        }
        // {
        //   id: '11',
        //   parentId: '08',
        //   title: 'Mailing Lists',
        //   type: 'item',
        //   url: '/mailing-list',
        //   breadcrumbs: false
        // }
      ]
    },
    {
      id: '07',
      title: 'Mailing List',
      type: 'item',
      url: '/mail',
      icon: icons.IconMail,
      breadcrumbs: false,
      childrenUrls: ['/add-mail']
    },

    {
      id: '12',
      title: 'Forms',
      type: 'collapse',
      icon: icons.IconClipboardData,
      children: [
        {
          id: '13',
          parentId: '12',
          title: 'Manage Form',
          type: 'item',
          url: '/manage-form',
          breadcrumbs: false
        },
        {
          id: '14',
          parentId: '12',
          title: 'Submission',
          type: 'item',
          url: '/submission',
          breadcrumbs: false,
          matchUrls: ['/submission']
        },
        {
          id: '15',
          parentId: '12',
          title: 'History',
          type: 'item',
          url: '/history',
          breadcrumbs: false
        }
      ]
    },
    {
      id: '16',
      title: 'Report',
      type: 'item',
      url: '/report',
      icon: icons.IconChartBar,
      breadcrumbs: false
    },
    {
      id: '17',
      title: 'Data Management',
      type: 'collapse',
      icon: icons.IconRefresh,
      children: [
        {
          id: '18',
          parentId: '17',
          title: 'Bulk Upload',
          type: 'item',
          url: '/bulkupload',
          breadcrumbs: false
        },
        {
          id: '19',
          parentId: '17',
          title: 'Duplicates',
          type: 'item',
          url: '/duplicate',
          breadcrumbs: false
        },
        // {
        //   id: '20',
        //   parentId: '17',
        //   title: 'Bulk Delete',
        //   type: 'item',
        //   url: '/bulkdelete',
        //   breadcrumbs: false
        // },
        {
          id: '22',
          parentId: '17',
          title: 'Lists',
          type: 'item',
          url: '/list',
          breadcrumbs: false
        }
        // {
        //   id: '21',
        //   parentId: '17',
        //   title: 'Archives List',
        //   type: 'item',
        //   url: '/archives',
        //   breadcrumbs: false
        // }
      ]
    },
    {
      id: '23',
      title: 'Configuration',
      type: 'collapse',
      icon: icons.IconSettings,
      children: [
        {
          id: '24',
          parentId: '23',
          title: 'Configuration',
          type: 'item',
          url: '/configuration',
          breadcrumbs: false
        },
        {
          id: '25',
          parentId: '23',
          title: 'Tags',
          type: 'item',
          url: '/tags',
          breadcrumbs: false,
          childrenUrls: ['/add-tag']
        },
        {
          id: '26',
          parentId: '23',
          title: 'Users',
          type: 'item',
          url: '/users',
          breadcrumbs: false,
          childrenUrls: ['/add-user']
        },
        {
          id: '27',
          parentId: '23',
          title: 'Account',
          type: 'item',
          url: '/account',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default dashboard;
