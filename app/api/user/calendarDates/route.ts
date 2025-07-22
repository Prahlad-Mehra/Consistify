import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req:NextRequest){
    //a catch here , i have to also if the note exist or if the todo exist or if the calendarDates exist or not? if not then
    //i have to cerate it , otherwise update the existing one
    try{
        const {reqParentNoteId,reqDate}= await req.json();
        if(!reqDate || !reqParentNoteId){
            return NextResponse.json({ error: 'Invalid request!!' }, { status: 400 })
        } 
        //adding a new entry in the completedCalendarDate table
        const addDate=await prisma.completedCalendarDate.create({
            data:{
                parentNote:reqParentNoteId,
                date:reqDate
            }
        })
        console.log(`added today's date to the CompletedCalendarDates!`)

        return NextResponse.json(addDate,{status:201})
    } catch(error){
        console.error('Error while adding date to completedCalendarDates',error);
        return NextResponse.json({error:'Internal server error'},{status:500});
    }   
}