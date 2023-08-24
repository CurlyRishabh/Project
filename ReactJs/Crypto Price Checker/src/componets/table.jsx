
import React from "react";
// import jsonData from "./list.json";
import { useState ,useEffect } from "react";
import Details from "./coinDetail";


function TableRow(props){
	
	function handleClick(){
		console.log("click", props.id)
		props.updateShow(props.id);
	}
	const colorTableBody = {
		backgroundColor: props.color % 2 === 0 ? "lightgray" : 'white'
	};

	const colorChange = {
		color: props.change > 0 ? "green" : "red",
		fontSize: "18px",
		fontWeight: "bold"
	};


	return (
		<tbody style={colorTableBody}>
			<tr onClick={handleClick}>
				<td>{props.rank}</td>
				<td>
					<img className="coinImage" src={props.image} alt="crypto" />
				</td>
				<td > {props.name}</td>
				<td>$ {props.price}</td>
				<td>
					<span style={colorChange}>{props.change}%</span>
				</td>
			</tr>
		</tbody>
	);
};

function Table(props){
	const [show,setShow] = useState(false);
	const [id, setId] = useState("");

	const [forward,setForward] = useState([]);
	const [page,setPage] = useState(0);
	
	const [search, setSearch] = useState("");
	const [filtercoin, setFiltercoin]= useState([]);
	
	useEffect(() => {
		setForward(props.data.slice(0,20));
	},[props.data]);

	const updateParentState = (x) => {
		console.log(x)

		setId(x);
		setShow(true);

	};

	function handlePrevPage(){
		const x=page-1;
		
		const first = x * 20;
		const second = x * 20 + 20;
		setForward(props.data.slice(first, second));
		setPage((prev) => prev - 1);
	}
	function handleNextPage() {
		const x = page+1;
		const first = x*20;
		const second = x*20+20;
		setForward(props.data.slice(first, second));
		setPage((prev) => prev + 1);
		
	}
	function handleDropdownItemClick(item){
		console.log(item);
		setId(item);
		setShow(true);
		setSearch("")
	}
	const handleSearchChange = (e) => {
		setSearch(e.target.value);
		if(search.length <= 0){
			setFiltercoin([]);
		}else
		setFiltercoin(props.data.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase())));
	};
	
    return (
		<div className="main">
			<div className="header"> Crypto Price Checker</div>
			<div className="search">
				<input type="text" value={search} onChange={handleSearchChange} placeholder="Type something..." />
				<div>
					{search.length > 0 ? (
						<ul className="dropdown">
							{filtercoin.map((item, index) => (
								<li key={index} onClick={() => handleDropdownItemClick(item.id)}>
									{item.name} <img className ="dropdown-image" src={item.image} alt="none"></img>
								</li>
							))}
						</ul>
					) : (
						<></>
					)}
				</div>
			</div>
			<div className="maintable">
				<table>
					<thead>
						<tr>
							<th style={{width: "10%"}}>Rank</th>
							<th style={{width: "20%"}}>Symbol</th>
							<th style={{width: "35%"}}>Name</th>
							<th style={{width: "20%"}}>Price</th>
							<th style={{width: "15%"}}>Change</th>
						</tr>
					</thead>
					{forward.map((coin, count) => {
						return (
							<TableRow
								updateShow={updateParentState}
								key={coin.id}
								image={coin.image}
								name={coin.name}
								price={coin.current_price}
								change={coin.price_change_percentage_24h.toFixed(2)}
								color={count}
								id={coin.id}
								rank={coin.market_cap_rank}
							/>
						);
					})}
				</table>
				<div>
					<button onClick={handlePrevPage} disabled={page === 0}>
						Prev
					</button>
					<button onClick={handleNextPage} disabled={(page + 1) * 20 >= props.data.length}>
						Next
					</button>
				</div>
			</div>

			<div className="sideTable">
				<div>
					{show ? <Details x={id} /> : <p>Click on any Coin from the Table or search bar to get more info..</p>}
				</div>
			</div>
		</div>
	);
}

export default Table;
