function setLocalToken(token){
    localStorage.setItem("token", JSON.stringify(token));
}

function setLocalUser(user){
    localStorage.setItem("user", JSON.stringify(user));
}

function setLocalAdmin(admin){
    localStorage.setItem("admin", JSON.stringify(admin));
}

function getLocalToken(){
    const token = JSON.parse(localStorage.getItem("token"));
    return token;
}

function getLocalUser(){
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
}

function getLocalAdmin(){
    const admin = JSON.parse(localStorage.getItem("admin"));
    return admin;
}

module.exports= {
    setLocalToken,
    setLocalUser,
    setLocalAdmin,
    getLocalToken,
    getLocalUser,
    getLocalAdmin
}