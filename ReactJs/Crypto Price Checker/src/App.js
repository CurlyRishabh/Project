import React, { useState, useEffect } from 'react';
import Table from './componets/table.jsx';
import './App.css'

function App(){
  const [data,setData] = useState([]);
  const [loading,setLoading] = useState(true);
	useEffect(() => {
		let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&locale=en`;
		console.log(url);
		 fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((x) => {
				console.log("Fetched data:", x);
        setLoading(false);
				setData(x);

			})
			.catch((error) => {
				console.error("Fetch error:", error);
			});
	}, []);
	return <div>{loading?<p>loading......</p>:<Table data={data}/>}</div>;
}

export default App;
