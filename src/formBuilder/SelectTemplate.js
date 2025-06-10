import { Box, Button, Container, Divider, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import t1 from '../assets/images/Screenshot (19).png';
import t2 from '../assets/images/Screenshot (20).png';
import t3 from '../assets/images/Screenshot (21).png';
import { useNavigate } from "react-router-dom";
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from "react-hot-toast";

const templates = [
    { id: 1, src: t1, alt: "Template 1" },
    // { id: 2, src: t2, alt: "Template 2" },
    // { id: 3, src: t3, alt: "Template 3" },
];

const SelectTemplate = ({ setPreview, setSelectedTemplate, onClose, setPreset }) => {
    const [selectedId, setSelectedId] = useState(null);
    const navigate = useNavigate()

    const handleTemplateClick = (id) => {
        setSelectedId(id);
    };

    const onCloseFunction = () => {
        onClose()
        setPreset(true)
        setPreview(false)
        setSelectedTemplate(null)
    }

    return (
        <Container
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                height: "70vh",
                gap: 2,
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <KeyboardDoubleArrowLeftIcon onClick={() => setPreview(false)} sx={{ cursor: 'pointer' }} />
                <CancelIcon onClick={onCloseFunction} sx={{ cursor: 'pointer' }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '30px' }}>
                Select Template
            </Typography>
            <Typography variant="h6" sx={{ color: '#a3a3a3' }}>
                Pick a design that matches your style and purpose best.
            </Typography>
            <Grid container spacing={3} justifyContent="center">
                {templates.map((template) => (
                    <Grid item xs={12} sm={4} key={template.id}>
                        <Box
                            component="img"
                            src={template.src}
                            alt={template.alt}
                            onClick={() => handleTemplateClick(template.id)}
                            sx={{
                                width: "100%",
                                height: 200,
                                border: selectedId === template.id ? "3px solid #673ab7" : "2px solid transparent",
                                borderRadius: 2,
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                boxShadow: selectedId === template.id ? "0 0 10px rgba(103, 58, 183, 0.5)" : "none",
                                "&:hover": {
                                    borderColor: "#673ab7",
                                    transform: "scale(1.03)",
                                },
                            }}
                        />
                    </Grid>
                ))}
            </Grid>
            <Button
                variant="contained"
                sx={{ backgroundColor: "#673ab7" }}
                onClick={() => {
                    if (selectedId !== null) {
                        setSelectedTemplate(selectedId)
                    } else {
                        toast.error("Please Select a Template")
                    }
                }}
            >
                Confirm
            </Button>
        </Container>
    );
};

export default SelectTemplate;
