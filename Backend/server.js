import connectToDB from "./configs/dbConn.js";
import app from "./app.js";
const PORT=process.env.PORT || 4000
app.listen(PORT,async()=>{
    await connectToDB()
    console.log(`Server is working on  http://localhost:${PORT}/`)
})
