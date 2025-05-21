// const baseUrl = 'https://thirdex.samyotech.in/api/v1';
// const baseUrl = 'http://139.59.19.212:81/api/v1';
export const imageUrl = 'https://thirdex.samyotech.in/';

const baseUrl = 'http://localhost:7201/api/v1';
// export const imageUrl = 'http://localhost:7200/';

export const urls = Object.freeze({
  baseUrl,
  configuration: {
    create: `${baseUrl}/config/addconfiguration`,
    fetch: `${baseUrl}/config/getallconfiguration`,
    filterType: `${baseUrl}/config/filter`,
    updateStatus: `${baseUrl}/config/updateconfigurationstatus/:configId`,
    delete: `${baseUrl}/config/deleteconfiguration/:configId`,
    updatedData: `${baseUrl}/config/updateConfigurationData/:configId`,
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
    archive:`${baseUrl}/user/archive`,
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
    getById: `${baseUrl}/cases/getCaseById/:id`
  },
  mail: {
    create: `${baseUrl}/mail/addmail`,
    fetch: `${baseUrl}/mail/getallmail`,
    filterType: `${baseUrl}/mail/filter`
  },
  transaction: {
    create: `${baseUrl}/transaction/addtransaction`,
    fetch: `${baseUrl}/transaction/getalltransaction`,
    filterType: `${baseUrl}/transaction/filter`,
     fetchWithPagination:`${baseUrl}/transaction/allwithpagination`,


  },
  tag: {
    create: `${baseUrl}/tag/addtag`
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
  forms: {
    add: `${baseUrl}/forms`,
    getAll: `${baseUrl}/forms/getallforms`
  },
  responses: {
    submit: `${baseUrl}/responses`
  }
});