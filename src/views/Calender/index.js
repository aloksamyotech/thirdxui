/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
// @mui
import { Stack, Container, Typography, Box } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ActionCalenderDropDown from './ActionCalenderDropDown';
import AddTask from 'views/Task/AddTask';
import AddCalls from 'views/Calls/Addcalls';
import AddMeetings from 'views/Metting/Addmeetings';

// ----------------------------------------------------------------------
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
const events = [{ title: 'Meeting Time', start: new Date() }];
const Calender = () => {
  const [openTask, setOpenTask] = useState(false);
  const [openMeeting, setOpenMeeting] = useState(false);
  const [openCall, setOpenCall] = useState(false);
  // open task model
  const handleOpenTask = () => setOpenTask(true);
  const handleCloseTask = () => setOpenTask(false);

  // open meeting model
  const handleOpenMeeting = () => setOpenMeeting(true);
  const handleCloseMeeting = () => setOpenMeeting(false);

  // open call model
  const handleOpenCall = () => setOpenCall(true);
  const handleCloseCall = () => setOpenCall(false);
  return (
    <>
      {/* Add Task Model */}
      <AddTask open={openTask} handleClose={handleCloseTask} lead="lead" contact="contact" />

      {/* Add Meeting Model */}
      <AddMeetings open={openMeeting} handleClose={handleCloseMeeting} />

      {/* Add Call Model */}
      <AddCalls open={openCall} handleClose={handleCloseCall} />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Calendar</Typography>
          <ActionCalenderDropDown handleOpenTask={handleOpenTask} handleOpenMeeting={handleOpenMeeting} handleOpenCall={handleOpenCall} />
        </Stack>
        <Box sx={{ background: 'white' }}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            minHeight="400px"
            height="600px"
            // weekends={false}
            events={events}
            eventContent={renderEventContent}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            views={{
              listWeek: { buttonText: 'List' },
              multiMonthFourMonth: {
                type: 'multiMonth',
                buttonText: 'multiMonth',
                duration: { months: 4 }
              }
            }}
            buttonText={{
              today: 'Today',
              dayGridMonth: 'Month',
              timeGridWeek: 'Week',
              timeGridDay: 'Day'
            }}
            eventClassNames="custom-fullcalendar"
          />
        </Box>
      </Container>
    </>
  );
};

export default Calender;
