// import React from 'react'

import { useGetUsers } from "../../backend/user.service";
import AppTable from "../../components/common/AppTable"

const columns = [
  {key: "username", label: "Name"},
  {key: "email", label: "Email"},
  {key: "role", label: "Role"},
  {key: "status", label: "Status"},
]

const Users = () => {
  const {data: users} = useGetUsers()

  return (
    <div className="">
      <h1 className="text-black text-xl bg-white py-4 px-8 shadow-md">Users</h1>
      <div className="">
        <AppTable columns={columns} data={users?.data}/>
      </div>
    </div>
  )
}

export default Users