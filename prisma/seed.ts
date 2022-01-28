import { PrismaClient } from "@prisma/client";
import type { Note } from '@prisma/client'
const db = new PrismaClient();

const notes: Array<Partial<Note>> = [
    {
        title: 'Learn Remix',
        description: 'Learn Remix, Learn the platform'
    }
]

async function seed() {
    await Promise.all(notes.map(note => {
        return db.note.create({
            // @ts-ignore
            data: note
        })
    }))
}

seed();
