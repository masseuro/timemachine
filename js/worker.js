
var callTimer = 2000;

//Main function for run worker

onmessage = function(e){
  var doInterval;
  if ( e.data === "start" ) {
  	doInterval = setInterval(function(){
        var result ;
		    load('../index.php', function(xhr) {	
				result = xhr.responseText;	

			    done(result);
			});
		
    }, callTimer);
  }else if( e.data === "stop") {
  	clearInterval(doInterval);
  	done('Stop !');
  	self.close();
  }
};

	
function done(msg){
	postMessage(msg);
}


/******************** Tools for worker *********************/

//simple XHR request in pure JavaScript
function load(url, callback) {
	var xhr;
	 
	if(typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
	else {
		var versions = ["MSXML2.XmlHttp.5.0",
		"MSXML2.XmlHttp.4.0",
		"MSXML2.XmlHttp.3.0",
		"MSXML2.XmlHttp.2.0",
		"Microsoft.XmlHttp"]
		 
		for(var i = 0, len = versions.length; i < len; i++) {
			try {
				xhr = new ActiveXObject(versions[i]);
				break;
			}
			catch(e){}
		} // end for
	}

	xhr.onreadystatechange = ensureReadiness;
	function ensureReadiness() {
		if(xhr.readyState < 4) {
			return;
		}
		if(xhr.status !== 200) {
			return;
		}
		 
		// all is well
		if(xhr.readyState === 4) {
			callback(xhr);
		}	
	}

	xhr.open('GET', url, true);
	xhr.send('');
}

