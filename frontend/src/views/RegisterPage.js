import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';


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



function RegisterPage(props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setName] = useState("");
  const [ConfirmPasword, setConfirmPasword] = useState("");
  const [phonenum, setPhone] = useState("010");
  const [username, setUserName] = useState("");

  const onUserNameHandler = (e) => {
    props.setConfirm(false);
    setUserName(e.currentTarget.value);
  };

  const onPasswordHanlder = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onConfirmPasswordHandler = (e) => {
    setConfirmPasword(e.currentTarget.value);
  };
  
  const onNameHandler = (e) => {
    const curValue = e.currentTarget.value;
    const newValue = curValue.replace(/[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g, '');
    setName(newValue);
  };


  const onPhonenumHandler = (e) => {
    const curValue = e.currentTarget.value;
    const newValue = curValue.replace(/[^0-9]/g, '');
    if(newValue.length <= 11)
      {setPhone(newValue);}
  };

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const username_ex = useState([]);
  const IdConfirm = (e) => {
    fetch('http://39.118.174.168:3653/api/list/')
    .then(res => res.json())
    .then((post) =>{
      
      post.slice(0).map((a) =>{
        username_ex.push(a.username)
      })
      if(username.length >= 5){
        if(username_ex.indexOf(username) !== -1) {
          alert("중복된 아이디입니다.");
        } else{
          alert("사용가능한 아이디입니다.");
          props.setConfirm(true);
        }
      }
      else{
        alert("아이디가 5자 이상이여야 합니다.")
      }
      
      // if(post.username.indexOf(username) !== -1 ){
      //   console.log("same")
      // }
    })
  };
  const emailConfirm = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (props.idConfirm === true){
    if (password.length >= 8){
    if (password === ConfirmPasword) {
    if (phonenum.length === 11){
    if (first_name.length === 3 || first_name.length === 2 || first_name.length === 4){
    if (email.length >= 7){
    if (emailConfirm.test(email)){
      const body = {
            username: username,
            password : password,
            first_name : first_name,
            phonenum : phonenum,
            email : email,
        };
    fetch('http://39.118.174.168:3653/api/register/', {
      method: 'POST',
      headers:{
        "Content-Type": "application/json"
      },
      body : JSON.stringify(body)
    }).then(res => res.json())
    .then(json => {
      if (json.username && json.token) {
        alert("가입이 정상적으로 완료되었습니다.");
        props.userHasAuthenticated(true, json.username, json.token);
        props.history.push("/");
        props.setModal(true);
      }
    }).catch(error => alert(error));
  } else{
    alert("정확한 이메일을 입력해주세요");
  }
  } else {
      alert("정확한 이메일을 입력해주세요");
    } 
  } else {
    alert("정확한 이름을 입력해주세요");
    } 
  } else {
      alert("정확한 전화번호를 입력해주세요.");
    }
  } else{
        alert("비밀번호가 일치하지 않습니다.");
    }
  } else{
      alert("비밀번호가 너무 짧습니다.");
    }
  } else{
      alert("아이디 중복 확인이 필요합니다.");
    }
};


  const handleKeyPress = (e) => {
    if (e.key === "Enter") 
         return onSubmitHandler(e);
  };

  return (

    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        
        <Typography 
        component="h1" 
        variant="h5"
        >
        무료 회원가입
        </Typography>


      <form>
      <Grid container spacing={2}>

      <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
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
                value={password} 
                onChange={onPasswordHanlder}
              />
            </Grid>

            <Grid item xs={12}>
            <TextField
                variant="outlined"
                required
                type="password"
                fullWidth
                label="비밀번호 확인"
                autoFocus
                value={ConfirmPasword} 
                onChange={onConfirmPasswordHandler}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="전화번호"
                autoFocus
                value={phonenum} 
                onChange={onPhonenumHandler}
              />
            </Grid>

            <Grid item xs={12}>
            <TextField
                variant="outlined"
                required
                fullWidth
                label="이름"
                autoFocus
                value={first_name} 
                onChange={onNameHandler}
              />
            </Grid>

            <Grid item xs={12}>
            <TextField
                variant="outlined"
                required
                fullWidth
                label="이메일"
                autoFocus
                value={email} 
                onChange={onEmailHandler}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="" color="primary" />}
                label="이용약관의 동의하십니까?"
                
              />
              </Grid>
              </Grid>
        {
          props.idConfirm === true ?
          <>
            <Button onClick={onSubmitHandler}
                fullWidth
                variant="contained"
                color="primary"
                onKeyPress={handleKeyPress}
                >회원 가입</Button>
          </>
          : 
          <>
            <Button onClick={IdConfirm}
              fullWidth
              variant="contained"
              color="primary"
              onKeyPress={handleKeyPress}
            >중복 확인
            </Button>
          </>
        }
        



                <Grid container justify="flex-end">
                  <Grid item>
                     <Link href="/login" variant="body2">
                      이미 회원이시라면 로그인 하세요! 
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

export default withRouter(RegisterPage);