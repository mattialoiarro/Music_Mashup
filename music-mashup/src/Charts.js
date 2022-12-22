/*import "./App.css"
import App from "./App";

// Not done yet.

function Charts(){

    const axios = require("axios");

    const options = {
        method: 'GET',
        url: 'https://billboard-api2.p.rapidapi.com/hot-100',
        params: {range: '1-10', date: '2019-05-11'},
        headers: {
            'X-RapidAPI-Key': '2fc0ffeea8msh7d0e0c39e4524e1p15a630jsnb2a63eef64f7',
            'X-RapidAPI-Host': 'billboard-api2.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });

    async function displayChart(chart) {
        const chartData = await getChartData(chart);
        const chartElement = document.getElementById('chart');

        chartData.forEach(item => {
            const songElement = document.createElement('p');
            songElement.innerHTML = `${item.title} by ${item.artist}`;
            chartElement.appendChild(songElement);
        });
    }

    displayChart('hot-100');

    let div = <>
        <div className="Charts">
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />

            <div class="navbar">
                <a href=Billboard Charts/>
                <link rel="stylesheet" href="css/font-awesome.css"/>
                <link
                    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"
                    rel="stylesheet"
                />
            </div>
            <header className="Charts"/>
                <h1>Billboard Charts</h1>

                }




*/
