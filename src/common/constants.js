export const SUBROLES = {
  INDIVIDUAL: 'donar_individual',
  COMPANY: 'donar_company',
  GROUP: 'donar_group'
};

export const ROLES = {
  SERVICE_USER: 'service_user',
  USER: 'user',
  DONOR: 'donor',
  VOLUNTEER: 'volunteer'
};

export const entityTypeMap = {
    'Service user': 'service_user',
    Volunteer: 'volunteer',
    Service: 'services',
    Case: 'cases',
    Donor: 'donor',
    'Mailing List': 'mailing_list',
    Donation: 'donation',
    Form: 'form'
  };
export const sessionNames = [
    { value: 'sessionA', label: 'Session A' },
    { value: 'sessionB', label: 'Session B' }
  ];
export const listTypeFilter = [
    { value: 'Service user', label: 'Service user' },
    { value: 'Volunteer', label: 'Volunteer ' },
    { value: 'Service', label: 'Service ' },
    { value: 'Case', label: 'Case' },
    { value: 'Donor', label: 'Donor' },
    { value: 'Mailing List', label: 'Mailing List' },
    { value: 'Donation', label: 'Donation' },
    { value: 'Form', label: 'Form' }
  ];
export const ethnicityOptions = [
  'Arabic or North African',
  'Asian or Asian British – Indian',
  'Asian – Pakistani',
  'Asian – Bangladeshi',
  'Asian – Any other Asian background',
  'Black – Caribbean',
  'Black – African',
  'Black – Any other Black background',
  'Mixed – White and Black Caribbean',
  'Mixed – White and Black African',
  'Mixed – White and Asian',
  'Mixed – Other',
  'Chinese',
  'White – British',
  'White – Irish',
  'White – Other',
  'Unknown'
];

export const stateStyles = [
  { color: '#E9B867', icon: '?' },
  { color: '#7CBD71', icon: '✓' },
  { color: '#CE655D', icon: '✕' }
];

export const districts = [
  { label: 'Adur and Worthing Borough', value: 'adur_worthing_borough' },
  { label: 'Adur District', value: 'adur_district' },
  { label: 'Amber Valley Borough', value: 'amber_valley_borough' },
  { label: 'Arun District', value: 'arun_district' },
  { label: 'Ashford Borough', value: 'ashford_borough' },
  { label: 'Babergh District', value: 'babergh_district' },
  { label: 'Ashfield District', value: 'ashfield_district' },
  { label: 'Basildon Borough', value: 'basildon_borough' }
];

export const contactMethodInitial = {
  Telephone: 0,
  Email: 0,
  Letter: 0,
  SMS: 0,
  Whatsapp: 0
};

export const dateAddedFilters = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'Last 7 Days' },
  { value: 'month', label: 'Last 30 Days' },
  { value: 'year', label: 'Last 1 Year' }
];

export const statusFilter = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' }
];

export const TagCategoryAppliedToOptions = ['Service Users', 'Staff', 'Volunteers', 'Donors'];

export const accountTypes = [
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
];

export const permissionsList = [
    { label: 'People', key: 'people' },
    { label: 'Cases', key: 'cases' },
    { label: 'Services', key: 'services' },
    { label: 'Forms', key: 'forms' },
    { label: 'Donor management', key: 'donorManagement' },
    { label: 'Mailing List', key: 'mailingList' }
];