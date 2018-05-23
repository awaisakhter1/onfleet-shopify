var express = require('express');
var app = express();
 
app.get('/', function(req, res) {
   req.getConnection(function(error, conn) {
   conn.query('select * from tbl_notice_time_setting where store_id=26407184', function (error, results) {
   if (error) throw error;
   res.render('pages/nt_setting/notice-time-setting', {data: results} );
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