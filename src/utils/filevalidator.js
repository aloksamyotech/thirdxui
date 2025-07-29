
// export const validateFile = (file) => {
//   const allowedTypes = [
//     'application/pdf',
//     'application/msword',
//     'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
//   ];
//   const maxSizeInBytes = 25 * 1024 * 1024;

//   if (!file) return true; // No file is fine (if optional)

//   if (!allowedTypes.includes(file.type)) {
//     return 'Only PDF, DOC, and DOCX files are allowed.';
//   }

//   if (file.size > maxSizeInBytes) {
//     return 'File size must be less than or equal to 25MB.';
//   }

//   return true;
// };
export const validateFile = (file) => {
  const allowedTypes = [
    'application/pdf',
    'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
    'image/jpeg',
    'image/png', 
  ];

  const maxSizeInBytes = 25 * 1024 * 1024;

  if (!file) return true; 

  if (!allowedTypes.includes(file.type)) {
    return 'Only JPG, JPEG, PNG, PDF, CSV, DOC, DOCX, and XLSX files are allowed.';
  }

  if (file.size > maxSizeInBytes) {
    return 'File size must be less than or equal to 25MB.';
  }

  return true;
};
