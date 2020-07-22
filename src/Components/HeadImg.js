import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
const HeadImg = (props) => {
    const useStyles = makeStyles({
        header: {
            backgroundImage: 'url("https://img-a.udemycdn.com/course/750x422/1405110_fac3_2.jpg")',
            height:'120px',
            widht:'100%',
            backgroundRepeat:'norepeat'
        },
    });
    const classes = useStyles(props);
    return (
        <div className={classes.header}></div>
    );
}

export default HeadImg;