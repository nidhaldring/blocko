
function updateHistory(){

	chrome.storage.local.get("history",(res) => {
		const history = res.history;
		const currentDate = new Date();

		history.total += 1;

		// check if its start of a new week
		if(currentDate.getDay() === 0){
			history.timePerWeek = 1;
		}else{
			history.timePerWeek += 1;
		}

		// check if its start of a new month
		if(history.timePerMonth[currentDate.getMonth()] === undefined){
			history.timePerMonth = {}; // delete old data
			history.timePerMonth[currentDate.getMonth()] = 1;
		}else{
			history.timePerMonth[currentDate.getMonth()] += 1;
		}

		chrome.storage.local.set({history});
	});

}