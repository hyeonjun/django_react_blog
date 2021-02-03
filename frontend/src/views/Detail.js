import React, { useState, useEffect } from 'react';
import '../views/Detail.css';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router'

function Detail(props){
    const history = useHistory()
    // let Today = new Date();
    // let date = Today.getFullYear() + "-" + Today.getMonth() + "-" + Today.getDate()

    let pgN = document.location.href.split('/')[4]

    let [detailList, setDetailList] = useState({});
    let [detailUserInfo, setDetailUserInfo] = useState({});
    let [detailDate, setDetailDate] = useState();
    let [detailLang, setDetailLang] = useState([]);

    let [detailLikedUser, setDetailLikedUser] = useState([]);
    let [svgColor, setSvgColor] = useState({});

    let [currnetUser, setCurrentUser] = useState({});
    
    useEffect(()=>{
        fetch('http://39.118.174.168:8000/board/'+ props.path + pgN + "/")
        .then((res)=>res.json())
            .then((posts)=>{
                console.log(posts)
                setDetailList(posts)
                let Y = posts.pub_date.split('-')[0]
                let M = posts.pub_date.split('-')[1]
                let D = posts.pub_date.split('-')[2].split('T')[0]
                setDetailDate(Y + "년 " + M + "월 " + D + "일")
                setDetailLang(posts.infomation.split(','))
                setDetailLikedUser(posts.likedUser.split(','))
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
                    .then((userData)=> {
                        setCurrentUser(userData)
                    })
                })  
                fetch('http://39.118.174.168:8000/api/profile/' + posts.user_id + '/')
                .then((res)=>res.json())
                .then((info)=>{
                    setDetailUserInfo(info)
                })
            })
    },[pgN,props.path])

    function sleep(ms) {
        const wakeUpTime = Date.now() + ms
        while (Date.now() < wakeUpTime) {
        }
      }

    const DelBoard = ()=>{
        if((currnetUser.user_id === detailList.user_id) || currnetUser.Tier === "운영자"){
            if(window.confirm('정말 삭제하시겠습니까 ?')===true){
                // timeSensativeAction()
                fetch('http://39.118.174.168:8000/board/'+ props.path + pgN + "/delete/", {
                method : 'DELETE',
                headers: {
                    Authorization : `JWT ${localStorage.getItem('token')}`,
                }
                })
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => console.log('Success:', JSON.stringify(response)));
                sleep(100)
                window.location.href = '/' + props.path;
                // timeSensativeAction()

            }
        }else{
            alert("권한이 없습니다.")
        }
    }

    const UpdateBoard = () => {
        console.log(detailList)
        console.log(pgN)
        detailList.user_id === currnetUser.user_id || currnetUser.Tier === "운영자"
        ? (
            history.push({
                pathname:"/update/"+pgN,
                state:{url:detailList.category, content:detailList.contents}
            })
        )
        : alert("권한이 없습니다.")
    }


    let sendData;
    const handleEffect = (ClickLikeBtn) => {
        if(currnetUser.user_id !== null && currnetUser.user_id !== undefined && currnetUser.user_id !== ""){
        // detailLikedUser라는 state값이 currentUser.user_pk(접속해있는 유저의 pk값)을 index로 가지고있지 않다면
            if(detailLikedUser.indexOf(currnetUser.user_id + "") === -1){ //추천
                let arr = [...detailLikedUser]
                arr.push(currnetUser.user_id)
                let plusUser = arr.join(',')
                sendData = {
                    like : detailList.like + 1,
                    likedUser : plusUser
                }
                setSvgColor({color : "black"})
            }else{ //추천취소
                let arr = [...detailLikedUser]
                arr.splice(arr.indexOf(currnetUser.user_id + ""), 1)
                let minusUser = arr.join(',')
                 sendData = {
                    like : detailList.like - 1,
                    likedUser : minusUser
                }
                setSvgColor({color : "gray"}) 
            }
            ClickLikeBtn()
        }else {
            alert("로그인이 필요합니다.")
            window.location.href ="/login"
        }
        
    }

    const ClickLikeBtn = ()=>{
        let form_data = new FormData();
        form_data.append('like', sendData.like);
        form_data.append('likedUser', sendData.likedUser);

        fetch('http://39.118.174.168:8000/board/'+ props.path + pgN + "/update/", {
            method : 'PATCH',
            headers: {
                Authorization : `JWT ${localStorage.getItem('token')}`,
            },
            body : form_data
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(()=>{
            fetch('http://39.118.174.168:8000/board/'+ props.path + pgN + "/")
            .then((res)=>res.json())
            .then((posts)=>{
                setDetailList(posts)
                console.log(posts)
                setDetailLikedUser(posts.likedUser.split(','))
            });
        })
    }    

    return(
        <>
            <div className="detail__container">
                <div className="detail__head-wrapper">
                    <h1>{detailList.title}</h1>
                    <div className="detail__head-btn">
                        {
                            detailList.user_id === currnetUser.user_id || currnetUser.Tier === "운영자"
                            ?(
                                <>
                                <button onClick={UpdateBoard}>수정</button>
                                <button onClick={DelBoard}>삭제</button>
                                </>
                            )
                            : null
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
                                <span>{detailList.like}</span>
                            </button>
                        </div>
                    </div>
                    
                    <div className="detail__head-like">
                        <div className="iCfLcp">
                            <div className="dtrfkW" onClick={()=>{handleEffect(ClickLikeBtn)}}>
                                <svg style={svgColor} width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"></path></svg>
                            </div>
                            <div className="sc-iyvyFf bJqQCy">{detailList.like}</div>
                        </div>
                    </div>
                    <div className="filetrList">
                    {
                        detailLang.map((a, i)=>{
                            return(
                                <p key={i}>#{a}</p>
                            )
                        })
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
                        <p dangerouslySetInnerHTML={{
                            __html: detailList.contents
                        }}></p>
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
        </>
    )
}
export default Detail;