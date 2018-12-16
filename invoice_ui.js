function _(a){
	return document.querySelectorAll(a);
};
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("open_modal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var no_of_silder_clicked = 0;

function handle_slide(e){
	var div = e.children[0];
	var fact;
	var s = getComputedStyle(div);
	var r = parseFloat(s['margin-left']);
	var t = setInterval(c, 10);
	if(no_of_silder_clicked++ % 2){
		fact = -2;
		invoice.strict = true
	}else{
		fact = 2;
		invoice.strict = false;
	}
	function c(){
		r += fact;
		console.log(r);
		if( !(r > 0 && r < 30) ){ clearInterval(t);}
		else {
			div.style.marginLeft = r + "px";
			invoice.strict = false;
		}
	};

}