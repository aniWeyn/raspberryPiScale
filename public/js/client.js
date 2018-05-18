var socket = io('http://localhost:5000');
var weight =0;
var previousWeight=0;
var stableWeight =0;
var minWeight = 5;
var toleranceWeight =5;
var steppedOn = 0;
var measuring= 0;
var sameWeightCunter=0;
var timeoutsteppedOn;
var stableWeight=0;
function goTo(targhet){
	$(".screen").hide();
	$("#"+targhet).show();

};

socket.on('example-pong', function (data) {
	previousWeight=weight;
   
    weight =parseInt(data["wgt"]);
    
    if (weight > previousWeight-toleranceWeight &&  weight < previousWeight+toleranceWeight && measuring == 1){
		sameWeightCunter=sameWeightCunter+1;}
		
	else{ sameWeightCunter=0;}
		
	if (sameWeightCunter>8){ 
		 stableWeight=(weight + previousWeight)/2;
		 measuring = 0;
		 $("span.wgt_val").html(stableWeight);   
		 goTo("weight");	

		}
    
    if (weight > minWeight ){
		window.clearTimeout(timeoutsteppedOn);
		if (steppedOn!=1&&  measuring !=1){
			steppedOn=1
			measuring = 1;
			goTo("loading_pg");	
			}		
		}
	else {
		if (steppedOn!=0){
			 steppedOn=0;
			 timeoutsteppedOn= window.setTimeout(function() {
			 goTo("off");
			 measuring = 0;
			}, 10000);
			}
		};

});

window.addEventListener("load", function(){


  
  
  setInterval(function(){ 
	  socket.emit('example-ping', { duration: 	100});
	  
	  
	  }, 300);



});




$(document).foundation()



$(".goto").click(
	function(){
		goTo($(this).data( "targhet" ));
		
	});

// gender

        


$('#profile_stats').flickity({
  // options
  cellAlign: 'left',
  contain: true,
  wrapAround: true,
  pageDots: true,
  selectedAttraction:1,
friction:1
});
