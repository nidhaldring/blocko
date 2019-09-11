
function updateMonthlyTotal(history){
	const currentMonth = new Date().getMonth();

	if(history.month[currentMonth] === undefined){
		history.month = {}; // delete the old data
		history.month[currentMonth] = {total:0};
	}
	history.month[currentMonth].total += 1;
}

function updateDailyTotal(history){
	const currentMonth = new Date().getMonth();
	const currentDate = new Date().getDate();

	if(history.month[currentMonth][currentDate] === undefined){
			history.month[currentMonth][currentDate] = 0;
	}
	history.month[currentMonth][currentDate] += 1;
}

function updateWeeklyTotal(history){
	const currentDate = new Date();
	const numberOfSecondsPerWeek = 24 * 60 * 60 * 1000;

	if(currentDate - history.fixedDate >= (7 * numberOfSecondsPerWeek)){
		history.fixedDate = currentDate;
		history.weeklyTotal = 1;
	}else{
		history.weeklyTotal += 1;
	}
}

function updateHistory(){

	chrome.storage.local.get("history",(res) => {
		const history = res.history;

		history.total += 1;
		updateMonthlyTotal(history);
		updateDailyTotal(history);
		updateWeeklyTotal(history);

		chrome.storage.local.set({history});
	});

}