import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import { Suspense, lazy, useEffect, useLayoutEffect, useRef } from "react";
import { Route, Switch, useLocation } from "wouter";
import { FloatingDock } from "./components/FloatingDock";
import { CustomCursor } from "./components/CustomCursor";
import { Atmosphere } from "./components/Atmosphere";
import {
  ContactSkeleton,
  HomeSkeleton,
  JourneySkeleton,
  LabSkeleton,
  NotFoundSkeleton,
  ProjectsSkeleton,
} from "./components/PageSkeletons";

const HomePage = lazy(() => import("./pages/HomePage").then((module) => ({ default: module.HomePage })));

const ProjectsPage = lazy(() =>
  import("./pages/ProjectsPage").then((module) => ({ default: module.ProjectsPage })),
);
const JourneyPage = lazy(() =>
  import("./pages/JourneyPage").then((module) => ({ default: module.JourneyPage })),
);
const LabPage = lazy(() => import("./pages/LabPage").then((module) => ({ default: module.LabPage })));
const ContactPage = lazy(() =>
  import("./pages/ContactPage").then((module) => ({ default: module.ContactPage })),
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage").then((module) => ({ default: module.NotFoundPage })),
);

const transition = {
  initial: { x: "8vw", opacity: 0, filter: "blur(10px)", clipPath: "inset(0 0 0 100%)" },
  animate: { x: 0, opacity: 1, filter: "blur(0px)", clipPath: "inset(0 0 0 0%)" },
  exit: { x: 0, opacity: 1, filter: "blur(2px)", clipPath: "inset(0 100% 0 0%)" },
};

function TransitionLayer({ routeKey }) {
  return (
    <AnimatePresence mode="sync">
      <motion.div
        key={routeKey}
        aria-hidden
        initial="initial"
        animate="animate"
        exit="exit"
        variants={{
          initial: {},
          animate: {},
          exit: {},
        }}
        className="pointer-events-none fixed inset-0 z-50"
      >
        <motion.div
          initial={{ x: "110%" }}
          animate={{ x: ["110%", "0%", "-104%"] }}
          transition={{
            duration: 1.18,
            ease: [0.7, 0, 0.3, 1],
            times: [0, 0.42, 1],
          }}
          className="absolute inset-0 bg-canvas"
        />
        <motion.div
          initial={{ x: "122%" }}
          animate={{ x: ["122%", "12%", "-110%"] }}
          transition={{
            duration: 1.34,
            ease: [0.7, 0, 0.3, 1],
            times: [0, 0.46, 1],
            delay: 0.14,
          }}
          className="absolute inset-0 bg-white"
        />
      </motion.div>
    </AnimatePresence>
  );
}

function PageShell({ children }) {
  const isPresent = useIsPresent();
  const scrollSnapshotRef = useRef(0);

  useEffect(() => {
    const updateScroll = () => {
      scrollSnapshotRef.current = window.scrollY;
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  return (
    <motion.div
      variants={transition}
      initial="initial"
      animate="animate"
      exit="exit"
      style={
        isPresent
          ? undefined
          : {
              position: "fixed",
              inset: 0,
              top: -scrollSnapshotRef.current,
              left: 0,
              right: 0,
              width: "100%",
            }
      }
      transition={{
        x: { duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: 0.22 },
        opacity: { duration: 0.34, ease: "easeOut", delay: 0.3 },
        filter: { duration: 0.42, ease: "easeOut", delay: 0.28 },
        clipPath: { duration: 0.72, ease: [0.65, 0, 0.35, 1], delay: 0.22 },
      }}
      className="relative min-h-screen"
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [location] = useLocation();

  useLayoutEffect(() => {
    const root = document.documentElement;
    const previousInlineBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);

    return () => {
      root.style.scrollBehavior = previousInlineBehavior;
    };
  }, [location]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-canvas text-ink">
      <Atmosphere />
      <CustomCursor />
      <TransitionLayer routeKey={location} />
      <AnimatePresence mode="wait">
        <PageShell key={location}>
          <Switch location={location}>
            <Route path="/">
              <Suspense fallback={<HomeSkeleton />}>
                <HomePage />
              </Suspense>
            </Route>
            <Route path="/projects">
              <Suspense fallback={<ProjectsSkeleton />}>
                <ProjectsPage />
              </Suspense>
            </Route>
            <Route path="/journey">
              <Suspense fallback={<JourneySkeleton />}>
                <JourneyPage />
              </Suspense>
            </Route>
            <Route path="/lab">
              <Suspense fallback={<LabSkeleton />}>
                <LabPage />
              </Suspense>
            </Route>
            <Route path="/contact">
              <Suspense fallback={<ContactSkeleton />}>
                <ContactPage />
              </Suspense>
            </Route>
            <Route>
              <Suspense fallback={<NotFoundSkeleton />}>
                <NotFoundPage />
              </Suspense>
            </Route>
          </Switch>
        </PageShell>
      </AnimatePresence>
      <FloatingDock />
    </div>
  );
}
