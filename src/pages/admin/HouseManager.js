import { Avatar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "avatar",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => <Avatar src={params.row.avatar} alt="Avatar" />,
  },
  { field: "username", headerName: "User name", width: 130 },
  { field: "email", headerName: "Email", width: 130 },
  // {
  //     field: 'birthDay',
  //     headerName: 'Birth day',
  //     type: 'date',
  //     width: 90,
  // }
];
const rows = [
  {
    id: 1,
    avatar:
      "https://yt3.googleusercontent.com/inhxgLbhHuXL6IllrpCH9jw7jdb0aQLv4hpVdATYsBGJAwFYs8OpuvBKnKz-8M2eHp1oXvoyIQ=s900-c-k-c0x00ffffff-no-rj",
    username: "Snow",
    email: "abcd@gmail.com",
    birthDay: "1992-26-05",
  },
  {
    id: 1,
    avatar:
      "https://yt3.googleusercontent.com/inhxgLbhHuXL6IllrpCH9jw7jdb0aQLv4hpVdATYsBGJAwFYs8OpuvBKnKz-8M2eHp1oXvoyIQ=s900-c-k-c0x00ffffff-no-rj",
    username: "Snow",
    email: "abcd@gmail.com",
    birthDay: "1992-26-05",
  },
  {
    id: 1,
    avatar:
      "https://yt3.googleusercontent.com/inhxgLbhHuXL6IllrpCH9jw7jdb0aQLv4hpVdATYsBGJAwFYs8OpuvBKnKz-8M2eHp1oXvoyIQ=s900-c-k-c0x00ffffff-no-rj",
    username: "Snow",
    email: "abcd@gmail.com",
    birthDay: "1992-26-05",
  },
  {
    id: 1,
    avatar:
      "https://yt3.googleusercontent.com/inhxgLbhHuXL6IllrpCH9jw7jdb0aQLv4hpVdATYsBGJAwFYs8OpuvBKnKz-8M2eHp1oXvoyIQ=s900-c-k-c0x00ffffff-no-rj",
    username: "Snow",
    email: "abcd@gmail.com",
    birthDay: "1992-26-05",
  },
  {
    id: 1,
    avatar:
      "https://yt3.googleusercontent.com/inhxgLbhHuXL6IllrpCH9jw7jdb0aQLv4hpVdATYsBGJAwFYs8OpuvBKnKz-8M2eHp1oXvoyIQ=s900-c-k-c0x00ffffff-no-rj",
    username: "Snow",
    email: "abcd@gmail.com",
    birthDay: "1992-26-05",
  },
];
function HouseManager() {
  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </>
  );
}

export default HouseManager;
