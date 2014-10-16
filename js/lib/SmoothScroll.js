delerrok.mapp.smoothScroll = function(a) {
	if(d.getElementById(a.rel.replace(/.*\#/,""))) {
		var e = d.getElementById(a.rel.replace(/.*\#/,""));
	} else {
		return;
	}
	
	//Move point
	var end = e.offsetTop;
	var docHeight = d.documentElement.scrollHeight;
	var winHeight = window.innerHeight || d.documentElement.clientHeight
	if(docHeight-winHeight<end){
		var end = docHeight-winHeight;
	}
	
	//Current Point
	var start=window.pageYOffset || d.documentElement.scrollTop || d.body.scrollTop || 0;
	
	
	var flag = (end < start)?"up":"down";

	function scrollMe(start,end,flag) {
		setTimeout(
			function(){
				if(flag=="up" && start >= end){
					start=start-(start-end)/20-1;
					window.scrollTo(0,start)
					scrollMe(start,end,flag);
				}else if(flag=="down" && start <= end){
					start=start+(end-start)/20+1;
					window.scrollTo(0,start)
					scrollMe(start,end,flag);
				}else{
					scrollTo(0,end);
				}
				return ;
			}
			,10
		);
		
	}

	scrollMe(start,end,flag);
}