import React from 'react';
import { Card, Typography, Avatar, Stack, Chip, Box, Divider } from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/lab';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const TimelineActivity = ({ timelineData }) => {
  return (
    <>
      <Card sx={{borderLeft: '1px solid #0000001A', display: 'flex', justifyContent: 'center',alignItems: 'center', minHeight: '100%'  }}>
        <Box>
        <Timeline position="center">
          {timelineData.map((item, index) => (
            <TimelineItem key={index}>
              <TimelineOppositeContent sx={{ flex: 0.15, paddingTop: '8px' }}>
                <Typography variant="body2" color="text.secondary">
                  {item.dateField}
                </Typography>
              </TimelineOppositeContent>

              <TimelineSeparator>
                <TimelineDot style={{ backgroundColor: item.color }} />

                {index !== timelineData.length - 1 && <TimelineConnector />}
              </TimelineSeparator>

              <TimelineContent sx={{ pb: 4 }}>
                <Typography fontSize={16} fontWeight={600} color="#4C4E64DE">
                  {item.label}
                </Typography>

                <Typography fontSize={14} fontWeight={400} color="#4C4E6499" sx={{ mt: 3 }}>
                  {item.description}
                </Typography>

                {item.file && (
                  <Chip
                    icon={<PictureAsPdfIcon color="error" />}
                    label={item.file}
                    size="small"
                    sx={{
                      bgcolor: 'white',
                      fontWeight: 500,
                      mb: 1
                    }}
                  />
                )}

                {item.avatars && (
                  <Stack direction="row" spacing={2} mb={1} alignItems="center">
                    <Stack direction="row" spacing={-1}>
                      {item.avatars.map((src, i) => (
                        <Avatar key={i} alt={`Avatar-${i}`} src={src} sx={{ width: 32, height: 32, border: '2px solid #fff' }} />
                      ))}
                      {item.extraCount && (
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            fontSize: '12px',
                            bgcolor: '#ccc',
                            border: '2px solid #fff'
                          }}
                        >
                          +{item.extraCount}
                        </Avatar>
                      )}
                    </Stack>

                    {(item.sessionTitle || item.members) && (
                      <Box>
                        {item.sessionTitle && (
                          <Typography fontSize={14} fontWeight={600} color="#4C4E6499">
                            {item.sessionTitle}
                          </Typography>
                        )}
                        {item.members && (
                          <Typography fontSize={14} fontWeight={400} color="#4C4E6499">
                            {item.members}
                          </Typography>
                        )}
                      </Box>
                    )}
                  </Stack>
                )}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
        </Box>
      </Card>
    </>
  );
};

export default TimelineActivity;
