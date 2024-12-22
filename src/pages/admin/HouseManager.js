import * as React from 'react';
import './tableStyle.css'



const houses = [
    {id:1,name: 'Hotel Luxury',description:'Vippro',price:100,startTime:'20-12-2222',endTime:'20-12-2222',location:'Ha noi',bedRoom:2,livingRoom:1,kitchenRoom:1,category:'Hotel',image:'xxxxxxxx'},
    {id:1,name: 'Hotel Luxury',description:'Vippro',price:100,startTime:'20-12-2222',endTime:'20-12-2222',location:'Ha noi',bedRoom:2,livingRoom:1,kitchenRoom:1,category:'Hotel',image:'xxxxxxxx'},
    {id:1,name: 'Hotel Luxury',description:'Vippro',price:100,startTime:'20-12-2222',endTime:'20-12-2222',location:'Ha noi',bedRoom:2,livingRoom:1,kitchenRoom:1,category:'Hotel',image:'xxxxxxxx'},
    {id:1,name: 'Hotel Luxury',description:'Vippro',price:100,startTime:'20-12-2222',endTime:'20-12-2222',location:'Ha noi',bedRoom:2,livingRoom:1,kitchenRoom:1,category:'Hotel',image:'xxxxxxxx'},
    {id:1,name: 'Hotel Luxury',description:'Vippro',price:100,startTime:'20-12-2222',endTime:'20-12-2222',location:'Ha noi',bedRoom:2,livingRoom:1,kitchenRoom:1,category:'Hotel',image:'xxxxxxxx'},
    {id:1,name: 'Hotel Luxury',description:'Vippro',price:100,startTime:'20-12-2222',endTime:'20-12-2222',location:'Ha noi',bedRoom:2,livingRoom:1,kitchenRoom:1,category:'Hotel',image:'xxxxxxxx'},
];
export default function HouseManager() {
    return (
        <>
            <div className="table-users">
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col" colSpan={2}>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {houses.map((item) => (
                            <tr key={item.id}>
                                <th scope="row">{item.id}</th>
                                <td><img src={item.image} alt="" style={{height:'80px' ,width:'80px',borderRadius:'20%'}}/></td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                <td style={{width:'100px'}}><button className="btn btn-primary text-caps btn-rounded btn-framed">Update</button></td>
                                <td style={{width:'100px'}}><button className="btn btn-primary text-caps btn-rounded btn-framed">Delete</button></td>

                            </tr>
                        )
                    )}


                    </tbody>
                </table>
            </div>
            <hr/>

        </>
    )
}