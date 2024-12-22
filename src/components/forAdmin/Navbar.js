import * as React from 'react';
import {Link} from "react-router-dom";
const Navbar = () => {
    return (
        <>
            <span style={{textAlign:'center',alignItems:'center'}}>
                <h2>
                    <Link to={'/admin/users'}>Quản lí người dùng</Link>
                </h2>
            </span>
            <br/>

        </>
    )
}
export default Navbar;