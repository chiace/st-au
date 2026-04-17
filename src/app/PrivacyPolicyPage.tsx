"use client";

import { useEffect } from "react";

export function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-20">
      <div className="mx-auto max-w-site">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/48">Legal</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-7 text-white/72">
          Last updated: April 2026. This notice describes how Superteam Australia (&quot;we&quot;,
          &quot;us&quot;) handles
          information when you use this website. Program or partner services may have additional terms;
          where those apply, they are linked from the relevant experience.
        </p>

        <div className="mt-12 space-y-10 border-t border-white/10 pt-10 text-sm leading-7 text-white/78">
          <section>
            <h2 className="text-base font-semibold tracking-[-0.02em] text-white">Information we collect</h2>
            <p className="mt-3 max-w-2xl">
              We may collect information you submit through forms (such as name, email, and role), standard
              server and analytics data (such as device type and approximate region), and messages you send
              through channels we operate.
            </p>
          </section>
          <section>
            <h2 className="text-base font-semibold tracking-[-0.02em] text-white">How we use information</h2>
            <p className="mt-3 max-w-2xl">
              We use this information to operate community programs, respond to requests, improve the site,
              and communicate about events and opportunities you have asked to hear about.
            </p>
          </section>
          <section>
            <h2 className="text-base font-semibold tracking-[-0.02em] text-white">Sharing</h2>
            <p className="mt-3 max-w-2xl">
              We do not sell your personal information. We may share data with service providers who help us
              run the site and programs, or when required by law.
            </p>
          </section>
          <section>
            <h2 className="text-base font-semibold tracking-[-0.02em] text-white">Contact</h2>
            <p className="mt-3 max-w-2xl">
              For privacy questions about this site, reach out through the channels listed in the footer.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
