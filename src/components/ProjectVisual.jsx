import { useLayoutEffect, useRef } from "react";
import {
  ShieldCheck,
  LayoutGrid,
  MessageSquareText,
  ScanLine,
  Settings2,
  ArrowUpRight,
  Bell,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import "./ProjectVisual.css";

const previewNames = {
  scamshield: "ScamShield AI",
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
      <ScamShield />
    </div>
  );
  return compact ? <CompactFrame>{visual}</CompactFrame> : visual;
}
