import mongoose from "mongoose";
const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
    } catch (error: any) {
        throw new Error(error);
    }
};

export default connect;
