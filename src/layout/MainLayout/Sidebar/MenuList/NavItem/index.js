import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';
import { MENU_OPEN, SET_MENU } from 'store/actions';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const NavItem = ({ item, level }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { pathname, state } = useLocation();
  const customization = useSelector((state) => state.customization);
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));
  const Icon = item.icon;
  const itemIcon = item?.icon ? (
    <Icon stroke={1.5} size="1.3rem" />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: customization.isOpen.includes(item?.id) ? 8 : 6,
        height: customization.isOpen.includes(item?.id) ? 8 : 6
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  const itemTarget = item.target ? '_blank' : '_self';

  const listItemProps = item?.external
    ? { component: 'a', href: item.url, target: itemTarget }
    : {
        component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />)
      };

  const itemHandler = (id) => {
    dispatch({ type: MENU_OPEN, id });
    if (matchesSM) dispatch({ type: SET_MENU, opened: false });
  };

  const isArchive = state?.isArchive === true || state?.isArchive === 'true';

  const isSelected =
    !isArchive &&
    (pathname === item.url ||
      (item.childrenUrls && item.childrenUrls.includes(pathname) && (!item.role || !state?.role || item.role === state.role)) ||
      (item.matchUrls && item.matchUrls.some((url) => pathname === url || pathname.startsWith(url.endsWith('/') ? url : url + '/'))));

  useEffect(() => {
    if (isArchive) return;

    const shouldOpenParent =
      pathname === item.url ||
      (item.childrenUrls && item.childrenUrls.some((child) => pathname.startsWith(child))) ||
      (item.matchUrls && item.matchUrls.some((url) => pathname.startsWith(url)));

    if (shouldOpenParent) {
      dispatch({ type: MENU_OPEN, id: item.id });
      if (item.parentId) {
        dispatch({ type: MENU_OPEN, id: item.parentId });
      }
    }
  }, [pathname, item, isArchive, dispatch]);

  return (
    <ListItemButton
      selected={isSelected}
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        borderRadius: '6px',
        mb: 1,
        alignItems: 'flex-start',
        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
        '&:hover': {
          backgroundColor: '#ffffff !important',
          color: '#053146 !important',
          '& .MuiListItemIcon-root': {
            color: '#053146 !important'
          },
          '& .MuiTypography-root': {
            color: '#053146 !important'
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
      onClick={() => itemHandler(item.id)}
    >
      <ListItemIcon
        sx={{
          my: 'auto',
          minWidth: !item?.icon ? 18 : 36,
          color: isSelected ? '#053146' : '#ffff',
          '&.MuiListItemIcon-root': {
            color: isSelected ? '#053146 !important' : '#ffff'
          }
        }}
      >
        {itemIcon}
      </ListItemIcon>

      <ListItemText
        primary={
          <Typography
            variant={isSelected ? 'h5' : 'body1'}
            sx={{
              color: isSelected ? '#053146' : '#ffff',
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
