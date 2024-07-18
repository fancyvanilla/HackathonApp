import UserProfile from '@/components/ui/UserProfile'
import GuideProfile from '@/components/ui/GuideProfile'

export default function Profile() {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/user-avatar.jpg",
    xp: 1250,
    level: 5,
    isGuide: true,
    wallet: "0x1234...5678",
    balance: "500 APT",
    role:"guide"
  }
  return (
    user.role === "guide"?<GuideProfile/>:<UserProfile/>
    )
}
  