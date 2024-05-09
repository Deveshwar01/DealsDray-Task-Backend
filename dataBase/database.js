import mongoose from "mongoose"

export const connectDB = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        dbName: "EmployeeDB",
    })
        .then((c) => console.log(`Data base connected`))
        .catch((e) => console.log(e))
}