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



ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

let data2 = [
	{
		pollId: "-NRr4CKLpheSrhyq-3zB",
		adminId: "6425786c1b27cedef7b31370",
		pollCreatedAt: "time1231",
		pollEndsAt: "time2",
		pollName: "votek",
		pollStatus: "true",
		questions: [
			{
				questionId: "-NRr4CL2qh1FMfw032pO",
				question: "The first month of the year is...",
				maxSelections: "2",
				options: [
					{
						optionId: "-NRr4CL3TnNz9ZVAkq4s",
						option: "January",
						votes: 5,
					},
					{
						optionId: "-NRr4CL3TnNz9ZVAkq4t",
						option: "February",
						votes: 5,
					},
					{
						optionId: "-NRr4CL3TnNz9ZVAkq4u",
						option: "March",
						votes: 8,
					},
					{
						optionId: "-NRr4CL3TnNz9ZVAkq4v",
						option: "April",
						votes: 7,
					},
					{
						optionId: "-NRr4CL3TnNz9ZVAkq4v",
						option: "June",
						votes: 7,
					},
				],
			},
			{
				questionId: "-NRr4CL3TnNz9ZVAkq4w",
				question: " Who is the father of Computers?",
				maxSelections: "2",
				options: [
					{
						optionId: "-NRr4CL3TnNz9ZVAkq4x",
						option: "James Gosling",
						votes: 3,
					},
					{
						optionId: "-NRr4CL3TnNz9ZVAkq4y",
						option: "Charles Babbage",
						votes: 10,
					},
					{
						optionId: "-NRr4CL3TnNz9ZVAkq4z",
						option: "Dennis Ritchie",
						votes: 5,
					},
					{
						optionId: "-NRr4CL3TnNz9ZVAkq5-",
						option: " Bjarne Stroustrup",
						votes: 4,
					},
				],
			},
			{
				questionId: "-NRr4CL3TnNz9ZVAkq4w",
				question:
					"Which of the following is not a characteristic of a computer?",
				maxSelections: "2",
				options: [
					{
						optionId: "-NRr4CL3TnNz9ZVAkq4x",
						option: "Versatility",
						votes: 8,
					},
					{
						optionId: "-NRr4CL3TnNz9ZVAkq4y",
						option: "Accuracy",
						votes: 6,
					},
					{
						optionId: "-NRr4CL3TnNz9ZVAkq4z",
						option: "Diligence",
						votes: 5,
					},
					{
						optionId: "-NRr4CL3TnNz9ZVAkq5-",
						option: "I.Q.",
						votes: 14,
					},
				],
			},
			{
				questionId: "-NRr4CL3TnNz9ZVAkq4w",
				question: " Which of the following is not a type of computer code?",
				maxSelections: "2",
				options: [
					{
						optionId: "-NRr4CL3TnNz9ZVAkq4x",
						option: "EDIC",
						votes: 8,
					},
					{
						optionId: "-NRr4CL3TnNz9ZVAkq4y",
						option: "ASCII",
						votes: 6,
					},
					{
						optionId: "-NRr4CL3TnNz9ZVAkq4z",
						option: "BCD",
						votes: 5,
					},
					{
						optionId: "-NRr4CL3TnNz9ZVAkq5-",
						option: "EBCDIC",
						votes: 4,
					},
				],
			},
			{
				questionId: "-NRr4CL3TnNz9ZVAkq4w",
				question:
					"Which of the following device use positional notation to represent a decimal number?",
				maxSelections: "2",
				options: [
					{
						optionId: "-NRr4CL3TnNz9ZVAkq4x",
						option: "Pascaline",
						votes: 8,
					},
					{
						optionId: "-NRr4CL3TnNz9ZVAkq4y",
						option: "Abacus",
						votes: 16,
					},
					{
						optionId: "-NRr4CL3TnNz9ZVAkq4z",
						option: "Computer",
						votes: 5,
					},
					{
						optionId: "-NRr4CL3TnNz9ZVAkq5-",
						option: "Calculator",
						votes: 4,
					},
				],
			},
		],
	},
];

export default function Graphs() {
	const [data, setData] = useState([]);
	const [label, setLabel] = useState([]);
	const [qlabel, setQLabel] = useState([]);

	useEffect(() => {
		let label1 = [];
		let data1 = [];
		let qLabel1 = [];

		for (let i = 0; i < data2[0].questions.length; i++) {
			let labels = [];
			let datas = [];

			qLabel1.push(data2[0].questions[i].question);
			for (let j = 0; j < data2[0].questions[i].options.length; j++) {
				labels.push(data2[0].questions[i].options[j].option);
				datas.push(data2[0].questions[i].options[j].votes);
			}

			let a = { labels: labels };
			let b = { data: datas };
			label1.push(a);
			data1.push(b);
		}
		setData(data1);
		setLabel(label1);
		setQLabel(qLabel1);
	}, []);

	return (
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
											backgroundColor: "hsl(206,90%,54%)",

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
	);
}
