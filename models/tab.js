import {model, Schema} from 'mongoose'


const TabSchema = new Schema({
   title: {
       type: String,
       required: true
   }
}, {
    timestamps: true
})

export default model("Tab", TabSchema)