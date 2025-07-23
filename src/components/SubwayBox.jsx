import scode from '../db/scode.json'

export default function SubwayBox({item}) {
                 // pm10, co2w, ...
    const keys = object.keys(scode);
    console.log(keys)
  return (
    <div>
      <div>
        {item.site} {item.city} (시각 : {item.controlnumber})
      </div>
      <table>
        
      </table>
    </div>
  )
}
