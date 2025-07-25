import scode from '../db/scode.json'
import SubwayBox from './SubwayBox' // 하나씩 테이블 렌더링하는 컴포넌트

export default function SubwayBox3({ items }) {
  return (
    <>
      {items.map((item, idx) => (
        <SubwayBox key={item.controlnumber} 
                   item={item}
                   // idx로 색상구별하기
                   idx={idx} />
      ))}
    </>
  )
}
