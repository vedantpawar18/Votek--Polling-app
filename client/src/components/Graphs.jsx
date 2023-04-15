import { Bar, getElementsAtEvent } from "react-chartjs-2";
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from "chart.js";
import { useEffect, useRef, useState } from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "../App.css";
import { useDispatch } from "react-redux";
import { endedPoll, userVotedData } from "../redux/data/action";
import { useNavigate } from "react-router-dom";
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
	const navigate = useNavigate()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(endedPoll(token));
    }, [dispatch, token]);
    useEffect(() => {
        let label1 = [];
        let data1 = [];
        let qLabel1 = [];
        for (let i = 0; i < item.pollData[0]?.questions?.length; i++) {
            let labels = [];
            let datas = [];
            let optionId = [];
            qLabel1.push(item.pollData[0]?.questions[i]?.question);
            for (let j = 0; j < item.pollData[0]?.questions[i]?.options.length; j++) {
                labels.push(item.pollData[0].questions[i].options[j].option);
                optionId.push(item.pollData[0].questions[i].options[j]._id);
                datas.push(item.pollData[0].questions[i].options[j].votes);
            }
            let a = { labels: labels };
            let b = { data: datas, optionId: optionId };
            label1.push(a);
            data1.push(b);
        }
        setData(data1);
        setLabel(label1);
        setQLabel(qLabel1);
    }, [item.pollData]);
   
  
    const onClick = (event, clickedElements) => {
        if (clickedElements.length === 0) return;
        const { dataIndex } = clickedElements[0].element.$context;
        let oId =  data[0]?.optionId[dataIndex]
		localStorage.setItem("pollId",item?.pollData[0]?.pollId);
		localStorage.setItem("optionId",oId);
		localStorage.setItem("questionId",item?.pollData[0]?.questions[0]?._id);
		if(!item?.pollData[0]?.pollStatus){
            navigate('/user-voted')
        }
        
    };


    return (
        <>
            <div id="canvas-container">
                {data.length &&
                    data.map((item, i) => {
                        return (
                            <article className="canvas-container">
                                <Bar
                                    className="bar"
                                    // onClick={() => handleClick(item?.optionId)}
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
                                        maintainAspectRatio: false,
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
                                                formatter: (value) => value,
                                                anchor: "end",
                                                offset: -30,
                                                align: "start",
                                                links: "/user-vote",
                                            },
                                        },
                                        onClick,
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
                            </article>
                        );
                    })}
            </div>
        </>
    );
}