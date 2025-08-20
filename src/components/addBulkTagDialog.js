
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  Grid,
  Box,
  IconButton,
  Autocomplete,
  TextField,
  Button,
  Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getApi, postApi } from 'common/apiClient'; 
import { urls } from 'common/urls';
import toast from 'react-hot-toast';

const AddItemDialog = ({ open, onClose, entityType = '', selectedIds = [] }) => {
  const [entityIds, setEntityIds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    if (open) {
      getApi(urls.tagCategory.fetchWithPagination)
        .then(res => {
          setCategories(res?.data?.data || []);
        })
        .catch(err => console.error(err));
    }
  }, [open]);

  useEffect(() => {
    if (selectedCategory) {
      getApi(`${urls.tag.fetchWithPagination}?categoryId=${selectedCategory._id}`)
        .then(res => {
          setTags(res.data.data || []);
        })
        .catch(err => console.error(err));
    } else {
      setTags([]);
      setSelectedTag(null);
    }
  }, [selectedCategory]);

  const fetchEntityIds = async () => {
    try {
      const allIds = new Set();
      for (const id of selectedIds) {
        const res = await getApi(`${urls.list.fetchListData}/${id}`);
        const entities = res?.data?.data || [];
        entities.forEach(entity => {
          if (entity?._id) {
            allIds.add(entity._id);
          }
        });
      }
      setEntityIds([...allIds]);
    } catch (err) {
      console.error('Failed to fetch entity IDs:', err);
    }
  };

  useEffect(() => {
    if (open && selectedIds.length > 0) {
      fetchEntityIds();
    } else {
      setEntityIds([]);
    }
  }, [open, selectedIds]);

  const handleSave = async () => {
    if (!selectedTag || entityIds.length === 0) {
      console.log(selectedTag._id, entityIds, );
      
      toast.error('Please select a tag and ensure there are entities to assign.');
      return;
    }

    try {
      await postApi(urls.list.assignTagToEntities, {
        tagId: selectedTag?._id,
        entityIds: entityIds,
      });
      console.log(selectedTag._id, entityIds, );
      
      // Close after successful save
      toast.success("tag updated successfully");
      onClose();
    } catch (err) {
      console.error('Failed to save tag:', err);
      toast.error('Failed to assign tag. Please try again.');
    }
  };

  const handleCancel = () => {
    // Reset form if needed
    setSelectedCategory(null);
    setSelectedTag(null);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: 500, borderRadius: 2 }
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" px={2} pt={2}>
        <DialogTitle sx={{ fontSize: '16px', fontWeight: '600', p: 0 }}>
          Add Tags
        </DialogTitle>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      <Box p={2} pt={1}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              options={categories}
              getOptionLabel={(option) => option?.name || ''}
              value={selectedCategory}
              onChange={(e, value) => setSelectedCategory(value)}
              renderInput={(params) => (
                <TextField {...params} label="Tags Category" size="small" />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              options={tags}
              getOptionLabel={(option) => option?.name || ''}
              value={selectedTag}
              onChange={(e, value) => setSelectedTag(value)}
              disabled={!selectedCategory}
              renderInput={(params) => (
                <TextField {...params} label="Tags" size="small" />
              )}
            />
          </Grid>

          {/* Save & Cancel Buttons */}
          <Grid item xs={12}>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="outlined" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="contained"  sx={{
                  background: '#053146', borderRadius: '8px',
                  // paddingInline: 4,
                  '&:hover': {
                    backgroundColor: '#053146'
                  },
                  px: 4,
                  py: 1,
                  fontWeight: 600,
                }}onClick={handleSave} disabled={!selectedTag}>
                Save
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default AddItemDialog;
