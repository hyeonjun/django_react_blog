import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import '../views/Primium.css';

function Partner(){
    let [filterList] = useState([{id : 1, language: '챌린저'}, {id : 2, language : '그랜드마스터'},
    {id : 3, language : '마스터'}, {id : 4, language :'다이아몬드'}, {id : 5, language:'플레티넘'},
    {id : 6, language:'골드'}, {id : 7, language:'실버'}, {id : 8, language:'브론즈'}, {id :9, language:'아이언'}])
    let [languagefilterList, setLanguageilterList] = useState("");
    let [todolist, setTodoList] = useState([]);
    let pgN = document.location.href.split('/')[3]
    // let [nickname, setUserNickname] = useState()
    // let [userId, setUserId] = useState()

    useEffect(()=>{
        pgN === "like"
        ?(
            fetch('http://39.118.174.168:3653/board/partner/like/')
            .then((res)=>res.json())
            .then((posts)=>{
                setTodoList(posts);
            })
        )
        :(
            fetch('http://39.118.174.168:3653/board/partner/')
            .then((res)=>res.json())
            .then((posts)=>{
                
                setTodoList(posts)
            })
        )
    },[pgN])


    // useEffect(()=>{
    //     fetch('http://39.118.174.168:8000/api/current_user/', {
    //       headers: {
    //         Authorization: `JWT ${localStorage.getItem('token')}`
    //       }
    //     })
    //     .then(res => res.json())
    //     .then(json => {
    //       // 현재 유저 정보 받아왔다면, 로그인 상태로 state 업데이트 하고
    //       if (json.id) {
    //         setUserId(json.id)
    //         //유저정보를 받아왔으면 해당 user의 프로필을 받아온다.
    //     }fetch('http://39.118.174.168:8000/api/profile/' + json.id + '/update/',{
    //             method : 'PATCH',
    //             headers: {
    //                 Authorization: `JWT ${localStorage.getItem('token')}`
    //             },
    //         })
    //         .then((res)=>res.json())
    //         // 데이터베이스에서 가져오는 정확한 명
    //         .then((userData)=> {
             
    //             setUserNickname(userData.nickname)
                
    //         })
    //         .catch(error => {
    //             console.log(error);
    //           });;
    //     }).catch(error => {
    //         console.log(error)
    //       });
    // },[userId])


    const ClickFilter = (lang)=>{
        let Num = 0;
        let List = [...languagefilterList];

        List.map((a)=>{
            if (a === lang) {
                Num = 1;
            }
            return Num;
        })

        if (Num === 0) {
            List.push(lang)
        }else{
            List.splice(List.indexOf(lang),1)
        }
        setLanguageilterList(List)
    }
    

    return(
        <div className="trend-section">
            <main className="trend-main">
                <div className="main-section">
                        {
                            todolist.slice(0).reverse().map((a)=>{
                                let Y = a.pub_date.split('-')[0]
                                let M = a.pub_date.split('-')[1]
                                let D = a.pub_date.split('-')[2].split('T')[0]
                                let boardFilterArticle;
                                let Num;
                                let list =  a.infomation.split(',')
                                let path = a.contents.match('(http://39.118.174.168([^>])+(.jpg|.jpge|.png|.gif))');
                                console.log(path)
                                if(languagefilterList.length !== 0){
                                    languagefilterList.map((c)=>{
                                        if(list.indexOf(c) !== -1 && Num !== 0){
                                            Num = 1;
                                        }else{
                                            Num = 0;
                                            return Num;
                                        }
                                        return Num;
                                    })
                                    if(Num === 1){
                                        boardFilterArticle = 
                                        <div className="article" key={a.id}>
                                            {
                                                path === null
                                                ?
                                                (
                                                    <Link to={"/partnerdetail/" + a.id}>
                                                        <div className="arcticle-img">
                                                            {<img src="http://39.118.174.168:3653/media/board/BasicBoard.png" alt=""></img>}
                                                        </div>
                                                    </Link>
                                                )
                                                :(
                                                    <Link to={"/partnerdetail/" + a.id}>
                                                        <div className="arcticle-img">
                                                            {<img src={path[0]} alt=""></img>}
                                                        </div>
                                                    </Link>
                                                )
                                            }
                                            <div className="article-content">
                                                <Link to={"/partnerdetail/" + a.id}>
                                                    <h4>{a.title}</h4>
                                                    <div className="desc-wrapper">
                                                    
                                                    </div>
                                                </Link>
                                                <div className="sub-info">
                                                    <span>{Y + "년 " + M + "월 " + D + "일"}</span>
                                                </div>
                                                <div className="filter-info">
                                                {
                                                    list.map((L, i)=>{
                                                        return(
                                                            <p key={i}>#{L}</p>
                                                        )
                                                    })
                                                }
                                            </div>
                                            </div>
                                            <div className="article-footer">
                                                <Link to={"/partnerdetail/" + a.id}>
                                                    <img src={a.profileImage} alt=""></img>
                                                    <span>"by " <b>{a.nickname}</b></span>
                                                </Link>
                                                <div className="likes">
                                                    <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"></path></svg>
                                                    {a.like}
                                                </div>
                                            </div>
                                        </div>
                                    }
                                }else{
                                    boardFilterArticle = 
                                    <div className="article" key={a.id}>
                                        {
                                            path === null
                                            ? 
                                            (
                                                <Link to={"/partnerdetail/" + a.id}>
                                                    <div className="arcticle-img">
                                                        {<img src="http://39.118.174.168:3653/media/board/BasicBoard.png" alt=""></img>}
                                                    </div>
                                                </Link>
                                            )
                                            :(
                                                <Link to={"/partnerdetail/" + a.id}>
                                                    <div className="arcticle-img">
                                                        {<img src={path[0]} alt=""></img>}
                                                    </div>
                                                </Link>
                                            )
                                        }
                                        <div className="article-content">
                                            <Link to={"/partnerdetail/" + a.id}>
                                                <h4>{a.title}</h4>
                                                <div className="desc-wrapper">
                                                
                                                </div>
                                            </Link>
                                            <div className="sub-info">
                                                <span>{Y + "년 " + M + "월 " + D + "일"}</span>
                                            </div>
                                            <div className="filter-info">
                                            {
                                                list.map((L, i)=>{
                                                    return(
                                                        <p key={i}>#{L}</p>
                                                    )
                                                })
                                            }
                                        </div>
                                        </div>
                                        <div className="article-footer">
                                            <Link to={"/partnerdetail/" + a.id}>
                                                <img src={a.profileImage} alt=""></img>
                                                <span>"by " <b>{a.nickname}</b></span>
                                            </Link>
                                            <div className="likes">
                                                <svg 
                                                width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"/></svg>
                                                {a.like}
                                            </div>
                                        </div>
                                    </div>
                                }
                                
                                return(
                                    boardFilterArticle
                                )
                            })
                        }
                </div>
            </main>
            <aside className="pDRpR">
            <div className="eyrfCG">
                <div className="filter__head">
                    
                </div>
                <section>
                <ul style={{ listStyleType: "none"}}>
                    {
                    filterList.map((a)=>{
                        return(
                        <li key={a.id}>
                            <input id={a.language} className="filters-input__checkbox" value="action" type="checkbox" data-type="genres"></input>
                            <label className="input__label" htmlFor={a.language} onClick={()=>{ClickFilter(a.language)}}>
                            <span>
                                {a.language}</span>
                            <span className="filters-input__tick">
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
                </section>
            </div>  
            </aside>
        </div>
    )
}
export default Partner;