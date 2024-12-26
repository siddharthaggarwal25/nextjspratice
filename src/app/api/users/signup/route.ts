import Connect from "@/app/dbConfig/dbConfig";
import User from "@/models/userModal";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

Connect();

export async function POST(request: NextRequest) {
    console.log("h211");
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        console.log(reqBody);

        const user = await User.findOne({email});
        if (user) {
            return NextResponse.json({ error: "user already exist " }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassowrd = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashPassowrd
        })
        const saveUser = await newUser.save();
        console.log(saveUser);

        return NextResponse.json(
            {
                message: "user created succefully",
                success: true,
                saveUser
            }
        )
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}