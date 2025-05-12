const baseUrl = 'http://localhost:7200/api/v1';

export const urls = Object.freeze({
  baseUrl,
  configuration: {
    create: `${baseUrl}/config/addconfiguration`,
    fetch: `${baseUrl}/config/getallconfiguration`,
    filterType: `${baseUrl}/config/filter`,
    updateStatus: `${baseUrl}/config/updateconfigurationstatus/:configId`
  },
  serviceuser: {
    create: `${baseUrl}/user/adduser`,
    fetch: `${baseUrl}/user/getalluser`,
    getById: `${baseUrl}/user/getUserById/:userId`,
    getAllServices: `${baseUrl}/user/getAllServices`,
    getAllVolunteer: `${baseUrl}/user/getAllVolunteer`,
    getalldonor: `${baseUrl}/user/getalldonor`,
    getDistrict: `${baseUrl}/user/getAllUsDistricts`,
  },
  service: {
    create: `${baseUrl}/services/addServices`,
    fetch: `${baseUrl}/services/getAllServices`,
    getById: `${baseUrl}/services/getServiceById/:id`,
  },
  case: {
    create: `${baseUrl}/cases/addCase`,
    fetch: `${baseUrl}/cases/getAllCases`,
    delete: `${baseUrl}/cases/deleteCase/:id`,
    filterType: `${baseUrl}/cases/search`,
    getById: `${baseUrl}/cases/getCaseById/:id`,
  },
  mail: {
    create: `${baseUrl}/mail/addmail`,
    fetch: `${baseUrl}/mail/getallmail`,
    filterType: `${baseUrl}/mail/filter`,
  },
  transaction: {
    create: `${baseUrl}/transaction/addtransaction`,
    fetch: `${baseUrl}/transaction/getalltransaction`,
    filterType: `${baseUrl}/transaction/filter`,
  },
  tag:{
    create: `${baseUrl}/tag/addtag`,
  }
});
