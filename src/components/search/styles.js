import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme)=>({
    listItem: {
        lineHeight:2,
        width:'100%',
        '&:hover': {
            backgroundColor:'rgba(0,0,0,.025)',
            cursor:'pointer',
        },
    featureItem: {
        lineHeight:2,

        '&:hover':{
            textDecoration: 'underline',
        }
        
    },
    myBar: {
      margin:'0 auto',
      textAlign: 'center',
      lineHeight: '2.5',
  },
    },
      [theme.breakpoints.down('sm')]:{
        mainContainer:{
          display:'block'
        }
      }
}))