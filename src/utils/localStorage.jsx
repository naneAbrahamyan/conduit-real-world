export function getToken(){
    return localStorage.getItem('token');
}

export function updateToken(value){
    if(value){
        localStorage.setItem('token', value)
        
    }
    else{
        localStorage.removeItem('token');
    }
    return getToken();
}