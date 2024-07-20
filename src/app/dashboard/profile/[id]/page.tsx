import UserProfile from '@/components/ui/UserProfile'
import GuideProfile from '@/components/ui/GuideProfile'
import { getDocumentById } from '@/lib/firebase/firebaseControllers'

export default async function Profile({ params }: { params: { id: string } }) {

  const { id } = params

  try {
    let user = await getDocumentById("users", id)

    if (!user) {
      return <div>User not found! Please try again later.</div>
    }
    return (
      user.role === "guide"?<GuideProfile user={user} />:<UserProfile user={user} />
      )

  } catch (error) {
    console.error('Failed to fetch user:', error)
    return <div>Failed to load experience. Please try again later.</div>
  }
  
}
  