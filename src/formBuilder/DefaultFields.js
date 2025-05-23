import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';

const DefaultFields = ({ templateData, setTemplateData, setPreset, onClose }) => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const templates = [
        {
            id: 1,
            name: 'Community Refferal Form',
            data: [
                {
                    "type": "header",
                    "subtype": "h1",
                    "label": "Community Referral"
                },
                {
                    "type": "text",
                    "required": true,
                    "label": "Name",
                    "className": "form-control",
                    "name": "text-1747390638003-0",
                    "subtype": "text"
                },
                {
                    "type": "text",
                    "required": true,
                    "label": "Contact Number",
                    "className": "form-control",
                    "name": "text-1747390643179-0",
                    "subtype": "text"
                },
                {
                    "type": "text",
                    "required": true,
                    "label": "Email",
                    "className": "form-control",
                    "name": "text-1747390648300-0",
                    "subtype": "text"
                },
                {
                    "type": "text",
                    "required": true,
                    "label": "Job Role",
                    "className": "form-control",
                    "name": "text-1747390640020-0",
                    "subtype": "text"
                },
                {
                    "type": "select",
                    "required": true,
                    "label": "What is you relationship to the person you are referring?",
                    "className": "form-control",
                    "name": "select-1747393619538-0",
                    "values": [
                        {
                            "label": "Parent",
                            "value": "Parent",
                            "selected": true
                        },
                        {
                            "label": "Family",
                            "value": "Family",
                            "selected": false
                        },
                        {
                            "label": "Professional",
                            "value": "Professional",
                            "selected": false
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "subtype": "p",
                    "label": "Details of person you are referring to our service Please enter the details of the person you are referring in this section</div>"
                },
                {
                    "type": "text",
                    "required": true,
                    "label": "First Name",
                    "className": "form-control",
                    "name": "text-1747393699662-0",
                    "subtype": "text"
                },
                {
                    "type": "text",
                    "required": true,
                    "label": "Last Name",
                    "className": "form-control",
                    "name": "text-1747393699662-0",
                    "subtype": "text"
                },
                {
                    "type": "text",
                    "required": false,
                    "label": "Preferred Name",
                    "className": "form-control",
                    "name": "text-1747393729122-0",
                    "subtype": "text"
                },
                {
                    "type": "textarea",
                    "required": true,
                    "label": "Address",
                    "className": "form-control",
                    "name": "textarea-1747392000535-0",
                    "subtype": "textarea"
                },
                {
                    "type": "text",
                    "required": true,
                    "label": "Email",
                    "className": "form-control",
                    "name": "text-1747393741211-0",
                    "subtype": "text"
                },
                {
                    "type": "text",
                    "required": false,
                    "label": "Phone Number",
                    "className": "form-control",
                    "name": "text-1747393776960-0",
                    "subtype": "text"
                },
                {
                    "type": "select",
                    "required": true,
                    "label": "Which service are you referring yourself to?",
                    "className": "form-control",
                    "name": "select-1747393860748-0",
                    "values": [
                        {
                            "label": "Sevices",
                            "value": "services",
                            "selected": true
                        },
                        {
                            "label": "Option 2",
                            "value": "option-2",
                            "selected": false
                        }
                    ]
                },
                {
                    "type": "radio-group",
                    "required": false,
                    "label": "Gender",
                    "name": "radio-group-1747393911151-0",
                    "values": [
                        {
                            "label": "Male",
                            "value": "male",
                            "selected": false
                        },
                        {
                            "label": "Female",
                            "value": "female",
                            "selected": false
                        },
                        {
                            "label": "Other",
                            "value": "other",
                            "selected": false
                        }
                    ]
                },
                {
                    "type": "select",
                    "required": false,
                    "label": "Ethicity",
                    "className": "form-control",
                    "name": "select-1747393962260-0",
                    "values": [
                        {
                            "label": "Option 1",
                            "value": "option1",
                            "selected": true
                        },
                        {
                            "label": "Option 2",
                            "value": "option-2",
                            "selected": false
                        }
                    ]
                },
                {
                    "type": "select",
                    "required": false,
                    "label": "First Language",
                    "className": "form-control",
                    "name": "select-1747394001540-0",
                    "values": [
                        {
                            "label": "English",
                            "value": "English",
                            "selected": true
                        },
                        {
                            "label": "Hindi",
                            "value": "hindi",
                            "selected": false
                        }
                    ]
                },
                {
                    "type": "checkbox-group",
                    "required": false,
                    "label": "What are their hobbies",
                    "name": "checkbox-group-1747394065499-0",
                    "values": [
                        {
                            "label": "These options will be taken from 'tags' under the 'Hobbies & Interests' category and converted to tags on the service user profile if the form is used as a 'new referral  form)",
                            "value": "These options will be taken from 'tags' under the 'Hobbies & Interests' category and converted to tags on the service user profile if the form is used as a 'new referral  form)",
                            "selected": true
                        }
                    ]
                },
                {
                    "type": "text",
                    "required": false,
                    "label": "please tell us your reason for referral",
                    "className": "form-control",
                    "name": "text-1747394178686-0",
                    "subtype": "text"
                },
                {
                    "type": "checkbox-group",
                    "required": false,
                    "label": "Do you have a disability or condition that you would like us to be aware of, so we can better support you ?",
                    "name": "checkbox-group-1747390664112-0",
                    "values": [
                        {
                            "label": "Yes",
                            "value": "Yes",
                            "selected": true
                        },
                        {
                            "label": "Prefer Not to Answer",
                            "value": "Prefer Not to Answer",
                            "selected": false
                        }
                    ]
                },
                {
                    "type": "select",
                    "required": false,
                    "label": "Safeguarding/Risk Factors",
                    "className": "form-control",
                    "name": "select-1747394234523-0",
                    "values": [
                        {
                            "label": "Response to go into 'Risk Factors' section of profile",
                            "value": "Response to go into 'Risk Factors' section of profile",
                            "selected": true
                        }
                    ]
                },
                {
                    "type": "radio-group",
                    "required": false,
                    "label": "Please select your reason(s) for concern:",
                    "name": "radio-group-1747392615161-0",
                    "values": [
                        {
                            "label": "Options taken from 'Key Indicators of Concern' under config.",
                            "value": "Options taken from 'Key Indicators of Concern' under config.",
                            "selected": true
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            name: 'Volenteer Form',
            data: [
                {
                    "type": "header",
                    "subtype": "h1",
                    "label": "Volunteer Sign Up Form"
                },
                {
                    "type": "text",
                    "required": true,
                    "label": "First Name",
                    "className": "form-control",
                    "name": "text-1747390638003-0",
                    "subtype": "text"
                },
                {
                    "type": "text",
                    "required": true,
                    "label": "Last Name",
                    "className": "form-control",
                    "name": "text-1747390640020-0",
                    "subtype": "text"
                },
                {
                    "type": "text",
                    "required": true,
                    "label": "Contact Number",
                    "className": "form-control",
                    "name": "text-1747390643179-0",
                    "subtype": "text"
                },
                {
                    "type": "text",
                    "required": true,
                    "label": "Email",
                    "className": "form-control",
                    "name": "text-1747390648300-0",
                    "subtype": "text"
                },
                {
                    "type": "textarea",
                    "required": true,
                    "label": "Address",
                    "className": "form-control",
                    "name": "textarea-1747392000535-0",
                    "subtype": "textarea"
                },
                {
                    "type": "date",
                    "required": true,
                    "label": "Date Of Birth",
                    "className": "form-control",
                    "name": "date-1747390651030-0",
                    "subtype": "date"
                },
                {
                    "type": "radio-group",
                    "required": true,
                    "label": "When are you available?",
                    "name": "radio-group-1747392026637-0",
                    "values": [
                        {
                            "label": "Monday",
                            "value": "monday",
                            "selected": false
                        },
                        {
                            "label": "Tuesday",
                            "value": "tuesday",
                            "selected": false
                        },
                        {
                            "label": "Wednesday",
                            "value": "wednesday",
                            "selected": false
                        },
                        {
                            "label": "Saturday",
                            "value": "saturday",
                            "selected": false
                        }
                    ]
                },
                {
                    "type": "checkbox-group",
                    "required": true,
                    "label": "Do you any past experience in volunteer work ?",
                    "name": "checkbox-group-1747392385352-0",
                    "values": [
                        {
                            "label": "Yes",
                            "value": "yes",
                            "selected": true
                        },
                        {
                            "label": "no",
                            "value": "no",
                            "selected": false
                        }
                    ]
                },
                {
                    "type": "checkbox-group",
                    "required": false,
                    "label": "Please add any comments or questions you might have",
                    "name": "checkbox-group-1747392559988-0",
                    "values": [
                        {
                            "label": "Answer will go the 'notes' section if form is used to create a new volunteer under 'new referrals'",
                            "value": "Answer will go the 'notes' section if form is used to create a new volunteer under 'new referrals'",
                            "selected": true
                        }
                    ]
                },
                {
                    "type": "radio-group",
                    "required": false,
                    "label": "Interest and skills",
                    "name": "radio-group-1747392615161-0",
                    "values": [
                        {
                            "label": "These options will be taken from 'tags' under the 'Hobbies & Interests' category and converted to tags on the service user profile if the form is used as a 'new referral  form)",
                            "value": "These options will be taken from 'tags' under the 'Hobbies & Interests' category and converted to tags on the service user profile if the form is used as a 'new referral  form)",
                            "selected": true
                        },
                        {
                            "label": "Option 2",
                            "value": "option-2",
                            "selected": false
                        }
                    ]
                },
                {
                    "type": "checkbox-group",
                    "required": false,
                    "label": "Do you have a disability or condition that you would like us to be aware of, so we can better support you ?",
                    "name": "checkbox-group-1747390664112-0",
                    "values": [
                        {
                            "label": "Yes",
                            "value": "Yes",
                            "selected": true
                        },
                        {
                            "label": "Prefer Not to Answer",
                            "value": "Prefer Not to Answer",
                            "selected": false
                        }
                    ]
                }
            ]
        },
        {
            id: 3,
            name: 'Workshop Form',
            data: [
                {
                    "type": "header",
                    "subtype": "h1",
                    "label": "WorkShop Form"
                },
                {
                    "type": "text",
                    "required": true,
                    "label": "First Name",
                    "className": "form-control",
                    "name": "text-1747390638003-0",
                    "subtype": "text"
                },
                {
                    "type": "text",
                    "required": true,
                    "label": "Last Name",
                    "className": "form-control",
                    "name": "text-1747390640020-0",
                    "subtype": "text"
                },
                {
                    "type": "text",
                    "required": true,
                    "label": "Contact Number",
                    "className": "form-control",
                    "name": "text-1747390643179-0",
                    "subtype": "text"
                },
                {
                    "type": "text",
                    "required": true,
                    "label": "Email",
                    "className": "form-control",
                    "name": "text-1747390648300-0",
                    "subtype": "text"
                },
                {
                    "type": "date",
                    "required": true,
                    "label": "Date Of Birth",
                    "className": "form-control",
                    "name": "date-1747390651030-0",
                    "subtype": "date"
                },
                {
                    "type": "select",
                    "required": false,
                    "label": "First Language",
                    "className": "form-control",
                    "name": "select-1747390659031-0",
                    "values": [
                        {
                            "label": "English",
                            "value": "english",
                            "selected": true
                        },
                        {
                            "label": "Hindi",
                            "value": "hindi",
                            "selected": false
                        }
                    ]
                },
                {
                    "type": "checkbox-group",
                    "required": false,
                    "label": "Do you have a disability or condition that you would like us to be aware of, so we can better support you ?",
                    "name": "checkbox-group-1747390664112-0",
                    "values": [
                        {
                            "label": "Yes -Physical disability",
                            "value": "Yes -Physical disability",
                            "selected": false
                        },
                        {
                            "label": "Yes - Mental Health need",
                            "value": "Yes - Mental Health need",
                            "selected": false
                        },
                        {
                            "label": "Yes - Learning difficulties",
                            "value": "Yes - Learning difficulties",
                            "selected": false
                        },
                        {
                            "label": "Yes - Other",
                            "value": "Yes - Other",
                            "selected": false
                        },
                        {
                            "label": "Prefer Not to Answer",
                            "value": "Prefer Not to Answer",
                            "selected": false
                        }
                    ]
                },
                {
                    "type": "text",
                    "required": false,
                    "label": "If yes, please provide any details that would help us understand your needs and ensure appropriate accommodations",
                    "className": "form-control",
                    "name": "text-1747390671327-0",
                    "subtype": "text"
                },
                {
                    "type": "select",
                    "required": true,
                    "label": "Please choose which session you will be attending",
                    "className": "form-control",
                    "name": "select-1747390674293-0",
                    "values": [
                        {
                            "label": "Day1",
                            "value": "Day1",
                            "selected": true
                        },
                        {
                            "label": "Day2",
                            "value": "Day2",
                            "selected": false
                        },
                        {
                            "label": "Day3",
                            "value": "Day3",
                            "selected": false
                        }
                    ]
                },
                {
                    "type": "radio-group",
                    "required": true,
                    "label": "Dietary restrictions",
                    "name": "radio-group-1747390677832-0",
                    "values": [
                        {
                            "label": "none",
                            "value": "none",
                            "selected": false
                        },
                        {
                            "label": "veg",
                            "value": "veg",
                            "selected": false
                        },
                        {
                            "label": "vegan",
                            "value": "vegan",
                            "selected": false
                        },
                        {
                            "label": "other",
                            "value": "other",
                            "selected": false
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "subtype": "p",
                    "label": "Please let us know if we may contact you through the following channels for the purposes outlined below. You can choose your preferences by selecting the appropriate options"
                },
                {
                    "type": "radio-group",
                    "required": false,
                    "label": "Phone",
                    "name": "radio-group-1747732324317-0",
                    "values": [
                        {
                            "label": "News Letter",
                            "value": "newsLetter",
                            "selected": false
                        },
                        {
                            "label": "Upcoming Event",
                            "value": "upcomingEvent",
                            "selected": false
                        }
                    ]
                },
                {
                    "type": "radio-group",
                    "required": false,
                    "label": "Email",
                    "name": "radio-group-1747732676617-0",
                    "values": [
                        {
                            "label": "News Letter",
                            "value": "newsLetter",
                            "selected": false
                        },
                        {
                            "label": "Upcoming Event",
                            "value": "upcomingEvent",
                            "selected": false
                        }
                    ]
                },
                {
                    "type": "radio-group",
                    "required": false,
                    "label": "SMS",
                    "name": "radio-group-1747732678352-0",
                    "values": [
                        {
                            "label": "News Letter",
                            "value": "newsLetter",
                            "selected": false
                        },
                        {
                            "label": "Upcoming Event",
                            "value": "upcomingEvent",
                            "selected": false
                        }
                    ]
                },
                {
                    "type": "radio-group",
                    "required": false,
                    "label": "Letter",
                    "name": "radio-group-1747732679740-0",
                    "values": [
                        {
                            "label": "News Letter",
                            "value": "newsLetter",
                            "selected": false
                        },
                        {
                            "label": "Upcoming Event",
                            "value": "upcomingEvent",
                            "selected": false
                        }
                    ]
                }
            ]
        },
        {
            id: 4,
            name: 'Satisfaction Survey',
            data: [
                {
                    "type": "header",
                    "subtype": "h1",
                    "label": "Satisfaction Survey"
                },
                {
                    "type": "text",
                    "required": false,
                    "label": "Name",
                    "className": "form-control",
                    "name": "text-1747390638003-0",
                    "subtype": "text"
                },
                {
                    "type": "text",
                    "required": false,
                    "label": "Email",
                    "className": "form-control",
                    "name": "text-1747390648300-0",
                    "subtype": "text"
                },
                {
                    "type": "text",
                    "required": false,
                    "label": "Contact Number",
                    "className": "form-control",
                    "name": "text-1747390643179-0",
                    "subtype": "text"
                },
                {
                    "type": "radio-group",
                    "required": false,
                    "label": "I think your organisation have helped me to achieve my goals: (1 -Strongly Disagree, 5 -Strongly Disagree)",
                    "name": "radio-group-1747730913543-0",
                    "values": [
                        {
                            "label": "1",
                            "value": "1",
                            "selected": false
                        },
                        {
                            "label": "2",
                            "value": "2",
                            "selected": false
                        },
                        {
                            "label": "3",
                            "value": "3",
                            "selected": false
                        },
                        {
                            "label": "4",
                            "value": "4",
                            "selected": false
                        },
                        {
                            "label": "5",
                            "value": "5",
                            "selected": false
                        }
                    ]
                },
                {
                    "type": "radio-group",
                    "required": false,
                    "label": "The staff/Mentor at your organisation have treated me fairly and with respect: (1 -Strongly Disagree, 5 -Strongly Disagree)",
                    "name": "radio-group-1747731020035-0",
                    "values": [
                        {
                            "label": "1",
                            "value": "1",
                            "selected": false
                        },
                        {
                            "label": "2",
                            "value": "2",
                            "selected": false
                        },
                        {
                            "label": "3",
                            "value": "3",
                            "selected": false
                        },
                        {
                            "label": "4",
                            "value": "4",
                            "selected": false
                        },
                        {
                            "label": "5",
                            "value": "5",
                            "selected": false
                        }
                    ]
                },
                {
                    "type": "radio-group",
                    "required": false,
                    "label": "I am now more able to deal with issues and problems in my life than I was before: (1 -Strongly Disagree, 5 -Strongly Disagree)",
                    "name": "radio-group-1747731049575-0",
                    "values": [
                        {
                            "label": "1",
                            "value": "1",
                            "selected": false
                        },
                        {
                            "label": "2",
                            "value": "2",
                            "selected": false
                        },
                        {
                            "label": "3",
                            "value": "3",
                            "selected": false
                        },
                        {
                            "label": "4",
                            "value": "4",
                            "selected": false
                        },
                        {
                            "label": "5",
                            "value": "5",
                            "selected": false
                        }
                    ]
                },
                {
                    "type": "radio-group",
                    "required": false,
                    "label": "I now feel more positive about my future: (1 -Strongly Disagree, 5 -Strongly Disagree)",
                    "name": "radio-group-1747731068376-0",
                    "values": [
                        {
                            "label": "1",
                            "value": "1",
                            "selected": false
                        },
                        {
                            "label": "2",
                            "value": "2",
                            "selected": false
                        },
                        {
                            "label": "3",
                            "value": "3",
                            "selected": false
                        },
                        {
                            "label": "4",
                            "value": "4",
                            "selected": false
                        },
                        {
                            "label": "5",
                            "value": "5",
                            "selected": false
                        }
                    ]
                },
                {
                    "type": "radio-group",
                    "required": false,
                    "label": "I am satisfied with the service I received from your organisation: (1 -Strongly Disagree, 5 -Strongly Disagree)",
                    "name": "radio-group-1747731098042-0",
                    "values": [
                        {
                            "label": "1",
                            "value": "1",
                            "selected": false
                        },
                        {
                            "label": "2",
                            "value": "2",
                            "selected": false
                        },
                        {
                            "label": "3",
                            "value": "3",
                            "selected": false
                        },
                        {
                            "label": "4",
                            "value": "4",
                            "selected": false
                        },
                        {
                            "label": "5",
                            "value": "5",
                            "selected": false
                        }
                    ]
                },
                {
                    "type": "text",
                    "required": true,
                    "label": "In what way/s could the service/s provided to me by your organisation be improved?",
                    "className": "form-control",
                    "name": "text-1747394178686-0",
                    "subtype": "text"
                },
                {
                    "type": "textarea",
                    "required": true,
                    "label": "I'd also like to add...",
                    "className": "form-control",
                    "name": "textarea-1747731154988-0",
                    "subtype": "textarea"
                }
            ]
        },
        {
            id: 5,
            name: 'New Form',
            data: [
                {
                    "type": "header",
                    "subtype": "h1",
                    "label": "Form Heading"
                }
            ]
        }
    ];

    const handleSelect = (id) => {
        setSelectedTemplate(id);
        const selected = templates.find(t => t.id === id);
        if (selected) {
            setTemplateData(selected.data);
        }
    };

    const handleContinue = () => {
        if (selectedTemplate !== null) {
            setPreset(false)
        } else {
            toast.error('Please select a template to continue.');
        }
    };

    const containerStyle = {
        display: 'flex',
        // flexWrap: 'wrap',
        gap: '20px',
        margin: '20px 0',
        justifyContent: 'center',
        // maxWidth: '540px',
        // marginLeft: 'auto',
        // marginRight: 'auto'
    };

    const boxStyle = (isSelected) => ({
        padding: '20px',
        border: `2px solid ${isSelected ? '#007bff' : '#ccc'}`,
        borderRadius: '8px',
        cursor: 'pointer',
        width: '150px',
        textAlign: 'center',
        backgroundColor: isSelected ? '#e6f0ff' : '#fff',
        transition: 'all 0.3s ease'
    });

    return (
        <div style={{
            padding: '20px'
        }}>
            <Box sx={{
                w: 'full',
                display: 'flex',
                justifyContent: 'flex-end',
                mb: '-40px'
            }}>
                <CancelIcon onClick={onClose} sx={{ cursor: 'pointer' }} />
            </Box>
            <h3 style={{ textAlign: 'center', fontSize: '20px' }}>Select Template</h3>
            <div style={containerStyle}>
                {templates.map((template) => (
                    <button
                        key={template.id}
                        style={boxStyle(selectedTemplate === template.id)}
                        onClick={() => handleSelect(template.id)
                        }
                    >
                        {template.name}
                    </button>
                ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant='contained' color='secondary'
                    onClick={handleContinue}
                    style={{}}>Continue</Button>
            </div>
        </div>
    );
};

export default DefaultFields;
