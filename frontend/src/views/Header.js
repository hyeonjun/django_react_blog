import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import {Link} from 'react-router-dom';
import { SidebarDate } from '../Sidebar/SidebarData';
import './Header.css';
import '../Sidebar/Sidebar.css';


function Header(props){
    const [sidebar,setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const history = useHistory();
    let [userprofile, setUserprofile] = useState(false);
    let [userPhoto, setUserPhoto] = useState();
    let [currentUser_pk, setCurrentUser_pk] = useState();

    const onClickHandler = () => {
    //useDispatch를 사용해서 로그아웃 액션을 실행한다
    //useDispatch와 logout 액션이 두가지 필요하다\
    localStorage.removeItem('token');
    history.push('/');
    window.location.reload();
  }

  // setTimeout(() => console.log("start"), 10000);
  // if(props.modal === true){
  //     console.log("reload");
  //     window.location.reload();
  // } else {}

  useEffect(()=>{
        fetch('http://39.118.174.168:8000/api/current_user/', {
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }
    })
    .then(res => res.json())
    .then(json => {
      // 현재 유저 정보 받아왔다면, 로그인 상태로 state 업데이트 하고
        if (json.id) {
        //유저정보를 받아왔으면 해당 user의 프로필을 받아온다.
        }fetch('http://39.118.174.168:8000/api/profile/' + json.id + '/update/',{
        method : 'PATCH',
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
        },
        })
        .then((res)=>res.json())
        .then((userData)=> {
            setUserPhoto(userData.photo)
            setCurrentUser_pk(userData.user_id)
        })
        .catch(error => {
            console.log(error);
          });
    }).catch(error => {
        console.log(error)
    });
    },[userPhoto])


    

    return(
    <>
        <div className="header">
        <div className="header-nav">
        <div className="header-nav-links">  
            {
              props.modal === false || props.modal === null || props.modal === undefined
              ? (
              <>
              <Link to="/login"><button className="header-btns">로그인</button></Link>
              <Link to="/register"><button className="header-btns">회원가입</button></Link>
              </>
              )
              : (
                <>
                 <Link  to="/boardwtite"><button className="header-dashboards">New write</button></Link>
                    <div className="user-container" onClick={()=>{setUserprofile(!userprofile)}}>
                    <img src={userPhoto} className="user-image" onClick={showSidebar} alt="/"></img>
                    </div>
                      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                        <ul className='nav-menu-items' onClick={showSidebar}>
                          <li className="navbar-toggle">
                            <Link to='#' className='menu-bars' />   
                          </li>
                    {SidebarDate.map((item, index) => {
                       return (
                        <>
                          <li key={index} className={item.cName}>
                            <Link to={item.path}>
                              {item.icon}
                              <span>
                                {item.title}
                              </span>
                              
                            </Link>
                          </li>
                          
                        </>
                       )
                    })}
                    
                     
                  <button className="logout" onClick={onClickHandler}>로그 아웃</button>
                 
                      
                   
                        </ul>
                        </nav>
                {
                  userprofile && currentUser_pk === true
                  ?(
                   <>
                   </>
                  )
                  :null
                }
                </>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Header;