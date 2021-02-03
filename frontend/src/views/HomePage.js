import React from "react";
import { withRouter } from "react-router-dom";

import {Link} from 'react-router-dom';

function HomePage(props) {
  const onClickHandler = () => {
    //useDispatch를 사용해서 로그아웃 액션을 실행한다
    //useDispatch와 logout 액션이 두가지 필요하다\
    localStorage.removeItem('token');
    props.history.push("/login");
  }
  console.log(props.modal);
  console.log(props.user);
  return (
    
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}>
      <h2>시작 페이지</h2>
      <>
      {
        
        props.modal === false
        ? <Link to="/login"><button>로그인</button></Link>
        : (
            <button onClick={onClickHandler}>로그아웃</button>
        )
        
      }
      </>
      
    </div>
  );
}

export default withRouter(HomePage);