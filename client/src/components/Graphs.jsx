import { Bar } from "react-chartjs-2";
import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "../App.css";
import {  useDispatch } from "react-redux";
import { endedPoll } from "../redux/data/action";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export default function Graphs(item) {
	
	const [data, setData] = useState([]);
	const [label, setLabel] = useState([]);
	const [qlabel, setQLabel] = useState([]);


	let token = localStorage.getItem("adminToken");

	const dispatch = useDispatch();

	
useEffect(()=>{
dispatch(endedPoll(token))
},[dispatch,token])


	useEffect(() => {
		let label1 = [];
		let data1 = [];
		let qLabel1 = [];

		for (let i = 0; i < item.pollData[0]?.questions?.length; i++) {
			let labels = [];
			let datas = [];

			qLabel1.push(item.pollData[0]?.questions[i]?.question);
			for (let j = 0; j < item.pollData[0]?.questions[i]?.options.length; j++) {
				labels.push(item.pollData[0].questions[i].options[j].option);
				datas.push(item.pollData[0].questions[i].options[j].votes);
			}

			let a = { labels: labels };
			let b = { data: datas };
			label1.push(a);
			data1.push(b);
		}
		setData(data1);
		setLabel(label1);
		setQLabel(qLabel1);
	}, [item.pollData]);

	


	return (
		<>
		<div
			className="graph"
			style={{
				width: "40%",
				textAlign: "center",
				display: "grid",
				gridTemplateColumns: "3fr 2fr",
				columnGap: "100px",
			}}
		>
			{data.length &&
				data.map((item, i) => {
					return (
						<>
							<Bar
								options={{
									indexAxis: "y",
									layout: {
										padding: 40,
									},
									elements: {
										bar: {
											borderWidth: 1,
										},
									},
									scales: {
										x: {
											grid: {
												display: false,
											},
										},

										y: {
											grid: {
												display: false,
											},
										},
									},

									responsive: true,

									plugins: {
										legend: {
											display: false,
											labels: {
												// This more specific font property overrides the global property
												font: {
													size: 20,
												},
											},
										},

										title: {
											display: true,
											text: qlabel[i],
										},
										datalabels: {
											color: "grey",
											formatter: (value) => value + " %",
											anchor: "end",
											offset: -30,
											align: "start",
										},
									},
								}}
								plugins={[ChartDataLabels]}
								data={{
									labels: label[i].labels,
									datasets: [
										{
											label: qlabel[i],
											data: data[i].data,
											backgroundColor:
												"hsl(205.85635359116023, 95.76719576719576%, 37.05882352941177%)",
											maxBarThickness: 18,
											minBarLength: 2,
										},
									],
								}}
								height={"200px"}
							/>
						</>
					);
				})}
				
		</div>
		{/* <Button onClick={handleClick}>End Poll</Button> */}
</>
	);
}