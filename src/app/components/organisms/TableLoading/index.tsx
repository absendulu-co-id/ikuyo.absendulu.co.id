import React from "react";

interface Props {
    row: number
}
const TableLoading = ({
    row = 2
}: Props) => {
    return (
        <>
          {Array.from({length: 10}, (_, i) => (
            <tr key={i} className="animate-pulse">
                {Array.from({length: row}, (_, i) => (
                     <td key={i}>
                        <div className="h-5 bg-gray-200 rounded-md m-2 mr-2 ml-4"></div>
                    </td>
                ) )}
            </tr>
          ))}
        </>
        
      )
}

export default TableLoading