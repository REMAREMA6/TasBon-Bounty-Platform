import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import {
  ArrowRight,
  ChevronRight,
  Eye,
  MessageSquare,
  Target,
  Trophy,
  BriefcaseBusiness,
  Activity,
} from 'lucide-react'
import SectionHeading from './components/SectionHeading'
import {
  badges,
  featuredProjects,
  profileTabs,
  settingsItems,
  skills,
  tabDescriptions,
  topSkills,
} from './profileData'

const tabIconMap = {
  Overview: Eye,
  Bounties: Target,
  Hackathons: Trophy,
  Grants: BriefcaseBusiness,
  Activity,
  Reviews: MessageSquare,
}

/**
 * OverviewContent — the tab strip + the body below it.
 * - Overview tab: Featured Work cards, Skills chips, Top Skills progress bars,
 *   Badges grid, expandable Settings rows.
 * - Other tabs: a clean placeholder state with a "View section status" button
 *   that fires a sonner toast. Replace these with real data when wired.
 */
export default function OverviewContent({ activeTab, onTabChange }) {
  const [expandedSetting, setExpandedSetting] = useState(null)
  const navigate = useNavigate()

  return (
    <>
      {/* Tab strip */}
      <div className="mt-5 border-b border-slate-200">
        <div className="flex gap-6 overflow-x-auto">
          {profileTabs.map(({ label }) => {
            const Icon = tabIconMap[label] || Eye
            const active = activeTab === label
            return (
              <button
                key={label}
                onClick={() => onTabChange(label)}
                className={`flex shrink-0 items-center gap-2 border-b-2 pb-3 text-[11px] font-medium transition ${
                  active
                    ? 'border-[#009966] text-[#007A55]'
                    : 'border-transparent text-slate-400 hover:text-slate-700'
                }`}
              >
                <Icon size={13} />
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {activeTab !== 'Overview' ? (
        /* Placeholder state for non-Overview tabs */
        <section className="mt-6 rounded-xl border border-slate-100 bg-white px-5 py-12 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-[#007A55]">
            {(() => {
              const Icon = tabIconMap[activeTab] || Eye
              return <Icon size={19} />
            })()}
          </div>
          <h2 className="mt-3 text-sm font-semibold text-slate-800">
            {activeTab}
          </h2>
          <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-400">
            {tabDescriptions[activeTab] ||
              'This section is ready to be connected to application data.'}
          </p>
          <button
            onClick={() =>
              toast(
                `${activeTab} is a frontend placeholder — connect it to your API.`,
              )
            }
            className="mt-4 rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            View section status
          </button>
        </section>
      ) : (
        <>
          {/* Two-column layout: featured work + skills (left), top skills + badges (right) */}
          <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_268px]">
            <div className="min-w-0">
              <SectionHeading
                title="Featured Work"
                action={
                  <button
                    onClick={() =>
                      toast(
                        'The projects listing page is not part of this screen yet.',
                      )
                    }
                    className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#007A55] hover:underline"
                  >
                    View all projects <ArrowRight size={12} />
                  </button>
                }
              />

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {featuredProjects.map((project) => (
                  <article
                    key={project.title}
                    className="overflow-hidden rounded-xl border border-slate-100 bg-white transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="relative h-[112px] overflow-hidden bg-slate-900">
                      <img
                        src={project.image}
                        alt={`${project.title} project cover`}
                        loading="lazy"
                        className="h-full w-full object-cover opacity-80"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/35 text-white">
                        <span className="text-[9px] tracking-[0.2em] text-white/60">
                          PROJECT
                        </span>
                        <span className="mt-1 px-2 text-center text-xs font-semibold">
                          {project.title}
                        </span>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="text-xs font-bold text-slate-800">
                        {project.title}
                      </h3>
                      <span className="mt-2 inline-block rounded bg-slate-50 px-2 py-0.5 text-[9px] text-slate-400">
                        {project.category}
                      </span>
                      <p className="mt-2 text-[10px] leading-4 text-slate-500">
                        {project.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              <section className="mt-6">
                <SectionHeading title="Skills" />
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[10px] text-slate-500"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            {/* Right sidebar: Top Skills + Badges */}
            <aside className="space-y-4">
              <section className="rounded-xl border border-slate-100 bg-white p-4">
                <SectionHeading title="Top Skills" />
                <div className="space-y-3">
                  {topSkills.map((skill, i) => (
                    <div key={`${skill.name}-${i}`}>
                      <div className="mb-1.5 flex justify-between text-[10px]">
                        <span className="font-medium text-slate-600">
                          {skill.name}
                        </span>
                        <span className="text-slate-400">{skill.score}%</span>
                      </div>
                      <div
                        className="h-1.5 overflow-hidden rounded-full bg-slate-100"
                        role="progressbar"
                        aria-label={`${skill.name} proficiency`}
                        aria-valuenow={skill.score}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className="h-full rounded-full bg-[#009966]"
                          style={{ width: `${skill.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-xl border border-slate-100 bg-white p-4">
                <SectionHeading
                  title="Badges"
                  action={
                    <button
                      onClick={() =>
                        toast(
                          'All builder badges will appear here when wired to profile data.',
                        )
                      }
                      className="text-[9px] font-semibold text-[#007A55]"
                    >
                      View all
                    </button>
                  }
                />
                <div className="grid grid-cols-3 gap-x-2 gap-y-4">
                  {badges.map(({ name, icon: Icon, style }) => (
                    <div
                      key={name}
                      className="flex flex-col items-center text-center"
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${style}`}
                      >
                        <Icon size={19} />
                      </div>
                      <span className="mt-1.5 text-[8px] text-slate-400">
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </aside>
          </div>

          {/* Settings list */}
          <section className="mt-7 border-t border-slate-200">
            {settingsItems.map(({ title, description, icon: Icon }) => (
              <div key={title} className="border-b border-slate-200">
                <div className="flex min-h-[65px] items-center justify-between gap-4 py-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <Icon size={19} className="shrink-0 text-[#009966]" />
                    <div>
                      <h3 className="text-xs font-bold text-slate-800">
                        {title}
                      </h3>
                      <p className="mt-0.5 text-[10px] text-slate-400">
                        {description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      setExpandedSetting((cur) =>
                        cur === title ? null : title,
                      )
                    }
                    aria-expanded={expandedSetting === title}
                    className="flex h-8 shrink-0 items-center gap-2 rounded-lg border border-slate-200 px-3 text-[10px] font-semibold text-slate-600 hover:bg-white"
                  >
                    {expandedSetting === title ? 'Close' : 'Manage'}
                    <ChevronRight
                      size={13}
                      className={`transition-transform ${
                        expandedSetting === title ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                </div>
                {expandedSetting === title && (
                  <div className="mb-3 ml-8 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
                    <p>{description}</p>
                    <p className="mt-1 text-[10px] text-slate-400">
                      Frontend placeholder — connect to your settings API.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </section>
        </>
      )}
    </>
  )
}
