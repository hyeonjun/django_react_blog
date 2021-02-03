import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useHistory } from 'react-router'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import { useDispatch } from "react-redux";
// import { loginUser } from "../_action/userAction";
import axios from "axios";
axios.defaults.withCredentials = true;

// appChange = (e) => {
//   this.setState({
//     id: e.target.value
//   });
// }


// const { appChange, appClick } = this;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        LoLtopia
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
 }

 const useStyles = makeStyles((theme) => ({
  paper: {
  
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '400px', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    display: 'flex',
    alignitems: 'center',
    justifycontent: 'center',
    position: 'relative',
    margin: theme.spacing(2, 0, 2),
  },
 }));


function LoginPage(props) {
  // const dispatch = useDispatch();
  const [username, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const classes = useStyles();
  const history = useHistory();
  const onUserNameHandler = (e) => {
    setUserName(e.currentTarget.value);
  };
  const onPasswordHanlder = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    //로그인을 진행하기위해서
    //첫번째 useDispatch(액션) 을 활용해서 액션을 dispatch해준다
    const data = {
      username: username,
      password: Password,
    };
    await fetch('http://39.118.174.168:8000/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
      if (json.user && json.user.username && json.token) {
        props.userHasAuthenticated(
          true, 
          json.user.username,
          json.token);
        history.push('/profile');
        props.setModal(true);
        console.log(json);
      
      } else {
        alert("아이디 또는 비밀번호를 확인해주세요.")
      }
    }).catch(error => alert(error));
  };


  return (
    // <div
    //   style={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     width: "100%",
    //     height: "100%",
    //   }}>
    //   <form
    //     onSubmit={onSubmitHandler} method="POST"
    //     style={{ display: "flex", flexDirection: "column" }}>
    //     <label>ID</label>
    //     <input type="username" value={username} onChange={onUserNameHandler} />
    //     <label>Password</label>
    //     <input type="password" value={Password} onChange={onPasswordHanlder} />
    //     <br />
    //     <button type="submit">Login</button>
    //   </form>
    // </div>
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        
        <Typography component="h1"  variant="h5">
        로그인
        </Typography>


      <form onSubmit={onSubmitHandler}>
      <Grid container spacing={2}>

      <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                id="id"
                required
                fullWidth
                label="아이디"
                autoFocus
                value={username}
                onChange={onUserNameHandler}
              />
            </Grid>

            <Grid item xs={12}>
            <TextField
                variant="outlined"
                type="password"
                required
                fullWidth
                label="비밀번호(8자 이상)"
                autoFocus
                value={Password} 
                onChange={onPasswordHanlder}
              />
            </Grid>

            <Grid item xs={12}>
              </Grid>
              </Grid>
        
        <Button type="submit"
                fullWidth
                variant="contained"
                color="primary"
                
                >로그인</Button>

                <Grid container justify="flex-end">
                  <Grid item>
                     <Link href="/register" variant="body2">
                      아이디가 없으시다면 회원가입 하세요 
                      </Link>
                  </Grid>
                </Grid>
      </form>
    </div>
    <Box mt={5}>
        <Copyright />
      </Box>
      </Container>
  );
  
}

export default withRouter(LoginPage);