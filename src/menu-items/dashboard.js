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
          url: '/dashboard/people',
          breadcrumbs: false
        },
        {
          id: '03',
          title: 'Volunteers',
          type: 'item',
          url: '/dashboard/volunteer',
          breadcrumbs: false
        },
        {
          id: '04',
          title: 'New Referral',
          type: 'item',
          url: '/dashboard/referral',
          breadcrumbs: false
        }
      ]
    },
    {
      id: '05',
      title: 'Services',
      type: 'item',
      url: '/dashboard/services',
      icon: icons.IconSettingsAutomation,
      breadcrumbs: false
    },
    {
      id: '06',
      title: 'Cases',
      type: 'item',
      url: '/dashboard/case',
      icon: icons.IconFileInvoice,
      breadcrumbs: false
    },
    {
      id: '07',
      title: 'Mailing List',
      type: 'item',
      url: '/dashboard/mail',
      icon: icons.IconMail,
      breadcrumbs: false
    },
    {
      id: '08',
      title: 'Forms',
      type: 'collapse',
      icon: icons.IconClipboardData,
      children: [
        {
          id: '09',
          title: 'Manage Form',
          type: 'item',
          url: '/dashboard/manage-form',
          breadcrumbs: false
        },
        {
          id: '10',
          title: 'Submission',
          type: 'item',
          url: '/dashboard/appearance',
          breadcrumbs: false
        },
        {
          id: '11',
          title: 'History',
          type: 'item',
          url: '/dashboard/history',
          breadcrumbs: false
        }
      ]
    },
    {
      id: '12',
      title: 'Report',
      type: 'item',
      url: '/dashboard/report',
      icon: icons.IconChartBar,
      breadcrumbs: false
    },
    {
      id: '13',
      title: 'Donor Management',
      type: 'item',
      url: '/dashboard/report',
      icon: icons.IconSeeding,
      breadcrumbs: false
    },
    {
      id: '14',
      title: 'Data Management',
      type: 'collapse',
      icon: icons.IconRefresh,
      children: [
        {
          id: '15',
          title: 'Bulk Upload',
          type: 'item',
          url: '/dashboard/bulkupload',
          breadcrumbs: false
        },
        {
          id: '16',
          title: 'Duplicate',
          type: 'item',
          url: '/dashboard/duplicate',
          breadcrumbs: false
        },
        {
          id: '17',
          title: 'Bulk Delete',
          type: 'item',
          url: '/dashboard/bulkdelete',
          breadcrumbs: false
        },
        {
          id: '18',
          title: 'Archives',
          type: 'item',
          url: '/dashboard/archives',
          breadcrumbs: false
        }
      ]
    },
    {
      id: '19',
      title: 'Configuration',
      type: 'collapse',
      icon: icons.IconSettings,
      children: [
        {
          id: '20',
          title: 'Configuration',
          type: 'item',
          url: '/dashboard/configuration',
          breadcrumbs: false
        },
        {
          id: '21',
          title: 'Tags',
          type: 'item',
          url: '/dashboard/tags',
          breadcrumbs: false
        },
        {
          id: '22',
          title: 'Users',
          type: 'item',
          url: '/dashboard/users',
          breadcrumbs: false
        },
        {
          id: '23',
          title: 'Account',
          type: 'item',
          url: '/dashboard/account',
          breadcrumbs: false
        }
      ]
    },
  ]
};

export default dashboard;
