import { useId, useLayoutEffect, useRef } from "react";
import {
  ShieldCheck,
  LayoutGrid,
  MessageSquareText,
  ScanLine,
  Settings2,
  ArrowUpRight,
  Bell,
  Search,
  MapPin,
  Plus,
  Layers,
  Crosshair,
  Workflow,
  Sparkles,
  FileText,
  CircleCheck,
  ChevronRight,
  Check,
  ArrowRight,
  MousePointer2,
  GitBranch,
} from "lucide-react";
import "./ProjectVisual.css";

const previewNames = {
  scamshield: "ScamShield AI",
  civicvision: "CivicVision",
  stepwise: "StepWise",
};

function WindowBar({ type }) {
  return (
    <div className="pv-window-bar">
      <div className="pv-window-dots">
        <i />
        <i />
        <i />
      </div>
      <span className="pv-window-name">{previewNames[type]}</span>
      <span className="pv-concept-label">CONCEPT INTERFACE</span>
    </div>
  );
}

function ScamShield() {
  return (
    <div className="pv-content pv-scamshield">
      <aside className="pv-sidebar pv-shield-sidebar">
        <div className="pv-product-logo">
          <ShieldCheck size={20} />
          <span>
            scamshield<span className="pv-logo-ai">ai</span>
          </span>
        </div>
        <div className="pv-sidebar-kicker">WORKSPACE</div>
        <div className="pv-side-item">
          <LayoutGrid />
          Overview
        </div>
        <div className="pv-side-item pv-side-active">
          <ScanLine />
          Message scanner
        </div>
        <div className="pv-side-item">
          <MessageSquareText />
          Activity
        </div>
        <div className="pv-sidebar-bottom">
          <Settings2 />
          Settings <span className="pv-avatar">PS</span>
        </div>
      </aside>
      <div className="pv-shield-main">
        <div className="pv-main-top">
          <span>
            Message scanner <ChevronRight size={10} /> New analysis
          </span>
          <Bell size={12} />
        </div>
        <div className="pv-shield-title">
          <div>
            <span className="pv-overline">
              A LITTLE CLARITY. A LOT MORE CONFIDENCE.
            </span>
            <h3>Think before you click.</h3>
            <p>Make sense of the messages that feel a little off.</p>
          </div>
          <div className="pv-shield-emblem">
            <ShieldCheck />
          </div>
        </div>
        <div className="pv-scan-area">
          <div className="pv-card-label">
            <MessageSquareText size={12} /> Message to analyze{" "}
            <span>EXAMPLE</span>
          </div>
          <div className="pv-message-text">
            “Your account has been suspended. Verify your details now to restore
            access.”
          </div>
          <div className="pv-scan-action">
            <ScanLine size={12} /> Analyze message <ArrowRight size={12} />
          </div>
        </div>
        <div className="pv-result-card">
          <div className="pv-result-icon">
            <ShieldCheck size={18} />
          </div>
          <div>
            <strong>Pause. This deserves a closer look.</strong>
            <p>
              Look out for pressure, urgency, and requests for personal details.
            </p>
          </div>
          <ArrowUpRight size={15} />
        </div>
        <div className="pv-detection-tags">
          <span>
            <i /> Urgency cues
          </span>
          <span>
            <i /> Account verification
          </span>
          <span>
            <i /> Unverified sender
          </span>
        </div>
        <div className="pv-shield-foot">
          <ShieldCheck size={10} /> Awareness is your first line of defense.
        </div>
      </div>
    </div>
  );
}

function CivicVision() {
  const mapPatternId = useId().replaceAll(":", "");
  return (
    <div className="pv-content pv-civicvision">
      <div className="pv-civic-top">
        <div className="pv-product-logo">
          <div className="pv-civic-logomark">
            <MapPin size={17} />
          </div>
          <span>
            civicvision<span className="pv-logo-period">.</span>
          </span>
        </div>
        <div className="pv-civic-tabs">
          <span className="pv-civic-tab-active">Explore</span>
          <span>My reports</span>
        </div>
        <span className="pv-civic-report">
          <Plus size={11} />
          Report an issue
        </span>
        <span className="pv-avatar">PS</span>
      </div>
      <div className="pv-civic-body">
        <aside className="pv-civic-feed">
          <span className="pv-overline">SMALL ACTIONS. BETTER CITIES.</span>
          <h3>
            Your neighborhood,
            <br />
            in focus.
          </h3>
          <p>See something? Help make it better.</p>
          <div className="pv-civic-search">
            <Search size={11} />
            <span>Search your neighborhood</span>
          </div>
          <div className="pv-feed-label">
            Around you <span>ILLUSTRATIVE</span>
          </div>
          <div className="pv-issue">
            <div className="pv-issue-image pv-issue-road">
              <i />
              <i />
              <i />
            </div>
            <div>
              <strong>Road needs a little care</strong>
              <p>Roads & infrastructure</p>
              <span className="pv-issue-status">
                <i /> Open report
              </span>
            </div>
            <ArrowUpRight size={12} />
          </div>
          <div className="pv-issue">
            <div className="pv-issue-image pv-issue-lamp">
              <i />
              <i />
            </div>
            <div>
              <strong>A brighter way home</strong>
              <p>Streetlights & safety</p>
              <span className="pv-issue-status pv-issue-progress">
                <i /> In progress
              </span>
            </div>
            <ArrowUpRight size={12} />
          </div>
          <div className="pv-civic-note">
            <MapPin size={12} /> A better city starts on your street.
          </div>
        </aside>
        <div className="pv-map">
          <svg
            className="pv-map-art"
            viewBox="0 0 500 430"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern
                id={mapPatternId}
                width="112"
                height="86"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(-17 250 215)"
              >
                <rect width="112" height="86" fill="#e8e7dc" />
                <rect
                  x="7"
                  y="7"
                  width="96"
                  height="70"
                  rx="5"
                  fill="#deded0"
                />
                <path
                  d="M0 0H112M0 0V86"
                  fill="none"
                  stroke="#faf9f2"
                  strokeWidth="9"
                />
              </pattern>
            </defs>
            <rect width="500" height="430" fill={`url(#${mapPatternId})`} />
            <path
              d="M420 -30C330 70 470 130 373 222S391 360 296 460"
              fill="none"
              stroke="#bbd1d0"
              strokeWidth="40"
            />
            <path
              d="M410 -30C330 70 470 130 373 222S391 360 296 460"
              fill="none"
              stroke="#cedfdd"
              strokeWidth="26"
            />
            <path
              d="M-20 300L510 139M81 -20L210 460"
              fill="none"
              stroke="#c8c5b4"
              strokeWidth="22"
            />
            <path
              d="M-20 300L510 139M81 -20L210 460"
              fill="none"
              stroke="#fffdf2"
              strokeWidth="16"
            />
            <path
              d="M-20 300L510 139M81 -20L210 460"
              fill="none"
              stroke="#e4d6a9"
              strokeWidth="2"
            />
            <rect
              x="230"
              y="62"
              width="65"
              height="78"
              rx="14"
              fill="#bed1ad"
              transform="rotate(-17 262 101)"
            />
            <rect
              x="12"
              y="332"
              width="99"
              height="67"
              rx="18"
              fill="#c6d5b5"
              transform="rotate(-17 62 365)"
            />
            <text
              x="248"
              y="105"
              fill="#75836a"
              fontSize="10"
              fontFamily="sans-serif"
              transform="rotate(-17 248 105)"
            >
              GREEN PARK
            </text>
            <text
              x="78"
              y="171"
              fill="#989886"
              fontSize="11"
              fontFamily="sans-serif"
              letterSpacing="2"
              transform="rotate(-17 78 171)"
            >
              NEIGHBORHOOD
            </text>
          </svg>
          <div className="pv-map-label">
            <span className="pv-map-live" />
            Community map
          </div>
          <div className="pv-map-pin pv-pin-one">
            <MapPin size={18} fill="currentColor" />
          </div>
          <div className="pv-map-pin pv-pin-two">
            <MapPin size={17} fill="currentColor" />
          </div>
          <div className="pv-map-pin pv-pin-three">
            <MapPin size={17} fill="currentColor" />
          </div>
          <div className="pv-map-popover">
            <span className="pv-popover-icon">
              <MapPin size={14} />
            </span>
            <div>
              <strong>Make a difference here.</strong>
              <span>One report. A step forward.</span>
            </div>
            <ChevronRight size={12} />
          </div>
          <div className="pv-map-controls">
            <Plus size={13} />
            <span>−</span>
            <Crosshair size={13} />
          </div>
          <div className="pv-map-layer">
            <Layers size={13} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StepWise() {
  return (
    <div className="pv-content pv-stepwise">
      <aside className="pv-step-sidebar">
        <div className="pv-product-logo">
          <GitBranch size={20} />
          <span>
            stepwise<span className="pv-logo-period">.</span>
          </span>
        </div>
        <div className="pv-step-new">
          <Plus size={12} />
          New workspace
        </div>
        <div className="pv-sidebar-kicker">YOUR WORKSPACE</div>
        <div className="pv-side-item pv-side-active">
          <Workflow />
          Getting started
        </div>
        <div className="pv-side-item">
          <FileText />
          My instructions
        </div>
        <div className="pv-step-tip">
          <Sparkles size={16} />
          <strong>
            Big ideas.
            <br />
            Clear next steps.
          </strong>
          <p>Turn complexity into a path anyone can follow.</p>
        </div>
        <div className="pv-sidebar-bottom">
          <span className="pv-avatar">PS</span>Your workspace
        </div>
      </aside>
      <div className="pv-step-main">
        <div className="pv-main-top">
          <span>
            Workspace <ChevronRight size={10} /> Getting started
          </span>
          <span className="pv-step-view">
            <Workflow size={11} />
            Flow view
          </span>
        </div>
        <div className="pv-step-heading">
          <span className="pv-overline">FROM “HOW?” TO “HERE’S HOW.”</span>
          <h3>A clearer way forward.</h3>
          <p>Your ideas, one achievable step at a time.</p>
        </div>
        <div className="pv-step-prompt">
          <Sparkles size={15} />
          <span>Help me turn an idea into a plan</span>
          <span className="pv-prompt-submit">
            <ArrowRight size={13} />
          </span>
        </div>
        <div className="pv-flow-canvas">
          <svg
            className="pv-flow-lines"
            viewBox="0 0 400 230"
            preserveAspectRatio="none"
          >
            <path
              d="M200 40V75M200 112V137Q200 145 191 145H99Q90 145 90 155V173M200 145H303Q313 145 313 155V173"
              fill="none"
              stroke="#a8c1d8"
              strokeWidth="1.7"
            />
            <circle cx="200" cy="145" r="3" fill="#5394bd" />
          </svg>
          <div className="pv-flow-node pv-node-start">
            <span>
              <Sparkles size={11} />
            </span>
            Start with your idea
          </div>
          <div className="pv-flow-node pv-node-middle">
            <span>
              <FileText size={11} />
            </span>
            Break it into clear steps
            <span className="pv-node-check">
              <Check size={11} />
            </span>
          </div>
          <div className="pv-flow-node pv-node-left">
            <span>
              <CircleCheck size={11} />
            </span>
            Make it actionable
          </div>
          <div className="pv-flow-node pv-node-right">
            <span>
              <Workflow size={11} />
            </span>
            See the bigger picture
          </div>
          <div className="pv-flow-cursor">
            <MousePointer2 size={14} fill="currentColor" />
            <span>You</span>
          </div>
          <div className="pv-canvas-badge">
            <Check size={10} />
            Simple. Accessible. Yours.
          </div>
        </div>
      </div>
    </div>
  );
}

function CompactFrame({ children }) {
  const frameRef = useRef(null);
  const canvasRef = useRef(null);
  useLayoutEffect(() => {
    const frame = frameRef.current;
    const resize = () => {
      canvasRef.current.style.transform = `scale(${frame.clientWidth / 800}, ${frame.clientHeight / 420})`;
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="pv-compact-frame" ref={frameRef} aria-hidden="true">
      <div className="pv-compact-canvas" ref={canvasRef}>
        {children}
      </div>
    </div>
  );
}

export default function ProjectVisual({
  type = "scamshield",
  compact = false,
}) {
  const visual = (
    <div
      className={`pv-window pv-window-${type}${compact ? " pv-compact" : ""}`}
      aria-hidden="true"
    >
      <WindowBar type={type} />
      {type === "civicvision" ? (
        <CivicVision />
      ) : type === "stepwise" ? (
        <StepWise />
      ) : (
        <ScamShield />
      )}
    </div>
  );
  return compact ? <CompactFrame>{visual}</CompactFrame> : visual;
}
