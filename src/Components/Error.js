import React, {Component} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
class Error extends Component {
    render() {
        const styless = {
            display: 'flex' ,
            justifyContent:'center',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            fontSize:'30px',
            color:'red',
            width:'100%',
            height:'100vh',
            fontWeight:'bold',
            background: 'black'
        }
        const useStyles = makeStyles((theme: Theme) =>
            createStyles({
                root: {
                    display: 'flex',
                    '& > * + *': {
                        marginLeft: theme.spacing(2),
                    },
                },
            }),
        );
        return (
            <div style={styless}>
                <CircularProgress color="" />
                <p>Error !!! PAGE NOT FOUND !!!</p>
            </div>
        );
    }
}

export default Error;
