const notsosecret = "4CjceKarKpy9KjZqTKi7jgD9JP9bVio2wvJNyF7Z3HUedLiNsFxvgwKYLF4gLSK72Uwk8EKbNspu2qj3ewnw4DrnnZXQ4d6k";

document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('boobs') != notsosecret){
        if(!document.location.href.endsWith(notsosecret)){
            document.location.href = "403.html";
        } else {
            localStorage.setItem('boobs', notsosecret)
            window.history.pushState("", "Dashboard", "/");
        }
    } else {
        window.history.pushState("", "Dashboard", "/");
    }
});
