"use client"
import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {
  const {roomId} = useParams()
  return (
    <div>
      inside {roomId}
    </div>
  )
}

export default Page
