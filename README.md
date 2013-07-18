jbslider
========

Another jQuery Slider... It is simple and easy to use. <a href="http://www.burakkaya.com/lab/slider/" target="_blank">See Demo</a>

<h4>Features</h4>
<ul>
<li>Optional auto play slideshow</li>
<li>Optional pause on hover</li>
<li>Optional arrow and buttons.</li>
<li>Multiple browser support (IE 7+, Safari 3+, Chrome 3+, Firefox 3+, Opera 10+)</li>
<li>Free and easy to use</li>
</ul>
<h4>Usage</h4>
<p>To use the jbSlider you have to include the following in your page:</p>
<ul>
<li>jQuery</li>
<li>jbSlider.js</li>
<li>jbSlider.css</li>
</ul>
<p>You can see sample html code below. You must use div element, any other HTML will break the slider.</p>


    <div id='slideContainer'>
        <div>
            <img src="img1.png" />
            <h3>The standard Lorem Ipsum passage, used since the 1500s</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt et.</p>
        </div>
        
        <div>
            <img src="img2.png" />
            <h3>1914 translation by H. Rackham</h3>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
        </div>
    </div>

<p>Call your script.</p>

    <script type="text/javascript">
        $(function(){
            $("#slideContainer").jbSlider();  	   
        });        
    </script>
    
<h4>Options</h4>

    $("#slideContainer").jbSlider({
        arrow  	      : false,	// Next and Prev navigation
        autoPlay	  : true,	// Change slides automatically
        autoHide	  : false,	// Hide controls
        autoHideDelay : 1000,	// Hide controls after ...ms
        autoHideSpeed : 500,	// Hiding speed for controls
        controlNav	  : true,	// 1,2,3... (circle) navigation
        controlPos	  : true,	// Center positioning for navigation
        nextText	  : "Next",	// Next direction nav text
        prevText	  : "Prev",	// Prev direction nav text
        pauseTime	  : 6000,	// How long each slide will show
        animSpeed	  : 1000, 	// Slide transition speed
        pauseOnHover  : true,	// Stop slide on mouse hover
        pauseTextShow : true,	// Show pause text on mouse hover
        pauseText	  : "ll"	// Pause text
    });       
    
    
    
