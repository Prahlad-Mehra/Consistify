import { auth } from "@clerk/nextjs/server"
import {NextResponse,NextRequest} from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req:NextRequest){//this should be a POST request!!!! REMEMBER
    try{
        const { userId } = await auth();

        if(!userId){
            return NextResponse.json(
                {error:'Unauthorized'},
                {status:401}
            );
        }

        console.log(`🔎 Checking user: ${userId}`)

        const user=await prisma.user.findUnique({
            where:{ clerkID: userId},
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
                    clerkID:userId
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
