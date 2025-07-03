import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';

const riskFactors = [
  'Special Educational Needs (SEN)',
  'Offending history',
  'CAHMS',
  'Mental health issues',
  'Criminal or Sexual Exploitation (CRE/ CSE)',
  'Risk of offending',
  'Experience of DV',
  'School exclusion (temp or perm)',
  'Substance Misuse',
  'Social Services',
  'Poor school Attendance and engagement'
];

const KeyIndicatorsList = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: 'label', headerName: 'Key Indicator of Concern', flex: 1 },
    { field: 'count', headerName: 'Count of People', width: 160 }
  ];

  const CustomToolbar = () => (
    <GridToolbarContainer sx={{ justifyContent: 'space-between', p: 1 }}>
      <Typography sx={{ fontWeight: 600, fontSize: '16px' }}>Key Indicators List</Typography>
      <GridToolbarExport />
    </GridToolbarContainer>
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getApi(urls.serviceuser.getAllServicesUser);
        const allUsers = response?.data?.allUser || [];

        const riskCountMap = {};
        riskFactors.forEach((factor) => {
          riskCountMap[factor] = 0;
        });

        allUsers.forEach((user) => {
          const risks = user?.riskAssessment?.keyIndicators || [];
          risks.forEach((risk) => {
            const trimmed = risk.trim();
            if (Object.prototype.hasOwnProperty.call(riskCountMap, trimmed)) {
              riskCountMap[trimmed]++;
            }
          });
        });

        const formattedData = riskFactors.map((label, index) => ({
          id: index + 1,
          label,
          count: riskCountMap[label] || 0
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
        loading={loading}
        checkboxSelection
        disablePagination
        hideFooter
        autoHeight
        slots={{ toolbar: CustomToolbar }}
        sx={{
          border: 'none'
        }}
      />
    </Box>
  );
};

export default KeyIndicatorsList;
