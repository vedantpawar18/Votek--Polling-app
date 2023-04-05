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
import PollHistory from "./PollHistory";
import Active from "../components/Active";
import Inactive from "../components/Inactive";

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
    pollStatus: false,
    questions: [
      {
        questionId: "-NRr4CL2qh1FMfw032pO",
        question: "Third month in calender",
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
        question: "123",
        maxSelections: "2",
        options: [
          {
            optionId: "-NRr4CL3TnNz9ZVAkq4x",
            option: "1a",
            votes: 8,
          },
          {
            optionId: "-NRr4CL3TnNz9ZVAkq4y",
            option: "2a",
            votes: 6,
          },
          {
            optionId: "-NRr4CL3TnNz9ZVAkq4z",
            option: "3a",
            votes: 5,
          },
          {
            optionId: "-NRr4CL3TnNz9ZVAkq5-",
            option: "4a",
            votes: 4,
          },
		  {
            optionId: "-NRr4CL3TnNz9ZVAkq5-",
            option: "4a",
            votes: 4,
          },
		  {
            optionId: "-NRr4CL3TnNz9ZVAkq5-",
            option: "4a",
            votes: 4,
          },
        ],
      },
      {
        questionId: "-NRr4CL3TnNz9ZVAkq4w",
        question: "robin",
        maxSelections: "2",
        options: [
          {
            optionId: "-NRr4CL3TnNz9ZVAkq4x",
            option: "1a",
            votes: 8,
          },
          {
            optionId: "-NRr4CL3TnNz9ZVAkq4y",
            option: "10a",
            votes: 6,
          },
          {
            optionId: "-NRr4CL3TnNz9ZVAkq4z",
            option: "6a",
            votes: 5,
          },
          {
            optionId: "-NRr4CL3TnNz9ZVAkq5-",
            option: "4a",
            votes: 4,
          },
        ],
      },
    ],
  },
];

export default function BarChart(props) {
  const [data, setData] = useState([]);
  const [label, setLabel] = useState([]);
  const [qlabel, setQLabel] = useState([]);
 
let status = data2[0].pollStatus
// console.log("status",status)
  useEffect(() => {
    let label1 = [];
    let data1 = [];
    let qLabel1 = []
    
    for (let i = 0; i < data2[0]?.questions?.length; i++) {
        let labels=[]
        let datas=[]
		
        qLabel1.push(data2[0].questions[i].question)
      for (let j = 0; j < data2[0]?.questions[i].options.length; j++) {
        labels.push(data2[0].questions[i].options[j].option);
        datas.push(data2[0].questions[i].options[j].votes);
      }
      // console.log(i,"**")
      let a = {labels:labels}
      let b = {data:datas}
      label1.push(a)
      data1.push(b)
    }
    setData(data1);
    setLabel(label1);
    setQLabel(qLabel1)
    
  // console.log(data1,label1,"***22")

  }, []);
  // console.log(data,label,"*")

  // console.log("dataaaaaaaaaaaa",props.dataFromChild)

  return (
    <>
    
    <div status={props.setDataFromChild(status)} style={{ width: "40%", textAlign: "center" ,display:'grid',gridTemplateColumns:"repeat(2,1fr)",gap:"1fr",padding:"20px" }}  >
   
      {data.length && data.map((item,i)=>{
       return (
	   
	   <>
       
	   <Bar
        options={{
            indexAxis: "y",
            elements: {
              bar: {
                borderWidth: 1,
              },
            },
            
            responsive: true,
          
            plugins: {
              legend: {
                  display: false
                },
              title: {
                display: true,
                text:qlabel[i]
              },
              datalabels: {
                  color: "black",
                  formatter:value => value + " %",
                  anchor: "end",
                  offset: 20,
                  align: "start"
                }
             
              
            },
          }}
		plugins={[ChartDataLabels]}
		
        data={{
          labels: label[i].labels,
          datasets: [
            {
				
              label: qlabel[i],
              data: data[i].data,
              backgroundColor: "red",
			
			  maxBarThickness: 18,
			  minBarLength: 2,
            },
          ],
		  
        }}
        height={"200px"}
      />
	  </>
	  
	  )
	  
      })}
    </div>
    </>
  );
}