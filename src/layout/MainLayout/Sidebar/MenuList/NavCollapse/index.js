import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { useTheme } from '@mui/material/styles';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import NavItem from '../NavItem';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { IconChevronDown, IconChevronUp } from '@tabler/icons';

const NavCollapse = ({ menu, level }) => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleClick = () => {
    setOpen(!open);
    setSelected(!selected ? menu.id : null);

    // Optional: Navigate to first child on click (disable if not needed)
    // if (menu?.id !== 'authentication') {
    //   navigate(menu.children[0]?.url);
    // }
  };

  const checkOpenForParent = (children, parentId) => {
    children.forEach((item) => {
      const matchExact = item.url === pathname;
      const matchChild = item.childrenUrls?.includes(pathname);
      if (matchExact || matchChild) {
        setOpen(true);
        setSelected(parentId);
      }
    });
  };

  useEffect(() => {
    setOpen(false);
    setSelected(null);

    if (menu.children) {
      for (const item of menu.children) {
        // Recursively check grandchildren if any
        if (item.children?.length) {
          checkOpenForParent(item.children, menu.id);
        }

        const matchExact = item.url === pathname;
        const matchChild = item.childrenUrls?.includes(pathname);

        // Check matchUrls with startsWith for dynamic routes
        const matchDynamic = item.matchUrls?.some((url) => pathname.startsWith(url)) || false;

        if (matchExact || matchChild || matchDynamic) {
          setOpen(true);
          setSelected(menu.id);
          break;
        }
      }
    }
  }, [pathname, menu.children]);

  const menus = menu.children?.map((item) => {
    switch (item.type) {
      case 'collapse':
        return <NavCollapse key={item.id} menu={item} level={level + 1} />;
      case 'item':
        return <NavItem key={item.id} item={item} level={level + 1} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  const Icon = menu.icon;
  const menuIcon = Icon ? (
    <Icon strokeWidth={1.5} size="1.3rem" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: selected === menu.id ? 8 : 6,
        height: selected === menu.id ? 8 : 6
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  return (
    <>
      <ListItemButton
        sx={{
          borderRadius: '6px',
          mb: 0.5,
          alignItems: 'flex-start',
          backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
          '&:hover': {
            backgroundColor: '#ffffff !important',
            color: '#053146 !important',
            '& .MuiListItemIcon-root': { color: '#053146 !important' },
            '& .MuiTypography-root': { color: '#053146 !important' }
          },
          '&.Mui-selected': {
            backgroundColor: '#ffffff !important',
            color: '#053146 !important',
            '& .MuiListItemIcon-root': { color: '#053146 !important' },
            '& .MuiTypography-root': { color: '#053146 !important' }
          }
        }}
        selected={selected === menu.id}
        onClick={handleClick}
      >
        <ListItemIcon
          sx={{
            my: 'auto',
            minWidth: !menu.icon ? 18 : 36,
            color: selected === menu.id ? '#053146' : '#ffff',
            '&.MuiListItemIcon-root': {
              color: selected === menu.id ? '#053146 !important' : '#ffff'
            }
          }}
        >
          {menuIcon}
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              variant={selected === menu.id ? 'h5' : 'body1'}
              sx={{
                my: 'auto',
                color: selected === menu.id ? '#053146' : '#ffff',
                transition: 'color 0.3s ease-in-out'
              }}
            >
              {menu.title}
            </Typography>
          }
          secondary={
            menu.caption && (
              <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                {menu.caption}
              </Typography>
            )
          }
        />
        {open ? (
          <IconChevronUp
            stroke={1.5}
            size="1rem"
            style={{
              marginTop: 'auto',
              marginBottom: 'auto',
              color: selected === menu.id ? '#053146' : '#ffff'
            }}
          />
        ) : (
          <IconChevronDown
            stroke={1.5}
            size="1rem"
            style={{
              marginTop: 'auto',
              marginBottom: 'auto',
              color: selected === menu.id ? '#053146' : '#ffff'
            }}
          />
        )}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={{
            position: 'relative',
            pl: '20px'
          }}
        >
          {menus}
        </List>
      </Collapse>
    </>
  );
};

NavCollapse.propTypes = {
  menu: PropTypes.object,
  level: PropTypes.number
};

export default NavCollapse;
