const baseUrl = 'https://thirdex.samyotech.in/api/v1' ;
export const imageUrl = 'https://thirdex.samyotech.in/';

export const urls = Object.freeze({
  baseUrl,
  configuration: {
    create: `${baseUrl}/config/addconfiguration`,
    fetch: `${baseUrl}/config/getallconfiguration`,
    filterType: `${baseUrl}/config/filter`,
    updateStatus: `${baseUrl}/config/updateconfigurationstatus/:configId`,
    delete :`${baseUrl}/config/deleteconfiguration/:configId`,
    updatedData :`${baseUrl}/config/updateConfigurationData/:configId`,
  },
  serviceuser: {
    create: `${baseUrl}/user/adduser`,
    fetch: `${baseUrl}/user/getalluser`,
    getById: `${baseUrl}/user/getUserById/:userId`,
    getAllServices: `${baseUrl}/user/getAllServices`,
    getAllVolunteer: `${baseUrl}/user/getAllVolunteer`,
    getalldonor: `${baseUrl}/user/getalldonor`,
    getDistrict: `${baseUrl}/user/getAllUsDistricts`,
    editUser:  `${baseUrl}/user/edituser`,
    deleteUser:  `${baseUrl}/user/deleteuser`
  },
  service: {
    create: `${baseUrl}/services/addServices`,
    fetch: `${baseUrl}/services/getAllServices`,
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
    filterType: `${baseUrl}/transaction/filter`
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
  }
});
