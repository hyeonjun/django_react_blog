import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router'
import CKEditor from 'ckeditor4-react';
import {Form} from "react-bootstrap";
import '../views/Boardwrite.css';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

  const titleStyle = {
     marginBottom: 9,
     width: 660

   };

   
function Boardwrite() {


  let [filterList] = useState([{id : 1, infomation: '챌린저'}, {id : 2, infomation : '그랜드마스터'},
    {id : 3, infomation : '마스터'}, {id : 4, infomation :'다이아몬드'}, {id : 5, infomation:'플레티넘'},
    {id : 6, infomation:'골드'}, {id : 7, infomation:'실버'}, {id : 8, infomation:'브론즈'}, {id : 9, infomation:'아이언'}])
    let [InfomationfilterList, setInfomationFilterList] = useState("")
    
    let Today = new Date();
    let date = Today.getFullYear() + "-" + Today.getMonth() + "-" + Today.getDate()
    
    function getCookie(name) {
      var cookieValue = null;
      if (document.cookie && document.cookie !== '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
              var cookie = jQuery.trim(cookies[i]);
              if (cookie.substring(0, name.length + 1) === (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }
      return cookieValue;
    }
    const csrftoken = getCookie('csrfToken');

    const history = useHistory()
    let [title , setTitle] = useState("")
    let [content , setContent] = useState("내용을 입력하세요.")
    let [userPhoto, setUserPhoto] = useState()
    let [user_id, setUser_id] = useState()
    let [userNickname, setUserNickname] = useState()
    let [usergrade, setUserGrade] = useState()
    let sendData;
    let [urls, setUrls] = useState()
    const handleEffect = (handleSubmit) => {
        if(InfomationfilterList === "" || InfomationfilterList.length === 0){
            alert("한 개 이상의 언어를 선택해주세요.")
            return;
        }
        sendData = {
            title : title,
            content : content,
            date : date,
            like : 0,
            nickname : userNickname,
            infomation : InfomationfilterList,
            profileImage : userPhoto,
            user_id : user_id,
            grade : usergrade
        }
        handleSubmit()
    }

    useEffect(()=>{
        fetch('http://39.118.174.168:8000/api/current_user/', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
          }
        })
        .then(res => res.json())
        .then(json => {
          if (json.id === null || json.id === undefined) {
            alert("로그인이 필요합니다.")
            window.location.href = "/login"
        }fetch('http://39.118.174.168:8000/api/profile/' + json.id + '/update/',{
                method : 'PATCH',
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                },
            })
            .then((res)=>res.json())
            .then((userData)=> {
                setUserPhoto(userData.photo);
                setUser_id(userData.user_id);
                setUserNickname(userData.nickname);
                setUserGrade(userData.grade);
                if(userData.grade===4){
                  setUserGrade("일반 수강생");
                  setUrls("student/");
                } else if(userData.grade===3){
                  setUserGrade("프리미엄 수강생");
                  setUrls("premiumst/");
                } else if(userData.grade===2){
                  setUserGrade("일반 파트너");
                  setUrls("partner/");
                } else if(userData.grade===1){
                  setUserGrade("프리미엄 파트너");
                  setUrls("premium/");
                } else{
                  history.push('/profile');
                  alert("티어인증이 필요합니다");
                }
            })
            .catch(error => {
                console.log(error);
              });
        }).catch(error => {
            console.log(error)
          });
    },[history])

    const handleSubmit = () => {
      let form_data = new FormData();
      form_data.append('category', sendData.grade);
      form_data.append('title', sendData.title);
      form_data.append('contents', sendData.content);
      form_data.append('pub_date', sendData.date);
      form_data.append('infomation', sendData.infomation);
      form_data.append('like', sendData.like);
      form_data.append('nickname', sendData.nickname);
      form_data.append('profileImage', sendData.profileImage)
      form_data.append('user_id', sendData.user_id);
      
      fetch("http://39.118.174.168:8000/board/"+urls, {
          method : 'POST',
          headers: {
              Authorization : `JWT ${localStorage.getItem('token')}`,
          },
          body : form_data
      })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', JSON.stringify(response)))
      .then(history.push("/"+urls))
      // .then(history.go(0));
  };

    const ClickFilter = (lang)=>{
      let Num = 0;
      let List = [...InfomationfilterList]
      
      List.map((a)=>{
          if(a === lang){
              Num = 1;
          }
          return Num;
      })
      if (Num === 0) {
          List.push(lang)
      }else{
          List.splice(List.indexOf(lang),1)
      }
      setInfomationFilterList(List)
  }
  const handleChange = (event) => {
    console.log(event.editor.getData())
    setContent(event.editor.getData())
    // setContent(event.target.value);
  };




  return (
    <>
            <div className="container-section">
              <h2>글작성</h2>
              <div>
              <FormControl className="MenuItem"
                           >
              <MenuItem>게시판 = {usergrade}</MenuItem>
              </FormControl>
              <br />
              <Form.Control
                 type = "text"
                 style = {titleStyle}
                 placeholder ="제목을 입력하세요"
                 onChange = {(e)=>{setTitle(e.target.value)}}/>
              </div>
              <form>
              <CKEditor 
                  value = {content}
                  onChange = {handleChange}
                  
                  config={{
                    
                    extraPlugins: 'print,format,font,colorbutton,justify,image2',
                    // filebrowserUploadMethod:'form',
                    uiColor: "#AADC6E",
                    // filebrowserBrowseUrl: 'http://39.118.174.168:8000/media/board/',
                    // filebrowserImageBrowseUrl: 'http://39.118.174.168:8000/ckeditor/browse/',
                    filebrowserUploadUrl: 'http://39.118.174.168:8000/media/board/',
                    filebrowserImageUploadUrl: 'http://39.118.174.168:8000/ckeditor/upload/',
                    // ckfinder: {
                    //   // Upload the images to the server using the CKFinder QuickUpload command.
                    //   uploadUrl: 'http://39.118.174.168:8000/ckeditor/upload/'
                    // },
                    headers: {
                      'X-CSRFToken': csrftoken,
                    }
                  }}                  
              />
              </form>
                <button className="upButton"
                  onClick={()=>{
                    handleEffect(handleSubmit) 
                  }}>

                출간하기</button>
            </div>
                        

          <aside className="pDRpRs">
            <div className="eyrfCGs">
              <div className="filter__heads" />
                <ul style={{ listStyleType: "none"}}>
                 {
                    filterList.map((a)=>{
                        return(
                        <li key={a.id}>
                            <input id={a.infomation} className="filters-input__checkboxs" value="action" type="checkbox" data-type="genres"></input>
                            <label className="input__labels" htmlFor={a.infomation} onClick={()=>{ClickFilter(a.infomation)}}>
                              <span> {a.infomation} </span>
                               <span className="filters-input__ticks">
                                <svg 
                                width="13"
                                height="13">
                                <use xlinkHref="#check">
                                <svg viewBox="0 0 24 24" id="check" xmlns="http://www.w3.org/2000/svg"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436L24 5.782z"></path></svg>
                                </use>
                                </svg>
                              </span>
                            </label>
                        </li>
                        )
                    })
                  }
                </ul>
                
               </div>  
            </aside>
                    
    </>
  )
}
export default Boardwrite;