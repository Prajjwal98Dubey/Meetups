// check if user is loggedin or not

export const checkUserAuth = ()=>{
    if (localStorage.getItem("meet-auth")) return true
    return false
    
}