class Auth {
    login() {
        sessionStorage.setItem("authed", "true");
        location.replace('/');
    }

    logout() {
        sessionStorage.setItem("authed", "false");
        location.replace('/');
    }

    isAuthenticated() {
        let authed = sessionStorage.getItem("authed");
        if (authed === "true") {
            return true;
        } else {
            return false;
        }
    }
}

export default new Auth();