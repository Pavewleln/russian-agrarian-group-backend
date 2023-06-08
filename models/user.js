import {model, Schema} from 'mongoose'


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
    },
    // Статус
    isAdmin: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})

export default model("User", UserSchema)