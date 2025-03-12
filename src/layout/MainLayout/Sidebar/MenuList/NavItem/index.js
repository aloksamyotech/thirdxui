import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';

// project imports
import { MENU_OPEN, SET_MENU } from 'store/actions';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item, level }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const customization = useSelector((state) => state.customization);
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

  const Icon = item.icon;
  const itemIcon = item?.icon ? (
    <Icon stroke={1.5} size="1.3rem" />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
        height: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  let listItemProps = {
    component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />)
  };
  if (item?.external) {
    listItemProps = { component: 'a', href: item.url, target: itemTarget };
  }

  const itemHandler = (id) => {
    dispatch({ type: MENU_OPEN, id });
    if (matchesSM) dispatch({ type: SET_MENU, opened: false });
  };

  // active menu item on page load
  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split('/')
      .findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      dispatch({ type: MENU_OPEN, id: item.id });
    }
    // eslint-disable-next-line
  }, [pathname]);

  return (
    // <ListItemButton
    //   {...listItemProps}
    //   disabled={item.disabled}
    //   sx={{
    //     borderRadius: `${customization.borderRadius}px`,
    //     mb: 0.5,
    //     alignItems: 'flex-start',
    //     backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
    //     py: level > 1 ? 1 : 1.25,
    //     pl: `${level * 24}px`,
    //     '&:hover': {
    //       backgroundColor: '#ffff'
    //     },
    //     '&.Mui-selected': {
    //       backgroundColor: '#ffff !important',
    //       color: '#053146'
    //     }
    //   }}
    //   selected={customization.isOpen.findIndex((id) => id === item.id) > -1}
    //   onClick={() => itemHandler(item.id)}
    // >
    //   <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36,
    //       color: '#ffff', // Ensure icon is green
    //       '&.MuiListItemIcon-root': {
    //         color: '#ffff !important' // Overrides default MUI styles
    //       },
    //       '&.Mui-selected &': {
    //         color: '#ffff !important' // Fixes selected state
    //       },
    //       '&.Mui-selected:hover &': {
    //         color: '#053146 !important'
    //       }
    //    }}>{itemIcon}</ListItemIcon>
    //   <ListItemText
    //     primary={
    //       <Typography variant={customization.isOpen.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'}
    //       sx={{
    //         my: 'auto',
    //         minWidth: !item?.icon ? 18 : 36,
    //         color: '#ffff', // Ensure icon is green
    //         '&.MuiListItemIcon-root': {
    //           color: '#ffff !important' // Overrides default MUI styles
    //         },
    //         '&.Mui-selected &': {
    //           color: '#ffff !important' // Fixes selected state
    //         },
    //         '&.Mui-selected:hover &': {
    //           color: '#053146 !important'
    //         }
    //       }}>
    //         {item.title}
    //       </Typography>
    //     }
    //     secondary={
    //       item.caption && (
    //         <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
    //           {item.caption}
    //         </Typography>
    //       )
    //     }
    //   />
    //   {item.chip && (
    //     <Chip
    //       color={item.chip.color}
    //       variant={item.chip.variant}
    //       size={item.chip.size}
    //       label={item.chip.label}
    //       avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
    //     />
    //   )}
    // </ListItemButton>

    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        borderRadius: `${customization.borderRadius}px`,
        mb: 0.5,
        alignItems: 'flex-start',
        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
        py: level > 1 ? 1 : 1.25,
        pl: `${level * 24}px`,
        '&:hover': {
          backgroundColor: '#ffffff !important', // White background on hover
          color: '#053146 !important', // Dark blue text on hover
          '& .MuiListItemIcon-root': {
            color: '#053146 !important' // Dark blue icon on hover
          },
          '& .MuiTypography-root': {
            color: '#053146 !important' // Ensures text color changes on hover
          }
        },
        '&.Mui-selected': {
          backgroundColor: '#ffffff !important',
          color: '#053146 !important',
          '& .MuiListItemIcon-root': {
            color: '#053146 !important'
          },
          '& .MuiTypography-root': {
            color: '#053146 !important'
          }
        }
      }}
      selected={customization.isOpen.findIndex((id) => id === item.id) > -1}
      onClick={() => itemHandler(item.id)}
    >
      <ListItemIcon
        sx={{
          my: 'auto',
          minWidth: !item?.icon ? 18 : 36,
          color: customization.isOpen.findIndex((id) => id === item.id) > -1 ? '#053146' : '#ffff',
          '&.MuiListItemIcon-root': {
            color: customization.isOpen.findIndex((id) => id === item.id) > -1 ? '#053146 !important' : '#ffff'
          }
        }}
      >
        {itemIcon}
      </ListItemIcon>

      <ListItemText
        primary={
          <Typography
            variant={customization.isOpen.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'}
            sx={{
              color: customization.isOpen.findIndex((id) => id === item.id) > -1 ? '#053146' : '#ffff',
              transition: 'color 0.3s ease-in-out'
            }}
          >
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
              {item.caption}
            </Typography>
          )
        }
      />

      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number
};

export default NavItem;
