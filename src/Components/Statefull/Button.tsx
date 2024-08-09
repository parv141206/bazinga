import React from 'react'

export default function Button({title , onClick} : {title: string , onClick: () => void}) {
  return (
    <button onClick={onClick} className='bg-green-950 w-fit hover:bg-green-800 text-white px-4 py-2 rounded-md'>{title}</button>
  )
}
