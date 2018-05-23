var express = require('express');
var app = express();

app.get('/', function (req, res) {
   console.log(req);
   req.getConnection(function(error, conn) {
	 conn.query('select * from tbl_valid_days', function (error, results) {
	 if (error) throw error;
	 res.render('pages/del_days_setting/del-days-setting', {data: results} );
	 });
   });
});


var obj = {};
app.get('/update-delivery-day/:id', function (req, res) {
   var id = req.params.id;
   
   req.getConnection(function(error, conn) {
   conn.query('select * from tbl_notice_time_setting where store_id=26407184', function (error, results) {
   if (error) throw error;
       
	   req.getConnection(function(error, conn) {
	   conn.query('select * from tbl_start_time', function (error, st_results) {
	   if (error) throw error;
	   
	       req.getConnection(function(error, conn) {
	       conn.query('select * from tbl_valid_times where day_id='+id+' and store_id=26407184', function (error, vt_results) {
	       if (error) throw error;
	   
		   var obj   = {};
		   obj.data  = results;
		   obj.data2 = st_results;
		   obj.data3 = vt_results;
		   
		   console.log(obj);
		   res.render('pages/del_days_setting/update-delivery-day', {udd_data: obj, did : req.params.id} );
		   
		   });
	       });
		   
       });
	   });
   });
   });
   
});

app.post('/update', function (req, res) {
   var dayid            = req.body.day_id;
   var delivery_day     = req.body.delivery_day;
   var start_time       = req.body.start_time_val;
   var end_time         = req.body.end_time_val;
   var delivery_time    = req.body.delivery_time;
   
   if(delivery_day==1){
	   var deltime = delivery_time.join(",");
	   req.getConnection(function(error, conn) {
		 
		 conn.query('UPDATE tbl_valid_times SET start_time="'+start_time+'", end_time="'+end_time+'", times_windows="'+deltime+'", delivery_day='+delivery_day+' where day_id='+dayid+' and store_id=26407184', function (error, results) {
		    if (error) {
                req.flash('error', err)
                // redirect to users list page
                res.redirect('/pages/del_days_setting/update-delivery-day/'+dayid)
            }
			else {
                req.flash('success', 'Time Windows are Updated successfully')
                // redirect to users list page
                res.redirect('/pages/del_days_setting/update-delivery-day/'+dayid)
            }
			
		 });
	   
	   });
	   
   }
   
   if(delivery_day==0){
       req.getConnection(function(error, conn) {
		 
		 conn.query('UPDATE tbl_valid_times SET start_time="", end_time="", times_windows="", delivery_day='+delivery_day+' where day_id='+dayid+' and store_id=26407184', function (error, results) {
		    if (error) {
                req.flash('error', err)
                // redirect to users list page
                res.redirect('/pages/del_days_setting/update-delivery-day/'+dayid)
            }
			else {
                req.flash('success', 'No delivery for the day Updated successfully')
                // redirect to users list page
                res.redirect('/pages/del_days_setting/update-delivery-day/'+dayid)
            }
		 });
	   
	   });
   }
   
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