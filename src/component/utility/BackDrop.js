import classes from './BackDrop.module.css'

function Backdrop(props){
    return <div className={classes.backdrop} onClick={props.onBackdrop}/>;
}

export default Backdrop