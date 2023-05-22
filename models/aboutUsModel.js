import mongoose from 'mongoose'

const aboutUsSchema = mongoose.Schema(
    {
    aboutTitle : {
        type : String,
        required : [true, 'Please add a title']
    },
    aboutImage : {
        type:String,
    },
    aboutDescription : {
        type : String,
    }
},
{
    timestamps : true
}
)
const aboutUs = mongoose.model("aboutUs", aboutUsSchema);

export default aboutUs