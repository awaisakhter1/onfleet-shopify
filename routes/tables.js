var express = require('express');
var app = express();

//-------------------------------tbl_stores------------------------------------//

app.get('/create_store', function (req, res) {
   req.getConnection(function(error, conn) {
	 conn.query('CREATE TABLE tbl_stores (id INT(11) AUTO_INCREMENT PRIMARY KEY, store_name VARCHAR(255), store_url TEXT, store_front_url VARCHAR(255), store_id VARCHAR(255), store_email VARCHAR(255), app_install_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, status TINYINT(1))', function (error, results) {
	 if (error) throw error;
	 console.log("Table created tbl_stores");
	 });
   });
});

app.get('/create_store_s', function (req, res) {
   req.getConnection(function(error, conn) {
	 conn.query('DESCRIBE tbl_stores', function (error, results) {
	 if (error) throw error;
	 console.log(results);
	 });
   });
});


app.get('/create_store_alter', function (req, res) {
   req.getConnection(function(error, conn) {
	 conn.query('ALTER TABLE tbl_stores ADD ON UPDATE CURRENT_TIMESTAMP;', function (error, results) {
	 if (error) throw error;
	 console.log('table alter');
	 });
   });
});

app.get('/insert_store', function (req, res) {
   req.getConnection(function(error, conn) {
	 conn.query('INSERT into tbl_stores (store_name,store_url,store_front_url,store_id,store_email,app_install_date,status)values("Onfleet Test Store","onfleet-test-store.myshopify.com","onfleet-test-store.myshopify.com",26407184,"shopify@onfleet.com","2018-04-11 01:38:47",1)', function (error, results) {
	 if (error) throw error;
	 console.log("DATA Inserted");
	 });
   });
});

app.get('/select_store', function (req, res) {
   req.getConnection(function(error, conn) {
	 conn.query('Select * from tbl_stores', function (error, results) {
	 if (error) throw error;
	 console.log(results);
	 });
   });
});

//-------------------------------------------------------------------//


//-------------------------------tbl_notice_time_setting------------------------------------//

app.get('/create_nts', function (req, res) {
   req.getConnection(function(error, conn) {
	 conn.query('CREATE TABLE tbl_notice_time_setting (id INT(11) AUTO_INCREMENT PRIMARY KEY, store_id VARCHAR(255), notice_time_hrs TINYINT(1), notice_time_mints VARCHAR(2), delivery_time_hrs TINYINT(1), delivery_time_mints VARCHAR(2), delivery_rate_limit INT(11))', function (error, results) {
	 if (error) throw error;
	 console.log("Table created tbl_notice_time_setting");
	 });
   });
});

app.get('/insert_nts', function (req, res) {
   req.getConnection(function(error, conn) {
	 conn.query('INSERT into tbl_notice_time_setting (store_id,notice_time_hrs,notice_time_mints,delivery_time_hrs,delivery_time_mints,delivery_rate_limit)values(26407184,1,"45",2,"00",2)', function (error, results) {
	 if (error) throw error;
	 console.log("DATA Inserted tbl_notice_time_setting");
	 });
   });
});

app.get('/select_nts', function (req, res) {
   req.getConnection(function(error, conn) {
	 conn.query('Select * from tbl_notice_time_setting', function (error, results) {
	 if (error) throw error;
	 console.log(results);
	 });
   });
});
//-------------------------------------------------------------------//

//-------------------------------tbl_start_time------------------------------------//

app.get('/create_st', function (req, res) {
   req.getConnection(function(error, conn) {
	 conn.query('CREATE TABLE tbl_start_time (id INT(11) AUTO_INCREMENT PRIMARY KEY, time_start VARCHAR(50))', function (error, results) {
	 if (error) throw error;
	 console.log("Table created tbl_start_time");
	 });
   });
});

app.get('/insert_st', function (req, res) {
   req.getConnection(function(error, conn) {
	 conn.query('INSERT into tbl_start_time(time_start)values("11:00 PM")', function (error, results) {
	 if (error) throw error;
	 console.log("DATA Inserted tbl_start_time");
	 });
   });
});

app.get('/select_st', function (req, res) {
   req.getConnection(function(error, conn) {
	 conn.query('Select * from tbl_start_time', function (error, results) {
	 if (error) throw error;
	 console.log(results);
	 });
   });
});
//-------------------------------------------------------------------//


//-------------------------------tbl_valid_times------------------------------------//

app.get('/create_vt', function (req, res) {
   req.getConnection(function(error, conn) {
	 conn.query('CREATE TABLE tbl_valid_times (id INT(11) AUTO_INCREMENT PRIMARY KEY, day_id INT(11), start_time VARCHAR(20), end_time VARCHAR(20), times_windows TEXT, delivery_day TINYINT(1) COMMENT "1=Yes, 0=No", store_id VARCHAR(255))', function (error, results) {
	 if (error) throw error;
	 console.log("Table created tbl_valid_times");
	 });
   });
});

app.get('/insert_vt', function (req, res) {
   req.getConnection(function(error, conn) {
	 conn.query('INSERT into tbl_valid_times (day_id,start_time,end_time,times_windows,delivery_day,store_id)values(7,"08:00 AM","04:00 PM","08:00 AM -  12:00 PM,12:00 PM -  04:00 PM",1,26407184)', function (error, results) {
	 if (error) throw error;
	 console.log("DATA Inserted tbl_valid_times");
	 });
   });
});

app.get('/select_vt', function (req, res) {
   req.getConnection(function(error, conn) {
	 conn.query('Select * from tbl_valid_times', function (error, results) {
	 if (error) throw error;
	 console.log(results);
	 });
   });
});

//-------------------------------------------------------------------//


//-------------------------------tbl_blackout_days------------------------------------//

app.get('/create_bdays', function (req, res) {
   req.getConnection(function(error, conn) {
	 conn.query('CREATE TABLE tbl_blackout_days (id INT(11) AUTO_INCREMENT PRIMARY KEY, date date, description TEXT, store_id VARCHAR(255))', function (error, results) {
	 if (error) throw error;
	 console.log("Table created tbl_blackout_days");
	 });
   });
});

app.get('/select_bdays', function (req, res) {
   req.getConnection(function(error, conn) {
	 conn.query('Select * from tbl_blackout_days', function (error, results) {
	 if (error) throw error;
	 console.log(results);
	 });
   });
});

//-------------------------------------------------------------------//


//-------------------------------tbl_valid_days------------------------------------//

app.get('/create', function (req, res) {
   req.getConnection(function(error, conn) {
	 conn.query('CREATE TABLE tbl_valid_days (id INT(11) AUTO_INCREMENT PRIMARY KEY, days VARCHAR(255), short_days_name VARCHAR(255))', function (error, results) {
	 if (error) throw error;
	 console.log("Table created");
	 });
   });
});

/*app.get('/insert', function (req, res) {
   req.getConnection(function(error, conn) {
	 conn.query('INSERT into tbl_valid_days (days,short_days_name)values("Sunday","Sun")', function (error, results) {
	 if (error) throw error;
	 console.log("DATA Inserted");
	 });
   });
});*/

app.get('/update', function (req, res) {
   req.getConnection(function(error, conn) {
	 conn.query('UPDATE tbl_valid_days SET days="Sunday", short_days_name="Sun" WHERE id =7', function (error, results) {
	 if (error) throw error;
	 console.log("DATA Updated");
	 });
   });
});

app.get('/select', function (req, res) {
   req.getConnection(function(error, conn) {
	 conn.query('Select * from tbl_valid_days', function (error, results) {
	 if (error) throw error;
	 console.log(results);
	 });
   });
});


//-------------------------------------------------------------------//


/** 
 * We assign app object to module.exports
 * 
 * module.exports exposes the app object as a module
 * 
 * module.exports should be used to return the object 
 * when this file is required in another module like app.js
 */ 
module.exports = app;