import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req:NextRequest){
    //a catch here , i have to also if the note exist or if the todo exist or if the calendarDates exist or not? if not then
    //i have to cerate it , otherwise update the xisting one
}