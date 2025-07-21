import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

//this route creates the note in the Database!!
export async function POST(req:NextRequest){//this route is suppose to be POST!!!!REMEMBER
    try{   
        const {userId}= await auth();

        if(!userId){
            return NextResponse.json({error:'Unauthorized'},{status:401})
        }
        
        const {title}= await req.json();
        if(!title || title.trim()===''){
            return NextResponse.json({ error: 'Note title is required' }, { status: 400 });
        }
        //get user from db
        const user=await prisma.user.findUnique({
            where:{
                clerkID: userId
            }
        })
        if(!user){
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const note=await prisma.note.create({
            data:{
                userId: user.id,
                title:title.trim()
            },
            include:{
                todos:true,
                completedCalendarDates:true
            }
        })
        console.log(`✅ Created note: ${note.title} for user ${userId}`);
        return NextResponse.json(note);
    } catch (error){
        console.error('Error creating note:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
//this route will delete the whole note including the todos in it and the completedcalendarDates.
export async function DELETE(req:NextRequest){
    try{
        const {userId}=await auth();
        if(!userId){
            return NextResponse.json({error:'Unauthorized'},{status:401})
        }
        
        const {noteId,title,userSerialId}= await req.json();//SerialId is the id of user in the user tabel that is the default id that is given to that evety user
        if(!title || title.trim()===''){
            return NextResponse.json({ error: 'Note title is required' }, { status: 400 });
        }
        //now here you have o write the logic for deleteing the not ensure to also delete all the todos in it too!!!
        //now just chill beacuse i added the Cascade delete in the prisma schema so that if the note get deleted 
        //all of it children that are connected to it using the foreign key will also get delted !!! 
        //this means if a particular note get deleted then it todos and its completedCalendarDates list also get delted
        //this is done and is migrated on the dev brach on the neonDB devlopment brach , not on the production DB
        //cascase delete is the GOAT , try to read more about the prisma's cascade read all the useful features guven my the SQL language
        // and also features given by prisma , since i'll be helpful to know what you can achieve with only sql without writing custom logic 
        //for everything , also since drizzle ORM is on the door step , its neccessary to learn both thoroughly to compare and use the best!!
        const del=await prisma.note.delete({
            where:{
                id:noteId,
                userId:userSerialId,
                title:title
            }
        })
        console.log(`Deleted the note and all of its related data!!`)
        return NextResponse.json(del,{status:200})
    } catch(error){
        console.error(`Error while deleteing note`,error);
        return NextResponse.json({error:'Internal server error'},{status:500});
    }
}