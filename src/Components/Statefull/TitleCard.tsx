import React from 'react'

export default function TitleCard({ title }: { title: string }) {
    return (
        <div className='p-3 text-center rounded-md bg-green-950 text-3xl'>{title}</div>
    )
}
