const moment = require('moment');

function convertDate_to_String(dateObj) { 
  let momentObj = moment(dateObj);
  return momentObj.format('YYYY-MM-DD');
} ;

function convertStr_to_Date(str) { 
  return moment(str, 'YYYY-MM-DD').toDate();  
};

function getDaysLeft (str_date) {
    let startdate = convertStr_to_Date(str_date);
    //Normalize the date and eliminate the unwanted offset 
    startdate =  new Date( startdate.getTime() - startdate.getTimezoneOffset() * -60000 ) ;
    let currentdate = new Date();
    currentdate = new Date( currentdate.getTime() - currentdate.getTimezoneOffset() * -60000 ) ;
    // Get countdown
    const countdown = Math.floor((Date.UTC(startdate.getFullYear(), startdate.getMonth(), startdate.getDate()) - Date.UTC(currentdate.getFullYear(), currentdate.getMonth(), currentdate.getDate()) ) /(1000 * 60 * 60 * 24));
    return countdown;
  };

  function getLastYearDay(ip_date_str) {
    let ip_day = moment(ip_date_str, 'YYYY-MM-DD');
    let last_year_day = ip_day.clone().subtract(1,'years');
    return last_year_day.format('YYYY-MM-DD');
  };

  function addOneday (ip_date_str) {
    let ip_day = moment(ip_date_str, 'YYYY-MM-DD');
    let next_day = ip_day.clone().add(1,'days');
    return next_day.format('YYYY-MM-DD');
  };

  export {getDaysLeft, getLastYearDay, addOneday,convertDate_to_String,convertStr_to_Date }