var clr_conflict	= jQuery.noConflict();
	clr_conflict().ready(function() {
		// validate the comment form when it is submitted		
		clr_conflict("#adddeldatetimefrm").validate();
		clr_conflict("#adddelnotefrm").validate();
		clr_conflict("#installfrm").validate();
		
		clr_conflict("#updatedeltimefrm").validate();
		clr_conflict("#addblackoutdayfrm").validate();
		
		clr_conflict("#addideaFrm1").validate({
   
		  rules: {
			  'contributer_number[0]': {
				  required: true
				
			  }
		  },
	      errorPlacement: function(error, element) 
            {
            
                error.appendTo('#contributer_err_cont');
            
		    }
		 
	    });
		
		
		jQuery("#chngepsswdFrm").validate({rules: {
				
				currt_psswd: {
					required: true,
					
				},
				new_psswd: {
					required: true,
					
				},
				retypenew_psswd: {
					equalTo: "#new_psswd"
				}
				
				},
			messages: {
				currt_psswd: {
					required: "Please type your current password"
					
				},
				new_psswd: {
					required: "Please type your new password"
					
				},
				retypenew_psswd: {
					required: "Please re-type your new password",
					equalTo: "Please enter the same password as above"
				}
				
			}
		});
		
	});
	
	