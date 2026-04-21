const state = {
  leadName: "Seminar Lead",
  temperature: "warm",
  daysSinceMeeting: 3,
  paperworkSent: true,
  signed: false,
  friction: "unclear"
};

const elements = {
  leadName: document.querySelector("#leadName"),
  daysSinceMeeting: document.querySelector("#daysSinceMeeting"),
  paperworkSent: document.querySelector("#paperworkSent"),
  signed: document.querySelector("#signed"),
  friction: document.querySelector("#friction"),
  temperatureButtons: [...document.querySelectorAll("[data-temp]")],
  coachingLabel: document.querySelector("#coachingLabel"),
  coachingFrame: document.querySelector("#coachingFrame"),
  momentumStat: document.querySelector("#momentumStat"),
  riskStat: document.querySelector("#riskStat"),
  phaseStat: document.querySelector("#phaseStat"),
  channelStat: document.querySelector("#channelStat"),
  nextAction: document.querySelector("#nextAction"),
  advisorPrompt: document.querySelector("#advisorPrompt"),
  frictionCue: document.querySelector("#frictionCue"),
  frictionPlay: document.querySelector("#frictionPlay"),
  timeline: document.querySelector("#timeline"),
  templateSubject: document.querySelector("#templateSubject"),
  templateEmail: document.querySelector("#templateEmail"),
  templateText: document.querySelector("#templateText"),
  templateCall: document.querySelector("#templateCall"),
  copySubject: document.querySelector("#copySubject"),
  copyEmail: document.querySelector("#copyEmail"),
  copyText: document.querySelector("#copyText"),
  crmBoard: document.querySelector("#crmBoard"),
  kpis: document.querySelector("#kpis")
};

const getRecommendedPhase = () => {
  if (state.signed) return FOLLOW_UP_PHASES[4];
  if (!state.paperworkSent) return FOLLOW_UP_PHASES[0];
  if (state.daysSinceMeeting <= 1) return FOLLOW_UP_PHASES[0];
  if (state.daysSinceMeeting <= 3) return FOLLOW_UP_PHASES[1];
  if (state.daysSinceMeeting <= 7) {
    return state.temperature === "hot" ? FOLLOW_UP_PHASES[2] : FOLLOW_UP_PHASES[3];
  }
  if (state.daysSinceMeeting <= 10) return FOLLOW_UP_PHASES[4];
  return FOLLOW_UP_PHASES[5];
};

const getNextActionText = (phase, segment, friction) => {
  if (state.signed) {
    return "Move this lead into onboarding and schedule a post-signature reassurance touchpoint.";
  }

  const paperworkLine = state.paperworkSent
    ? "Paperwork is already out, so coach toward clarity instead of more explanation."
    : "Get paperwork out immediately after the meeting so momentum is not lost.";

  return `${paperworkLine} ${segment.coachFrame} Focus on ${phase.name.toLowerCase()} using the ${friction.label.toLowerCase()} cue.`;
};

const renderTemperatureButtons = () => {
  elements.temperatureButtons.forEach((button) => {
    const active = button.dataset.temp === state.temperature;
    button.className = active
      ? "rounded-full bg-pine px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-white"
      : "rounded-full border border-summit/10 bg-white px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-slate transition hover:border-pine/40 hover:text-pine";
  });
};

const renderTimeline = (currentPhaseId) => {
  elements.timeline.innerHTML = FOLLOW_UP_PHASES.map((phase) => {
    const isActive = phase.id === currentPhaseId;
    return `
      <article class="${isActive ? "border-pine/25 bg-pine/[0.06]" : "border-summit/8 bg-white/75"} rounded-[1.5rem] border p-5 transition">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-xs font-black uppercase tracking-[0.16em] ${isActive ? "text-pine" : "text-slate"}">${phase.window}</p>
            <h3 class="mt-2 font-display text-2xl font-bold text-summit">${phase.name}</h3>
          </div>
          <span class="${isActive ? "bg-pine text-white" : "bg-glacier text-pine"} rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em]">${isActive ? "Recommended now" : "Use when due"}</span>
        </div>
        <p class="mt-3 text-sm leading-7 text-slate">${phase.objective}</p>
        <div class="mt-4 grid gap-3 sm:grid-cols-2">
          <div class="rounded-2xl bg-parchment/90 p-4">
            <p class="text-[11px] font-black uppercase tracking-[0.14em] text-slate">Primary channel</p>
            <p class="mt-2 text-sm font-semibold text-summit">${phase.primaryChannel}</p>
          </div>
          <div class="rounded-2xl bg-parchment/90 p-4">
            <p class="text-[11px] font-black uppercase tracking-[0.14em] text-slate">Fallback channel</p>
            <p class="mt-2 text-sm font-semibold text-summit">${phase.fallbackChannel}</p>
          </div>
        </div>
        <ul class="mt-4 space-y-2 text-sm leading-7 text-slate">
          ${phase.advisorRules.map((rule) => `<li class="flex gap-3"><span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-trail"></span><span>${rule}</span></li>`).join("")}
        </ul>
      </article>
    `;
  }).join("");
};

const renderTemplates = (phaseId, name) => {
  const phaseTemplate = TEMPLATES[phaseId];
  elements.templateSubject.textContent = phaseTemplate.emailSubject;
  elements.templateEmail.textContent = phaseTemplate.emailBody.replaceAll("[specific outcome tied to their goal]", `${name}'s stated planning outcome`);
  elements.templateText.textContent = phaseTemplate.textBody;
  elements.templateCall.textContent = phaseTemplate.callPrompt;
};

const renderCRMBoard = () => {
  const cards = [
    {
      stage: "Meeting completed",
      status: "complete",
      note: "Advisor completed seminar follow-up meeting."
    },
    {
      stage: "Paperwork sent",
      status: state.paperworkSent ? "complete" : "pending",
      note: state.paperworkSent ? "Paperwork is out and ready for action." : "Send paperwork immediately after the meeting."
    },
    {
      stage: "Active follow-up phase",
      status: "active",
      note: `${getRecommendedPhase().name} is the recommended coaching motion right now.`
    },
    {
      stage: "Decision outcome",
      status: state.signed ? "complete" : "pending",
      note: state.signed ? "Signed and ready for implementation." : "Guide to yes, not now, or nurture with clean language."
    },
    {
      stage: "Nurture track",
      status: state.daysSinceMeeting > 10 && !state.signed ? "active" : "pending",
      note: state.daysSinceMeeting > 10 && !state.signed ? "Protect the relationship with low-pressure value touches." : "Use only if the lead does not move after decision clarity."
    }
  ];

  elements.crmBoard.innerHTML = cards.map((card) => `
    <article class="rounded-[1.4rem] border ${card.status === "complete" ? "border-pine/20 bg-pine/[0.07]" : card.status === "active" ? "border-trail/35 bg-trail/[0.08]" : "border-summit/8 bg-white/80"} p-5">
      <div class="flex items-center justify-between gap-4">
        <h3 class="text-sm font-black uppercase tracking-[0.14em] text-summit">${card.stage}</h3>
        <span class="${card.status === "complete" ? "bg-pine text-white" : card.status === "active" ? "bg-trail text-summit" : "bg-glacier text-slate"} rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em]">${card.status}</span>
      </div>
      <p class="mt-3 text-sm leading-7 text-slate">${card.note}</p>
    </article>
  `).join("");
};

const renderKPIs = () => {
  elements.kpis.innerHTML = KPI_CARDS.map((card) => `
    <article class="rounded-[1.4rem] border border-summit/8 bg-white/82 p-5">
      <p class="text-xs font-black uppercase tracking-[0.16em] text-pine">${card.label}</p>
      <p class="mt-3 text-sm leading-7 text-slate">${card.detail}</p>
    </article>
  `).join("");
};

const render = () => {
  const phase = getRecommendedPhase();
  const segment = LEAD_SEGMENTS[state.temperature];
  const friction = FRICTION_MAP[state.friction];
  const name = state.leadName.trim() || "Seminar lead";

  elements.coachingLabel.textContent = `${segment.label} lead coaching mode`;
  elements.coachingFrame.textContent = segment.coachFrame;
  elements.momentumStat.textContent = segment.momentum;
  elements.riskStat.textContent = segment.defaultRisk;
  elements.phaseStat.textContent = `${phase.window} · ${phase.name}`;
  elements.channelStat.textContent = phase.primaryChannel;
  elements.nextAction.textContent = getNextActionText(phase, segment, friction);
  elements.advisorPrompt.textContent = segment.tactics.join(" ");
  elements.frictionCue.textContent = friction.cue;
  elements.frictionPlay.textContent = friction.play;

  renderTemperatureButtons();
  renderTimeline(phase.id);
  renderTemplates(phase.id, name);
  renderCRMBoard();
  renderKPIs();
};

const copyText = async (value, button) => {
  try {
    await navigator.clipboard.writeText(value);
    const original = button.textContent;
    button.textContent = "Copied";
    setTimeout(() => {
      button.textContent = original;
    }, 1200);
  } catch {
    button.textContent = "Copy failed";
  }
};

elements.leadName.addEventListener("input", (event) => {
  state.leadName = event.target.value;
  render();
});

elements.daysSinceMeeting.addEventListener("input", (event) => {
  state.daysSinceMeeting = Number(event.target.value || 0);
  render();
});

elements.paperworkSent.addEventListener("change", (event) => {
  state.paperworkSent = event.target.checked;
  render();
});

elements.signed.addEventListener("change", (event) => {
  state.signed = event.target.checked;
  render();
});

elements.friction.addEventListener("change", (event) => {
  state.friction = event.target.value;
  render();
});

elements.temperatureButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.temperature = button.dataset.temp;
    render();
  });
});

elements.copySubject.addEventListener("click", () => copyText(elements.templateSubject.textContent, elements.copySubject));
elements.copyEmail.addEventListener("click", () => copyText(elements.templateEmail.textContent, elements.copyEmail));
elements.copyText.addEventListener("click", () => copyText(elements.templateText.textContent, elements.copyText));

render();
