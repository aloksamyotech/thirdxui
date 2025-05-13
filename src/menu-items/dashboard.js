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
  IconMail,IconSeeding
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
  IconMail,IconSeeding
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
          title: 'Service Users',
          type: 'item',
          url: '/people',
          breadcrumbs: false
        },
        {
          id: '03',
          title: 'Volunteers',
          type: 'item',
          url: '/volunteer',
          breadcrumbs: false
        },
        {
          id: '04',
          title: 'New Referral',
          type: 'item',
          url: '/referral',
          breadcrumbs: false
        }
      ]
    },
    {
      id: '05',
      title: 'Services',
      type: 'item',
      url: '/services',
      icon: icons.IconSettingsAutomation,
      breadcrumbs: false
    },
    {
      id: '06',
      title: 'Cases',
      type: 'item',
      url: '/case',
      icon: icons.IconFileInvoice,
      breadcrumbs: false
    },
    {
      id: '07',
      title: 'Mailing List',
      type: 'item',
      url: '/mail',
      icon: icons.IconMail,
      breadcrumbs: false
    },
    {
      id: '08',
      title: 'Donor Management',
      type: 'collapse',
      icon: icons.IconSeeding,
      children: [
        {
          id: '09',
          title: 'Donor',
          type: 'item',
          url: '/donor',
          breadcrumbs: false
        },
        {
          id: '10',
          title: 'Financial',
          type: 'item',
          url: '/financial',
          breadcrumbs: false
        },
        {
          id: '11',
          title: 'Mailing Lists',
          type: 'item',
          url: '/mailing-list',
          breadcrumbs: false
        }
      ]
    },

    {
      id: '12',
      title: 'Forms',
      type: 'collapse',
      icon: icons.IconClipboardData,
      children: [
        {
          id: '13',
          title: 'Manage Form',
          type: 'item',
          url: '/manage-form',
          breadcrumbs: false
        },
        {
          id: '14',
          title: 'Submission',
          type: 'item',
          url: '/submission',
          breadcrumbs: false
        },
        {
          id: '15',
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
          title: 'Bulk Upload',
          type: 'item',
          url: '/bulkupload',
          breadcrumbs: false
        },
        {
          id: '19',
          title: 'Duplicate',
          type: 'item',
          url: '/duplicate',
          breadcrumbs: false
        },
        {
          id: '20',
          title: 'Bulk Delete',
          type: 'item',
          url: '/bulkdelete',
          breadcrumbs: false
        },
        {
          id: '21',
          title: 'Archives',
          type: 'item',
          url: '/archives',
          breadcrumbs: false
        }
      ]
    },
    {
      id: '22',
      title: 'Configuration',
      type: 'collapse',
      icon: icons.IconSettings,
      children: [
        {
          id: '23',
          title: 'Configuration',
          type: 'item',
          url: '/configuration',
          breadcrumbs: false
        },
        {
          id: '24',
          title: 'Tags',
          type: 'item',
          url: '/tags',
          breadcrumbs: false
        },
        {
          id: '25',
          title: 'Users',
          type: 'item',
          url: '/users',
          breadcrumbs: false
        },
        {
          id: '26',
          title: 'Account',
          type: 'item',
          url: '/account',
          breadcrumbs: false
        }
      ]
    },
  ]
};

export default dashboard;
