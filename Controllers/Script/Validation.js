const ValidateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    return false
}

const ValidatePhone = (number) => {
    if (/^\d{10}$/.test(number)) {
        return true;
    }
    return false
}



module.exports = {
    ValidateEmail,
    ValidatePhone
}