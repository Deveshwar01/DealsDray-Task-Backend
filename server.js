import { app } from "./app.js"
import { connectDB } from "./dataBase/database.js";
const PORT=5000;
// DataBase connection call
connectDB();

app.listen(PORT, (req, res) => {
    console.log(`server is working at ${PORT}`);
})