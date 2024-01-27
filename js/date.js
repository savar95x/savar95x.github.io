const date = new Date();

let day = date.getDate();
//let month = date.getMonth() + 1;
const month = date.toLocaleString('default', { month: 'long' });
let year = date.getFullYear();

let currentDate = `${day} ${month} ${year}`;
document.getElementById("date").textContent = currentDate;
//console.log(currentDate); // "17-6-2022"
