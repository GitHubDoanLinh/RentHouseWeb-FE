import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import { getMoney} from "../../../redux/services/BookingService";
import ReactApexChart from 'react-apexcharts';


export default function MoneyDiagram() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const defaultMonth = 1;
    const [month, setMonth] = useState(defaultMonth);
    const money = useSelector(({bookings}) => {
        return bookings.money;
    })
    useEffect(() => {
        dispatch(getMoney({month, userId: id }))
    }, [month, id]);
      const createChartData = () => {
        const data = money.map(item => ({ x: item[0], y: item[1] }));
        return [{
            name: 'Doanh thu',
            data: data,
        }];
    };
    const sum  = money.reduce(function (acc, obj) { return acc + obj[1]; }, 0);
    const formatPrice = (money) =>{
        return money.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
    }
    const options = {
        chart: {
            height: 350,
            width: 600,
            type: 'line',
            zoom: {
                enabled: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'straight',
        },
        title: {
            text: 'Biểu đồ doanh thu theo tuần',
            align: 'left',
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5,
            },
        },
        xaxis: {
            categories: money.map((value, index) => index),
        },
    };
    const handleMonthChange = (event) => {
        setMonth(parseInt(event.target.value, 10));
    };

    return (
        <>
            <div style={{marginLeft:"32px",marginTop:"12px"}}>
                <div style={{width:"150px", marginBottom:"12px"}}>
                <select value={month} onChange={handleMonthChange} >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                        <option key={m} value={m}>
                            Tháng {m}
                        </option>
                    ))}
                </select>
                </div>
            <div className="card mb-5">
                <div className="card-body">
                    <div id="chart">
                        <ReactApexChart options={options} series={createChartData()} type="line" height={350} width={750} />
                    </div>
                    <div id="html-dist"></div>
                </div>
                <span style={{marginLeft:'10px',marginBottom:'10px'}}>Doanh thu của tháng: {formatPrice(sum)}</span>
                </div>
            </div>

        </>
    )
}