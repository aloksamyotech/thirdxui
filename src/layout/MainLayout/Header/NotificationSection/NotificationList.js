import { List, ListItem, ListItemText, ListItemSecondaryAction, Typography, Grid, useTheme } from '@mui/material';

import { styled } from '@mui/material/styles';

const ListItemWrapper = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  paddingLeft: 14,
  '&:hover': {
    background: theme.palette.primary.light
  },
  '& .MuiListItem-root': {
    padding: 0
  }
}));

const notifications = [
  {
    id: 1,
    name: 'Brian Griffin',
    action: 'Sent you a message',
    time: '5 min ago',
    date: 'today'
  },
  {
    id: 2,
    name: 'Chris Griffin',
    action: 'Created the project Website Copy',
    time: '5 min ago',
    date: 'today'
  },
  {
    id: 3,
    name: 'Glenn Quagmire',
    action: 'Sent you a message',
    time: '5 min ago',
    date: 'today'
  },
  {
    id: 4,
    name: 'Chris Griffin',
    action: 'Created the project Website Copy',
    time: '5 min ago',
    date: 'yesterday'
  }
];

const NotificationList = () => {
  const theme = useTheme();

  const grouped = notifications.reduce((acc, curr) => {
    acc[curr.date] = acc[curr.date] || [];
    acc[curr.date].push(curr);
    return acc;
  }, {});

  return (
    <List
      sx={{
        width: '100%',
        px: 2,
        py: 0,
        '& .MuiListItemSecondaryAction-root': {
          top: 10
        }
      }}
    >
      {['today', 'yesterday'].map((groupKey) =>
        grouped[groupKey] ? (
          <div key={groupKey}>
            <Typography
              variant="body2"
              sx={{
                pb: 0.5,
                color: theme.palette.text.secondary,
                fontSize: '12px',
                mt: '-5px'
              }}
            >
              {groupKey.charAt(0).toUpperCase() + groupKey.slice(1)}
            </Typography>

            {grouped[groupKey].map((item, index) => (
              <ListItemWrapper key={item.id} sx={{ py: 0.5 }}>
                <ListItem alignItems="flex-start" disableGutters>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" sx={{ fontWeight: 400, fontSize: '14px' }}>
                        {item.name}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontSize: '11px',
                          mt: '-4px'
                        }}
                      >
                        {item.action}
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Typography
                      variant="caption"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontSize: '12px'
                      }}
                    >
                      {item.time}
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
              </ListItemWrapper>
            ))}
          </div>
        ) : null
      )}
    </List>
  );
};

export default NotificationList;
