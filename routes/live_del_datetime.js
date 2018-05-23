var express = require('express');
var app = express();

// Display view delivery date and time page 
 
app.get('/', function(req, res) {
   req.getConnection(function(error, conn) {
   
   var today 	  = new Date();
   var month 	  = today.getMonth()+ 1;
   var day   	  = today.getDate();
   var year       = today.getFullYear();
   var day_number = today.getDay();
   
   var hours      = today.getHours();
   var minutes    = today.getMinutes();
   var seconds    = today.getSeconds();
	
	console.log(day_number);
	
   if (month.length < 2) month = '0' + month;
   if (day.length < 2) day = '0' + day;
   // Today date	
   var today_date = year+'-'+month+'-'+day;
   
   //Time get from today date
   
   /*var ampm = hours >= 12 ? 'PM' : 'AM';
   hours = hours % 12;
   hours = hours ? hours : 12; // the hour '0' should be '12'
   minutes = minutes < 10 ? '0'+minutes : minutes;
   hours = hours < 10 ? '0'+hours : hours;
   var strTime  = hours + ':' + minutes + ' ' + ampm;
   var strtime2 = hours + ':00 ' + ampm;*/
  
   var day_check = ''; 	   
	  conn.query('select * from tbl_blackout_days where date="'+today_date+'" and store_id=26407184', function (error, results) {
	     // Check Blackout day
		 if (results.length==0) { 
		    
			req.getConnection(function(error, conn) {
				conn.query('select * from tbl_valid_times where day_id="'+day_number+'" and store_id=26407184', function (error, tw_results) {
				
				// Check No delivery day
				if(tw_results[0].delivery_day==0){
				day_check = 'No Delivery day';  
		        res.render('pages/live_del_datetime/view-live-del-datetime', {day_check_type : day_check} );	
				}
				else{
				
				
				req.getConnection(function(error, conn) {
				  conn.query('select * from tbl_notice_time_setting where store_id=26407184', function (error, nthm_results) {
					
					hours = hours+nthm_results[0].notice_time_hrs;
					
					minutes = minutes+parseInt(nthm_results[0].notice_time_mints);
					
					console.log(minutes);
					console.log(hours);
					if(minutes<=60){
					hours = hours +1;
					}
					if(minutes>60){
					hours = hours +1+1;
					minutes= minutes-60;
					}
					
					
					console.log(hours);
					var ampm = hours >= 12 ? 'PM' : 'AM';
				    hours = hours % 12;
				    hours = hours ? hours : 12; // the hour '0' should be '12'
					
					
					minutes = minutes < 10 ? '0'+minutes : minutes;
					hours = hours < 10 ? '0'+hours : hours;
					console.log(hours);
					var strTime  = hours + ':' + minutes + ' ' + ampm;
					var strtime2 = hours + ':00 ' + ampm;
					console.log(strTime);
					//console.log(strtime2);
					
					var time_window_array = tw_results[0].times_windows.split(',');
					
					//console.log(time_window_array);
				    var found_time_window = '';
				    for(var i=0;i<time_window_array.length;i++){
					  
					  var time_window_start = time_window_array[i].split('-');
					
					  var t1=Date.parse('20 Aug 2000 '+strtime2);
					  var t2=Date.parse('20 Aug 2000 '+time_window_start[0].trim());
					  var t3=Date.parse('20 Aug 2000 '+time_window_start[1].trim());
					  
					 /* console.log(t1);
					  console.log(t2);
					  console.log(t3);*/
					  if(t1>=t2 && t1<=t3){
					  console.log(t1);
					  console.log(t2);
					  console.log(t3)
						  
					  console.log(strtime2);
					  console.log(time_window_start[0].trim());
					  console.log(time_window_start[1].trim());	  
					  day_check = 'Yes Delivery day';	  
					  var found_time_window = 'Yes';
					  res.render('pages/live_del_datetime/view-live-del-datetime', {day_check_type : day_check, time_window : time_window_start[0].trim(), found_time : found_time_window, data : tw_results} );	 
					  break;
					  }
				  
				    }
					
					if(found_time_window==''){
					day_check = 'Yes Delivery day'; 	
					var found_time_window = 'No';
					res.render('pages/live_del_datetime/view-live-del-datetime', {day_check_type : day_check, found_time : found_time_window} );	
					}
					
				 });
			    });
				
	
				}
				
			   });
	   
	       });
			
		 }
		   
		 else {
		 day_check = 'Blackout day';  
		 res.render('pages/live_del_datetime/view-live-del-datetime', {data: results, day_check_type : day_check} );
		 }
	  
	   });
   });
});

app.post('/update', function (req, res) {
   var ntime_hrs        = req.body.ntime_hrs;
   var ntime_mints      = req.body.ntime_mints;
   var dtime_hrs        = req.body.dtime_hrs;
   var dtime_mints      = req.body.dtime_mints;
   var drate_limit      = req.body.drate_limit;
  
   req.getConnection(function(error, conn) {
   conn.query('UPDATE tbl_notice_time_setting SET notice_time_hrs='+ntime_hrs+', notice_time_mints="'+ntime_mints+'", delivery_time_hrs='+dtime_hrs+', delivery_time_mints="'+dtime_mints+'", delivery_rate_limit="'+drate_limit+'" where store_id=26407184', function (error, results) {
    if (error) {
    req.flash('error', error);
	
	conn.query('select * from tbl_notice_time_setting where store_id=26407184', function (error, results) {
    if (error) throw error;
    res.render('pages/nt_setting/notice-time-setting', {data: results} );
    });
	
	}
	
	else{
	req.flash('success', 'Notice Time/Delivery Time Updated successfully!');
	conn.query('select * from tbl_notice_time_setting where store_id=26407184', function (error, results) {
    if (error) throw error;
    res.render('pages/nt_setting/notice-time-setting', {data: results} );
    }); 
	}
	
   //res.render('pages/notice-time-setting', {data_msg: 'error'} );
   });
   });
  // res.render('pages/notice-time-setting', {data_msg: 'success'} );
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