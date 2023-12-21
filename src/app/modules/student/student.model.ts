import { Schema, model } from "mongoose";
import { Guardian, LocalGuardian, Student, StudentModelWithStatic, UserName } from "./student.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userNameSchema = new Schema<UserName>({
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true }
});

const guardianSchema = new Schema<Guardian>({
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    fatherContactNo: { type: String, required: true },
    motherName: { type: String, required: true },
    motherOccupation: { type: String, required: true },
    motherContactNo: { type: String, required: true }
});

const localGuardianSchema = new Schema<LocalGuardian>({
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true }
});

const studentSchema = new Schema<Student, StudentModelWithStatic>({ //StudentModelN coming from interface
    id: { type: String, required: true, unique: true },
    name: userNameSchema,
    user: { type: Schema.Types.ObjectId, required: [true, "user ID required"], unique: true, ref: "User" }, //very important
    password: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female'], required: true },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: { type: String, enum: ['A+', 'A-', 'B', 'B+', 'B-', 'O+'] },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImg: { type: String },
    //isActive: { type: String, enum: ['active', 'blocked'], required: true, default: 'active' }, no need now!
    isDeleted: { type: Boolean, default: false }
},
    {
        toJSON: {
            virtuals: true,
        },
    },
);


// // virtual
studentSchema.virtual('fullName').get(function () {
    return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;

});




//pre saving middleware
studentSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(user.password,
        Number(config.bcrypt_salt));
    next();
})

//post saving middleware/ will sent empty password field for security
studentSchema.post('save', async function (doc, next) {
    doc.password = " ";
    next();
})




//Query middle wears
studentSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
studentSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
// the single value wont be available by aggregate by..aggregate works on pipeline
studentSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } }); // if not equal = true , don't come
    next();
});






// NEW STATIC METHOD
studentSchema.statics.isUserExists = async function (id: string): Promise<Student | null> {
    const existingUser = await this.findOne({ id: id });
    return existingUser;
};


//this is custom instance method
// studentSchema.methods.isUserExist = async function (id: string) {
//     const existingUser = await StudentModel.findOne({ id: id });
//     return existingUser;
// }
const StudentModel = model<Student, StudentModelWithStatic>('Student', studentSchema);

export default StudentModel;