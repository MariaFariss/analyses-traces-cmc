import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';


export default function BarChartt({datas, labels, title}) {
    
const pData = datas;
const xLabels = labels;
  return (
    <BarChart
      width={500}
      height={300}
      series={[
        { data: pData, label: title, id: 'pvId', stack: 'total' },
        // { data: uData, label: 'uv', id: 'uvId', stack: 'total' },
      ]}
      xAxis={[{ data: xLabels, scaleType: 'band' }]}
    />
  );
}
