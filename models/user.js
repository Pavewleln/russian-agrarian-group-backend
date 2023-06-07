import {Schema, model} from 'mongoose'


const UserSchema = new Schema({
    // Имя
    name: {
        type: String,
        required: true
    },
    // Фамилия
    surname: {
        type: String,
        required: true
    },
    // Почта
    email: {
        type: String,
        required: true,
        unique: true
    },
    // Пароль
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export default model("User", UserSchema)