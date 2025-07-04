import React, { useEffect, useState } from 'react';
import { Box, Button, Divider, Typography, CircularProgress } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const FormBuilder = ({ setFormData, formData, setPreview, onClose, templateData, setPreset }) => {
  const [loading, setLoading] = useState(false);

  const updatedTemplateData = templateData.map((field) => {
    if (field.type !== 'header') {
      return {
        ...field,
        disabledFieldButtons: ['remove', 'edit']
      };
    } else {
      return field;
    }
  });

  const loadScripts = () => {
    setLoading(true);
    const scriptJQuery = document.createElement('script');
    scriptJQuery.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js';
    scriptJQuery.onload = () => {
      const scriptJQueryUI = document.createElement('script');
      scriptJQueryUI.src = 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.13.2/jquery-ui.min.js';
      scriptJQueryUI.onload = () => {
        const scriptFormBuilder = document.createElement('script');
        scriptFormBuilder.src = 'https://formbuilder.online/assets/js/form-builder.min.js';
        scriptFormBuilder.onload = () => {
          const scriptFormRender = document.createElement('script');
          scriptFormRender.src = 'https://formbuilder.online/assets/js/form-render.min.js';
          scriptFormRender.onload = () => {
            if (!document.getElementById('fb-editor').classList.contains('fb-builder-initialized')) {
              const options = {
                disableFields: ['textDefault', 'autocomplete', 'hidden', 'header', 'button'],
                controlPosition: 'left',
                disabledActionButtons: ['save', 'data', 'clear'],
                disabledFieldButtons: { header: ['remove', 'copy'] },
                disabledAttrs: [
                  'access',
                  // 'className',
                  'inline',
                  'min',
                  'max',
                  'multiple',
                  'maxlength',
                  'name',
                  'other',
                  'helperext',
                  'rows',
                  'style',
                  'step',
                  'toggle',
                  'subtype',
                  'value'
                ],
                defaultFields: updatedTemplateData,
                formData: formData,
                fields: [
                  {
                    label: 'textDefault',
                    disabledFieldButtons: ['remove', 'copy', 'edit'],
                    attrs: {
                      type: 'textDefault'
                    },
                    icon: '🌟'
                  }
                ],
                templates: {
                  textDefault: function (fieldData) {
                    return {
                      field: `<input type="text" name="${fieldData.name}" class="form-control"/>`,
                      onRender: function () {
                        // add logic here
                      }
                    };
                  }
                }
              };
              window.$(document.getElementById('fb-editor')).formBuilder(options);
              document.getElementById('fb-editor').classList.add('fb-builder-initialized');
            }
          };
          document.body.appendChild(scriptFormRender);
        };
        document.body.appendChild(scriptFormBuilder);
      };
      document.body.appendChild(scriptJQueryUI);
    };
    document.body.appendChild(scriptJQuery);
    setLoading(false);
  };

  useEffect(() => {
    loadScripts();
  }, []);

  const getFormData = () => {
    const formData = window.$('#fb-editor').formBuilder('getData');
    setFormData(formData);
    setPreview(true);
  };

  const clearFormData = () => {
    const formInstance = window.$('#fb-editor').data('formBuilder');
    formInstance.actions.clearFields();
  };

  const prevButton = () => {
    setPreset(true);
  };

  const onCloseFunction = () => {
    onClose();
    setPreset(true);
  };

  return (
    <div style={{ backgroundColor: '#f0ebf8', padding: '10px' }}>
      <Box sx={{ w: 'full', display: 'flex', justifyContent: 'space-between' }}>
        <KeyboardDoubleArrowLeftIcon onClick={prevButton} sx={{ cursor: 'pointer' }} />
        <CancelIcon onClick={onCloseFunction} sx={{ cursor: 'pointer' }} />
      </Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          fontSize: '30px',
          textAlign: 'center',
          mt: '-20px',
          mb: '20px'
        }}
      >
        Create Form
      </Typography>

      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '10px',
          padding: '5px',
          minHeight: '300px'
        }}
      >
        {loading ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <CircularProgress />
            <Typography sx={{ mt: 2 }}>Loading form builder...</Typography>
          </Box>
        ) : (
          <>
            <div id="fb-editor"></div>
            <Divider sx={{ mt: '10px' }} />
            <div
              style={{
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8
              }}
            >
              <Button
                variant="contained"
                style={{
                  border: '1px solid #673ab7',
                  backgroundColor: '#fff',
                  color: '#673ab7'
                }}
                onClick={clearFormData}
              >
                Clear
              </Button>
              <Button variant="contained" style={{ backgroundColor: '#673ab7' }} onClick={getFormData}>
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FormBuilder;
