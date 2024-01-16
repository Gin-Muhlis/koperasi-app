"use client"

import React from 'react'
import { useSession } from 'next-auth/react'

const Content = () => {
    const { data: session, status }: { data: any; status: string } = useSession()
    console.log(session)
    return (
        <div>Content</div>
    )
}

export default Content