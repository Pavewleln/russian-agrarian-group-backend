import {model, Schema} from 'mongoose'


const DriverSchema = new Schema({
    label: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export default model("Driver", DriverSchema)