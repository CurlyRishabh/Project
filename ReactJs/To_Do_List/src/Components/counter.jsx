import React, { useState }  from 'react';
const notInclude=[];
function TaskList(){
    const [tasks, setTasks] = useState([]);
    const [taskNo, setTaskNo] = useState("s");
    const [details, setDetails] = useState("sd");
	const [show,setShow] = useState(false);

    const gridContainerStyle = {
		display: "grid",
		gridTemplateColumns: "1fr 1fr", // Example: 2 columns
		gap: "16px", // Example: gap between grid items
	};
    function handleClick(){
        if(taskNo && details){
            setTasks([...tasks, {taskNo , details}]);
            setDetails("");
            setTaskNo("");
        }
    }

	function handleInputChange(del){
		console.log("handleINputChange");
		//if val already present
		notInclude.indexOf(del) !== -1 ? notInclude.splice(notInclude.indexOf(del), 1) : notInclude.push(del);
	 
		notInclude.length === 0 ? setShow(false) : setShow(true);
		
		
		
	}
	function handleConfirm(){
		console.log("handleConfirm", notInclude);
		const filteredItems = tasks.filter(item => !notInclude.includes(item.taskNo));
		console.log(filteredItems);
		setTasks(filteredItems);
		setShow(false);
	}

    return (
		<div>
			<div style={gridContainerStyle}>
				<div className="todoBox">
					<h1 className="h1style">To Do List</h1>
					{tasks.map((x) => (
						<p key={x.taskNo}>
							<input type="checkbox" onChange={() => handleInputChange(x.taskNo)} />
						 {x.details}
						</p>
					))}
					{show ? (
						<button className="TaskButton" onClick={handleConfirm}>
							Task Done
						</button>
					) : null}
				</div>
				<div className="addBox">
					<h1 className="h1style">Task List</h1>
					<input
						type="text"
						className="inputBox"
						placeholder="Task No"
						value={taskNo}
						onChange={(x) => setTaskNo(x.target.value)}
					/>
					<input
						type="text"
						className="inputBox"
						placeholder="Task Details"
						value={details}
						onChange={(x) => setDetails(x.target.value)}
					/>

					<button className="addTask" onClick={handleClick}>
						Add Task
					</button>
				</div>
			</div>
		</div>
	);

} 

export default TaskList;



