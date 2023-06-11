"use client";
import { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from 'next/navigation';
import Profile from "@components/profile"

const MyProfile = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const creatorId = searchParams.get("id")
  useEffect(() => {
    const userId = creatorId ? creatorId : session?.user.id
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();
      setPrompts(data)
    }
    const fetchUser = async () => {
      const response = await fetch(`api/users/${userId}`)
      const data = await response.json()
      console.log(data)
      setUser(data)
    }
    if (session?.user.id || creatorId) fetchPrompts()
    if (creatorId) fetchUser()
  }, [creatorId, session?.user.id]);

  const [prompts, setPrompts] = useState([])
  const [user, setUser] = useState(null)

  const handleEdit = (prompt) => {
    router.push(`/update-prompt?id=${prompt._id}`)
  }
  const handleDelete = async (prompt) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt");
    if (!hasConfirmed) return
    try {
      await fetch(`/api/prompts/${prompt._id.toString()}`, { method: "DELETE" })
      setPrompts(prompts.filter(p => p._id != prompt._id))
    } catch (error) {

    }
  }
  return (
    <Profile
      name={user ? user.username : "My"}
      desc={`Welcome to ${(user ? user.username : "your")} profile page`}
      prompts={prompts}
      handleEdit={user ? null : handleEdit}
      handleDelete={user ? null : handleDelete}
    />
  )
}

export default MyProfile