import React, { useEffect} from 'react';
import Pagination from '@mui/material/Pagination';


const Paginat= (props) => {
    const {articleCount }= props;

    useEffect( () => {

    }, [props])

    const numberOfPagination = Math.ceil(articleCount/9);
    return ( 
        <Pagination count={numberOfPagination} variant="outlined" shape="rounded" color= "success" style={{color:"green", margin: "20px"}} onChange= {props.handleClick}/>

     );
}
 
export default Paginat;