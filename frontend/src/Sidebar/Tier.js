import React from "react";
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

function Tier() {
  const classes = useStyles();
  return (
      
        <div className="here">
            <div className="here_left">
      <h1>포인트</h1>
      <br />
        <h3>보유 포인트 : <Button variant="outlined"
                                 color="primary"
                                 size="small"
                                 className={classes.margin}>
         0 : 포인트
        </Button>

            <Button variant="outlined"
                    size="small"
                    startIcon={<MonetizationOnIcon />}
                    href="/Pointcg"
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
export default Tier;