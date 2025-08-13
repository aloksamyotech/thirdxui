import React, { useEffect, useState } from 'react';
import { Box, Button, Divider, Typography, CircularProgress, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
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
  const dataIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#5976B8" style="background-color: #E5E9F4; border-radius: 4px; padding: 2px;" class="bi bi-calendar2-week" viewBox="0 0 16 16">
  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"/>
  <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5zM11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
</svg>`;

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
              const style = document.createElement('style');
              style.innerHTML = `
                /* Sidebar container */
                .form-wrap.form-builder .frmb-control li
                {
                  border-radius: 5px 5px 0 0;
                  margin-top: 0;
                  /* background-color: aquamarine;*/
                }
                .form-wrap.form-builder .frmb-control  {
                  background-color: #F7F7F7;
                }
                  .form-wrap.form-builder .frmb-control li
                  {
                      border-radius: 10px;
                      margin-top: 0;
                      margin-bottom: 10px;
                  }
                .form-wrap.form-builder .cb-wrap.sticky-controls
                {
                    position: sticky;
                    align-self: flex-start;
                    top: 0;
                    padding: 16px;
                    background-color:#F7F7F7;
                    width: 36%;
                } 
                .form-wrap.form-builder .frmb li.form-field {
                  position: relative;
                  padding: 6px;
                  clear: both;
                  margin-left: 0;
                  margin-bottom: 3px;
                  background-color: #FBFBFB;
                  transition: background-color 250ms ease-in-out, margin-top 400ms;
                  border-bottom: 1px solid #C1B0FF;
                  border-radius: 12px;
                  margin-bottom: 10px;
                }
                  .form-wrap.form-builder .cb-wrap, .form-wrap.form-builder .stage-wrap {
                    vertical-align: top;
                    padding: 15px;
                  }

                  /*.form-wrap.form-builder .frmb .prev-holder::before {
                    content: "Example";
                  }*/
                  .form-wrap.form-builder .frmb .form-field .form-group {
                      width: 100%;
                      clear: left;
                      float: none;
                      display: block;
                  }
                  .form-wrap.form-builder .frmb-control li .control-icon {
                    width: 30px;
                    
                  }
                    .form-wrap.form-builder .frmb-control li > span {
                      display: flex;
                      align-items: center;
                      gap: 8px;            
                  }
              `;
              document.head.appendChild(style);
              const options = {
                disableFields: [
                  'textDefault',
                  'autocomplete',
                  'hidden',
                  'header',
                  'button',
                  'checkbox-group',
                  'date',
                  'file',
                  'number',
                  'paragraph',
                  'radio-group',
                  'select',
                  'text',
                  'textarea'
                ],
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
                    type: 'date',
                    label: 'Date Field',
                    icon: `
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="35"
                        fill="#5976B8"
                        style="background-color: #E5E9F4; border-radius: 4px; padding: 2px;"
                        class="bi bi-calendar2-week"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
                        <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5zM11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
                      </svg>`
                  },
                  {
                    type: 'file',
                    label: 'File Upload',
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#5976B8"  style="background-color: #E5E9F4; border-radius: 4px; padding: 2px;"class="bi bi-upload" viewBox="0 0 16 16">
      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
      <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
    </svg>`
                  },
                  {
                    type: 'number',
                    label: 'Number',
                    icon: `<svg xmlns="http://www.w3.org/2000/svg"width="35" height="35" fill="#5976B8"  style="background-color: #E5E9F4; border-radius: 4px; padding: 2px;"class="bi bi-hash" viewBox="0 0 16 16">
      <path d="M8.39 12.648a1 1 0 0 0-.015.18c0 .305.21.508.5.508.266 0 .492-.172.555-.477l.554-2.703h1.204c.421 0 .617-.234.617-.547 0-.312-.188-.53-.617-.53h-.985l.516-2.524h1.265c.43 0 .618-.227.618-.547 0-.313-.188-.524-.618-.524h-1.046l.476-2.304a1 1 0 0 0 .016-.164.51.51 0 0 0-.516-.516.54.54 0 0 0-.539.43l-.523 2.554H7.617l.477-2.304c.008-.04.015-.118.015-.164a.51.51 0 0 0-.523-.516.54.54 0 0 0-.531.43L6.53 5.484H5.414c-.43 0-.617.22-.617.532s.187.539.617.539h.906l-.515 2.523H4.609c-.421 0-.609.219-.609.531s.188.547.61.547h.976l-.516 2.492c-.008.04-.015.125-.015.18 0 .305.21.508.5.508.265 0 .492-.172.554-.477l.555-2.703h2.242zm-1-6.109h2.266l-.515 2.563H6.859l.532-2.563z"/>
    </svg>`
                  },
                  {
                    type: 'paragraph',
                    label: 'Paragraph',
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#5976B8"  style="background-color: #E5E9F4; border-radius: 4px; padding: 2px;"" class="bi bi-paragraph" viewBox="0 0 16 16">
      <path d="M10.5 15a.5.5 0 0 1-.5-.5V2H9v12.5a.5.5 0 0 1-1 0V9H7a4 4 0 1 1 0-8h5.5a.5.5 0 0 1 0 1H11v12.5a.5.5 0 0 1-.5.5"/>
    </svg>`
                  },

                  {
                    type: 'select',
                    label: 'Select',
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#5976B8"  style="background-color: #E5E9F4; border-radius: 4px; padding: 2px;" class="bi bi-dash-square-dotted" viewBox="0 0 16 16">
      <path d="M2.5 0q-.25 0-.487.048l.194.98A1.5 1.5 0 0 1 2.5 1h.458V0zm2.292 0h-.917v1h.917zm1.833 0h-.917v1h.917zm1.833 0h-.916v1h.916zm1.834 0h-.917v1h.917zm1.833 0h-.917v1h.917zM13.5 0h-.458v1h.458q.151 0 .293.029l.194-.981A2.5 2.5 0 0 0 13.5 0m2.079 1.11a2.5 2.5 0 0 0-.69-.689l-.556.831q.248.167.415.415l.83-.556zM1.11.421a2.5 2.5 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415zM16 2.5q0-.25-.048-.487l-.98.194q.027.141.028.293v.458h1zM.048 2.013A2.5 2.5 0 0 0 0 2.5v.458h1V2.5q0-.151.029-.293zM0 3.875v.917h1v-.917zm16 .917v-.917h-1v.917zM0 5.708v.917h1v-.917zm16 .917v-.917h-1v.917zM0 7.542v.916h1v-.916zm15 .916h1v-.916h-1zM0 9.375v.917h1v-.917zm16 .917v-.917h-1v.917zm-16 .916v.917h1v-.917zm16 .917v-.917h-1v.917zm-16 .917v.458q0 .25.048.487l.98-.194A1.5 1.5 0 0 1 1 13.5v-.458zm16 .458v-.458h-1v.458q0 .151-.029.293l.981.194Q16 13.75 16 13.5M.421 14.89c.183.272.417.506.69.689l.556-.831a1.5 1.5 0 0 1-.415-.415zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373Q2.25 16 2.5 16h.458v-1H2.5q-.151 0-.293-.029zM13.5 16q.25 0 .487-.048l-.194-.98A1.5 1.5 0 0 1 13.5 15h-.458v1zm-9.625 0h.917v-1h-.917zm1.833 0h.917v-1h-.917zm1.834 0h.916v-1h-.916zm1.833 0h.917v-1h-.917zm1.833 0h.917v-1h-.917zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z"/>
    </svg>`
                  },
                  {
                    type: 'textarea',
                    label: 'Text Area',
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#C83569"  style="background-color: #FEE6F3; border-radius: 4px; padding: 2px;" class="bi bi-textarea-t" viewBox="0 0 16 16">
      <path d="M1.5 2.5A1.5 1.5 0 0 1 3 1h10a1.5 1.5 0 0 1 1.5 1.5v3.563a2 2 0 0 1 0 3.874V13.5A1.5 1.5 0 0 1 13 15H3a1.5 1.5 0 0 1-1.5-1.5V9.937a2 2 0 0 1 0-3.874zm1 3.563a2 2 0 0 1 0 3.874V13.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V9.937a2 2 0 0 1 0-3.874V2.5A.5.5 0 0 0 13 2H3a.5.5 0 0 0-.5.5zM2 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2m12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
      <path d="M11.434 4H4.566L4.5 5.994h.386c.21-1.252.612-1.446 2.173-1.495l.343-.011v6.343c0 .537-.116.665-1.049.748V12h3.294v-.421c-.938-.083-1.054-.21-1.054-.748V4.488l.348.01c1.56.05 1.963.244 2.173 1.496h.386z"/>
    </svg>`
                  },
                  {
                    type: 'text',
                    label: 'Text Field',
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#C83569"  style="background-color: #FEE6F3; border-radius: 4px; padding: 2px;" class="bi bi-file-text" viewBox="0 0 16 16">
      <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z"/>
      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1"/>
    </svg>`
                  },
                  {
                    type: 'radio-group',
                    label: 'Radio Group',
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#CA7B42"  style="background-color: #FCF1EF; border-radius: 4px; padding: 2px;" class="bi bi-record-circle" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
      <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
    </svg>`
                  },
                  {
                    type: 'checkbox-group',
                    label: 'Checkbox Group',
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#CA7B42"  style="background-color: #FCF1EF; border-radius: 4px; padding: 2px;" class="bi bi-check2-square" viewBox="0 0 16 16">
      <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
      <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
    </svg>`
                  }
                ],
                layoutTemplates: {
                  default: function (field, label, help, data) {
                    let iconHtml = '';
                    if (data.attributes && data.attributes['data-icon']) {
                      iconHtml = `<i class="${data.attributes['data-icon']}" style="margin-right:5px;"></i>`;
                    }

                    if (label) {
                      label = $('<label/>')
                        .attr('for', data.id)
                        .html(iconHtml + data.label);
                    }

                    help = $('<div/>')
                      .addClass('helpme')
                      .attr('id', 'row-' + data.id)
                      .append(help);

                    return $('<div/>').append(field, help);
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
    <div style={{ padding: '10px' }}>
      <Box sx={{ w: 'full', display: 'flex', justifyContent: 'space-between' }}>
        {/* <KeyboardDoubleArrowLeftIcon onClick={prevButton} sx={{ cursor: 'pointer' }} /> */}
        {/* <CancelIcon onClick={onCloseFunction} sx={{ cursor: 'pointer' }} /> */}
      </Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 500,
          fontSize: '20px',
          textAlign: 'left',
          mt: '10px',
          mb: '12px'
        }}
      >
        Create Form
      </Typography>

      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '10px',
          padding: '5px',
          minHeight: '300px',
          border: '1px solid #F9FAFC'
        }}
      >
        <div
          style={{
            backgroundColor: '#F5F5F5',
            padding: '10px 15px',
            fontWeight: 'bold',
            fontSize: '16px',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
            borderBottom: '1px solid #E0E0E0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span>Fields</span>
        </div>
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
                Publish
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FormBuilder;
