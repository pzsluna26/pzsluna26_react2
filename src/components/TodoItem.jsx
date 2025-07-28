import TailButton from "../ui/TailButton"
                               // item 가져와서(text,completed)
export default function TodoItem({item, onDelete, onModify}) {
  return (
    <div className=" mt-2 flex justify-between items-center border border-gray-300
                     rounded-lg w-full p-2 px-7">
      <div onClick={()=> onModify(item.id, item.completed)}>
        {
          item.completed == "X" ? "🤍" : "💙"
        }
      </div>
      <span className={`text-left w-120 ${item.completed === "X" ? ""
                                                : "text-yellow-400 line-through"}`}>
        {item.text}
      </span>
      <div>
        <TailButton           caption = "삭제"
                              color ="blue"
                              onClick = {()=> onDelete(item.id)
                             
                              }/>
      </div>
    </div>
  )
}
