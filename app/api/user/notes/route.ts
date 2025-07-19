import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req:NextRequest){//this route is suppose to be POST!!!!REMEMBER
    try{
        const {userId}= await auth();

        if(!userId){
            return NextResponse.json({error:'Unauthorized'},{status:401})
        }
        
        const {title}= req.json();
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
