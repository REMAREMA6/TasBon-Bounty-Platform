import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import {
  BadgeCheck,
  CalendarDays,
  Link,
  MapPin,
  MoreHorizontal,
  Star,
} from 'lucide-react'
import Modal from './components/Modal'
import { useClickOutside } from './hooks/useClickOutside'
import { profileStatsFallback, skillTags, socialLinks } from './profileData'

/**
 * ProfileCard — the header card at the top of the profile page.
 *
 * Data sources (in priority order):
 *   1. `profile` prop   — fetched from getProfile() in the parent (index.jsx)
 *   2. Redux auth user  — useSelector((state) => state.auth.user)
 *   3. Fallback strings — shown until the API returns real data
 *
 * Edit Profile calls `onUpdateProfile({ fullName, bio })` which the parent
 * wires to updateProfile() from services/profile.js.
 */
export default function ProfileCard({ profile, onUpdateProfile }) {
  // Redux logged-in user (always available once authed)
  const authUser = useSelector((state) => state.auth.user)

  const [editOpen, setEditOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [saving, setSaving] = useState(false)

  // Editable form state — seeded from profile / authUser / fallbacks.
  const [displayName, setDisplayName] = useState(
    profile?.fullName || authUser?.fullName || 'Alex Rivera',
  )
  const [bio, setBio] = useState(
    profile?.bio ||
      'Web3 builder focused on smart contract security and DeFi protocols. Passionate about building robust dApps and participating in hackathons to innovate fast and bounty ecosystems. I bring 3+ years of experience in Solidity, React and blockchain development.',
  )

  const moreActionsRef = useRef(null)
  useClickOutside(moreActionsRef, () => setMoreOpen(false), moreOpen)

  // Stats come from the profile/dashboard-stats payload, with graceful fallbacks
  // so the layout looks complete even before the backend is wired.
  const stats = profile?.stats || profileStatsFallback

  // Avatar: prefer profile.avatarUrl, then authUser.avatarUrl, then a placeholder.
  const avatarUrl =
    profile?.avatarUrl ||
    authUser?.avatarUrl ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=85'

  async function copyProfileLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
      toast.success('Profile link copied')
    } catch {
      toast.error('Could not copy link')
    }
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    try {
      await onUpdateProfile({ fullName: displayName, bio })
      setEditOpen(false)
      toast.success('Profile updated')
    } catch (err) {
      toast.error(err.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <section className="overflow-visible rounded-2xl border border-slate-100 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.025)]">
        {/* Green header band */}
        <div className="h-[92px] rounded-t-2xl bg-[#005238] sm:h-[96px]" />

        <div className="px-4 pb-5 sm:px-6">
          {/* Avatar beside the name (matches reference design).
              Only the avatar overlaps the green band; the name sits below it
              on the white card body. */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4">
            <div className="flex flex-row items-start gap-3 sm:items-end sm:gap-4">
              <div className="relative -mt-7 w-fit shrink-0 self-start sm:-mt-9 sm:self-end">
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="h-[68px] w-[68px] rounded-full border-4 border-white object-cover shadow-sm sm:h-24 sm:w-24"
                />
                <span className="absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-emerald-500 text-[8px] font-bold text-white sm:h-5 sm:w-5 sm:text-[10px]">
                  ✓
                </span>
              </div>

              <div className="min-w-0 flex-1 pt-1 sm:pb-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <h1 className="text-base font-bold tracking-tight text-slate-800 sm:text-xl">
                    {displayName}
                  </h1>
                  <BadgeCheck size={15} className="fill-blue-500 text-white" />
                </div>
                <p className="mt-0.5 text-xs text-slate-500 sm:mt-1">
                  {profile?.role || 'Builder'}
                </p>
                <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-slate-400 sm:mt-2 sm:gap-x-4 sm:gap-y-1">
                  {profile?.location && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={11} /> {profile.location}
                    </span>
                  )}
                  {profile?.website && (
                    <span className="inline-flex items-center gap-1">
                      <Link size={11} /> {profile.website}
                    </span>
                  )}
                  {profile?.joinedAt && (
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays size={11} /> Joined{' '}
                      {new Date(profile.joinedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action buttons — full-width right-aligned on mobile (own row),
                auto width on desktop (same row as name). */}
            <div className="flex w-full justify-end gap-2 sm:w-auto sm:shrink-0 sm:justify-start sm:mb-1">
              <button
                onClick={() => setEditOpen(true)}
                className="h-8 rounded-lg border border-slate-200 px-4 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Edit profile
              </button>
              <div className="relative" ref={moreActionsRef}>
                <button
                  onClick={() => setMoreOpen((v) => !v)}
                  aria-label="More profile actions"
                  aria-expanded={moreOpen}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
                >
                  <MoreHorizontal size={17} />
                </button>
                {moreOpen && (
                  <div className="absolute right-0 top-10 z-10 w-40 rounded-xl border border-slate-100 bg-white p-1.5 shadow-xl">
                    <button
                      onClick={copyProfileLink}
                      className="w-full rounded-lg px-3 py-2 text-left text-xs text-slate-600 hover:bg-slate-50"
                    >
                      {copied ? 'Link copied' : 'Copy profile link'}
                    </button>
                    <button
                      onClick={() => setMoreOpen(false)}
                      className="w-full rounded-lg px-3 py-2 text-left text-xs text-slate-600 hover:bg-slate-50"
                    >
                      Close menu
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="mt-5 max-w-4xl text-[11px] leading-[1.7] text-slate-500">
            {bio}
          </p>

          {/* Social links + skill tags */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {socialLinks.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
              >
                <Icon size={15} />
              </a>
            ))}
            {skillTags.map((skill, i) => (
              <span
                key={skill}
                className={`rounded-md px-2 py-1 text-[9px] font-medium ${
                  i === 0
                    ? 'bg-[#e7f6ef] text-[#176b4e]'
                    : 'bg-slate-50 text-slate-500'
                }`}
              >
                {i === 0 ? '• ' : ''}
                {skill}
              </span>
            ))}
          </div>

          {/* Stats grid */}
          <div className="mt-6 grid grid-cols-2 gap-y-5 border-t border-slate-100 pt-5 sm:grid-cols-3 lg:grid-cols-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border-slate-100 sm:border-r sm:px-4 first:sm:pl-0 last:sm:border-r-0"
              >
                <div className="flex items-center gap-1 text-base font-bold text-slate-800">
                  {stat.value}
                  {stat.isRating && (
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                  )}
                </div>
                <p className="mt-0.5 text-[10px] text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {editOpen && (
        <Modal title="Edit profile" onClose={() => setEditOpen(false)}>
          <form onSubmit={handleSave} className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-600">
                Display name
              </span>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-600"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-600">
                Bio
              </span>
              <textarea
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full resize-y rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-600"
              />
            </label>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditOpen(false)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-[#009966] px-4 py-2 text-xs font-semibold text-white hover:bg-[#007A55] disabled:opacity-50"
              >
                {saving ? 'Saving…' : 'Save changes'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  )
}
