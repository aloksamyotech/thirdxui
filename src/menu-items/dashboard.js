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
  IconUser
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
  IconUser
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
      id: 'people',
      title: 'People',
      type: 'collapse',
      icon: icons.IconUser,
      children: [
        {
          id: 'all-service-users',
          title: 'All Service Users',
          type: 'item',
          url: '/dashboard/people',
          breadcrumbs: false
        },
        {
          id: 'mailing-list',
          title: 'Mailing List',
          type: 'item',
          url: '/dashboard/mail',
          breadcrumbs: false
        },
        {
          id: 'new-referral',
          title: 'New Referral',
          type: 'item',
          url: '/dashboard/referral',
          breadcrumbs: false
        }
      ]
    },
    {
      id: '02',
      title: 'Services',
      type: 'item',
      url: '/dashboard/services',
      icon: icons.IconSettingsAutomation,
      breadcrumbs: false
    },
    {
      id: '03',
      title: 'Cases',
      type: 'item',
      url: '/dashboard/case',
      icon: icons.IconFileInvoice,
      breadcrumbs: false
    },
    {
      id: 'forms',
      title: 'Forms',
      type: 'collapse',
      icon: icons.IconClipboardData,
      children: [
        {
          id: 'manage-form',
          title: 'Manage Form',
          type: 'item',
          url: '/dashboard/manage-form',
          breadcrumbs: false
        },
        {
          id: 'appearance',
          title: 'Appearance',
          type: 'item',
          url: '/dashboard/appearance',
          breadcrumbs: false
        },
        {
          id: 'history',
          title: 'History',
          type: 'item',
          url: '/dashboard/history',
          breadcrumbs: false
        }
      ]
    },
    {
      id: '05',
      title: 'Report',
      type: 'item',
      url: '/dashboard/report',
      icon: icons.IconChartBar,
      breadcrumbs: false
    },
    {
      id: 'configuration',
      title: 'Configuration',
      type: 'collapse',
      icon: icons.IconSettings,
      children: [
        {
          id: 'configuration',
          title: 'Configuration',
          type: 'item',
          url: '/dashboard/configuration',
          breadcrumbs: false
        },
        {
          id: 'tags',
          title: 'Tags',
          type: 'item',
          url: '/dashboard/tags',
          breadcrumbs: false
        },
        {
          id: 'users',
          title: 'Users',
          type: 'item',
          url: '/dashboard/users',
          breadcrumbs: false
        },
        {
          id: 'account',
          title: 'Account',
          type: 'item',
          url: '/dashboard/account',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'data',
      title: 'Data Management',
      type: 'collapse',
      icon: icons.IconRefresh,
      children: [
        {
          id: 'bulkupload',
          title: 'Bulk Upload',
          type: 'item',
          url: '/dashboard/bulkupload',
          breadcrumbs: false
        },
        {
          id: 'duplicate',
          title: 'Duplicate',
          type: 'item',
          url: '/dashboard/duplicate',
          breadcrumbs: false
        },
        {
          id: 'bulkdelete',
          title: 'Bulk Delete',
          type: 'item',
          url: '/dashboard/bulkdelete',
          breadcrumbs: false
        },
        {
          id: 'archives',
          title: 'Archives',
          type: 'item',
          url: '/dashboard/archives',
          breadcrumbs: false
        }
      ]
    },
  ]
};

export default dashboard;
