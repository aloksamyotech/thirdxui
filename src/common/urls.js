const baseUrl = 'http://localhost:7200/api/v1';

export const urls = Object.freeze({
  baseUrl,
  configuration: {
    create: `${baseUrl}/config/addconfiguration`,
    fetch: `${baseUrl}/config/getallconfiguration`,
    filterType: `${baseUrl}/config/filterbyconfigurationtype`,
    updateStatus: `${baseUrl}/config/updateconfigurationstatus/:configId`
  },
  serviceuser: {
    create: `${baseUrl}/user/adduser`,
    fetch: `${baseUrl}/user/getalluser`,
    getById: `${baseUrl}/user/getUserById/:userId`,
    getAllServices: `${baseUrl}/user/getAllServices`,
    getAllVolunteer: `${baseUrl}/user/getAllVolunteer`,
    getalldonor: `${baseUrl}/user/getalldonor`
  },
  service: {
    create: `${baseUrl}/services/addServices`,
    fetch: `${baseUrl}/services/getAllServices`
  }
});
