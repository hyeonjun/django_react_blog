import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/Check';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(3),
    },
  },
}));

function Point() {
  let [userPoint, setUserPoint] = useState()
  let [userId, setUserId] = useState()

  const classes = useStyles();
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
        setUserId(json.id)
        //유저정보를 받아왔으면 해당 user의 프로필을 받아온다.
    }fetch('http://39.118.174.168:8000/api/profile/' + json.id + '/update/',{
            method : 'PATCH',
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            },
        })
        .then((res)=>res.json())
        // 데이터베이스에서 가져오는 정확한 명
        .then((userData)=> {
         
            setUserPoint(userData.point)
            
        })
        .catch(error => {
            console.log(error);
          });;
    }).catch(error => {
        console.log(error)
      });
},[userId])


  return (
      
        <div className="here">
            <div className="here_left">
      <h1>포인트</h1>
      <br />
        <h3>보유 포인트 : {userPoint}P　

            <Button variant="outlined"
                    size="small"
                    startIcon={<MonetizationOnIcon />}
                    href="/pointcg"
                    >
                      충전하기
                  </Button></h3>
        <br />
        <br />
        <br />
        <br />
        <br />
        <h1>환전 신청</h1>
        <br />
        <br />
        <br />
        <TextField id="outlined-basic" label="금액을 입력하세요" variant="outlined"
                              size="small" />
        <br />
        <TextField id="outlined-basic" label="예금주" variant="outlined"
                              size="small" />
        <TextField id="outlined-basic" label="계좌번호(-제외)" variant="outlined"
        size="small" />
        
        <div className="check">
        <Fab 
          variant="extended"
          size="small"
          color="primary"
          aria-label="add"
          className={classes.margin}
        >
          
          <CheckIcon className={classes.extendedIcon} />
          환전하기
          
        </Fab>
        </div>
      </div>
      <div className="here_right">
     

      </div>
      </div>
    
  )
}
export default Point;