const baseUrl = process.env.REACT_APP_BASE_URL;
export const imageUrl = process.env.REACT_APP_IMAGE_URL;

export const urls = Object.freeze({
  baseUrl,
  configuration: {
    create: `${baseUrl}/config/addconfiguration`,
    fetch: `${baseUrl}/config/getallconfiguration`,
    filterType: `${baseUrl}/config/filter`,
    updateStatus: `${baseUrl}/config/updateconfigurationstatus/:configId`,
    delete: `${baseUrl}/config/deleteconfiguration/:configId`,
    updatedData: `${baseUrl}/config/updateConfigurationData/:configId`,
    fetchWithPagination: `${baseUrl}/config/allwithpagination`
  },
  serviceuser: {
    create: `${baseUrl}/user/adduser`,
    fetch: `${baseUrl}/user/getallServiceUser`,
    getAllUser: `${baseUrl}/user/getalluser`,
    getById: `${baseUrl}/user/getUserById/:userId`,
    getAllServicesUser: `${baseUrl}/user/getallServiceUser`,
    getAllVolunteer: `${baseUrl}/user/getAllVolunteer`,
    getalldonor: `${baseUrl}/user/getalldonor`,
    getDistrict: `${baseUrl}/user/getAllUsDistricts`,
    editUser: `${baseUrl}/user/edituser`,
    deleteUser: `${baseUrl}/user/deleteuser/:userId`,
    fetchWithPagination: `${baseUrl}/user/allwithpagination`,
    archive: `${baseUrl}/user/archive`,
    unarchive: `${baseUrl}/user/unarchive`
  },
  service: {
    create: `${baseUrl}/services/addServices`,
    fetch: `${baseUrl}/services/all`,
    fetchWithPagination: `${baseUrl}/services/allwithpagination`,
    getById: `${baseUrl}/services/getServiceById/:id`,
    filterType: `${baseUrl}/services/search`
  },
  case: {
    create: `${baseUrl}/cases/addCase`,
    fetch: `${baseUrl}/cases/getAllCases`,
    delete: `${baseUrl}/cases/deleteCase/:id`,
    filterType: `${baseUrl}/cases/search`,
    getById: `${baseUrl}/cases/getCaseById/:id`,
    fetchWithPagination: `${baseUrl}/cases/allwithpagination`
  },
  mail: {
    create: `${baseUrl}/mail/addmail`,
    fetch: `${baseUrl}/mail/getallmail`,
    filterType: `${baseUrl}/mail/filter`,
    fetchWithPagination: `${baseUrl}/mail/allwithpagination`
  },
  transaction: {
    create: `${baseUrl}/transaction/addtransaction`,
    fetch: `${baseUrl}/transaction/getalltransaction`,
    filterType: `${baseUrl}/transaction/filter`,
    fetchWithPagination: `${baseUrl}/transaction/allwithpagination`
  },
  tag: {
    create: `${baseUrl}/tag/`,
    getAllTags: `${baseUrl}/tag/getalltag`,
    updateStatus: `${baseUrl}/tag/updateStatus`,
    fetchWithPagination: `${baseUrl}/tag/allwithpagination`
  },
  session: {
    create: `${baseUrl}/session/addSession`,
    filter: `${baseUrl}/session/search`,
    fetch: `${baseUrl}/session/getAllSession`,
    getById: `${baseUrl}/session/getSessionById/:id`,
    update: `${baseUrl}/session/editSession/:id`,
    fetchWithPagination: `${baseUrl}/session/allwithpagination`,
    delete: `${baseUrl}/session/deleteSession/:id`,
    archieve: `${baseUrl}/session/archive/:sessionId`,
    unarchive: `${baseUrl}/session/unArchive/:sessionId`
  },
  casenote: {
    create: `${baseUrl}/caseNote/add`,
    fetchWithPagination: `${baseUrl}/caseNote/getAllWithPagination`,
    getById: `${baseUrl}/caseNote//getById/:id`
  },
  forms: {
    add: `${baseUrl}/forms`,
    getAll: `${baseUrl}/forms/getallforms`
  },
  responses: {
    submit: `${baseUrl}/responses`,
    response: `${baseUrl}/responses/responsebyid`
  },
  attendees: {
    create: `${baseUrl}/attendees/addAttendee`,
    getAttendeesBySession: `${baseUrl}/attendees/getattendeeBySession`,
    fetchWithPagination: `${baseUrl}/attendees//getwithpagination`
  },
  dashboard: {
    getTotalDonation: `${baseUrl}/dashboard/totalDonantion`,
    getTotalSession: `${baseUrl}/dashboard/totalSession`,
    getTotalActiveUser: `${baseUrl}/dashboard/totalActiveUser`,
    getTotalOpenedCases: `${baseUrl}/dashboard/totalOpenedCases`,
    getmyTasks: `${baseUrl}/dashboard/getAllTask`,
    createTask: `${baseUrl}/dashboard/createTask`,
    edittask: `${baseUrl}/dashboard/editTask/:id`,
    deleteTask: `${baseUrl}/dashboard/delete/:id`,
    getMedia: `${baseUrl}/dashboard/allMedia`
  },
  login: {
    login: `${baseUrl}/admin/login`,
    register: `${baseUrl}/admin/`,
    getUserProfile: `${baseUrl}/admin/`,
    updateUserById: `${baseUrl}/admin/`,
    changePassword: `${baseUrl}/admin/change-password`,
    googleSignin: `${baseUrl}/admin/google-auth`,
    getAllAdmin: `${baseUrl}/admin/getAllAdmin`,
    forgotPassword: `${baseUrl}/admin/forgot-password`,
    otpvarify: `${baseUrl}/admin/verify-otp`,
    resetPassword: `${baseUrl}/admin/reset-password`
  }
});
