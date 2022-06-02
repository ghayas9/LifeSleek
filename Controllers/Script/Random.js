
module.exports = {
    Rand4:()=>{
        return (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000)
    },
    Rand:(max,min)=>{
        return (Math.floor(Math.random() * (max - min + 1)) + min)
    }
}

