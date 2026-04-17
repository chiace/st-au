import { ArrowRight, Filter, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { memberFilters, members, type Member } from "./data";
import { MemberCard } from "./site-shell";

function memberSearchHaystack(member: Member) {
  return [
    member.name,
    member.role,
    member.company,
    member.location,
    member.badge,
    member.skills.join(" "),
    member.filters.join(" "),
    member.highlight,
    member.contribution,
  ]
    .join(" ")
    .toLowerCase();
}

/** Every whitespace-separated token must appear somewhere in the haystack (order-independent). */
function matchesSearchQuery(haystack: string, raw: string) {
  const tokens = raw
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  if (!tokens.length) {
    return true;
  }
  return tokens.every((token) => haystack.includes(token));
}

export function MembersPage({
  onOpenForm,
  onGoHome,
}: {
  onOpenForm: () => void;
  onGoHome: () => void;
}) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesFilter =
        activeFilter === "All" ||
        member.filters.includes(activeFilter) ||
        member.skills.includes(activeFilter);

      const haystack = memberSearchHaystack(member);
      return matchesFilter && matchesSearchQuery(haystack, search);
    });
  }, [activeFilter, search]);

  const clearFilters = () => {
    setSearch("");
    setActiveFilter("All");
  };

  return (
    <main id="members-directory" className="px-4 pb-14 pt-8 sm:px-6 lg:px-8 lg:pb-20">
      <div className="mx-auto max-w-site">
        <section
          aria-labelledby="members-page-title"
          className="relative overflow-hidden rounded-[40px] bg-[radial-gradient(circle_at_top_left,rgba(0,131,62,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(254,206,0,0.08),transparent_28%),linear-gradient(180deg,#07101f_0%,#08162b_38%,#07101f_100%)] px-5 py-7 text-white shadow-[0_28px_90px_rgba(7,18,45,0.26)] sm:px-8 sm:py-10 lg:px-10"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(254,206,0,0.8),rgba(0,131,62,0.8),transparent)]" />
          <div className="grid gap-10 lg:grid-cols-[1fr_0.76fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/72">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FECE00]" />
                Members directory
              </div>
              <h1
                id="members-page-title"
                className="mt-6 max-w-4xl text-3xl font-bold tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl"
              >
                Meet the people building Superteam Australia.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/74 sm:text-lg">
                Filter by skill, role, or city — find collaborators fast.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={onOpenForm}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#0f7d43_0%,#00833E_44%,#22a35a_72%,#FECE00_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(0,131,62,0.28)] transition hover:-translate-y-0.5 hover:opacity-95"
                >
                  Apply to join
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={onGoHome}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/6 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Back to home
                </button>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-white/62">
                {[
                  "Search by skill or role",
                  "Grows with the community",
                  "Mobile-friendly",
                ].map((item) => (
                  <div key={item} className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FECE00]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5 border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div className="mt-6 space-y-5">
                {[
                  {
                    label: "Members listed",
                    value: `${members.length}`,
                    copy: "Contributors and teams across Australia.",
                  },
                  {
                    label: "Best used for",
                    value: "Hiring, intros, collaboration",
                    copy: "Filter by role, skill, contribution.",
                  },
                  {
                    label: "Experience",
                    value: "Scan fast",
                    copy: "Readable on phone; more detail on desktop.",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="border-b border-white/10 pb-5 last:border-b-0 last:pb-0"
                  >
                    <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/52">
                      {item.label}
                    </div>
                    <div className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">
                      {item.value}
                    </div>
                    <div className="mt-2 text-sm leading-7 text-white/68">{item.copy}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="member-search-title"
          className="border-x border-b border-white/10 bg-[linear-gradient(180deg,rgba(8,16,31,0.96),rgba(7,16,31,0.94))] px-5 py-5 sm:px-8 lg:px-10"
        >
          <h2 id="member-search-title" className="sr-only">
            Search and filter members
          </h2>
          <div className="grid gap-5 py-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div role="search" aria-label="Search members" className="relative">
              <label htmlFor="member-search" className="sr-only">
                Search members by name, role, company, skill, or contribution
              </label>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/42" />
              <input
                id="member-search"
                name="member-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                placeholder="Name, role, company, skill…"
                className="h-14 w-full border-0 border-b border-white/10 bg-transparent pl-12 pr-0 text-sm text-white outline-none transition placeholder:text-white/42 focus:border-[#FECE00] focus:ring-0"
              />
            </div>

            <fieldset className="min-w-0 border-0 p-0">
              <legend className="sr-only">Filter members by specialty</legend>
              <div className="flex flex-nowrap items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/56">
                <Filter className="h-3.5 w-3.5" />
                Filters
                </div>
                {memberFilters.map((filter) => {
                  const active = activeFilter === filter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setActiveFilter(filter)}
                      className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400/60 ${
                        active
                          ? "bg-emerald-500/22 text-white ring-1 ring-emerald-400/35"
                          : "text-white/66 hover:bg-white/8 hover:text-white"
                      }`}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>
        </section>

        <section
          aria-labelledby="member-results-title"
          className="overflow-hidden rounded-b-[40px] border-x border-b border-white/10 bg-[linear-gradient(180deg,#07101f_0%,#091325_100%)] px-5 pb-4 pt-6 sm:px-8 lg:px-10"
        >
          <div className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 id="member-results-title" className="sr-only">
              Member results
            </h2>
            <div aria-live="polite" className="text-sm font-medium text-white/68">
              Showing <span className="font-semibold text-white">{filteredMembers.length}</span>{" "}
              members
            </div>
            <div className="mono-copy text-xs uppercase tracking-[0.22em] text-white/40">
              Australia-wide / community-led / readable
            </div>
          </div>

          {filteredMembers.length ? (
            <ul className="mt-2 list-none p-0">
              {filteredMembers.map((member) => (
                <li key={member.name}>
                  <MemberCard member={member} variant="editorial-dark" />
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-16 text-center sm:py-20" role="status" aria-live="polite">
              <div className="mx-auto max-w-xl px-2">
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/30">
                  No matches
                </div>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">
                  Try different words, a filter, or reset below.
                </p>
                <p className="mt-4 text-sm leading-7 text-white/54">
                  Search matches any part of a profile; use a few keywords (e.g. Sydney rust).
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#0f7d43_0%,#00833E_44%,#22a35a_72%,#FECE00_100%)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
                  >
                    Show all members
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      document.getElementById("member-search")?.focus();
                    }}
                    className="text-sm font-semibold text-white/78 underline decoration-white/20 underline-offset-4 transition hover:text-white"
                  >
                    Clear search only
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
