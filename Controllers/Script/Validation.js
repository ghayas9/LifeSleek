module.exports = {
    ValidateEmail:(mail) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        return false
    },
    ValidatePhone:(number) => {
        if (/^\d{10}$/.test(number)) {
            return true;
        }
        return false
    }
    
}

