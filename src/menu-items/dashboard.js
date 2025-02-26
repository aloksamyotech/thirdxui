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
      id: '04',
      title: 'Forms',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconClipboardData,
      breadcrumbs: false
    },
    {
      id: '05',
      title: 'Report',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconChartBar,
      breadcrumbs: false
    },
    {
      id: '06',
      title: 'Configuration',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconSettings,
      breadcrumbs: false
    },
    {
      id: '07',
      title: 'Data Management',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconRefresh,
      breadcrumbs: false
    },
    // {
    //   id: '08',
    //   title: 'Calender',
    //   type: 'item',
    //   url: '/dashboard/calender',
    //   icon: icons.IconCalendarEvent,
    //   breadcrumbs: false
    // },
    // {
    //   id: '09',
    //   title: 'Document Management',
    //   type: 'item',
    //   url: '/dashboard/document',
    //   icon: icons.IconFileUpload,
    //   breadcrumbs: false
    // },
    // {
    //   id: '10',
    //   title: 'Email Template',
    //   type: 'item',
    //   url: '/dashboard/emailtemplate',
    //   icon: icons.IconFileInvoice,
    //   breadcrumbs: false
    // }

    
  ]
};

export default dashboard;
