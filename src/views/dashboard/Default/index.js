import React from 'react';
import { useEffect, useState } from 'react';
import { Grid, Divider, Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DashboardCard from 'ui-component/cards/DashboardCard';
import Shortcut2 from './Shortcut2';
import Sessions from './Sessions';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import AppTasks from './AppTask';
import Card from './MediaCard';
import Map from '../Map';
import EmptyCard from './EmptyCard';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';
import { toast } from 'react-toastify';
import { gridSpacing } from 'store/constant';
import { useNavigate } from 'react-router-dom';

const STORAGE_KEY = 'dashboard_components_order';

const defaultComponents = [
  { id: 'sessions', component: <Sessions /> },
  { id: 'growth', component: <TotalGrowthBarChart /> },
  { id: 'tasks', component: <AppTasks /> },
  { id: 'card', component: <Card /> },
  { id: 'map', component: <Map /> },
  { id: 'empty', component: <EmptyCard /> }
];

const saveToLocalStorage = (components) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(components.map((c) => c.id)));
};

const loadFromLocalStorage = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;
  try {
    const savedOrder = JSON.parse(saved);
    const map = Object.fromEntries(defaultComponents.map((c) => [c.id, c]));
    return savedOrder.map((id) => map[id]).filter(Boolean);
  } catch {
    return null;
  }
};

const SortableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab'
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};
const Dashboard = () => {
  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);
  const [totalDonation, setTotalDonation] = useState([]);
  const [totalSession, setTotalSession] = useState([]);
  const [totalActiveUser, setTotalActiveUser] = useState([]);
  const [totalOpenedCases, setTotalCaseOpened] = useState([]);
  const [components, setComponents] = useState(() => {
    const saved = loadFromLocalStorage();
    return saved || defaultComponents;
  });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [servicesName, setServicesName] = useState([]);
  const [searchQueryService, setSearchQueryService] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const donation = await getApi(urls.dashboard.getTotalDonation);
      const session = await getApi(urls.dashboard.getTotalSession);
      const activeUser = await getApi(urls.dashboard.getTotalActiveUser);
      const caseOpened = await getApi(urls.dashboard.getTotalOpenedCases);

      setTotalDonation(donation?.data?.totalDonation || 0);
      setTotalSession(session?.data?.totalSession || 0);
      setTotalActiveUser(activeUser?.data?.totalUser || 0);
      setTotalCaseOpened(caseOpened?.data?.totalcase || 0);
    } catch (error) {
      toast.error('Error fetching dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = components.findIndex((c) => c.id === active.id);
      const newIndex = components.findIndex((c) => c.id === over?.id);
      const newItems = arrayMove(components, oldIndex, newIndex);
      setComponents(newItems);
      saveToLocalStorage(newItems);
    }
  };
  useEffect(() => {
    const fetchServices = async () => {
      const queryParams = new URLSearchParams();
      if (searchQueryService && searchQueryService !== '') {
        queryParams.append('search', searchQueryService);
      }
      const response = await getApi(`${urls.service.fetchWithPagination}?${queryParams.toString()}`);
      setServicesName(response?.data?.data);
    };
    fetchServices();
  }, [searchQueryService]);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <DashboardCard title="Active Service Users" num1={`${totalActiveUser}`} num2="62" loading={isLoading} />
            </Grid>
            <Grid item marginInline={3}>
              <Shortcut2 icon={1} title="Add Service User" path="/add-serviceuser" />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <DashboardCard title="Open Cases" num1={`${totalOpenedCases}`} num2="62" loading={isLoading} />
            </Grid>
            <Grid item marginInline={5}>
              <Shortcut2 icon={2} title="Add New Case" path="/add-case" />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <DashboardCard title="Sessions Delivered" num1={`${totalSession}`} num2="62" loading={isLoading} />
            </Grid>
            <Grid item marginInline={2}>
              <Shortcut2 icon={3} title="Add Session" onClick={handleClickOpen} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <DashboardCard title="Total Donations" num1={`$${totalDonation}`} num2="62" loading={isLoading} />
            </Grid>
            <Grid item marginInline={5}>
              <Shortcut2 icon={4} title="Add Donation" path="/financial" />
            </Grid>
          </Grid>
        </Grid>

        <Grid item container xs={12} justifyContent="center" marginBlock={2}>
          <Divider sx={{ width: '70%', borderWidth: '1px' }} />
        </Grid>

        <Grid item xs={12}>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={components.map((c) => c.id)} strategy={verticalListSortingStrategy}>
              <Grid container spacing={2}>
                {components.map((comp) => (
                  <Grid item xs={12} sm={12} md={12} lg={6} key={comp.id}>
                    <SortableItem id={comp.id}>{comp.component}</SortableItem>
                  </Grid>
                ))}
              </Grid>
            </SortableContext>
          </DndContext>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={false}
        PaperProps={{
          sx: {
            width: 500,
            minHeight: 50,
            borderRadius: 2,
            p: 2
          }
        }}
      >
        <DialogTitle sx={{ fontSize: '1.1rem', fontWeight: 600, pb: 1 }}>Choose Service</DialogTitle>

        <DialogContent sx={{ pt: 0 }}>
          <TextField
            select
            label="Select Service Type"
            fullWidth
            size="small"
            value={selectedServiceId}
            onChange={(e) => {
              setSelectedServiceId(e.target.value);
              setError('');
            }}
            sx={{ mt: 1 }}
            error={!!error}
            helperText={error}
          >
            {servicesName.map((service) => (
              <MenuItem key={service._id} value={service._id}>
                {service.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>

        <DialogActions sx={{ mt: 1 }}>
          <Button onClick={handleClose} color="error" variant="outlined" size="small">
            Cancel
          </Button>
          <Button
            onClick={() => {
              const selectedService = servicesName.find((service) => service._id === selectedServiceId);

              if (!selectedService) {
                setError('Please select a service.');
                return;
              }

              setError('');
              navigate('/add-session', {
                state: {
                  serviceId: selectedService._id,
                  serviceName: selectedService.name
                }
              });

              handleClose();
            }}
            variant="contained"
            size="small"
            sx={{ backgroundColor: '#053146' }}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Dashboard;
