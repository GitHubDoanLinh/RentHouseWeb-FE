import * as React from 'react';
import './tableStyle.css'
const users = [
  {
    id: 1,
    avatar:
      "https://yt3.googleusercontent.com/inhxgLbhHuXL6IllrpCH9jw7jdb0aQLv4hpVdATYsBGJAwFYs8OpuvBKnKz-8M2eHp1oXvoyIQ=s900-c-k-c0x00ffffff-no-rj",
    username: "Snow",
    email: "abcd@gmail.com",
    birthday: "26-05-1992",
  },
  {
    id: 2,
    avatar:
      "https://yt3.googleusercontent.com/inhxgLbhHuXL6IllrpCH9jw7jdb0aQLv4hpVdATYsBGJAwFYs8OpuvBKnKz-8M2eHp1oXvoyIQ=s900-c-k-c0x00ffffff-no-rj",
    username: "Snow",
    email: "abcd@gmail.com",
    birthday: "26-05-1992",
  },
  {
    id: 3,
    avatar:
      "https://yt3.googleusercontent.com/inhxgLbhHuXL6IllrpCH9jw7jdb0aQLv4hpVdATYsBGJAwFYs8OpuvBKnKz-8M2eHp1oXvoyIQ=s900-c-k-c0x00ffffff-no-rj",
    username: "Snow",
    email: "abcd@gmail.com",
    birthday: "26-05-1992",
  },
  {
    id: 4,
    avatar:
      "https://yt3.googleusercontent.com/inhxgLbhHuXL6IllrpCH9jw7jdb0aQLv4hpVdATYsBGJAwFYs8OpuvBKnKz-8M2eHp1oXvoyIQ=s900-c-k-c0x00ffffff-no-rj",
    username: "Snow",
    email: "abcd@gmail.com",
    birthday: "26-05-1992",
  },
  {
    id: 5,
    avatar:
      "https://yt3.googleusercontent.com/inhxgLbhHuXL6IllrpCH9jw7jdb0aQLv4hpVdATYsBGJAwFYs8OpuvBKnKz-8M2eHp1oXvoyIQ=s900-c-k-c0x00ffffff-no-rj",
    username: "Snow",
    email: "abcd@gmail.com",
    birthday: "26-05-1992",
  },
];
function UserManager() {
  return (
    <>
        <div className="table-users">
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Avatar</th>
                    <th scope="col">User name</th>
                    <th scope="col">Email</th>
                    <th scope="col">BirthDay</th>
                    <th scope="col" colSpan={2}>Action</th>
                </tr>
                </thead>
                <tbody>
                {users.map((item) => (
                    <tr key={item.id}>
                        <th scope="row">{item.id}</th>
                        <td><img src={item.avatar} alt="" style={{height:'80px' ,width:'80px',borderRadius:'20%'}}/></td>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td>{item.birthday}</td>
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
  );
}

export default UserManager;
