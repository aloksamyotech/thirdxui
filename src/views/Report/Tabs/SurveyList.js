import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';
import SingleRowLoader from 'ui-component/Loader/SingleRowLoader';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useGridApiContext } from '@mui/x-data-grid';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
const KeyIndicatorsList = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [riskFactors, setRiskFactors] = useState([]);

  const columns = [
    { field: 'label', headerName: 'Key Indicator of Concern', flex: 1 },
    { field: 'count', headerName: 'Count of People', width: 160 }
  ];

  const CustomToolbar = () =>{
 const apiRef = useGridApiContext();

    const handleExportCSV = () => {
      apiRef.current.exportDataAsCsv();
    };

    const handlePrint = () => {
      apiRef.current.exportDataAsPrint();
    };
   return(
      <GridToolbarContainer sx={{ justifyContent: 'space-between', p: 1 }}>
      <Typography sx={{ fontWeight: 600, fontSize: '16px' }}>Key Indicators List</Typography>
       <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <PrintOutlinedIcon sx={{ cursor: 'pointer' }} onClick={handlePrint} />
            <SaveAltOutlinedIcon sx={{ cursor: 'pointer' }} onClick={handleExportCSV} />
            <OpenInNewIcon sx={{ cursor: 'pointer' }} onClick={() => window.open(window.location.href, '_blank')} />
          </Box>
    </GridToolbarContainer>
  );
} 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const configRes = await getApi(urls.configuration.fetch);
        const indicators = configRes?.data?.allConfiguration?.filter((item) => item.configurationType === 'Key Indicators') || [];
        setRiskFactors(indicators);

        const response = await getApi(urls.serviceuser.getAllServicesUser);
        const allUsers = response?.data?.allUser || [];

        const idCountMap = {};
        indicators.forEach((item) => {
          idCountMap[item._id] = 0;
        });

        allUsers.forEach((user) => {
          const selectedIndicators = user?.riskAssessment?.keyIndicators || [];
          selectedIndicators.forEach((id) => {
            if (Object.prototype.hasOwnProperty.call(idCountMap, id)) {
              idCountMap[id]++;
            }
          });
        });

        const formattedData = indicators.map((item, index) => ({
          id: index + 1,
          label: item.name,
          count: idCountMap[item._id] || 0
        }));

        setRows(formattedData);
      } catch (error) {
        console.error('Failed to fetch key indicators:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ p: 2, backgroundColor: '#fff' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disablePagination
        hideFooter
        autoHeight
        slots={{
          toolbar: CustomToolbar,
          loadingOverlay: () => (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'self-start',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.15)'
              }}
            >
              <SingleRowLoader />
            </Box>
          ),
          noRowsOverlay: () => (loading ? null : <Box sx={{ padding: 2, textAlign: 'center' }}>No data available.</Box>)
        }}
        sx={{
          border: 'none'
        }}
      />
    </Box>
  );
};

export default KeyIndicatorsList;
