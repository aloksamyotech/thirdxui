// assets
import {
  IconHome,
  IconSettingsAutomation,
  IconMail,
  IconFileUpload,
  IconFileInvoice,
  IconPhoneCall,
  IconAntennaBars5,
  IconChecklist,
  IconNotebook,
  IconPhoneCheck,
  IconUser
} from '@tabler/icons';

// constant
const icons = {
  IconHome,
  IconSettingsAutomation,
  IconMail,
  IconFileUpload,
  IconFileInvoice,
  IconPhoneCall,
  IconAntennaBars5,
  IconChecklist,
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
          url: '/dashboard/lead',
          breadcrumbs: false
        },
        {
          id: 'mailing-list',
          title: 'Mailing List',
          type: 'item',
          url: '/dashboard/lead',
          breadcrumbs: false
        },
        {
          id: 'new-referral',
          title: 'New Referral',
          type: 'item',
          url: '/dashboard/lead',
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
      url: '/dashboard/policy',
      icon: icons.IconFileInvoice,
      breadcrumbs: false
    },
    // {
    //   id: '04',
    //   title: 'Tasks',
    //   type: 'item',
    //   url: '/dashboard/task',
    //   icon: icons.IconChecklist,
    //   breadcrumbs: false
    // },
    // {
    //   id: '05',
    //   title: 'Meeting',
    //   type: 'item',
    //   url: '/dashboard/meeting',
    //   icon: icons.IconUsers,
    //   breadcrumbs: false
    // },
    // {
    //   id: '06',
    //   title: 'Calls',
    //   type: 'item',
    //   url: '/dashboard/call',
    //   icon: icons.IconPhoneCall,
    //   breadcrumbs: false
    // },
    // {
    //   id: '07',
    //   title: 'Emails',
    //   type: 'item',
    //   url: '/dashboard/email',
    //   icon: icons.IconMail,
    //   breadcrumbs: false
    // },
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
