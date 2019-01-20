var navigate = (function() {
	$('.dd').toggle();
	$('.dd_btn').click(function() {
		var dataName = $(this).attr('data-name');
		$('.dd').hide();
		$('.' + dataName).toggle();
	});
})();

window.addEventListener("DOMContentLoaded", function () {

    var tableBody = document.querySelector('tbody');
    var tableRows = '';

    tableBody.innerHTML = '<tr><td data-label="Loading" colspan="7"><div class="loader"></div></td></tr>';

    fetch('https://api.spacexdata.com/v2/launches/').
    then(function (res) {return res.json();}).
    then(function (launches) {return (
            launches.forEach(function (launch) {return (
                    tableRows += '<tr>\n                    <td data-label="Mission Name">' +

                    launch.mission_name + '</td>\n                    <td data-label="Mission Patch"><img src="' +
                    launch.links.mission_patch_small + '" alt="' + launch.mission_name + ' Mission Patch"></td>\n                    <td data-label="Rocket Name">' +
                    launch.rocket.rocket_name + '</td>\n                    <td data-label="Launch Site">' +
                    launch.launch_site.site_name_long + '</td>\n                    <td data-label="Launch Year">' +
                    launch.launch_year + '</td>\n                    <td data-label="Launch Success">' + (
                    launch.launch_success ? 'Yes' : 'No') + '</td>\n                    <td data-label="Mission Details">' + (
                    launch.details ? launch.details : 'No details available for this mission.') + '</td>\n                </tr>');}));}).

    catch(function (_) {return tableRows = '<tr><td data-label="Error" colspan="7">Launch data unavailable.</td></tr>';}).
    finally(function (_) {return tableBody.innerHTML = tableRows;});
});
