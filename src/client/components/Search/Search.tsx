import { useRouter } from 'next/router'
import React, { useState } from 'react'

export default function Search() {

    // Hooks
    const router = useRouter()

    // State
    const [location, setLocation] = useState<string>('')

    // Handlers
    const handleSubmit = () => {
    
    }



  return (
    <div>Search</div>
  )
}
