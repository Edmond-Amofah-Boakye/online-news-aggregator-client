import { MdDeleteOutline, MdOutlineRemoveRedEye } from "react-icons/md";


interface ITableProps<V, T> {
  columns: V[];
  data: T[];
}

const AppTable = ({ columns, data }: ITableProps<object, object>) => {

  return (
    <div className="overflow-auto max-h-full max-w-full">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-teal-600 text-white font-semibold">
            <th>No.</th>
            {columns.map((item: any, index: number) => (
              <th className="p-3 border-b border-gray-200" key={index}>
                {item?.label}
              </th>
            ))}
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 && data.map((row: any, index: number) => (
            <tr
              key={index}
              className="even:bg-gray-50 odd:bg-white hover:bg-gray-100"
            >
              <td>1</td>
              {columns.map((column: any, colIndex: number) => (
                <td
                  className="p-3 border-b border-gray-200 text-gray-700"
                  key={colIndex}
                >
                  {row[column?.key] !== undefined ? row[column?.key] : "N/A"}
                </td>
              ))}
              <td className="py-2 px-4 flex gap-6">
                <MdOutlineRemoveRedEye size={20} color="blue"/>
                <MdDeleteOutline size={20} color="red"/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppTable;
