var express = require('express');
var app = express();

// Display view delivery date and time page 
 
app.get('/', function (req, res) {
     
	 var val  = req.session.delvy_date;
	 var val2 = req.session.delvy_time_window;
	 
	 var today 	    = new Date(val);
														     var months 	    = today.getMonth();
														     var day   	    = today.getDate();
														     var year       = today.getFullYear();
														     var day_number = today.getDay();
		var weekday=new Array(7);
															weekday[0]="Mon";weekday[1]="Tue";weekday[2]="Wed";weekday[3]="Thu";
															weekday[4]="Fri";weekday[5]="Sat";weekday[6]="Sun";
															var dayName = weekday[day_number];
															
															var month=new Array(12);
															month[0]="Jan";month[1]="Feb";month[2]="Mar";month[3]="Apr";
															month[4]="May";month[5]="Jun";month[6]="Jul";month[7]="Aug";
															month[8]="Sep";month[9]="Oct";month[10]="Nov";month[11]="Dec";
															var monthName = month[months];
															
																											 var date= dayName+' '+monthName+' '+day;
	 
     res.render('pages/live_del_datetime_cart/view-live-del-datetime-cart',{deldate_sess:date,delvytime_window:val2});
	 //res.render('pages/live_del_datetime_cart/view-live-del-datetime-cart' );
	 
});

/** 
 * We assign app object to module.exports
 * 
 * module.exports exposes the app object as a module
 * 
 * module.exports should be used to return the object 
 * when this file is required in another module like app.js
 */ 
module.exports = app;