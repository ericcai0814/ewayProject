
// 時間陣列帶入資料庫資料
// let event = []; // 空list

//     // ajax 從資料庫獲取資料
//     async function post_api() {
//         // const url = 'api/Selectionperiod';
//         const response = await fetch(url, {
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             method: "POST",
//             body: JSON.stringify(obj),
//         })
//         const res = await response.json();
//         // ajax 結果新增到 event
//         res.map(value => {
//             // console.log(value);
//             event.push({
//                 title: value['class_name'],
//                 start: value['class_day']
//             })
//         })
//     }



//FullCalendar
document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialDate: new Date(),
        selectable: true,
        businessHours: true,
        dayMaxEvents: true,
        editable: true, // 啟動拖曳調整日期
        locale: 'zh-tw',
        navLinks: true,
        headerToolbar: {
            left: 'today prev,next',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay'
        },
        events: [
            {
                title: 'already reserve',
                start: '2022-12-01',
                display: 'background'
            }, {
                title: 'already reserve',
                start: '2022-12-01',
                display: 'background'
            }, { // 事件
                title: "約會",
                start: "2022-12-02"
            }, { // 事件(包含開始時間)
                title: "中餐",
                start: "2022-12-03T12:00:00"
            }, { // 事件(包含跨日開始時間、結束時間)
                title: "音樂節",
                start: "2022-12-03",
                end: "2022-12-08"
            }
        ],
        eventClick: function(info) {
            console.log(info.event)
        }
    });

    calendar.render();
});
