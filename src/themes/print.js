
import React from 'react';

const PrintStyles = ({ targetId = 'print-chart' }) => (
  <style>
    {`
      @media print {
        body * {
          visibility: hidden !important;
        }
        #${targetId}, #${targetId} * {
          visibility: visible !important;
        }
        #${targetId} {
          position: absolute !important;
          top: 0;
          left: 0;
          width: 100% !important;
        }
      }
    `}
  </style>
);

export default PrintStyles;
