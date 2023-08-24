import React from 'react';
import { useState, useEffect } from 'react';
// import coin from './bitcoin.json';


function Detail(props){
    const textStyle = {
    color: props.change < 0 ? 'red' : 'green',
    fontSize: '18px',
    fontWeight: 'bold'
  };
 
     return (
			<div className='coinDetail'>
				<div className='coinImgName'>
					<img className="detailImage" src={props.image} alt="NoImage" />
					<p>{props.name} ({props.symbol})</p>
				</div>
				<p>Day Change: <span style={textStyle}>{props.change}%</span></p>
				<p>Low: $ {props.low}</p>
        <p>High: $ {props.high} </p>
        <p>Price: $ {props.price} </p>
				<p>Total_volume: {props.volume} Million</p>
				<p>Market Cap: {props.mcap} Million</p>
			</div>
		);
}
function Details(props){
    const [coin, setCoin] = useState([]);
    useEffect(() =>{    
            console.log("useEffect ",props.x);
            let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${props.x}&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en`;
            console.log(url);
            fetch(url)  
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched data:', data[0]);
                setCoin(data[0]);
                console.log("coin",coin);
    
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });

    },[props.x]);
    return (
		<Detail
			name={coin.name}
			image={coin.image}
			volume={(coin.total_volume / 1e6).toFixed(2)}
			mcap={(coin.market_cap / 1e6).toFixed(2)}
			change={parseFloat(coin.price_change_percentage_24h).toFixed(2)}
			price={coin.current_price}
			symbol={coin.symbol}
			low={coin.low_24h}
			high={coin.high_24h}
		/>
	);

}

export default Details;