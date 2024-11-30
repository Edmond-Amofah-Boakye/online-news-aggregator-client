// import React from 'react'

import { useNavigate } from "react-router-dom";
import AppTable from "../../components/common/AppTable";
import { useGetAricles } from "../../backend/articles.service";

// const columns = ["Title", "Author", "Likes", "Shared", "Date"];
const columns = [
  {key: "title", label: "Title"},
  {key: "content", label: "Description"},
  // {key: "role", label: "Role"},
  // {key: "status", label: "Status"},
]


const Articles = () => {
  const navigate = useNavigate();
  const { data: articles } = useGetAricles()

  console.log(articles?.data)

  return (
    <div>
      <h1 className="text-black text-xl bg-white py-4 px-8 shadow-md">
        Articles
      </h1>
      <div className="px-8">
        <div className="flex flex-col justify-end items-end mt-5 mb-7">
          <button
            onClick={() => navigate("new")}
            className="bg-blue-800 text-white text-base py-2 px-4 rounded hover:bg-blue-600"
          >
            Add New Article
          </button>
        </div>
        <AppTable columns={columns} data={articles?.data} />
      </div>
    </div>
  );
};

export default Articles;
