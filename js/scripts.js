$( document ).ready(function() {
        // *** BUTTONS *******************************************************************

		$("#degree-switcher-2").click(function() {

			$("#time-to-doom .value").html("Time left to +2.0°C");
			var currentDoomDate = $(this).data('doom');
			doomDate = new Date(currentDoomDate);
			if(currentDoomDate.indexOf("99999") >= 0) {
				$("#timecountdown-static").show();
				$("#timecountdown").hide();
			} else {
				$("#timecountdown-static").hide();
				$("#timecountdown").show();
			}
			$(this).addClass("active");
			$("#degree-switcher-1").removeClass("active");
		});
		$("#degree-switcher-1").click(function() {

			$("#time-to-doom .value").html("Time left to +1.5°C");
			var currentDoomDate = $(this).data('doom');
			doomDate = new Date(currentDoomDate);
			if(currentDoomDate.indexOf("99999") >= 0) {
				$("#timecountdown-static").show();
				$("#timecountdown").hide();
			} else {
				$("#timecountdown-static").hide();
				$("#timecountdown").show();
			}
			$(this).addClass("active");
			$("#degree-switcher-2").removeClass("active");
        });
        
        // *** SCENARIOS *****************************************************************
		$('select').change(function() {
			var scenario = $(this).find('option:selected');
       		var dates2c = scenario.data('dates2c');
       		var dates15c = scenario.data('dates15c');
       		$("#degree-switcher-2").data("doom", dates2c);
			$("#degree-switcher-1").data("doom", dates15c);
			if($("#degree-switcher-2").hasClass("active")) {
				$("#degree-switcher-2").trigger("click");
			}if($("#degree-switcher-1").hasClass("active")) {
				$("#degree-switcher-1").trigger("click");
			}
        });
});