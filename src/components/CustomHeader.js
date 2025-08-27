import { Box, Typography, Menu, MenuItem, Button, IconButton, Tooltip } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { useState } from 'react';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import ArchiveIcon from '@mui/icons-material/Archive';
import { IconTrash } from '@tabler/icons';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import toast from 'react-hot-toast';
import { updateApi } from 'common/apiClient';
import { urls } from 'common/urls';
import AddItemDialog from './addBulkTagDialog';

const CustomHeader = ({
  entityType = '',
  title = '',
  selectedIds = [],
  onBulkDelete = () => {},
  onBulkArchive = () => {},
  exportEnabled = true,
  enableBulkActions = false,
  extraActions = null,
  refetchData,
  isCompletlyDelete = false,
  isShowArchive = true,
  isShowTags = false
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [opendialog, setOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpen = () => setOpen(true);
  const handleClosedialog = () => setOpen(false);

  const handleBulkDelete = async () => {
    try {
      const requestBody = {
        entityType,
        ids: selectedIds,
        isCompletlyDelete
      };

      const response = await updateApi(urls.bulkFuntions.delete, requestBody);

      if (response?.success) {
        const successMessages = {
          volunteer: 'Volunteer user deleted successfully!',
          cases: 'Cases deleted successfully!',
          services: 'Services deleted successfully!',
          service_user: 'Service user deleted successfully!'
        };

        toast.success(successMessages[entityType] || 'Items deleted successfully!');
        refetchData?.();
      } else {
        toast.error(response?.message || 'Bulk delete failed.');
      }
    } catch (error) {
      console.error('Error deleting users:', error);
      toast.error('Failed to delete the users.');
    } finally {
      handleClose?.();
    }
  };

  const handleBulkArchive = async () => {
    try {
      const requestBody = {
        entityType,
        ids: selectedIds
      };

      const response = await updateApi(urls.bulkFuntions.archive, requestBody);

      if (response?.success) {
        const successMessages = {
          volunteer: 'Volunteer user archived successfully!',
          cases: 'Cases archived successfully!',
          services: 'Services archived successfully!',
          service_user: 'Service user archived successfully!'
        };

        toast.success(successMessages[entityType] || 'Items archived successfully!');
        refetchData?.();
      } else {
        toast.error(response?.message || 'Bulk archive failed.');
      }
    } catch (error) {
      console.error('Error archiving users:', error);
      toast.error('Failed to archive the users.');
    } finally {
      handleClose?.();
    }
  };

  return (
    <>
    <AddItemDialog open={opendialog} onClose={handleClosedialog} entityType ={entityType} selectedIds = {selectedIds}></AddItemDialog>
      <Box sx={{ height: '50px', display: 'flex', alignItems: 'center' }}>
        <GridToolbarContainer
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #ddd',
            width: '100%',
            height: '100%',
            padding: '0 12px'
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: '400',
              color: '#101010',
              fontSize: '14px',
              lineHeight: '36px'
            }}
          >
            {title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {enableBulkActions && (
              <div>
                <Tooltip
                  title={selectedIds?.length === 0 ? 'Please select any row' : ''}
                  disableHoverListener={selectedIds?.length !== 0}
                  arrow
                >
                  <span>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleClick}
                      disabled={selectedIds?.length === 0}
                      sx={{
                        backgroundColor: '#FAFAFA',
                        borderRadius: '10px',
                        textTransform: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        pointerEvents: selectedIds?.length === 0 ? 'auto' : 'initial' // Required for tooltip to work on disabled button
                      }}
                    >
                      Bulk Select
                      <LibraryAddCheckOutlinedIcon fontSize="small" />
                    </Button>
                  </span>
                </Tooltip>

                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                  <MenuItem onClick={handleBulkDelete}>
                    Bulk Delete <IconTrash size={18} style={{ marginLeft: 8 }} />
                  </MenuItem>
                  {isShowArchive && (
                    <MenuItem onClick={handleBulkArchive}>
                      Bulk Archive <ArchiveIcon fontSize="small" style={{ marginLeft: 8 }} />
                    </MenuItem>
                  )}
                   {isShowTags && (
                  <MenuItem onClick={handleOpen}>
                    Tags Cases <LocalOfferIcon fontSize="small" style={{ marginLeft: 8 }} />
                  </MenuItem>
                  )}
                </Menu>
              </div>
            )}

            {extraActions}

            {exportEnabled && <GridToolbarExport />}
          </Box>
        </GridToolbarContainer>
      </Box>
    </>
  );
};

export default CustomHeader;
