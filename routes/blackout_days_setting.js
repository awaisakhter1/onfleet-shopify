var express = require('express');
var app = express();

app.get('/', function (req, res) {
   console.log(req);
   req.getConnection(function(error, conn) {
	 conn.query('select * from tbl_blackout_days where store_id=26407184', function (error, results) {
	 if (error) throw error;
	 res.render('pages/blackout_days_setting/blackout-days-list', {data: results} );
	 });
   });
});


// SHOW ADD BLACKOUT DAY FORM
app.get('/add-blackout-day', function(req, res, next){    
    // render to views/pages/blackout_days_setting/add-blackout-day.ejs
    res.render('pages/blackout_days_setting/add-blackout-day');
})

// ADD NEW BLACKOUT DAY POST ACTION
app.post('/add', function (req, res) {

   var blackout_date     = req.body.blackout_date;
   var blackout_descptn  = req.body.blackout_descptn;
   //console.log('out of success',req.session.delvy_date);	 
	 req.getConnection(function(error, conn) {
     conn.query('select * from tbl_blackout_days where date="'+blackout_date+'" and store_id=26407184', function (error, results) {
	     
		 if (results.length==0) { 
		 
		 req.getConnection(function(error, conn) {
		 conn.query('INSERT into tbl_blackout_days (date,description,store_id)values("'+blackout_date+'","'+blackout_descptn+'",26407184)', function (error, results) {
			if (error) {
				req.flash('error', err)
				// redirect to add blackout page
				res.redirect('/pages/blackout_days_setting/add-blackout-day')
			}
			else {
				//console.log('in success',req.session.delvy_date);
				req.flash('success', 'Blackout day has been addded successfully')
				// redirect to add blackout page
				res.redirect('/pages/blackout_days_setting/add-blackout-day')
			}
			
		 });
	   
	   });
	   }
	   else {
				req.flash('error', 'You already addded this date has a blackout date')
				// redirect to add blackout page
				res.redirect('/pages/blackout_days_setting/add-blackout-day')
			}
	   
	 });
	   
    });  
	   
});

app.get('/update-blackout-day/:id', function (req, res) {
   var id = req.params.id;
   
   req.getConnection(function(error, conn) {
   conn.query('select * from tbl_blackout_days where id='+id+' and store_id=26407184', function (error, results) {
   if (error) throw error;
	  
	 res.render('pages/blackout_days_setting/update-blackout-day', {data: results, did : req.params.id} );
		   
   });
   });
   
});

app.post('/update', function (req, res) {
   var id                = req.body.bo_day_id;
   var blackout_date     = req.body.blackout_date;
   var blackout_descptn  = req.body.blackout_descptn;
   
	  
	   req.getConnection(function(error, conn) {
		 
		 conn.query('UPDATE tbl_blackout_days SET date="'+blackout_date+'", description="'+blackout_descptn+'" where id='+id+' and store_id=26407184', function (error, results) {
		    if (error) {
                req.flash('error', err)
                // redirect to delivery update page
                res.redirect('/pages/blackout_days_setting/update-blackout-day/'+id)
            }
			else {
                req.flash('success', 'Blackout day has been Updated successfully')
                // redirect to delivery update page
                res.redirect('/pages/blackout_days_setting/update-blackout-day/'+id)
            }
			
		 });
	   
	   });
   
});


// DELETE USER
app.get('/delete/(:id)', function(req, res) {
     var id = req.params.id;
    
	req.getConnection(function(error, conn) {
	conn.query('select * from tbl_blackout_days', function (error, results) {
	
    req.getConnection(function(error, conn) {
        conn.query('DELETE FROM tbl_blackout_days WHERE id='+id+' and store_id=26407184', function(error, result) {
            //if(err) throw err
            if (error) {
                req.flash('error', err);
                // redirect to users list page
               res.render('pages/blackout_days_setting/blackout-days-list', {data: results} );
            } else {
                req.flash('success', 'Blackout day deleted successfully');
                // redirect to users list page
               
				res.render('pages/blackout_days_setting/blackout-days-list', {data: results} );
            }
	    });
        });
        });
    });
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