import React from "react";
import { Grid, Card, Typography, Box, Accordion, AccordionSummary, AccordionDetails, MenuItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FilterPanel = ({ showFilter, formTypes, setFormType, dateFilters, setDateFilter }) => {
  if (!showFilter) return null; 

  return (
    <Grid item xs={3}>
      <Card sx={{ p: 1, backgroundColor: "#f5faff", borderRadius: 2, height: "100%" }}>
        <Typography variant="h6" gutterBottom>
          Filter
        </Typography>

        <Box sx={{ maxWidth: 320 }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#4ba1f8" }} />}
              sx={{ bgcolor: "#f1f8ff", borderRadius: 1 }}
            >
              <Typography variant="subtitle2" sx={{ color: "#4ba1f8", fontWeight: "bold" }}>
                FORM TYPE
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {formTypes.map((option) => (
                <MenuItem key={option.value} onClick={() => setFormType(option.label)} sx={{ cursor: "pointer" }}>
                  {option.label}
                </MenuItem>
              ))}
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ mt: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#4ba1f8" }} />}
              sx={{ bgcolor: "#f1f8ff", borderRadius: 1 }}
            >
              <Typography variant="subtitle2" sx={{ color: "#4ba1f8", fontWeight: "bold" }}>
                FILTER BY DATE
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {dateFilters.map((option) => (
                <MenuItem key={option.value} onClick={() => setDateFilter(option.label)} sx={{ cursor: "pointer" }}>
                  {option.label}
                </MenuItem>
              ))}
            </AccordionDetails>
          </Accordion>
        </Box>
      </Card>
    </Grid>
  );
};

export default FilterPanel;
