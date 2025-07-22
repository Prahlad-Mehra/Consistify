import { auth , currentUser} from "@clerk/nextjs/server"
import {NextResponse,NextRequest} from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req:NextRequest){//this should be a POST request!!!! REMEMBER
    try{
        const { userId } = await auth();
        const reqCurrentUser = await currentUser();

        if(!userId){
            return NextResponse.json(
                {error:'Unauthorized'},
                {status:401}
            );
        }

        if (!reqCurrentUser || !reqCurrentUser.firstName) {
            return NextResponse.json(
                { error: 'User information incomplete' },
                { status: 400 }
            );
        }
        console.log(`🔎 Checking user: ${userId}`)

        const user=await prisma.user.findUnique({
            where:{ clerkID: userId, userName: reqCurrentUser.firstName },
            include:{
                notes:{
                    include:{
                        todos:true,
                        completedCalendarDates:true
                    }
                }
            }
        });

        if(!user){
            console.log(`Creating new user : ${userId}`)
            const newUser= await prisma.user.create({
                data:{
                    clerkID:userId,
                    userName:reqCurrentUser.firstName
                }
            })
            console.log(`✅ created user ${userId}`)

            return await prisma.user.findUnique({
                where:{id:newUser.id},
                include:{
                    notes:{
                        include:{
                            todos:true,
                            completedCalendarDates:true
                        }
                    }
                }
            })
        }
        else{
            console.log(`✅User already exist`)
        }

        return NextResponse.json(user);
    }catch(error){
        console.error('❌Error in user ensure',error)
        return NextResponse.json(
          { error: 'Internal server error' }, 
          { status: 500 }
        );
    }
}
