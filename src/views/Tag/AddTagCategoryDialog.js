import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Switch,
    FormControlLabel,
    Box,
    OutlinedInput,
    Chip
} from '@mui/material';
import AntSwitch from 'components/AntSwitch';
import { TagCategoryAppliedToOptions } from 'common/constants';

const AddTagCategoryDialog = ({ open, onClose, onSave }) => {
    const [categoryName, setCategoryName] = useState('');
    const [appliedTo, setAppliedTo] = useState([]);
    const [isActive, setIsActive] = useState(true);

    const handleSave = () => {
        const data = { name: categoryName, appliedTo, isActive };
        onSave(data);
        setCategoryName('');
        setAppliedTo([]);
        setIsActive(true);
        onClose();
    };

    const handleCancel = () => {
        setCategoryName('');
        setAppliedTo([]);
        setIsActive(true);
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 500, fontSize: '16px', lineHeight: '24px', color: '#4C4E64' }}>Add Tags Category</DialogTitle>

            <DialogContent>
                <Box display="flex" gap={2} mt={1} flexDirection='column'>
                    <TextField
                        fullWidth
                        label="Category Name"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />

                    <FormControl fullWidth>
                        <InputLabel>Tags can be applied to</InputLabel>
                        <Select
                            multiple
                            value={appliedTo}
                            onChange={(e) => setAppliedTo(e.target.value)}
                            input={<OutlinedInput label="Tags can be applied to" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                        >
                            {TagCategoryAppliedToOptions.map((name) => (
                                <MenuItem key={name} value={name}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>

            <DialogActions sx={{ p: 2, display: 'flex', gap: 2, justifyContent: 'space-between', alignItems: 'center' }}>
                <Box >
                    <FormControlLabel
                        control={<AntSwitch checked={isActive} onChange={(e) => setIsActive(e.target.checked)} color="primary" />}
                        label="Active?"
                        labelPlacement="start"
                        sx={{
                            '.MuiFormControlLabel-label': {
                                mr: 1
                            }
                        }}
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained" sx={{
                            background: '#053146', borderRadius: '8px',
                            paddingInline: 4,
                            '&:hover': {
                                backgroundColor: '#053146'
                            },
                        }}
                        onClick={handleSave}
                    >
                        SAVE CHANGES
                    </Button>
                    <Button
                        onClick={handleCancel}
                        sx={{
                            border: '1px solid #c5c5ff',
                            borderRadius: '8px',
                            color: '#5c5cff',
                            textTransform: 'none',
                            px: 4,
                            py: 1,
                            fontWeight: 600,
                            backgroundColor: '#fff',
                            '&:hover': {
                                backgroundColor: '#f8f8ff'
                            }
                        }}
                    >
                        CANCEL
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
};

export default AddTagCategoryDialog;