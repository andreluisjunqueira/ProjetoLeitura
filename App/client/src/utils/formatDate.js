import moment from 'moment';
import 'moment/locale/pt-br';
moment.locale("pt-br");

export const ptbr = (data)=>{
    return moment(new Date(data)).format('L h:mm:ss')
} 