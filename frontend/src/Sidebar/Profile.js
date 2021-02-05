import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from "react-router-dom";
import './Profile.css'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 200,
      maxHeight: 0,
    //   marginBottom : 10,
      position : 'relative',
      bottom : 22,
    },
  }));

// 모달쓰기위한 
function Profile(props){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleChange = (event) => {
        setUserTier(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
    const history = useHistory()
    let [ModifyModal, setModifymodal] = useState(false)
    // let [tierModal, setTier] = useState()
    // let [tier] = useState(false) 티어
    // let [username_info] = useState(false) 아이디
    // let [email_info] = useState(false) 이메일 
    // let [number] = useState(false) 번호
    // let [name] = useState(false) 이름
    
//profile[테이블에서 정보 받아옴]
    let [userId, setUserId] = useState()
    let [userPhoto, setUserPhoto] = useState()
    let [userNickname, setUserNickname] = useState("")
    let [userPoint, setUserPoint] = useState()
    let [userGrade,  setUserGrade] = useState()
    let [userIntro, setUserIntro] = useState()
    let [userTier, setUserTier] = useState()
    let [userUsername_info, setUserName_info] = useState()
    let [userEmail_info, setUserEmail_info] = useState()
    let [userNumber, setUserNumber] = useState()
    let [userName, setUserName] = useState()

    useEffect(()=>{
        fetch('http://39.118.174.168:3653/api/current_user/', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
          }
        })
        .then(res => res.json())
        .then(json => {
          // 현재 유저 정보 받아왔다면, 로그인 상태로 state 업데이트 하고
          if (json.id) {
            setUserId(json.id)
            //유저정보를 받아왔으면 해당 user의 프로필을 받아온다.
        }fetch('http://39.118.174.168:3653/api/profile/' + json.id + '/update/',{
                method : 'PATCH',
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                },
            })
            .then((res)=>res.json())
            // 데이터베이스에서 가져오는 정확한 명
            .then((userData)=> {
                setUserPhoto(userData.photo) ;
                setUserNickname(userData.nickname);
                setUserPoint(userData.point);
                setUserGrade(userData.grade);
                setUserIntro(userData.myIntro);
                setUserTier(userData.Tier);
                setUserName_info(userData.username_info);
                setUserEmail_info(userData.email_info);
                setUserName(userData.name);
                setUserNumber(userData.number);
            })
            
            .catch(error => {
                console.log(error);
              });;
        }).catch(error => {
            console.log(error)
          });
          
    }
    
    ,[userId]) 

    let sendData;
    const handleEffect = (handleSubmit) => {
        sendData = {
            point : userPoint,
            nickname : userNickname,
            grade : userGrade,
            myIntro : userIntro,
            username_info : userUsername_info,
            email_info : userEmail_info,
            name : userName,
            number : userNumber,
            Tier : userTier,
            photo : userPhoto
        }
        handleSubmit()
    }

    const handleSubmit = () => {
        let form_data = new FormData();
        form_data.append('point', sendData.point);
        form_data.append('nickname', sendData.nickname);
        form_data.append('grade', sendData.grade);
        form_data.append('myIntro', sendData.myIntro);
        form_data.append('Tier', sendData.Tier);
        fetch('http://39.118.174.168:3653/api/profile/' + userId + '/update/', {
            method : 'PATCH',
            headers: {
                Authorization : `JWT ${localStorage.getItem('token')}`,
            },
            body : form_data
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {alert('프로필 정보 변경의 성공하셨습니다', response)})
    };

    const handleImageSubmit = () => {
        let form_data = new FormData();
        let fileField = document.querySelector('input[type="file"]');
        form_data.append('photo', fileField.files[0]);
        fetch('http://39.118.174.168:3653/api/profile/' + userId + '/update/', {
            method : 'PATCH',
            headers: {
                Authorization : `JWT ${localStorage.getItem('token')}`,
            },
            body : form_data
        })
        .then(res => res.json())
        .then(response => {alert('이미지 저장의 성공하셨습니다', response)})
    };

    const DeleteUser = ()=>{
        if(window.confirm('정말 삭제하시겠습니까 ?')===true){
            fetch('http://39.118.174.168:3653/api/current_user/', {
                headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(json => {
                fetch('http://39.118.174.168:3653/api/profile/' + json.id + '/delete/',{
                    method : 'DELETE',
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`,
                    },
                })
                .then((res)=>res.json())
                .catch(error => {
                    console.log(error);
                    });;
            }).catch(error => {
                console.log(error)
            });
            props.handleLogout()
            history.push('/login')
        }
    }
    return(
        <>
            <main className="profile-main">
                <section className="section1">
                    <div className="thumbnail__">
                        <img src={userPhoto} alt=""></img>
                        <label htmlFor="file" className="img-up">
                            <input type="file" id="file" accept=".jpg, .png, .jpeg, .gif" onChange={(e)=>{
                                e.preventDefault();
                                let reader = new FileReader();
                                let file = e.target.files[0];
                                reader.onloadend = () => {
                                setUserPhoto(reader.result)
                                }
                                reader.readAsDataURL(file);
                            }}></input>
                        이미지 업로드</label>
                        <button className="img-de" onClick={()=>{
                            handleImageSubmit()
                            setModifymodal(false)
                            history.go(0)
                        }}>저장</button>
                    </div>

                    <div className="profile-info">
                        {
                            ModifyModal === true
                            ?(
                                <form>
                                    <input maxlength="50"value={userIntro} placeholder={userIntro} onChange={(e)=>{
                                        setUserIntro(e.target.value)
                                    }}></input>
                                </form>
                            )
                            :(
                                <>
                                <h2>{userIntro}</h2>
                                <button className="fix-buttons" onClick={()=>{
                                    setModifymodal(true)
                                }}>자기소개 수정</button>
                                </>
                            )
                        }
                    </div>

                </section>
                             
                <section className="section2">  
                    <div className="myProfile">
                        <div className="wrapper">
                            <div className="title-wrapper">
                                <h3>닉네임</h3>
                            </div>
                            <div className="block-for-mobile">
                                {
                                    ModifyModal === true
                                    ?null
                                    :<div className="contents">{userNickname}</div>
                                }
                                    
                                {
                                    ModifyModal === true
                                    ?(
                                        <form className="nickname-form">
                                            <input className="nickname-input" placeholder={userNickname} onChange={(e)=>{
                                                setUserNickname(e.target.value)
                                            }}></input>
                                        </form>
                                        
                                    )
                                    :(
                                        <div className="edit-wrapper">
                                            <button className="fix-button" onClick={()=>{setModifymodal(true)}}>수정</button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>    
                    </div>
                                
                                
                    <div className="myProfile">
                        <div className="wrapper">
                            <div className="title-wrapper">
                                <h3>point</h3>
                            </div>
                            <div className="block-for-mobile">
                                    <div className="contents">{userPoint}</div>
                                {
                                        <>
                                        <Link to="pointcg">
                                        <div className="edit-wrapper">
                                            <button className="fix-button">충전하기</button>
                                        </div>
                                        </Link>
                                        
                                        <Link to="point">
                                        <div className="edit-wrapper">
                                            <button className="fix-button">환전하기</button>
                                        </div>
                                        </Link>
                                        </>
                                }
                            </div>
                        </div>    
                    </div>

                    <div className="myProfile">
                        <div className="wrapper">
                            <div className="title-wrapper">
                                <h3>티어</h3>
                            </div>
                            <div className="block-for-mobile">
                                {
                                    <div>
                                    <FormControl className={classes.formControl}>
                                    {  
                                    (userTier === undefined) || (userTier === null) || (userTier === "")
                                    ? (<InputLabel id="demo-controlled-open-select-label">티어를 선택하세요</InputLabel>)
                                    : (<InputLabel id="demo-controlled-open-select-label">{userTier}</InputLabel>) 
                                    }
                                    <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    open={open}
                                    onClose={handleClose}
                                    onOpen={handleOpen}
                                    value={userTier}
                                    onChange={handleChange}>
                                    <MenuItem value={"챌린저"}>챌린저</MenuItem>
                                    <MenuItem value={"그랜드마스터"}>그랜드마스터</MenuItem>
                                    <MenuItem value={"마스터"}>마스터</MenuItem>
                                    <MenuItem value={"다이아몬드"}>다이아몬드</MenuItem>
                                    <MenuItem value={"플레티넘"}>플레티넘</MenuItem>
                                    <MenuItem value={"골드"}>골드</MenuItem>
                                    <MenuItem value={"실버"}>실버</MenuItem>
                                    <MenuItem value={"브론즈"}>브론즈</MenuItem>
                                    <MenuItem value={"아이언"}>아이언</MenuItem>
                                    </Select>
                                    </FormControl>
                                    </div>
                                }

                                    {/* {
                                    tierModal === {userTier}
                                    ?(  <form className="nickname-form">
                                    <input className="nickname-input" placeholder={{userTier}} onChange={(e)=>{
                                        setUserTier(e.target.value)
                                    }}></input>
                                     <div className="edit-wrapper">
                                            <button className="fix-button" onClick={()=>{setUserTier(true)}}>수정</button>
                                        </div>
                                    
                                        </form>
                                    )
                                    :(
                                        <div className="contents">{userTier}</div> 
                                    )
                                    } */}
                                
                            </div>
                        </div>    
                    </div>

                    <div className="myProfile">
                        <div className="wrapper">
                            <div className="title-wrapper">
                                <h3>등급</h3>
                            </div>
                            <div className="block-for-mobile">
                                        {
                                              userGrade === 0 ? <div className="contents"></div> 
                                            : userGrade === 1 ? <div className="contents">프리미엄 파트너</div>
                                            : userGrade === 2 ? <div className="contents">일반 파트너</div>
                                            : userGrade === 3 ? <div className="contents">프리미엄 수강생</div>
                                            : userGrade === 4 ? <div className="contents">일반 수강생</div>
                                            :null
                                        }
                            </div>
                        </div>    
                    </div>

                    
                    <div className="myProfile">
                        <div className="wrapper">
                            <div className="title-wrapper">
                                <h3>아이디</h3>
                            </div>
                            <div className="block-for-mobile">
                                    <div className="contents">{userUsername_info}</div>  
                            </div>
                        </div>    
                    </div>

                    <div className="myProfile">
                        <div className="wrapper">
                            <div className="title-wrapper">
                                <h3>이메일</h3>
                            </div>
                            <div className="block-for-mobile">
                                    <div className="contents">{userEmail_info}</div>  
                            </div>
                        </div>    
                    </div>

                    <div className="myProfile">
                        <div className="wrapper">
                            <div className="title-wrapper">
                                <h3>이름</h3>
                            </div>
                            <div className="block-for-mobile">
                                    <div className="contents">{userName}</div>
                            </div>
                        </div>    
                    </div>
                    
                    <div className="myProfile">
                        <div className="wrapper">
                            <div className="title-wrapper">
                                <h3>전화번호</h3>
                            </div>
                            <div className="block-for-mobile">
                                <div className="contents">{userNumber}</div>
                            </div>
                        </div>    
                    </div>

                    
                    <div className="myProfile">
                        <div className="wrapper">
                            <div className="title-wrapper">
                            </div>
                            <div className="block-for-mobile">
                                <div className="contents">
                                    <button className="out-button" onClick={DeleteUser}>회원탈퇴</button>
                                    <button className="save-button" onClick={()=>{
                                        handleEffect(handleSubmit)
                                        setModifymodal(false)
                                    }}>저장</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </section>
            </main>
        </>
    )
}
export default Profile;