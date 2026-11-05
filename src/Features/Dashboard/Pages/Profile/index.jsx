import { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'
import {
  getProfile,
  updateProfile,
  getDashboardStats,
} from '../../../../services/profile'
import ProfileCard from './ProfileCard'
import OverviewContent from './OverviewContent'

/**
 * Profile page — renders inside the Dashboard Layout's <Outlet />.
 * Route: /dashboard/profile
 *
 * Data flow:
 *   1. On mount, calls getProfile() + getDashboardStats() from services/profile.js.
 *   2. Merges the result into a single `profile` object handed to ProfileCard.
 *   3. Edit Profile calls handleUpdateProfile() which calls updateProfile() and
 *      then refreshes the local state on success.
 *
 * While loading (or if the API is unreachable), ProfileCard falls back to the
 * Redux auth user + sample data so the layout is never empty.
 */
const Profile = () => {
  const [profile, setProfile] = useState(null)
  const [activeTab, setActiveTab] = useState('Overview')
  const [loading, setLoading] = useState(true)

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true)
      const [profileRes, statsRes] = await Promise.allSettled([
        getProfile(),
        getDashboardStats(),
      ])

      const profileData =
        profileRes.status === 'fulfilled' ? profileRes.value?.data : null
      const statsData =
        statsRes.status === 'fulfilled' ? statsRes.value?.data : null

      // Merge profile + stats into the shape ProfileCard expects.
      // Adjust the field mappings here if your backend uses different names.
      setProfile({
        fullName: profileData?.fullName || profileData?.name,
        bio: profileData?.bio || profileData?.about,
        role: profileData?.role || profileData?.title || 'Builder',
        avatarUrl: profileData?.avatarUrl || profileData?.avatar,
        location: profileData?.location,
        website: profileData?.website || profileData?.websiteUrl,
        joinedAt: profileData?.joinedAt || profileData?.createdAt,
        stats: statsData
          ? [
              {
                value: String(statsData.bountiesCompleted ?? '0'),
                label: 'Bounties Completed',
              },
              {
                value: `$${Number(statsData.totalEarned ?? 0).toLocaleString()}`,
                label: 'Total Earned',
              },
              {
                value: String(statsData.averageRating ?? '0.0'),
                label: 'Average Rating',
                isRating: true,
              },
              {
                value: `${statsData.successRate ?? 0}%`,
                label: 'Success Rate',
              },
              {
                value: String(statsData.reviews ?? '0'),
                label: 'Reviews',
              },
              {
                value: String(statsData.repeatClients ?? '0'),
                label: 'Repeat Clients',
              },
            ]
          : undefined,
      })
    } catch {
      // Leave profile as null — ProfileCard falls back to Redux user + sample data.
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  const handleUpdateProfile = useCallback(async (data) => {
    const res = await updateProfile(data)
    // Refresh local state so the card shows the new values immediately.
    setProfile((prev) => ({ ...prev, ...data, ...res?.data }))
  }, [])

  if (loading && !profile) {
    return (
      <div className="flex min-h-full items-center justify-center bg-gray-50 p-6">
        <div className="h-8 w-8 border-3 border-[#009966] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-1 min-h-full bg-gray-50 p-3 sm:p-6">
      <ProfileCard profile={profile} onUpdateProfile={handleUpdateProfile} />
      <OverviewContent activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

export default Profile
