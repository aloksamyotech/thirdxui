import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Switch,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { urls } from 'common/urls';
import { getApi } from 'common/apiClient';
import { useEffect } from 'react';

const DefaultFields = ({ templateData, setTemplateData, setPreset, onClose, setFormValues }) => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    // const templates = [
    //     {
    //         id: 1,
    //         name: 'Community Refferal Form',
    //         data: [
    //             {
    //                 "type": "header",
    //                 "subtype": "h1",
    //                 "label": "Community Referral"
    //             },
    //             {
    //                 "type": "text",
    //                 "required": true,
    //                 "label": "Name",
    //                 "className": "form-control",
    //                 "name": "text-1747390638003-0",
    //                 "subtype": "text"
    //             },
    //             {
    //                 "type": "text",
    //                 "required": true,
    //                 "label": "Contact Number",
    //                 "className": "form-control",
    //                 "name": "text-1747390643179-0",
    //                 "subtype": "text"
    //             },
    //             {
    //                 "type": "text",
    //                 "required": true,
    //                 "label": "Email",
    //                 "className": "form-control",
    //                 "name": "text-1747390648300-0",
    //                 "subtype": "text"
    //             },
    //             {
    //                 "type": "text",
    //                 "required": true,
    //                 "label": "Job Role",
    //                 "className": "form-control",
    //                 "name": "text-1747390640020-0",
    //                 "subtype": "text"
    //             },
    //             {
    //                 "type": "select",
    //                 "required": true,
    //                 "label": "What is you relationship to the person you are referring?",
    //                 "className": "form-control",
    //                 "name": "select-1747393619538-0",
    //                 "values": [
    //                     {
    //                         "label": "Parent",
    //                         "value": "Parent",
    //                         "selected": true
    //                     },
    //                     {
    //                         "label": "Family",
    //                         "value": "Family",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "Professional",
    //                         "value": "Professional",
    //                         "selected": false
    //                     }
    //                 ]
    //             },
    //             {
    //                 "type": "paragraph",
    //                 "subtype": "p",
    //                 "label": "Details of person you are referring to our service Please enter the details of the person you are referring in this section</div>"
    //             },
    //             {
    //                 "type": "text",
    //                 "required": true,
    //                 "label": "First Name",
    //                 "className": "form-control",
    //                 "name": "text-1747393699662-0",
    //                 "subtype": "text"
    //             },
    //             {
    //                 "type": "text",
    //                 "required": true,
    //                 "label": "Last Name",
    //                 "className": "form-control",
    //                 "name": "text-1747393699662-0",
    //                 "subtype": "text"
    //             },
    //             {
    //                 "type": "text",
    //                 "required": false,
    //                 "label": "Preferred Name",
    //                 "className": "form-control",
    //                 "name": "text-1747393729122-0",
    //                 "subtype": "text"
    //             },
    //             {
    //                 "type": "textarea",
    //                 "required": true,
    //                 "label": "Address",
    //                 "className": "form-control",
    //                 "name": "textarea-1747392000535-0",
    //                 "subtype": "textarea"
    //             },
    //             {
    //                 "type": "text",
    //                 "required": true,
    //                 "label": "Email",
    //                 "className": "form-control",
    //                 "name": "text-1747393741211-0",
    //                 "subtype": "text"
    //             },
    //             {
    //                 "type": "text",
    //                 "required": false,
    //                 "label": "Phone Number",
    //                 "className": "form-control",
    //                 "name": "text-1747393776960-0",
    //                 "subtype": "text"
    //             },
    //             {
    //                 "type": "select",
    //                 "required": true,
    //                 "label": "Which service are you referring yourself to?",
    //                 "className": "form-control",
    //                 "name": "select-1747393860748-0",
    //                 "values": [
    //                     {
    //                         "label": "Sevices",
    //                         "value": "services",
    //                         "selected": true
    //                     },
    //                     {
    //                         "label": "Option 2",
    //                         "value": "option-2",
    //                         "selected": false
    //                     }
    //                 ]
    //             },
    //             {
    //                 "type": "radio-group",
    //                 "required": false,
    //                 "label": "Gender",
    //                 "name": "radio-group-1747393911151-0",
    //                 "values": [
    //                     {
    //                         "label": "Male",
    //                         "value": "male",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "Female",
    //                         "value": "female",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "Other",
    //                         "value": "other",
    //                         "selected": false
    //                     }
    //                 ]
    //             },
    //             {
    //                 "type": "select",
    //                 "required": false,
    //                 "label": "Ethicity",
    //                 "className": "form-control",
    //                 "name": "select-1747393962260-0",
    //                 "values": [
    //                     {
    //                         "label": "Option 1",
    //                         "value": "option1",
    //                         "selected": true
    //                     },
    //                     {
    //                         "label": "Option 2",
    //                         "value": "option-2",
    //                         "selected": false
    //                     }
    //                 ]
    //             },
    //             {
    //                 "type": "select",
    //                 "required": false,
    //                 "label": "First Language",
    //                 "className": "form-control",
    //                 "name": "select-1747394001540-0",
    //                 "values": [
    //                     {
    //                         "label": "English",
    //                         "value": "English",
    //                         "selected": true
    //                     },
    //                     {
    //                         "label": "Hindi",
    //                         "value": "hindi",
    //                         "selected": false
    //                     }
    //                 ]
    //             },
    //             {
    //                 "type": "checkbox-group",
    //                 "required": false,
    //                 "label": "What are their hobbies",
    //                 "name": "checkbox-group-1747394065499-0",
    //                 "values": [
    //                     {
    //                         "label": "These options will be taken from 'tags' under the 'Hobbies & Interests' category and converted to tags on the service user profile if the form is used as a 'new referral  form)",
    //                         "value": "These options will be taken from 'tags' under the 'Hobbies & Interests' category and converted to tags on the service user profile if the form is used as a 'new referral  form)",
    //                         "selected": true
    //                     }
    //                 ]
    //             },
    //             {
    //                 "type": "text",
    //                 "required": false,
    //                 "label": "please tell us your reason for referral",
    //                 "className": "form-control",
    //                 "name": "text-1747394178686-0",
    //                 "subtype": "text"
    //             },
    //             {
    //                 "type": "checkbox-group",
    //                 "required": false,
    //                 "label": "Do you have a disability or condition that you would like us to be aware of, so we can better support you ?",
    //                 "name": "checkbox-group-1747390664112-0",
    //                 "values": [
    //                     {
    //                         "label": "Yes",
    //                         "value": "Yes",
    //                         "selected": true
    //                     },
    //                     {
    //                         "label": "Prefer Not to Answer",
    //                         "value": "Prefer Not to Answer",
    //                         "selected": false
    //                     }
    //                 ]
    //             },
    //             {
    //                 "type": "select",
    //                 "required": false,
    //                 "label": "Safeguarding/Risk Factors",
    //                 "className": "form-control",
    //                 "name": "select-1747394234523-0",
    //                 "values": [
    //                     {
    //                         "label": "Response to go into 'Risk Factors' section of profile",
    //                         "value": "Response to go into 'Risk Factors' section of profile",
    //                         "selected": true
    //                     }
    //                 ]
    //             },
    //             {
    //                 "type": "radio-group",
    //                 "required": false,
    //                 "label": "Please select your reason(s) for concern:",
    //                 "name": "radio-group-1747392615161-0",
    //                 "values": [
    //                     {
    //                         "label": "Options taken from 'Key Indicators of Concern' under config.",
    //                         "value": "Options taken from 'Key Indicators of Concern' under config.",
    //                         "selected": true
    //                     }
    //                 ]
    //             }
    //         ],
    //         title: ['Community Refferal Form']
    //     },
    //     {
    //         id: 2,
    //         name: 'Volunteer Form',
    //         data: [
    //             {
    //                 "type": "header",
    //                 "subtype": "h1",
    //                 "label": "Volunteer Sign Up Form"
    //             },
    //             {
    //                 "type": "text",
    //                 "required": true,
    //                 "label": "First Name",
    //                 "className": "form-control",
    //                 "name": "text-1747390638003-0",
    //                 "subtype": "text"
    //             },
    //             {
    //                 "type": "text",
    //                 "required": true,
    //                 "label": "Last Name",
    //                 "className": "form-control",
    //                 "name": "text-1747390640020-0",
    //                 "subtype": "text"
    //             },
    //             {
    //                 "type": "text",
    //                 "required": true,
    //                 "label": "Contact Number",
    //                 "className": "form-control",
    //                 "name": "text-1747390643179-0",
    //                 "subtype": "text"
    //             },
    //             {
    //                 "type": "text",
    //                 "required": true,
    //                 "label": "Email",
    //                 "className": "form-control",
    //                 "name": "text-1747390648300-0",
    //                 "subtype": "text"
    //             },
    //             {
    //                 "type": "text",
    //                 "required": true,
    //                 "label": "Age",
    //                 "className": "form-control",
    //                 "name": "text-1747390648300-0",
    //                 "subtype": "text"
    //             },
    //             {
    //                 "type": "date",
    //                 "required": true,
    //                 "label": "Date Of Birth",
    //                 "className": "form-control",
    //                 "name": "date-1747390651030-0",
    //                 "subtype": "date"
    //             },
    //             {
    //                 "type": "radio-group",
    //                 "required": true,
    //                 "label": "Gender",
    //                 "name": "radio-group-1747392026637-0",
    //                 "values": [
    //                     {
    //                         "label": "Male",
    //                         "value": "male",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "Female",
    //                         "value": "female",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "Other",
    //                         "value": "other",
    //                         "selected": false
    //                     },
    //                 ]
    //             },
    //             {
    //                 "type": "textarea",
    //                 "required": true,
    //                 "label": "Address",
    //                 "className": "form-control",
    //                 "name": "textarea-1747392000535-0",
    //                 "subtype": "textarea"
    //             },
    //             {
    //                 "type": "radio-group",
    //                 "required": false,
    //                 "label": "When are you available?",
    //                 "name": "radio-group-1747392026637-0",
    //                 "values": [
    //                     {
    //                         "label": "Monday",
    //                         "value": "monday",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "Tuesday",
    //                         "value": "tuesday",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "Wednesday",
    //                         "value": "wednesday",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "Saturday",
    //                         "value": "saturday",
    //                         "selected": false
    //                     }
    //                 ]
    //             },
    //             {
    //                 "type": "checkbox-group",
    //                 "required": false,
    //                 "label": "Do you any past experience in volunteer work ?",
    //                 "name": "checkbox-group-1747392385352-0",
    //                 "values": [
    //                     {
    //                         "label": "Yes",
    //                         "value": "yes",
    //                         "selected": true
    //                     },
    //                     {
    //                         "label": "no",
    //                         "value": "no",
    //                         "selected": false
    //                     }
    //                 ]
    //             },
    //             {
    //                 "type": "checkbox-group",
    //                 "required": false,
    //                 "label": "Please add any comments or questions you might have",
    //                 "name": "checkbox-group-1747392559988-0",
    //                 "values": [
    //                     {
    //                         "label": "Answer will go the 'notes' section if form is used to create a new volunteer under 'new referrals'",
    //                         "value": "Answer will go the 'notes' section if form is used to create a new volunteer under 'new referrals'",
    //                         "selected": true
    //                     }
    //                 ]
    //             },
    //             {
    //                 "type": "radio-group",
    //                 "required": false,
    //                 "label": "Interest and skills",
    //                 "name": "radio-group-1747392615161-0",
    //                 "values": [
    //                     {
    //                         "label": "These options will be taken from 'tags' under the 'Hobbies & Interests' category and converted to tags on the service user profile if the form is used as a 'new referral  form)",
    //                         "value": "These options will be taken from 'tags' under the 'Hobbies & Interests' category and converted to tags on the service user profile if the form is used as a 'new referral  form)",
    //                         "selected": true
    //                     },
    //                     {
    //                         "label": "Option 2",
    //                         "value": "option-2",
    //                         "selected": false
    //                     }
    //                 ]
    //             },
    //             {
    //                 "type": "checkbox-group",
    //                 "required": false,
    //                 "label": "Do you have a disability or condition that you would like us to be aware of, so we can better support you ?",
    //                 "name": "checkbox-group-1747390664112-0",
    //                 "values": [
    //                     {
    //                         "label": "Yes",
    //                         "value": "Yes",
    //                         "selected": true
    //                     },
    //                     {
    //                         "label": "Prefer Not to Answer",
    //                         "value": "Prefer Not to Answer",
    //                         "selected": false
    //                     }
    //                 ]
    //             }
    //         ],
    //         title: ['Volunteer Sign Up Form']
    //     },
    //     {
    //         id: 3,
    //         name: 'Workshop Form',
    //         data: [
    //             {
    //                 "type": "header",
    //                 "subtype": "h1",
    //                 "label": "WorkShop Form"
    //             },
    //             {
    //                 "type": "text",
    //                 "required": true,
    //                 "label": "First Name",
    //                 "className": "form-control",
    //                 "name": "text-1747390638003-0",
    //                 "subtype": "text"
    //             },
    //             {
    //                 "type": "text",
    //                 "required": true,
    //                 "label": "Last Name",
    //                 "className": "form-control",
    //                 "name": "text-1747390640020-0",
    //                 "subtype": "text"
    //             },
    //             {
    //                 "type": "text",
    //                 "required": true,
    //                 "label": "Contact Number",
    //                 "className": "form-control",
    //                 "name": "text-1747390643179-0",
    //                 "subtype": "text"
    //             },
    //             {
    //                 "type": "text",
    //                 "required": true,
    //                 "label": "Email",
    //                 "className": "form-control",
    //                 "name": "text-1747390648300-0",
    //                 "subtype": "text"
    //             },
    //             {
    //                 "type": "date",
    //                 "required": true,
    //                 "label": "Date Of Birth",
    //                 "className": "form-control",
    //                 "name": "date-1747390651030-0",
    //                 "subtype": "date"
    //             },
    //             {
    //                 "type": "select",
    //                 "required": false,
    //                 "label": "First Language",
    //                 "className": "form-control",
    //                 "name": "select-1747390659031-0",
    //                 "values": [
    //                     {
    //                         "label": "English",
    //                         "value": "english",
    //                         "selected": true
    //                     },
    //                     {
    //                         "label": "Hindi",
    //                         "value": "hindi",
    //                         "selected": false
    //                     }
    //                 ]
    //             },
    //             {
    //                 "type": "checkbox-group",
    //                 "required": false,
    //                 "label": "Do you have a disability or condition that you would like us to be aware of, so we can better support you ?",
    //                 "name": "checkbox-group-1747390664112-0",
    //                 "values": [
    //                     {
    //                         "label": "Yes -Physical disability",
    //                         "value": "Yes -Physical disability",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "Yes - Mental Health need",
    //                         "value": "Yes - Mental Health need",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "Yes - Learning difficulties",
    //                         "value": "Yes - Learning difficulties",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "Yes - Other",
    //                         "value": "Yes - Other",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "Prefer Not to Answer",
    //                         "value": "Prefer Not to Answer",
    //                         "selected": false
    //                     }
    //                 ]
    //             },
    //             {
    //                 "type": "text",
    //                 "required": false,
    //                 "label": "If yes, please provide any details that would help us understand your needs and ensure appropriate accommodations.",
    //                 "className": "form-control",
    //                 "name": "text-1747390671327-0",
    //                 "subtype": "text"
    //             },
    //             {
    //                 "type": "select",
    //                 "required": true,
    //                 "label": "Please choose which session you will be attending.",
    //                 "className": "form-control",
    //                 "name": "select-1747390674293-0",
    //                 "values": [
    //                     {
    //                         "label": "Day1",
    //                         "value": "Day1",
    //                         "selected": true
    //                     },
    //                     {
    //                         "label": "Day2",
    //                         "value": "Day2",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "Day3",
    //                         "value": "Day3",
    //                         "selected": false
    //                     }
    //                 ]
    //             },
    //             {
    //                 "type": "radio-group",
    //                 "required": true,
    //                 "label": "Dietary restrictions",
    //                 "name": "radio-group-1747390677832-0",
    //                 "values": [
    //                     {
    //                         "label": "none",
    //                         "value": "none",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "veg",
    //                         "value": "veg",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "vegan",
    //                         "value": "vegan",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "other",
    //                         "value": "other",
    //                         "selected": false
    //                     }
    //                 ]
    //             },
    //             {
    //                 "type": "paragraph",
    //                 "subtype": "p",
    //                 "label": "Please let us know if we may contact you through the following channels for the purposes outlined below. You can choose your preferences by selecting the appropriate options"
    //             },
    //             {
    //                 "type": "radio-group",
    //                 "required": false,
    //                 "label": "Phone",
    //                 "name": "radio-group-1747732324317-0",
    //                 "values": [
    //                     {
    //                         "label": "News Letter",
    //                         "value": "newsLetter",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "Upcoming Event",
    //                         "value": "upcomingEvent",
    //                         "selected": false
    //                     }
    //                 ]
    //             },
    //             {
    //                 "type": "radio-group",
    //                 "required": false,
    //                 "label": "Email",
    //                 "name": "radio-group-1747732676617-0",
    //                 "values": [
    //                     {
    //                         "label": "News Letter",
    //                         "value": "newsLetter",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "Upcoming Event",
    //                         "value": "upcomingEvent",
    //                         "selected": false
    //                     }
    //                 ]
    //             },
    //             {
    //                 "type": "radio-group",
    //                 "required": false,
    //                 "label": "SMS",
    //                 "name": "radio-group-1747732678352-0",
    //                 "values": [
    //                     {
    //                         "label": "News Letter",
    //                         "value": "newsLetter",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "Upcoming Event",
    //                         "value": "upcomingEvent",
    //                         "selected": false
    //                     }
    //                 ]
    //             },
    //             {
    //                 "type": "radio-group",
    //                 "required": false,
    //                 "label": "Letter",
    //                 "name": "radio-group-1747732679740-0",
    //                 "values": [
    //                     {
    //                         "label": "News Letter",
    //                         "value": "newsLetter",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "Upcoming Event",
    //                         "value": "upcomingEvent",
    //                         "selected": false
    //                     }
    //                 ]
    //             }
    //         ],
    //         title: ['Workshop Form']
    //     },
    //     {
    //         id: 4,
    //         name: 'Satisfaction Survey',
    //         data: [
    //             {
    //                 "type": "header",
    //                 "subtype": "h1",
    //                 "label": "Satisfaction Survey"
    //             },
    //             {
    //                 "type": "text",
    //                 "required": false,
    //                 "label": "Name",
    //                 "className": "form-control",
    //                 "name": "text-1747390638003-0",
    //                 "subtype": "text"
    //             },
    //             {
    //                 "type": "text",
    //                 "required": false,
    //                 "label": "Email",
    //                 "className": "form-control",
    //                 "name": "text-1747390648300-0",
    //                 "subtype": "text"
    //             },
    //             {
    //                 "type": "text",
    //                 "required": false,
    //                 "label": "Contact Number",
    //                 "className": "form-control",
    //                 "name": "text-1747390643179-0",
    //                 "subtype": "text"
    //             },
    //             {
    //                 "type": "radio-group",
    //                 "required": false,
    //                 "label": "I think your organisation have helped me to achieve my goals: (1 -Strongly Disagree, 5 -Strongly Disagree)",
    //                 "name": "radio-group-1747730913543-0",
    //                 "values": [
    //                     {
    //                         "label": "1",
    //                         "value": "1",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "2",
    //                         "value": "2",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "3",
    //                         "value": "3",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "4",
    //                         "value": "4",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "5",
    //                         "value": "5",
    //                         "selected": false
    //                     }
    //                 ]
    //             },
    //             {
    //                 "type": "radio-group",
    //                 "required": false,
    //                 "label": "The staff/Mentor at your organisation have treated me fairly and with respect: (1 -Strongly Disagree, 5 -Strongly Disagree)",
    //                 "name": "radio-group-1747731020035-0",
    //                 "values": [
    //                     {
    //                         "label": "1",
    //                         "value": "1",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "2",
    //                         "value": "2",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "3",
    //                         "value": "3",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "4",
    //                         "value": "4",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "5",
    //                         "value": "5",
    //                         "selected": false
    //                     }
    //                 ]
    //             },
    //             {
    //                 "type": "radio-group",
    //                 "required": false,
    //                 "label": "I am now more able to deal with issues and problems in my life than I was before: (1 -Strongly Disagree, 5 -Strongly Disagree)",
    //                 "name": "radio-group-1747731049575-0",
    //                 "values": [
    //                     {
    //                         "label": "1",
    //                         "value": "1",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "2",
    //                         "value": "2",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "3",
    //                         "value": "3",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "4",
    //                         "value": "4",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "5",
    //                         "value": "5",
    //                         "selected": false
    //                     }
    //                 ]
    //             },
    //             {
    //                 "type": "radio-group",
    //                 "required": false,
    //                 "label": "I now feel more positive about my future: (1 -Strongly Disagree, 5 -Strongly Disagree)",
    //                 "name": "radio-group-1747731068376-0",
    //                 "values": [
    //                     {
    //                         "label": "1",
    //                         "value": "1",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "2",
    //                         "value": "2",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "3",
    //                         "value": "3",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "4",
    //                         "value": "4",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "5",
    //                         "value": "5",
    //                         "selected": false
    //                     }
    //                 ]
    //             },
    //             {
    //                 "type": "radio-group",
    //                 "required": false,
    //                 "label": "I am satisfied with the service I received from your organisation: (1 -Strongly Disagree, 5 -Strongly Disagree)",
    //                 "name": "radio-group-1747731098042-0",
    //                 "values": [
    //                     {
    //                         "label": "1",
    //                         "value": "1",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "2",
    //                         "value": "2",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "3",
    //                         "value": "3",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "4",
    //                         "value": "4",
    //                         "selected": false
    //                     },
    //                     {
    //                         "label": "5",
    //                         "value": "5",
    //                         "selected": false
    //                     }
    //                 ]
    //             },
    //             {
    //                 "type": "text",
    //                 "required": true,
    //                 "label": "In what way/s could the service/s provided to me by your organisation be improved?",
    //                 "className": "form-control",
    //                 "name": "text-1747394178686-0",
    //                 "subtype": "text"
    //             },
    //             {
    //                 "type": "textarea",
    //                 "required": true,
    //                 "label": "I'd also like to add... ",
    //                 "className": "form-control",
    //                 "name": "textarea-1747731154988-0",
    //                 "subtype": "textarea"
    //             }
    //         ],
    //         title: ['Satisfaction Survey']
    //     },
    //     {
    //         id: 5,
    //         name: 'New Form',
    //         data: [
    //             {
    //                 "type": "header",
    //                 "subtype": "h1",
    //                 "label": "Form Heading"
    //             }
    //         ],
    //         title: ['New Form']
    //     }
    // ];

    const templates = [
        {
            id: 1,
            data: [
                {
                    "type": "header",
                    "subtype": "h1",
                    "label": "Form Display Title"
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
                    "type": "text",
                    "required": true,
                    "label": "Age",
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
                    "type": "radio-group",
                    "required": true,
                    "label": "Gender",
                    "name": "radio-group-1747392026637-0",
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
                        },
                    ]
                },
                {
                    "type": "textarea",
                    "required": true,
                    "label": "Address",
                    "className": "form-control",
                    "name": "textarea-1747392000535-0",
                    "subtype": "textarea"
                }
            ]
        }
    ];

    const records = [
        { id: 'service_user', value: 'Service User' },
        { id: 'volunteer', value: 'Volunteer' },
        { id: 'donar_individual', value: 'Donor Individual' },
        { id: 'donar_company', value: 'Donor Company' },
        { id: 'donor_group', value: 'Donor Group' },
    ]

  const validationSchema = yup.object({
    formType: yup.string().required('Form Type is Required.'),
    // formTitle: yup.
    //     string()
    //     .max(50, "Form Title Cannot Exeed 50 Characters.")
    //     .required('Form Title is Required.'),
    // formRecord: yup.
    //     string()
    //     .required('Form Record is Required.'),
    description: yup.string().max(50, 'Description Cannot Exceed 50 Characters.'),
    formRecord: yup.string().test('required-if-switch-true', 'Form Record is Required.', function (value) {
      const { createRecord } = this.parent; 
      if (createRecord) {
        return !!value; 
      }
      return true;
    })
  });

  const initialValues = {
    formType: '',
    // formTitle: '',
    description: '',
    formRecord: '',
    createRecord: false
  };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            setFormValues(values)
            setSelectedTemplate(values?.formType);
            // const selected = templates.find(t => t.id === values?.formType);
            // if (selected) {
            //     setTemplateData(selected.data);
            // }
            setTemplateData(templates[0].data);
            setPreset(false)
            formik?.resetForm();
        }
    });
    const [formTypes, setFormTypes] = useState([])

    const fetchData = async () => {
        try {
            const queryParams = new URLSearchParams();
            queryParams.append('configurationType', 'Form Types');
            const response = await getApi(`${urls.configuration.fetchWithPagination}?${queryParams.toString()}`);
            setFormTypes(response?.data?.data)

        } catch (error) {
            console.error('Error fetching config:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [])

  return (
    <div
      style={{
        padding: '10px 20px'
      }}
    >
      <p style={{ textAlign: 'start' }}>ADD FORM</p>
      <Grid container spacing={2} rowSpacing={2} sx={{ pb: '20px' }}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="formType">Form Type</InputLabel>
            <Select
              labelId="formType"
              label="Form Type"
              id="formType"
              name="formType"
              size="small"
              value={formik.values.formType}
              onChange={formik.handleChange}
              error={formik.touched.formType && Boolean(formik.errors.formType)}
            >
              {/* {templates.map((template) => (
                                <MenuItem value={template?.id} key={template?.id}>{template?.name}</MenuItem>
                            ))} */}
              {formTypes.map((template) => (
                <MenuItem value={template?.name} key={template?._id}>
                  {template?.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: '#e74c3c' }}>{formik?.touched?.formType && formik?.errors?.formType}</FormHelperText>
          </FormControl>
        </Grid>
        {/* <Grid item xs={6}>
                    <FormControl fullWidth>
                        <Select
                            labelId='title'
                            label='Form Display Title'
                            id="formTitle"
                            name="formTitle"
                            size="small"
                            value={formik.values.formTitle}
                            onChange={formik.handleChange}
                            // disabled={!selectedTemplateObj}
                            error={formik.touched.formTitle && Boolean(formik.errors.formTitle)}
                        >
                            {dynamicTitles.map((template, i) => (
                                <MenuItem value={template} key={i}>{template}</MenuItem>
                            ))}
                        </Select>
                        <TextField
                            id="title"
                            name="formTitle"
                            size="small"
                            placeholder='Form Display Title'
                            value={formik.values.formTitle}
                            onChange={formik.handleChange}
                            error={formik.touched.formTitle && Boolean(formik.errors.formTitle)}
                        />
                        <FormHelperText sx={{ color: '#e74c3c' }}>{formik?.touched?.formTitle && formik?.errors?.formTitle}</FormHelperText>
                    </FormControl>
                </Grid> */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              id="description"
              name="description"
              size="small"
              placeholder="Form Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
            />
            <FormHelperText sx={{ color: '#e74c3c' }}>{formik?.touched?.description && formik?.errors?.description}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="record">Choose the type of record</InputLabel>
            <Select
              labelId="record"
              label="Choose the type of record"
              id="formRecord"
              name="formRecord"
              size="small"
              value={formik.values.formRecord}
              onChange={formik.handleChange}
              error={formik.touched.formRecord && Boolean(formik.errors.formRecord)}
            >
              {records.map((template, i) => (
                <MenuItem value={template?.id} key={i}>
                  {template?.value}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: '#e74c3c' }}>{formik?.touched?.formRecord && formik?.errors?.formRecord}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: 3,
          p: 1
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Will This Form Be Used To Create A Persons Record?
          </Typography>
          <Switch
            checked={formik.values.createRecord}
            onChange={(e) => formik.setFieldValue('createRecord', e.target.checked)}
            color="primary"
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" sx={{ bgcolor: '#053146', color: '#fff', textTransform: 'none' }} onClick={formik.handleSubmit}>
            Save Changes
          </Button>

          <Button
            variant="outlined"
            sx={{
              color: '#8287ff',
              border: '1px solid #8287ff',
              textTransform: 'none'
            }}
            onClick={() => {
              formik.resetForm();
              onClose();
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default DefaultFields;
