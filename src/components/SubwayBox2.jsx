// 테이블 12개 출력되는 subwaybox2

import scode from '../db/scode.json'
export default function SubwayBox2({ items }) {
  const keys = Object.keys(scode);
  
  return (
    <div className="overflow-x-auto">
      <table className="border border-gray-400 w-full text-center">
        <thead>
          <tr>
            {keys.map(key => (
              <th key={key} className="border border-gray-300 p-2 bg-gray-100">
                {scode[key].name} ({scode[key].unit})
              </th>
            ))}
            <th className="border border-gray-300 p-2 bg-gray-100">측정소</th>
            <th className="border border-gray-300 p-2 bg-gray-100">지역</th>
            <th className="border border-gray-300 p-2 bg-gray-100">시각</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              {keys.map(key => (
                <td key={key} className="border border-gray-300 p-2">
                  {item[key] !== undefined ? item[key] : "-"}
                </td>
              ))}
              <td className="border border-gray-300 p-2">{item.site}</td>
              <td className="border border-gray-300 p-2">{item.city}</td>
              <td className="border border-gray-300 p-2">{item.controlnumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
