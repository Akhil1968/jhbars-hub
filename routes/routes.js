
exports.loginHandler = function(req, res){
	res.render('login.handlebars', {});
}//loginHandler

exports.logoutHandler = function(req, res){
	req.session.destroy();
	res.render('login.handlebars', {LOGGEDIN:false});
}//logoutHandler

exports.landingHandler = function(req, res){
	// user comes to this handler after login, set loggedin variable in session to true.
	req.session.loggedin = true;
	console.log("processing GET request for landing page. Req Param  " + req.query.nm);

	var person;
	if (req.session.userName){   //session store has userName
		console.log("User Name already in session. It is " + req.session.userName);
		person = req.session.userName;
	}else{ //session store does NOT have userName
		// read username from req.query and keep into the session store
		person = req.query.nm;
		req.session.userName = person;
		console.log("User Name does not exist in session. Hence storing it in session store " + person);
	}

	res.render('landingpage.handlebars', {welcomeMessage:person, 
										LOGGEDIN:req.session.loggedin});
}//landingHandler

exports.cityHandler = function(req, res){
	var interestValue = req.body.interest;
	var cityNameValue, taglineValue;
	console.log("received interestValue  as " + interestValue);


	if (interestValue === 'history'){
		cityNameValue = 'Rome';
		taglineValue = 'City of earliest civilization';
	}else if (interestValue === 'fashion'){
		cityNameValue = 'Paris';
		taglineValue = 'Fashion capital of the world ';
	}else if (interestValue === 'finance'){
		cityNameValue = 'New York';
		taglineValue = 'Business capital of the world ';
	}
	
	res.render('city.handlebars', {cityName:cityNameValue, 
						tagline: taglineValue, 
						welcomeMessage:req.session.userName,
						LOGGEDIN:req.session.loggedin});

}//cityHandler