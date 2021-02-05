import React, {useState, useEffect} from 'react';
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
// import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import './index.css';
import Sidebarmenu from "./Sidebar/Sidebarmenu";
import Header from "./views/Header";
import Profile from "./Sidebar/Profile";
import Tier from "./Sidebar/Tier";
import Point from "./Sidebar/Point";
import Pointcg from "./Sidebar/Pointcg";
import Boardwtite from "./views/Boardwrite";
import Premium from "./views/Premium";
import Partner from './views/Partner';
import Premiumst from './views/Premiumst';
import Student from './views/Student';
import Detail from './views/Detail';
import Update from './views/Update';

// import { colors } from '@material-ui/core';

function App(){

  const [modal, setModal] = useState(false);
  const [user, setUser] = useState([]);
  const [idConfirm, setConfirm] = useState(false);
  let [isAuthenticated, setisAuthenticated] = useState(localStorage.getItem('token') ? true : false)

  const userHasAuthenticated = (authenticated, username, token) => { 
    setisAuthenticated(authenticated);
    setUser(username);
    localStorage.setItem('token', token);
    // console.log(localStorage.getItem(token));
    // window.location.reload();
  } //회원가입이나 로그인이 성공했을 때 토큰을 저장

  // if(flag === 1){
  //   // window.location.reload();
  //   setFlag(0);
  //   console.log(flag);
  // } else{

  const handleLogout = () => {
    setisAuthenticated(false);
    setUser("");
    localStorage.removeItem('token');
    // setModal(false)
  }//로그아웃

  useEffect(()=>{
    if(isAuthenticated){
      setModal(true);
    }
    else{
      setModal(false);
    }
  },[isAuthenticated])

  useEffect(() => {
    if(isAuthenticated) {
      //Token 값이 타당간가 /validate 요청을 통해 확인하고
      // 상태 코드가 200이라면 /api/current 요청으로 user정보 받아옴
      fetch('http://39.118.174.168:3653/api/validate/', {
        method: 'POST',
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
      .then(res => {
        fetch('http://39.118.174.168:3653/api/current_user/', {
          method: 'GET',
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
          }
        })
        .then(res => res.json())
        .then(json => {
          if(json.username) {
            setUser(json.username);
          }
          else{
            //유저가 등록되지 않았다면 로그인 버튼이 나오도록
            setModal(false)
            setisAuthenticated(false)
        }
        // Refresh Token을 발급 -> 만료 시간 연장
        fetch('http://39.118.174.168:3653/api/refresh/', {
          method : 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
            token: localStorage.getItem('token')
          })
        })
        .then(res => res.json())
        .then((json)=>{
          userHasAuthenticated(true, json.user.username, json.token);
        })
        .catch(error => {
          console.log(error);
        });
      })
      .catch(error => {
        handleLogout();
        console.log(error);
      });
    })
    .catch(error => {
      handleLogout();
      console.log(error);
    })
  }
}, [isAuthenticated])


  return (
    <Router>
      <header>
            
            <div className="Title">
                <div className="Leftside">
                    
                    <Link to="/">
                    <a className="T_title" href="/">LoLtopia</a>
                    </Link>
                </div>
          
                <div className="Rightside">
                    <div className="Another">
                        {/* <Header modal={modal} handleLogout={handleLogout}/> */}
                    </div>   
                    
                </div>
            
            </div>
            <div className="Navbar">
                <div className="LeftSide">
                    <div className="Links">
                        
                        <Link to="/premium">
                        프리미엄 파트너
                        </Link>
                        
                        <Link to="/partner">
                        일반 파트너
                        </Link>

                        <Link to="/premiumst">
                        프리미엄 수강생
                        </Link>

                        <Link to="/student">
                        일반 수강생
                        </Link>
                        
                    </div>
                </div>
            </div>
    
      </header>
      <div>
        <Switch>
          <Route exact path="/">
             <Header modal={modal} handleLogout={handleLogout}/>
             <Premium />
            {/* <HomePage modal={modal} user={user} userHasAuthenticated={userHasAuthenticated} /> */}
          </Route>
          <Route exact path="/login">
            <LoginPage 
            setModal={setModal} userHasAuthenticated={userHasAuthenticated}/>
          </Route>
          <Route exact path="/register">
            <RegisterPage setModal={setModal} userHasAuthenticated={userHasAuthenticated}
              idConfirm={idConfirm} setConfirm={setConfirm}
            />
          </Route> 

          <Route path="/Sidebarmenu" exact component={Sidebarmenu}>
       
          </Route>

          <Route exact path="/profile">
          <Header modal={modal} handleLogout={handleLogout}/>
            <Profile handleLogout={handleLogout}/>
            </Route>  
          <Route exact path="/tier">
          <Header modal={modal} handleLogout={handleLogout}/>
            <Tier />
          </Route>

          <Route exact path="/point">
          <Header modal={modal} handleLogout={handleLogout}/>
          <Point />
          </Route>

          <Route exact path="/pointcg">
          <Header modal={modal} handleLogout={handleLogout}/>
          <Pointcg />
          </Route>
 
          <Route path="/boardwtite">
          <Boardwtite user={user} />
          <Header modal={modal} handleLogout={handleLogout}/>
          </Route>

          <Route exact path="/premium">
          <Header modal={modal} handleLogout={handleLogout}/>
          <Premium />
          </Route>

          <Route exact path="/partner">
          <Header modal={modal} handleLogout={handleLogout}/>
          <Partner />
          </Route>

          <Route exact path="/premiumst">
          <Header modal={modal} handleLogout={handleLogout}/>
          <Premiumst />
          </Route>

          <Route exact path="/student">
          <Header modal={modal} handleLogout={handleLogout}/>
          <Student />
          </Route>

          <Route path="/premiumdetail">
          <Header modal={modal} handleLogout={handleLogout}/>
          <Detail user={user} path="premium/"/>
          </Route>

          <Route path="/partnerdetail">
          <Header modal={modal} handleLogout={handleLogout}/>
          <Detail user={user} path="partner/"/>
          </Route>

          <Route path="/premiumstdetail">
          <Header modal={modal} handleLogout={handleLogout}/>
          <Detail user={user} path="premiumst/"/>
          </Route>

          <Route path="/studentdetail">
          <Header modal={modal} handleLogout={handleLogout}/>
          <Detail user={user} path="student/"/>
          </Route>

          <Route path= "/update">
          <Header modal={modal} handleLogout={handleLogout}/>
          <Update user={user}/>
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;