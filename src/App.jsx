import { Button, Card, Table } from "antd";
import React, { useState } from "react";
import useFetchData from "./hooks/useFetchData";
import FormModal from "./formModal";
import { endPoints } from "./endpoints";
import { baseUrl } from "./baseUrl";

const App = () => {


  const clockedOut = (record) => {
    fetch(baseUrl + `${endPoints.getAllStudentClockedIn}/${record.id}`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }

    })
  }
  const columns = [
    {
      title: "SN",
      dataIndex: "key",
      key: "1",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "2",
    },
    {
      title: "LGA",
      dataIndex: "lga",
      key: "3",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "4",
    },
    {
      title: "Time In",
      dataIndex: "timeIn",
      key: "5",
      render: (_, record) => {
        return (
        <p>{record.timeIn} {parseInt(record.timeIn?.split(":")[0]) >= 12 ? "pm" : "am"}</p>
        );
      }
  
    },
    {
      title: "Action",
      dataIndex: "",
      key: "6",
      width: "100px",
      render: (_, record) => {
        return <Button type="primary"
        onClick={clockedOut}
        disabled={record.isClockedIn ? false : true}
        className="bg-blue-800 font-semibold">Clock Out</Button>
      }
    },
  ];

  // state to control the visibility state of the form modal
const [open, setOpen] = useState(false)

  // import your custom hook here
  const { data, loading } = useFetchData(endPoints.getAllStudentClockedIn);

  const dataSource = Array.isArray(data) ? data.map((x, index) => {
    return {
      ...x,
      key: index + 1,
    };
  }) : [];

  return (
    <div className="min-h-[100svh]">
      <FormModal open={open} setOpen={setOpen} />
      <header className="h-[4rem] outline outline-1 outline-[#c4c4c4] text-3xl flex items-center justify-center font-bold">
        STUDENT REGISTER
      </header>
      <main className="p-10">
        <div className="flex items-center justify-end">
          <Button
            type="primary"
            className="bg-blue-800 px-5 font-semibold"
          onClick={() => setOpen(true)}
          >
            Clock In
          </Button>

        </div>
        <Card className="mt-[2.5rem!important]">
          <Table
            bordered
            loading={loading}
            columns={columns}
            dataSource={Array.isArray(dataSource) ? dataSource : []}
          />
        </Card>
      </main>
    </div>
  );
};

export default App;
