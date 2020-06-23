
function getDaysLeft (str_date) {
    let startdate = new Date(str_date);

    //Normalize the date and eliminate the unwanted offset 
    startdate =  new Date( startdate.getTime() - startdate.getTimezoneOffset() * -60000 ) ;
    let currentdate = new Date();
    currentdate = new Date( currentdate.getTime() - currentdate.getTimezoneOffset() * -60000 ) ;
    
    // Get countdown
    const countdown = Math.floor((Date.UTC(startdate.getFullYear(), startdate.getMonth(), startdate.getDate()) - Date.UTC(currentdate.getFullYear(), currentdate.getMonth(), currentdate.getDate()) ) /(1000 * 60 * 60 * 24));
    return countdown;
  };

  export {getDaysLeft}