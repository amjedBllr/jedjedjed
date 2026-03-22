function IntroSkeleton() {
  return (
    <div className="max-w-3xl">
      <div className="loading-bar mb-5 h-3 w-32 rounded-full" />
      <div className="loading-bar h-12 w-full max-w-[38rem] rounded-full md:h-16" />
      <div className="loading-bar mt-3 h-12 w-[82%] max-w-[28rem] rounded-full md:h-16" />
      <div className="loading-bar mt-6 h-4 w-full max-w-[32rem] rounded-full" />
      <div className="loading-bar mt-3 h-4 w-[88%] max-w-[26rem] rounded-full" />
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <main className="relative z-10 pb-36">
      <section className="px-5 pt-10 md:px-10 md:pt-14">
        <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <div className="max-w-2xl">
            <div className="loading-bar mb-6 h-3 w-72 rounded-full" />
            <div className="loading-bar h-14 w-full max-w-[36rem] rounded-full md:h-20" />
            <div className="loading-bar mt-3 h-14 w-[92%] max-w-[32rem] rounded-full md:h-20" />
            <div className="loading-bar mt-3 h-14 w-[76%] max-w-[24rem] rounded-full md:h-20" />
            <div className="loading-bar mt-8 h-4 w-full max-w-[28rem] rounded-full" />
            <div className="loading-bar mt-3 h-4 w-[86%] max-w-[24rem] rounded-full" />
            <div className="mt-10 flex gap-4">
              <div className="loading-bar h-12 w-44 rounded-full" />
              <div className="loading-bar h-12 w-56 rounded-full" />
            </div>
          </div>
          <div className="relative md:-translate-y-6 md:translate-x-6">
            <div className="loading-bar h-[28rem] w-full max-w-[42rem] rounded-[2rem] md:h-[42rem]" />
          </div>
        </div>
      </section>
    </main>
  );
}

export function ProjectsSkeleton() {
  return (
    <main className="relative z-10 px-5 pb-36 pt-12 md:px-10 md:pt-16">
      <div className="mx-auto max-w-7xl">
        <IntroSkeleton />
        <div className="mt-12 flex flex-wrap gap-3">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="loading-bar h-11 w-36 rounded-full" />
          ))}
        </div>
        <div className="mt-14 flex gap-6 overflow-hidden">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="min-w-[88vw] overflow-hidden rounded-[2.3rem] border border-white/10 bg-white/[0.04] p-4 shadow-panel md:min-w-[58rem]"
            >
              <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                <div className="loading-bar h-[22rem] rounded-[1.8rem] md:h-[38rem]" />
                <div className="p-4 md:p-6">
                  <div className="loading-bar h-3 w-32 rounded-full" />
                  <div className="loading-bar mt-6 h-12 w-full rounded-full md:h-16" />
                  <div className="loading-bar mt-3 h-12 w-[72%] rounded-full md:h-16" />
                  <div className="loading-bar mt-8 h-4 w-full rounded-full" />
                  <div className="loading-bar mt-3 h-4 w-[82%] rounded-full" />
                  <div className="mt-12 flex gap-3">
                    <div className="loading-bar h-3 w-16 rounded-full" />
                    <div className="loading-bar h-3 w-20 rounded-full" />
                    <div className="loading-bar h-3 w-24 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export function JourneySkeleton() {
  return (
    <main className="relative z-10 px-5 pb-36 pt-12 md:px-10 md:pt-16">
      <div className="mx-auto max-w-7xl">
        <IntroSkeleton />
        <div className="mt-16 space-y-8">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="grid gap-6 border-t border-white/10 py-8 md:grid-cols-[12rem_1fr]">
              <div className="loading-bar h-12 w-24 rounded-full md:h-14 md:w-28" />
              <div>
                <div className="loading-bar h-10 w-full max-w-[22rem] rounded-full md:h-12" />
                <div className="loading-bar mt-5 h-4 w-full rounded-full" />
                <div className="loading-bar mt-3 h-4 w-[82%] rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export function LabSkeleton() {
  return (
    <main className="relative z-10 px-5 pb-36 pt-12 md:px-10 md:pt-16">
      <div className="mx-auto max-w-7xl">
        <IntroSkeleton />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-panel"
            >
              <div className="loading-bar h-3 w-28 rounded-full" />
              <div className="loading-bar mt-6 h-10 w-full rounded-full" />
              <div className="loading-bar mt-3 h-10 w-[74%] rounded-full" />
              <div className="loading-bar mt-6 h-4 w-full rounded-full" />
              <div className="loading-bar mt-3 h-4 w-[86%] rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export function ContactSkeleton() {
  return (
    <main className="relative z-10 px-5 pb-36 pt-12 md:px-10 md:pt-16">
      <div className="mx-auto max-w-7xl">
        <IntroSkeleton />
        <div className="mt-16 grid gap-8 md:grid-cols-[0.7fr_1.3fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-panel">
            <div className="loading-bar h-3 w-28 rounded-full" />
            <div className="mt-8 space-y-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="border-b border-white/10 pb-4">
                  <div className="loading-bar h-3 w-24 rounded-full" />
                  <div className="loading-bar mt-3 h-6 w-full rounded-full" />
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-panel md:p-10">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="loading-bar h-14 rounded-[1.2rem]" />
              <div className="loading-bar h-14 rounded-[1.2rem]" />
            </div>
            <div className="loading-bar mt-8 h-14 rounded-[1.2rem]" />
            <div className="loading-bar mt-8 h-40 rounded-[1.6rem]" />
            <div className="loading-bar mt-10 h-12 w-44 rounded-full" />
          </div>
        </div>
      </div>
    </main>
  );
}

export function NotFoundSkeleton() {
  return (
    <main className="relative z-10 flex min-h-screen items-center px-5 pb-36 pt-12 md:px-10 md:pt-16">
      <div className="mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-end">
        <div>
          <div className="loading-bar h-3 w-28 rounded-full" />
          <div className="loading-bar mt-6 h-14 w-full max-w-[36rem] rounded-full md:h-20" />
          <div className="loading-bar mt-3 h-14 w-[78%] max-w-[28rem] rounded-full md:h-20" />
          <div className="loading-bar mt-8 h-4 w-full max-w-[28rem] rounded-full" />
          <div className="loading-bar mt-3 h-4 w-[84%] max-w-[24rem] rounded-full" />
          <div className="mt-10 flex gap-4">
            <div className="loading-bar h-12 w-44 rounded-full" />
            <div className="loading-bar h-12 w-48 rounded-full" />
          </div>
        </div>
        <div className="rounded-[2.4rem] border border-white/10 bg-white/[0.04] p-8 shadow-panel md:p-12">
          <div className="loading-bar h-28 w-44 rounded-[2rem] md:h-36 md:w-56" />
          <div className="mt-8 space-y-4">
            <div className="loading-bar h-3 w-32 rounded-full" />
            <div className="loading-bar h-5 w-28 rounded-full" />
            <div className="loading-bar h-5 w-32 rounded-full" />
            <div className="loading-bar h-5 w-28 rounded-full" />
            <div className="loading-bar h-5 w-20 rounded-full" />
            <div className="loading-bar h-5 w-28 rounded-full" />
          </div>
        </div>
      </div>
    </main>
  );
}
