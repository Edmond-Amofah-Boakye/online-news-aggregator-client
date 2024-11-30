import "react-quill/dist/quill.snow.css";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Editor  from "../../components/common/Editor";
// import Editor from "../../components/common/Editor";


const NewArticle = () => {
  const naviagate = useNavigate();

  return (
    <>
      <p
        className="p-4 cursor-pointer flex gap-1 items-center"
        onClick={() => naviagate(-1)}
      >
        <BiArrowBack />
        <span>Go Back</span>
      </p>
      <div className="flex flex-col justify-center items-center">
        <div className="bg-slate-50 w-[800px] min-h-[400px] rounded shadow-sm p-6">
          <form action="">
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-black font-bold text-xl mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Enter Article Title Here"
                className="w-full border border-black p-2 rounded"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="description"
                className="block text-black font-bold text-xl mb-2"
              >
                Description
              </label>
              <Editor />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-blue-700 text-white text-xl w-full p-2 rounded"
              >
                ADD ARTICLE
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewArticle;
