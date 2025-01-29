const TableHeader = ({ columns }) => {
    return (
      <thead>
        <tr className="bg-green-600 text-white">
          {columns.map((col, index) => (
            <th key={index} scope="col" className="px-4 py-3 text-left font-semibold">
              {col}
            </th>
          ))}
        </tr>
      </thead>
    );
  };
  
  export default TableHeader;