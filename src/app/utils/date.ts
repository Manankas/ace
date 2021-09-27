import * as moment from 'moment';

const FORMATS = {
  dateOnly: 'DD/MM/YYYY',
}

export const toDate = (date: number, format = 'DD/MM/YYYY') => moment(date).format(format);
