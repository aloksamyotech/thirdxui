import React from 'react';
import { Grid, Paper, Box, Typography, Chip } from '@mui/material';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import SectionSkeleton from 'ui-component/Loader/SectionSkeleton';
import { useEffect, useState } from 'react';

const CaseTagCard = ({ sessionData, caseId }) => {
  const [loading, setLoading] = useState(true);
  const [groupedTagsArray, setGroupedTagsArray] = useState([]);

  useEffect(() => {
    if (sessionData?.tags?.length > 0) {
      const grouped = (sessionData.tags || []).reduce((acc, tag) => {
        const categoryName = tag?.tagCategoryId?.name || 'Uncategorized';
        if (!acc[categoryName]) {
          acc[categoryName] = [];
        }
        acc[categoryName].push(tag.name);
        return acc;
      }, {});

      const groupedArray = Object.entries(grouped).map(([category, tags]) => ({
        category,
        tags
      }));

      setGroupedTagsArray(groupedArray);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [sessionData]);

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        height: '540px',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '540px'
      }}
    >
      <Box display="flex" alignItems="center" mb={2}>
        <LocalOfferOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
        <Typography variant="subtitle1">Case Tags</Typography>
      </Box>

      <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
        {loading ? (
          <SectionSkeleton lines={4} height={100} spacing={1} />
        ) : groupedTagsArray.length === 0 ? (
          <Typography variant="body2" color="textSecondary">
            No tags found.
          </Typography>
        ) : (
          groupedTagsArray.map((group, idx) => (
            <Box
              key={idx}
              mb={2}
              p={2}
              sx={{
                backgroundColor: '#F7F7F7',
                borderRadius: 1,
                width: '100%'
              }}
            >
              <Box display="flex" alignItems="center" mb={1}>
                <Typography variant="subtitle2">{group.category}</Typography>
              </Box>

              <Box display="flex" flexWrap="wrap" gap={1}>
                {group.tags.map((tag, i) => (
                  <Chip
                    key={i}
                    label={tag}
                    onDelete={() => {}}
                    deleteIcon={
                      <CancelIcon
                        sx={{
                          fontSize: 16,
                          color: '#666'
                        }}
                      />
                    }
                    sx={{
                      backgroundColor: '#009FC7',
                      color: '#fff',
                      height: 28,
                      '& .MuiChip-deleteIcon': {
                        marginLeft: '4px'
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Paper>
    // <Grid item xs={12} md={12} sx={{ height: '100%' }}>
    //   <Paper
    //     variant="outlined"
    //     sx={{
    //       p: 2,
    //       height: '100%',
    //       display: 'flex',
    //       flexDirection: 'column'
    //     }}
    //   >
    //     {/* Header */}
    //     <Box display="flex" alignItems="center" mb={2}>
    //       <LocalOfferOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
    //       <Typography variant="subtitle1">Session Tags</Typography>
    //     </Box>

    //     {/* Scrollable content */}
    //     <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
    //       {groupedTags.length === 0 ? (
    //         <Typography variant="body2" color="textSecondary">
    //           No tags found.
    //         </Typography>
    //       ) : (
    //         groupedTags.map((group, idx) => (
    //           <Box
    //             key={idx}
    //             mb={2}
    //             p={2}
    //             sx={{
    //               backgroundColor: '#F7F7F7',
    //               borderRadius: 2,
    //               width: '100%'
    //             }}
    //           >
    //             <Box display="flex" alignItems="center" mb={1}>
    //               <Typography variant="subtitle2">{group.category}</Typography>
    //             </Box>

    //             <Box display="flex" flexWrap="wrap" gap={1}>
    //               {group.tags.map((tag, i) => (
    //                 <Chip
    //                   key={i}
    //                   label={tag}
    //                   size="small"
    //                   onDelete={() => {}}
    //                   deleteIcon={
    //                     <CancelIcon
    //                       sx={{
    //                         fontSize: 16,
    //                         color: '#009FC7'
    //                       }}
    //                     />
    //                   }
    //                   sx={{
    //                     backgroundColor: '#009FC7',
    //                     color: '#FFFFFF',
    //                     height: 24,
    //                     fontSize: '0.75rem',
    //                     padding: '0 4px',

    //                     '& .MuiChip-deleteIcon': {
    //                       marginLeft: '4px',
    //                       color: '#009FC7'
    //                     }
    //                   }}
    //                 />
    //               ))}
    //             </Box>
    //           </Box>
    //         ))
    //       )}
    //     </Box>
    //   </Paper>
    // </Grid>
  );
};

export default CaseTagCard;
