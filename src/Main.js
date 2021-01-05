import React from "react";
import Primium from "./Mainbar/Primium";
import Teacher from "./Mainbar/Teacher";
import Free from "./Mainbar/Free";
import Oneplay from "./Mainbar/Oneplay";
import SignIn from "./Loginmenu/SignIn";
import SignUp from "./Loginmenu/SignUp";
import Sidebarmenu from "./Sidebar/Sidebarmenu";
import './index.css';
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";



function Main(){
    
    
    return (
        <Router>
            <header>
                    <div className="Title">
                        <div className="Leftside">
                            
                            <Link to="/">
                            <a className="T_title">LoLtopia</a>
                            </Link>

                        </div>
                        <div className="Rightside">
                            <div className="Another">
                        
                        
                            <Link to="SignIn">
                            <button>로그인</button>
                            </Link>
                        
                        <Link to="SignUp">
                        <button>회원가입</button>
                        </Link>
                        
                       
                        
                            </div>
                            <Router>
                            <Sidebarmenu />
                            <Switch>
                                <Router path='/' />
                            </Switch>
                        </Router>
                        </div>
                    </div>
                    <div className="Navbar">
                        <div className="LeftSide">
                            <div className="Links">
                                
                                <Link to="Primium">
                                프리미엄 파트너
                                </Link>
                                
                                <Link to="Teacher">
                                일반 파트너
                                </Link>

                                <Link to="Free">
                                자유 수강생
                                </Link>

                                <Link to="Oneplay">
                                일반 수강생
                                </Link>
                                
                            </div>
                        </div>
                    </div>
            </header>
            <main>
                <Switch>
                    <Route path="/Primium" exact component={Primium} />
                    <Route path="/Teacher" exact component={Teacher} />
                    <Route path="/Free" exact component={Free} />
                    <Route path="/Oneplay" exact component={Oneplay} />
                    <Route path="/SignIn" exact component={SignIn} />
                    <Route path="/SignUp" exact component={SignUp} />
                    <Route path="/Sidebarmenu" exact component={Sidebarmenu} />
                    
                </Switch>
            </main>
        </Router>
  );
}
export default Main;
