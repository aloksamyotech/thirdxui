const baseUrl = 'http://localhost:7200/api/v1';

export const urls = Object.freeze({
  baseUrl,
  configuration: {
    create: `${baseUrl}/config/addconfiguration`,
    fetch: `${baseUrl}/config/getallconfiguration`,
    filterType: `${baseUrl}/config/filterbyconfigurationtype`,
    updateStatus: `${baseUrl}/config/updateconfigurationstatus/:configId`,
  },
  serviceuser: {
    create: `${baseUrl}/user/adduser`,
    fetch: `${baseUrl}/config/getalluser`,
    getById: `${baseUrl}/config/getUserById/:userId`,
  }
});
