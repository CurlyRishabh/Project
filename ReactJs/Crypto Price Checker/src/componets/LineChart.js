import React from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { useState, useEffect } from "react";
import Chart from "chart.js/auto";

function LineChart(props) {
  const [coin, setCoin] = useState([]);
  const [show, setShow] = useState(false);

  

  useEffect(() => {
	  console.log(props)
		async function fetchData() {
			try {
				let url = `https://api.coingecko.com/api/v3/coins/${props.id}/market_chart?vs_currency=usd&days=1&precision=2`;
				 const response = await axios.get(url);
				 const data=Object.values(response.data.prices);
				console.log(data, typeof(data));
				setCoin({
					labels: data.map((x) => {
						let date = new Date(x[0]);
						let time =
							date.getHours() > 12
								? `${date.getHours() - 12}:${date.getMinutes()} PM`
								: `${date.getHours()}:${date.getMinutes()} AM`;
						return time;
					}),
					datasets: [
						{
							label: "coinprice",
							data: data.map((x) => x[1]),
							borderColor: "gray",
							borderWidth: 1,
							backgroundColor: "lightgreen",
						},
					],
				});
				setShow(true);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}
		fetchData();

  }, [props.id]);

  return (
	  show?<Line data={coin}/>:<h1>loading</h1>
	);
}

export default LineChart;
