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
    unarchive: `${baseUrl}/user/unarchive`,
    bulkUploadUsers: `${baseUrl}/user/bulkUploadUsers`,
    bulkUploadDonors: `${baseUrl}/user/bulkUploadDonors`
  },
  service: {
    create: `${baseUrl}/services/addServices`,
    deleteService: `${baseUrl}/services/deleteService/`,
    fetch: `${baseUrl}/services/all`,
    fetchWithPagination: `${baseUrl}/services/allwithpagination`,
    getById: `${baseUrl}/services/getServiceById/:id`,
    filterType: `${baseUrl}/services/search`,
    editServices: `${baseUrl}/services/editServices/`,
    toggleArchive: `${baseUrl}/services/toggleArchive/`,
    bulkUpload: `${baseUrl}/services/bulkUpload`
  },
  case: {
    create: `${baseUrl}/cases/addCase`,
    fetch: `${baseUrl}/cases/getAllCases`,
    update: `${baseUrl}/cases/editCase/:id`,
    delete: `${baseUrl}/cases/deleteCase/`,
    filterType: `${baseUrl}/cases/search`,
    getById: `${baseUrl}/cases/getCaseById/:id`,
    getCaseServiceUser: `${baseUrl}/cases/getCaseServiceUser/`,
    fetchWithPagination: `${baseUrl}/cases/allwithpagination`,
    toggleArchive: `${baseUrl}/cases/toggleArchive/:id`,
    bulkUpload: `${baseUrl}/cases/bulkUpload`
  },
  mail: {
    create: `${baseUrl}/mail/addmail`,
    fetch: `${baseUrl}/mail/getallmail`,
    filterType: `${baseUrl}/mail/filter`,
    fetchWithPagination: `${baseUrl}/mail/allwithpagination`,
    fetchMailingListData: `${baseUrl}/mail/getMail`
  },
  transaction: {
    create: `${baseUrl}/transaction/addtransaction`,
    fetch: `${baseUrl}/transaction/getalltransaction`,
    filterType: `${baseUrl}/transaction/filter`,
    fetchWithPagination: `${baseUrl}/transaction/allwithpagination`,
    fetchTransactionById: `${baseUrl}/transaction/transactionbyid`
  },
  comman: {
    getAllTagData: `${baseUrl}/CommanFuntions`
  },
  tagCategory: {
    create: `${baseUrl}/tagCategory`,
    fetchWithPagination: `${baseUrl}/tagCategory/allwithpagination`,
    updateStatus: `${baseUrl}/tagCategory/updateStatus`,
    getById: `${baseUrl}/tagCategory`,
    editTagCategory: `${baseUrl}/tagCategory/edit`
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
    getById: `${baseUrl}/caseNote/getById/:id`,
    update: `${baseUrl}/caseNote/edit/`,
    toggleArchive: `${baseUrl}/caseNote/toggleArchive/`,
    delete: `${baseUrl}/caseNote/delete/`
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
    fetchWithPagination: `${baseUrl}/attendees/getwithpagination`,
    fetch: `${baseUrl}/attendees/getwithpagination`,
    delete: `${baseUrl}/attendees`
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
    getMedia: `${baseUrl}/dashboard/allMedia`,
    getAllTasksWithPagination: `${baseUrl}/dashboard/getAllTasksWithPagination`,
    getAllCasesWithPagination: `${baseUrl}/dashboard/getAllCasesWithPagination`
  },
  login: {
    login: `${baseUrl}/admin/login`,
    register: `${baseUrl}/admin/`,
    getUserProfile: `${baseUrl}/admin/`,
    updateUserById: `${baseUrl}/admin`,
    changePassword: `${baseUrl}/admin/change-password`,
    googleSignin: `${baseUrl}/admin/google-auth`,
    getAllAdmin: `${baseUrl}/admin/getAllAdmin`,
    forgotPassword: `${baseUrl}/admin/forgot-password`,
    otpvarify: `${baseUrl}/admin/verify-otp`,
    resetPassword: `${baseUrl}/admin/reset-password`,
    createConfigUser: `${baseUrl}/admin/create-user`,
    delete: `${baseUrl}/admin/delete/:adminId`,
    getUserswithPagination: `${baseUrl}/admin/allwithpagination`
  },
  bulkFuntions: {
    delete: `${baseUrl}/bulk/delete`,
    archive: `${baseUrl}/bulk/archive`
  },
  timeline: {
    giftaidCreate: `${baseUrl}/giftAid/:id`,
    attendeesCreate: `${baseUrl}/userTimeline/register-attendance/:id`,
    taskCreate: `${baseUrl}/userTimeline/register-task/:id`,
    emailinboundCreate: `${baseUrl}/userTimeline/email-inbound/:id`,
    emailOutboundCreate: `${baseUrl}/userTimeline/email-outbound/:id`,
    phoneinboundCreate: `${baseUrl}/userTimeline/phone-inbound/:id`,
    phoneoutboundCreate: `${baseUrl}/userTimeline/phone-outbound/:id`,
    letterRecivedCreate: `${baseUrl}/userTimeline/letter-received/:id`,
    lettersendCreate: `${baseUrl}/userTimeline/letter-sent/:id`,
    getTimeLineById: `${baseUrl}/userTimeline/`
  },
  duplicate: {
    getallDuplicateUsers: `${baseUrl}/duplicate/getallduplicate`
  },
  list: {
    create: `${baseUrl}/list/addList`,
    fetch: `${baseUrl}/list/getallList`,
    fetchWithPagination: `${baseUrl}/list/allwithpagination`,
    fetchListData: `${baseUrl}/list/getList`,
    assignTagToEntities: `${baseUrl}/list/addBulkTags`
  }
});
