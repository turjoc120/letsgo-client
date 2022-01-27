function validation() {
    const emailValidation = (email = null) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/;

        if(pattern.test(email)) {
            return true;
        }
        else {
            return false;
        }
    }

    const passwordValidation = (password = null) => {
        const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if(pattern.test(password)) {
            return true;
        }
        else {
            return false;
        }
    }

    return {
        emailValidation,
        passwordValidation,
    }
}

export default validation;