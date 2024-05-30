import { useSession } from 'next-auth/react';
import React from 'react'

const ProfilePic = () =>
{
    const [ profilePic, setProfilePic ] = React.useState(null)
    const [backgroundImage, setBackgroundImage] = React.useState(null)

    const {data:session} = useSession()
  return (
    <div>ProfilePic</div>
  )
}

export default ProfilePic