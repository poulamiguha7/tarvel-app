import { formHandler } from './js/formHandler';
import { getCityLocation } from './js/getCityLocation';
import { getDaysLeft } from './js/util';
import { addOneday } from './js/util';
import { getLastYearDay } from './js/util';
import { convertDate_to_String } from './js/util';
import { convertStr_to_Date } from './js/util';
import { updateUI } from './js/updateUI';

import './styles/style.scss';

export {
    formHandler,
    getCityLocation,
    getDaysLeft,
    getLastYearDay,
    addOneday,
    convertDate_to_String,
    convertStr_to_Date,
    updateUI
};