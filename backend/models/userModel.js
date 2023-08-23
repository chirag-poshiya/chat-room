const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    pic: { type: String, default: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1691054045~exp=1691054645~hmac=11c06fcdd4d4ff2b38434f4419f8e6eeed4910f4460aa18c36c2b5e357ff9d49" },
},{
    timestamps:true
}
)

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword , this.password);
}

userSchema.pre('save',async function (next){
    if(!this.isModified) {
        next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
})

const User = mongoose.model("User" , userSchema);

module.exports = User;