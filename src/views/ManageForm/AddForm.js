import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, MenuItem, Button, Stack, Dialog, DialogTitle } from '@mui/material';
import FormBuilder from 'formBuilder/FormBuilder';
import SelectTemplate from 'formBuilder/SelectTemplate';
import TemplateOne from 'formBuilder/TemplateOne';
import TemplateTwo from 'formBuilder/TemplateTwo';
import TemplateThree from 'formBuilder/TemplateThree';
import { useEffect } from 'react';
import DefaultFields from 'formBuilder/DefaultFields';

const AddFormModal = ({ open = false, onClose = () => {}, getAllForms }) => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('formData');
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const [preset, setPreset] = useState(true);
  const [preview, setPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templateData, setTemplateData] = useState([]);
  const [formValues, setFormValues] = useState();
  useEffect(() => {
    if (open) {
      setPreset(true);
      setPreview(false);
      setSelectedTemplate(null);
      setTemplateData([]);
      setFormValues(undefined);
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      {preset && (
        <DefaultFields
          templateData={templateData}
          setTemplateData={setTemplateData}
          setPreset={setPreset}
          onClose={onClose}
          setFormValues={setFormValues}
        />
      )}
      {!preview && !preset && (
        <FormBuilder
          setFormData={setFormData}
          formData={formData}
          setPreview={setPreview}
          onClose={onClose}
          templateData={templateData}
          setTemplateData={setTemplateData}
          setPreset={setPreset}
        />
      )}
      {preview && !selectedTemplate && (
        <SelectTemplate setPreview={setPreview} setSelectedTemplate={setSelectedTemplate} onClose={onClose} setPreset={setPreset} />
      )}
      {selectedTemplate === 1 && (
        <TemplateOne
          formValues={formValues}
          formData={formData}
          setFormData={setFormData}
          setSelectedTemplate={setSelectedTemplate}
          setPreview={setPreview}
          setPreset={setPreset}
          onClose={onClose}
          getAllForms={getAllForms}
        />
      )}
      {selectedTemplate === 2 && <TemplateTwo formData={formData} setSelectedTemplate={setSelectedTemplate} setPreview={setPreview} />}
      {selectedTemplate === 3 && <TemplateThree formData={formData} setSelectedTemplate={setSelectedTemplate} setPreview={setPreview} />}
    </Dialog>
  );
};

export default AddFormModal;
