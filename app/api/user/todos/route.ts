// import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req:NextRequest){//this should be a POST request!!!REMEMBER
    try{
        // const {userId}=await auth();

        // if(!userId){
        //     return NextResponse.json({error:'Unauthorized'},{status:401});
        // }

        const {reqParentNoteId,reqName}=await req.json();
        if(!reqParentNoteId || !reqName){
            return NextResponse.json({ error: 'Invalid request!!' }, { status: 400 });
        }
        //creating a new entry for the given todo
        const todo=await prisma.todo.create({
            data:{
                parentNoteId:reqParentNoteId,
                name:reqName
            }
        })
        // console.log(`✅ Created todo: ${reqName} for user ${userId}`);
        return NextResponse.json(todo,{status:201});
    } catch(error){
        console.error('Error creating todo',error);
        return NextResponse.json({error:'Internal server error'},{status:500});
    }
}

interface updateTodo{
    reqParentNoteId:number;
    reqName:string,
    reqId:number,
    updateItToToday:string
}

export async function PUT(req:NextResponse){//this is for updating the (updateAt) in the db for storing the last done date of that todo
    try{
        // const {userId}=await auth();
        // if(!userId){
        //     return NextResponse.json({error:'Unauthorized'},{status:401});
        // }
        const {reqParentNoteId,reqName,reqId , updateItToToday}:updateTodo =await req.json();
        if(!reqParentNoteId || !reqName){
            return NextResponse.json({ error: 'Invalid request!!' }, { status: 400 });
        }
        //update the todo's updateAt state to the latest since this route method is just for doing that
        //main prisma/DB logic down here for updating the todo's state
        const updatedTodo = await prisma.todo.update({
            where:{
                id:reqId,
                parentNoteId:reqParentNoteId,
                name:reqName
            },
            data:{
                updateAt: updateItToToday
            }
        });
        //logic ends here
        console.log(`updated the todo `);
        return NextResponse.json(updatedTodo, { status: 200 });

    } catch(error){
        console.error('Error updating todo',error);
        return NextResponse.json({error:'Internal server error'},{status:500});
    }
}

export async function DELETE(req:NextResponse){
    try{
    //    const {userId}=await auth();
    //     if(!userId){
    //         return NextResponse.json({error:'Unauthorized'},{status:401});
    //     }
        const {reqParentNoteId,reqName,reqId}:updateTodo =await req.json();
        if(!reqParentNoteId || !reqName){
            return NextResponse.json({ error: 'Invalid request!!' }, { status: 400 });
        }
        //delete logic below!!
        const del=await prisma.todo.delete({
            where:{
                id:reqId,
                parentNoteId:reqParentNoteId,
                name:reqName
            }
        })
        console.log(`Deleted the todo`);
        return NextResponse.json(del,{status:200});
    } catch(error){
        console.error('Error deleting todo',error);
        return NextResponse.json({error:'Internla server error'},{status:500});
    }
}