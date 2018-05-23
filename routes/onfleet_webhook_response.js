var express = require('express');
var app = express();
var onfleet = require('onfleet')('33e1d0ed7307639a67c1a22db0ee4eed');

const request = require('request-promise');

app.get('/task_assigned', function (req, res) {
     
	 //res.send(req.body.check);
	 //console.log(req.params);
	 
	 console.log(req.session.ShopifyAccessToken);
	 
	 //-----Important api call when new webhook task assigned is created and response back to send---------// 
	 //console.log(req);
	 var ss = req.query.check;
	 res.send(ss);
	 //-------------------------------------------------------------------------------------------//
	 
/*var options = {
    uri: 'https://onfleet-test-store.myshopify.com/admin/shop.json',
    qs: {
        access_token: '9db17c8472118ffd01408a43f12fbaf1' // -> uri + '?access_token=xxxxx%20xxxxx'
    },
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};
 
request(options)
    .then(function (repos) {
        //console.log('User has %d repos', repos.length);
		console.log(repos);
    })
    .catch(function (err) {
        // API call failed...
    });*/
	
	
	/*var options = {
    method: 'POST',
    uri: 'https://onfleet-test-store.myshopify.com/admin/orders/427545264170/fulfillments.json',
    //qs: {
//        access_token: 'c7f8a667c0f18bed855c523450f8aed4' // -> uri + '?access_token=xxxxx%20xxxxx'
//    },
	
	body: {
	  "fulfillment": {
		"tracking_url": "http:\/\/trackin.com\/6546546",
		"tracking_company": "My tracking company",
		//"line_items": [
//		  {
//			"id": 867127132202 
//		  }
//		]
	  }
	},
	headers: {
		'X-Shopify-Access-Token': 'c7f8a667c0f18bed855c523450f8aed4',
        'User-Agent': 'Request-Promise',
		'Content-Type': 'application/json'
    },
    json: true // Automatically stringifies the body to JSON
};
 
request(options)
    .then(function (parsedBody) {
        // POST succeeded...
		console.log(parsedBody);
    })
    .catch(function (err) {
		//console.log(err);
        // POST failed...
    });*/
 
		
});

//----------Task Assigned Response get when any task assigned to driver or team-----------//
app.post('/task_assigned', function (req, res) {
     
	 console.log(req.session.delvy_time_window);
	 console.log(req.body);
	 var onfleet_task_id =req.body.taskId; 
	 var onfleet_task_trackUrl =req.body.data.task.trackingURL; 
	 console.log(onfleet_task_trackUrl);
	 req.getConnection(function(error, conn) {
	 
	 //--------Get the shopify order id that task assigned---------// 	 
	 conn.query('select * from tbl_shopify_order where onfleet_task_id="'+onfleet_task_id+'"', function (error, results) {
     if (error) throw error;
	 var shopify_order_id = results[0].shopify_order_id;
	 console.log('yes selected from table shopify order');
	 console.log(results[0].shopify_order_id);
	 console.log(results[0].onfleet_task_id);
	 
	 //--------------------Update the Shopify order Fulfillments by tracking Url get from task ---------------------------//
	 
		 var options = {
		 method: 'POST',
		 uri: 'https://onfleet-test-store.myshopify.com/admin/orders/'+shopify_order_id+'/fulfillments.json',
		 //qs: {
//			access_token: 'c7f8a667c0f18bed855c523450f8aed4' // -> uri + '?access_token=xxxxx%20xxxxx'
//		 },
		
		 body: {
		  "fulfillment": {
			"tracking_url": ""+onfleet_task_trackUrl+"",
			"tracking_company": "My tracking company",
			//"line_items": [
//			  {
//				"id": 867127132202 
//			  }
//			]
		  }
		 },
		 headers: {
			'X-Shopify-Access-Token': '1d842843c9196486c5566376db3a14fc',
			'User-Agent': 'Request-Promise',
			'Content-Type': 'application/json'
		 },
		 json: true // Automatically stringifies the body to JSON
		 };
	 
		 request(options)
		.then(function (parsedBody) {
			// POST succeeded...
			console.log(parsedBody);
		})
		.catch(function (err) {
			//console.log(err);
			// POST failed...
		});
		
	 //-------------------------------------------------------------------------------------------------------------------//
	 
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