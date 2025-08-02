import TailButton from '../ui/TailButton'
import TailSelect2 from '../ui/TailSelect2'
import { useRef, useEffect } from 'react'


                               // addTodo
export default function TodoForm({addTodo}) {
  const selR = useRef();
  const txtR = useRef();



  const handleOk = (e) => {
    e.preventDefault();
    console.log("❤ handleOk 실행됨");

    if(txtR.current.value==""){
      alert("할일 내용을 입력하세요.")
      txtR.current.focus();
      return ;
    }
    console.log("❤ 추가할 값:", txtR.current.value, selR.current.value);
    addTodo(txtR.current.value, selR.current.value);
    handleCancel();
  }

  const handleCancel = () => {
    console.log("❤ handleCancel 실행됨 - 입력값 초기화");
    txtR.current.value="";
    txtR.current.focus();
    selR.current.value="X";
  }

  
  // 첫화면 마우스커서 
  useEffect(() => {
    console.log("❤ TodoForm 첫시작, 마우스커서 입력창으로 이동");
    txtR.current.focus();
  },[]);

  

  return (
    <div className='flex mt-5'>
       <form className="flex items-center border-1 border-gray-300 p-7 rounded-2xl"> 
          <p className='font-bold ml-5 mr-10'>TODO</p>
          <TailSelect2 selRef = {selR}
                       dText = "-----"
                       id="sel1"
                      >

            <option value="X">X</option>
            <option value="O">O</option>
          </TailSelect2>
          <input type ="text" id="txt1"
                 ref = {txtR}
                 className="underline w-[300px] h-[35px] mr-10"/>
          <TailButton caption = "확인"
                      color ="blue"
                      onClick = {handleOk}
                      type="button"/>
          <TailButton caption = "취소"
                      color ="blue"
                      onClick = {handleCancel}
                      type="button"/>
       </form>
    </div>
  )
}


// 인풋창에서 밑줄 생기는거 해결하기
// 새로고침 문제 : 크롬 → F12 → Network 탭 → 상단 체크박스 "Preserve log" 를 켜두면솔/네트워크 로그가 새로고침돼도 유지됨