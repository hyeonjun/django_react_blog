import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router'
import CKEditor from 'ckeditor4-react-advanced';
import {Form} from "react-bootstrap";
import {useLocation} from "react-router";
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

const titleStyle = {
    marginBottom: 9,
    width: 762,

  };

function Update(props){
    
    let [filterList] = useState([{id : 1, infomation: '챌린저'}, {id : 2, infomation : '그랜드마스터'},
    {id : 3, infomation : '마스터'}, {id : 4, infomation :'다이아몬드'}, {id : 5, infomation:'플레티넘'},
    {id : 6, infomation:'골드'}, {id : 7, infomation:'실버'}, {id : 8, infomation:'브론즈'}, {id : 9, infomation:'아이언'}])
    let [InfomationfilterList, setInfomationFilterList] = useState("")

    const handleChange = (event) => {
    setContent(event.editor.getData())
    // setContent(event.target.value);
  };
    const history = useHistory();
    // let Today = new Date();
    // let date = Today.getFullYear() + "-" + Today.getMonth() + "-" + Today.getDate()

    let pgN = document.location.href.split('/')[4];
    let [title , setTitle] = useState("");
    let [content , setContent] = useState("");
    let [detailList, setDetailList] = useState({});
    let [detailUserInfo, setDetailUserInfo] = useState({});
    let [detailDate, setDetailDate] = useState();
    let [usergrade, setUserGrade] = useState();
    let [currnetUser, setCurrentUser] = useState({});
    let [urls, setUrls] = useState();
    let Today = new Date();
    let date = Today.getFullYear() + "년" + Today.getMonth() + "월" + Today.getDate() + "일";
    const location = useLocation();
    const csrftoken = getCookie('csrfToken');

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

    useEffect(()=>{
        fetch('http://39.118.174.168:8000/api/current_user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
                })
                .then(res => res.json())
                .then(json => {
                fetch('http://39.118.174.168:8000/api/profile/' + json.id + '/update/',{
                        method : 'PATCH',
                        headers: {
                            Authorization: `JWT ${localStorage.getItem('token')}`
                        },
                    })
                    .then((res)=>res.json())
                    .then((posts)=> {
                        setCurrentUser(posts);
                        setUserPhoto(posts.photo);
                        setUserGrade(posts.grade);
                        
                        if(location.state.url==="일반 수강생"){
                            setUserGrade("일반 수강생");
                            setUrls("student/");
                          } else if(location.state.url==="프리미엄 수강생"){
                            setUserGrade("프리미엄 수강생");
                            setUrls("premiumst/");
                          } else if(location.state.url==="일반 파트너"){
                            setUserGrade("일반 파트너");
                            setUrls("partner/");
                          } else if(location.state.url==="프리미엄 파트너"){
                            setUserGrade("프리미엄 파트너");
                            setUrls("premium/");
                          } else{
                            history.push('/profile');
                            alert("티어인증이 필요합니다");
                          }
                    })
                })  
                
        fetch('http://39.118.174.168:8000/board/'+ urls + pgN + "/")
        .then((res)=>res.json())
            .then((posts)=>{
                // console.log(urls);
                setDetailList(posts)
                setTitle(posts.title)
                setContent(location.state.content)
                setUser_id(posts.user_id);
                setUserNickname(posts.nickname);
                let Y = posts.pub_date.split('-')[0]
                let M = posts.pub_date.split('-')[1]
                let D = posts.pub_date.split('-')[2].split('T')[0]
                setDetailDate(Y + "년 " + M + "월 " + D + "일")
                setInfomationFilterList(posts.infomation.split(','))
                fetch('http://39.118.174.168:8000/api/profile/' + posts.user_id + '/')
                .then((res)=>res.json())
                .then((info)=>{
                    setDetailUserInfo(info)
                })
            })
    },[pgN,urls,history, location])

    const handleSubmit = () => {
        let form_data = new FormData();
        form_data.append('category', sendData.grade);
        form_data.append('title', sendData.title);
        form_data.append('contents', sendData.content);
        form_data.append('pub_date', sendData.date);
        form_data.append('infomation', sendData.infomation);
        form_data.append('nickname', sendData.nickname);
        form_data.append('profileImage', sendData.profileImage)
        form_data.append('user_id', sendData.user_id);
        
        fetch("http://39.118.174.168:8000/board/" + urls + pgN + "/update/", {
            method : 'PATCH',
            headers: {
                Authorization : `JWT ${localStorage.getItem('token')}`,
            },
            body : form_data
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', JSON.stringify(response)))
        // .then(history.push("urls/"))
        alert("수정이 완료되었습니다")
        window.location.href ="/" + urls
        //  .then(history.go(1));
    };


    const handleEffect = (handleSubmit) => {
        // if(InfomationfilterList === "" || InfomationfilterList.length === 0){
        //     alert("한 개 이상의 언어를 선택해주세요.")
        //     return;
        // }
        if(title === undefined || title === "" || title === null){
            alert("제목을 다시 입력해주세요")
            return;
          }
        if(content === undefined || content === "" || content === null){
            alert("내용을 다시 입력해주세요")
            return;
           }
        sendData = {
            title : title,
            content : content,
            date : date,
            nickname : userNickname,
            infomation : InfomationfilterList,
            profileImage : userPhoto,
            user_id : user_id,
            grade : usergrade
        }
        handleSubmit()
        
    }
    let sendData;

    let [userNickname, setUserNickname] = useState()
    let [user_id, setUser_id] = useState()
    
    let [userPhoto, setUserPhoto] = useState()

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
    

    return(
        <>
            <div className="detail__container">
                <div className="detail__head-wrapper">
                    <h1>{detailList.title}</h1>
                    <div className="detail__head-btn">
                        {
                 
                        }
                    </div>
                    <div className="detail__head-info">
                        <div className="information">
                            <span className="detail__head-username">{detailList.nickname}</span>
                            <span className="separator">·</span>
                            <span>{detailDate}{detailList.updateCount === 0 ? null : "  ·  작성됨"}</span>
                        </div>
                        <div className="detail__head-mobileLike">
                            <button className="likeBtn">
                                <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"></path></svg>
                            </button>
                        </div>
                    </div>
                    
                   
                    <div className="filetrList">
                    {
                        <>
                        {
                            InfomationfilterList === "" || InfomationfilterList === undefined || InfomationfilterList === null 
                            ? null :
                            (
                                <>   
                                {
                                    InfomationfilterList.map((a, i)=>{
                                        return(
                                            <p key={i}>#{a}</p>
                                        )
                                    })
                                }
                                </>
                            )
                        }
                        </>
                    }
                    </div>
                    {
                        detailList.image === null
                        ? null
                        : <img src={detailList.image} alt=""></img>
                    }
                   
                </div>
                <div className="detail__body-wrapper">
                    <div className="detail__content">
                    <Form.Control
                    type = "text"
                    style = {titleStyle}
                    placeholder = "제목을 입력하세요"
                    defaultValue = {detailList.title}
                    onChange = {(event)=>{setTitle(event.target.value)}}/>
                    
                    <CKEditor
                    data = {detailList.contents}
                    onChange = {handleChange}
                    config={{
                        extraPlugins: 'print,format,font,colorbutton,justify,image2',
                          // filebrowserUploadMethod:'form',
                          uiColor: "#AADC6E",
                          // filebrowserBrowseUrl: 'http://39.118.174.168:8000/media/board/',
                          // filebrowserImageBrowseUrl: 'http://39.118.174.168:8000/ckeditor/browse/',
                          filebrowserUploadUrl: 'http://39.118.174.168:8000/media/board/',
                          filebrowserImageUploadUrl: 'http://39.118.174.168:8000/ckeditor/upload/',
                          headers: {
                            'X-CSRFToken': csrftoken,
                          }
                      }} />
                 {
                
                 detailList.user_id === currnetUser.user_id || currnetUser.Tier === "운영자"
                 ?(
                 <button className="upButton"
                  onClick={()=>{
                    handleEffect(handleSubmit) 
                  }}>

                수정하기</button>
                )
                : null
                }
                
                        {/* <p dangerouslySetInnerHTML={{
                            __html: detailList.contents
                        }}></p> */}
                    </div>
                </div>

                <div className="detail__footer-wrapper">
                    <div className="detail__writerInfo">
                        <div className="detail__topInfo">
                            <Link to={"/mysite/" + detailList.id}>
                                <img src={detailList.profileImage} alt=""></img>
                            </Link>
                            <div className="detail__userInfo">
                                <div className="description">{detailUserInfo.myInfo}</div>
                            </div>
                        </div>
                        <div className="sc-epnACN eIoWCE"></div>
                        <div className="detail__buttomInfo">
                      
                        </div>
                    </div>
                </div>

                <div className="detail__comment-wrapper">
                    {/* <h4>{commentList.length + reCommentList.length}개의 댓글</h4> */}
                    <div className="detail__comment-width">
                        {/* <div>
                            <textarea ref={commentTxt} defaultValue="" placeholder="댓글을 작성하세요" className="comment__textarea" onChange={(e)=>{setCommentContent(e.target.value)}}></textarea>
                            <div className="buttons-wrapper">
                                <button className="comment__btn" onClick={()=>{CommentEffect(CommentSubmit)}}>댓글 작성</button>
                            </div>
                        </div> */}
                        <div className="margin__top">
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fillter_section">
            <aside className="pDRpR">
            <div className="eyrfCG">
              <div className="filter__head" />
                <ul style={{ listStyleType: "none"}}>
                 {
                    filterList.map((a)=>{
                        let boolenChecked = false
                        if(InfomationfilterList.indexOf(a.infomation) !== -1){
                            boolenChecked = true
                        }
                        return(
                        <li key={a.id}>
                            <input id={a.infomation} className="filters-input__checkboxs" value="action" type="checkbox" data-type="genres" defaultChecked={boolenChecked}></input>
                            {
                                console.log(a.infomation +":"+ boolenChecked)                                
                            }
                            <label className="input__labels" htmlFor={a.infomation} onClick={()=>{ClickFilter(a.infomation)}}>
                              <span> {a.infomation} </span>
                               <span className="filters-input__ticks">
                                <svg 
                                focusable="false" aria-hidden="true"
                                width="15"
                                height="15">
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
            </div>
        </>
    )
}
export default Update;