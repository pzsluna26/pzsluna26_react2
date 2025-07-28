import { useState, useEffect, useRef} from "react"
import axios from "axios";
import TailButton from "../ui/TailButton"

const baseUrl = "http://localhost:3005/todos"; 
// http://localhost:3005/posts
export default function Rest() {
  const [tdata, setTdata] = useState([]);
  const titleR = useRef();
  const authorR = useRef();
  
  const getDataFatch = async () => {
    console.log(baseUrl)

    //axios 패치
    const {data} = await axios.get(baseUrl); 
   
    setTdata(data)
    console.log("패치된 데이터 : ", data)
  }

  useEffect(()=>{
    getDataFatch();
  },[])

  const handleInput = async (e) => {
    e.preventDefault();

    let postData = {
       
        "title": titleR.current.value,
        "author": authorR.current.value
  
    }

    // axios 추가
    await axios.post(baseUrl, postData); 
    // 저장 후 다시 fetch + 정렬
    await getDataFatch();  
    titleR.current.value="";
    authorR.current.value="";
   
  }


  // 포스트맨에서 delete => http://localhost:3005/posts/1 <= id값
                   // 비동기 // 인수 id로 받음
  const handleDelete = async (id) => {
    console.log(id)
    // axios 삭제
    await axios.delete(`${baseUrl}/${id}`); 
    // 삭제 후 다시 fetch + 정렬
    await getDataFatch();  
  }

 
  return (
    <div className="mt-10 w-full flex flex-colw-full h-full flex flex-col items-center">
      <form className="flex gap-4 items-center">
        <div className="flex gap-2 mr-4">
          <label htmlFor="txt1">제목: </label>
          <input type="text"
                 id="txt1" 
                 ref={titleR} 
                 className="underline" />
        </div>
        <div className="flex items-center gap-2 ">
          <label htmlFor="txt2">이름: </label>
          <input type="text" 
                 id="txt2" 
                 ref={authorR} 
                 className="underline" />
        </div>
        <TailButton caption="입력"
                    color="blue"
                    onClick={handleInput}
                    className="flex"/>
      </form>
      <ul className="flex flex-col mt-10">
      {                    // 여러개 요소 돌면, key값 반드시필요
        tdata.map(item => <li key={item.id}>
                              {item.title} ({item.author})
                              <TailButton caption ="삭제"
                                          color = "blue"
                                          onClick={()=>handleDelete(item.id)} //인수: 아이디
                                          className ="flex" />
                           </li>)
      }
      </ul>
    
    </div>
  )
}


// 콘솔 안뜨는 이유 찾기 (handleInput,handleDelete)
// 최신정보가 젤 위에 올라오지 않는 이유 찾기