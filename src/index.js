import { readFileSync } from 'fs';
import _ from 'lodash';

export default (filepath1, filepath2) => {
    const data1 = readFileSync(filepath1, 'utf-8');
    const data2 = readFileSync(filepath2, 'utf-8');

    // const parsedData1 = JSON.parse(data1);
    // const parsedData2 = JSON.parse(data2);

   console.log(data1);
   console.log(data2);
};