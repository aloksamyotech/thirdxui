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
    getAllServices: `${baseUrl}/user/getAllServices`,
    getAllVolunteer: `${baseUrl}/user/getAllVolunteer`,
    getalldonor: `${baseUrl}/user/getalldonor`,
    getDistrict: `${baseUrl}/user/getAllUsDistricts`,
    editUser: `${baseUrl}/user/edituser`,
    deleteUser: `${baseUrl}/user/deleteuser`,
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
    updateStatus: `${baseUrl}/tag/updateStatus`
  },
  session: {
    create: `${baseUrl}/session/addSession`,
    filter: `${baseUrl}/session/search`,
    fetch: `${baseUrl}/session/getAllSession`,
    getById: `${baseUrl}/session/getSessionById/:id`,
    update: `${baseUrl}/session/editSession/:id`
  },
  casenote: {
    create: `${baseUrl}/caseNote/add`,
    fetchWithPagination: `${baseUrl}/caseNote/getAllWithPagination`
  },
  attendees: {
    create: `${baseUrl}/attendees/addAttendee`
  }
});
