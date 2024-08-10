import React from 'react'

export default function CropCard({ cropName }: { cropName: string }) {
    return (
        <div className='rounded-sm border-opacity-50 p-5 flex items-center flex-col gap-3 bg-transparent  border border-green-700 justify-center hover:bg-green-700/50'>
            <div className="text-xl">{cropName}</div>
        </div>
    )
}
