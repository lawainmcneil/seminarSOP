const state = {
  workflowMode: "seminar",
  leadName: "Seminar Lead",
  temperature: "warm",
  daysSinceMeeting: 3,
  milestone1: false,
  milestone2: false,
  friction: "unclear"
};

const elements = {
  workflowMode: document.querySelector("#workflowMode"),
  workflowDescription: document.querySelector("#workflowDescription"),
  daysLabel: document.querySelector("#daysLabel"),
  milestone1: document.querySelector("#milestone1"),
  milestone2: document.querySelector("#milestone2"),
  milestone1Label: document.querySelector("#milestone1Label"),
  milestone1Help: document.querySelector("#milestone1Help"),
  milestone2Label: document.querySelector("#milestone2Label"),
  milestone2Help: document.querySelector("#milestone2Help"),
  leadName: document.querySelector("#leadName"),
  daysSinceMeeting: document.querySelector("#daysSinceMeeting"),
  friction: document.querySelector("#friction"),
  temperatureButtons: [...document.querySelectorAll("[data-temp]")],
  heroOutcomeTitle: document.querySelector("#heroOutcomeTitle"),
  heroOutcomeCopy: document.querySelector("#heroOutcomeCopy"),
  coachTopLabel: document.querySelector("#coachTopLabel"),
  coachingLabel: document.querySelector("#coachingLabel"),
  coachingFrame: document.querySelector("#coachingFrame"),
  momentumStat: document.querySelector("#momentumStat"),
  riskStat: document.querySelector("#riskStat"),
  phaseStat: document.querySelector("#phaseStat"),
  channelLabel: document.querySelector("#channelLabel"),
  channelStat: document.querySelector("#channelStat"),
  nextActionLabel: document.querySelector("#nextActionLabel"),
  nextAction: document.querySelector("#nextAction"),
  advisorPromptLabel: document.querySelector("#advisorPromptLabel"),
  advisorPrompt: document.querySelector("#advisorPrompt"),
  frictionCue: document.querySelector("#frictionCue"),
  frictionPlayLabel: document.querySelector("#frictionPlayLabel"),
  frictionPlay: document.querySelector("#frictionPlay"),
  playbookHeading: document.querySelector("#playbookHeading"),
  playbookCopy: document.querySelector("#playbookCopy"),
  timeline: document.querySelector("#timeline"),
  templateSubject: document.querySelector("#templateSubject"),
  templateEmail: document.querySelector("#templateEmail"),
  templateText: document.querySelector("#templateText"),
  templateCall: document.querySelector("#templateCall"),
  copySubject: document.querySelector("#copySubject"),
  copyEmail: document.querySelector("#copyEmail"),
  copyText: document.querySelector("#copyText"),
  crmHeading: document.querySelector("#crmHeading"),
  crmBoard: document.querySelector("#crmBoard"),
  kpiHeading: document.querySelector("#kpiHeading"),
  kpis: document.querySelector("#kpis")
};

const getMode = () => WORKFLOW_MODES[state.workflowMode];

const getSegmentView = () => {
  const segment = LEAD_SEGMENTS[state.temperature];
  if (state.workflowMode === "seminar") {
    return {
      label: segment.label,
      coachFrame: segment.seminarCoachFrame,
      momentum: segment.seminarMomentum,
      defaultRisk: segment.seminarRisk,
      tactics: segment.seminarTactics
    };
  }

  return {
    label: segment.label,
    coachFrame: segment.consultationCoachFrame,
    momentum: segment.consultationMomentum,
    defaultRisk: segment.consultationRisk,
    tactics: segment.consultationTactics
  };
};

const getRecommendedPhase = () => {
  if (state.workflowMode === "seminar") {
    if (state.milestone2) return FOLLOW_UP_PHASES[4];
    if (state.milestone1 && state.daysSinceMeeting <= 2) return FOLLOW_UP_PHASES[0];
    if (state.daysSinceMeeting <= 1) return FOLLOW_UP_PHASES[0];
    if (state.daysSinceMeeting <= 5) return FOLLOW_UP_PHASES[1];
    if (state.daysSinceMeeting <= 7) return FOLLOW_UP_PHASES[2];
    if (state.daysSinceMeeting <= 10) return FOLLOW_UP_PHASES[3];
    if (state.daysSinceMeeting <= 14) return FOLLOW_UP_PHASES[4];
    return FOLLOW_UP_PHASES[5];
  }

  if (state.milestone2) return FOLLOW_UP_PHASES[4];
  if (!state.milestone1) {
    if (state.daysSinceMeeting <= 1) return FOLLOW_UP_PHASES[0];
    if (state.daysSinceMeeting <= 3) return FOLLOW_UP_PHASES[1];
    if (state.daysSinceMeeting <= 7) return FOLLOW_UP_PHASES[3];
    if (state.daysSinceMeeting <= 10) return FOLLOW_UP_PHASES[4];
    return FOLLOW_UP_PHASES[5];
  }

  if (state.daysSinceMeeting <= 1) return FOLLOW_UP_PHASES[0];
  if (state.daysSinceMeeting <= 3) return FOLLOW_UP_PHASES[1];
  if (state.daysSinceMeeting <= 7) {
    return state.temperature === "hot" ? FOLLOW_UP_PHASES[2] : FOLLOW_UP_PHASES[3];
  }
  if (state.daysSinceMeeting <= 10) return FOLLOW_UP_PHASES[4];
  return FOLLOW_UP_PHASES[5];
};

const getPhaseDrivenPrefix = (phase) => {
  if (state.workflowMode === "seminar") {
    const seminarPrefixes = {
      "phase-1": "Within the first day, the goal is to tie the seminar back to their personal concern and create immediate relevance.",
      "phase-2": "By this point, the goal is to surface what is actually preventing the booking instead of assuming they just need another reminder.",
      "phase-3": "At this stage, the outreach should teach one risk clearly enough to make the need feel personal.",
      "phase-4": "Now the job is to make the first meeting feel smaller, easier, and less emotionally heavy.",
      "phase-5": "At this point, the best move is a clean booking decision instead of more vague back-and-forth.",
      "phase-6": "This lead has aged into nurture, so the tone should shift from pursuit to long-term relevance."
    };

    return seminarPrefixes[phase.id];
  }

  const consultationPrefixes = {
    "phase-1": "Right after the consultation, the job is to preserve momentum while the recommendation still feels fresh.",
    "phase-2": "A few days in, the best move is to identify the real hesitation instead of sending another generic follow-up.",
    "phase-3": "This is the point to reframe risk and remind them that staying put is also a decision.",
    "phase-4": "Now the focus should be reducing the emotional weight of implementation and making the next step feel smaller.",
    "phase-5": "At this stage, the outreach should create decision clarity instead of continuing open-ended follow-up.",
    "phase-6": "This lead has moved beyond active pursuit and should be handled with a low-pressure nurture posture."
  };

  return consultationPrefixes[phase.id];
};

const getPrimaryChannel = (phase) => {
  if (state.workflowMode === "seminar") {
    if (phase.id === "phase-1") {
      if (state.temperature === "hot") return "Call first";
      if (state.temperature === "warm") return "Personalized email";
      return "Light-touch email";
    }

    if (phase.id === "phase-2") {
      return state.temperature === "cold" ? "Short email" : "Call";
    }
  }

  if (state.workflowMode === "consultation" && phase.id === "phase-1" && !state.milestone1) {
    return "Same-day paperwork email";
  }

  return phase.primaryChannel;
};

const getFallbackChannel = (phase) => {
  if (state.workflowMode === "seminar" && phase.id === "phase-1") {
    return state.temperature === "hot" ? "Email recap" : "Call";
  }

  return phase.fallbackChannel;
};

const getPhaseObjective = (phase) => {
  if (state.workflowMode === "seminar") {
    const seminarObjectives = {
      "phase-1": "Personalize the seminar topic and invite the first consultation.",
      "phase-2": "Find the real reason the lead has not booked yet.",
      "phase-3": "Use one planning risk to make the issue personal and relevant.",
      "phase-4": "Make the consultation feel smaller, easier, and less emotionally heavy.",
      "phase-5": "Ask for a clean booking decision, deferment, or nurture path.",
      "phase-6": "Stay relevant without pressure until the timing becomes real."
    };

    return seminarObjectives[phase.id] || phase.objective;
  }

  return phase.objective;
};

const getPhaseRules = (phase) => {
  if (state.workflowMode === "seminar") {
    const seminarRules = {
      "phase-1": [
        "Lead with the attendee's concern, not a summary of the seminar.",
        "Hot leads get call-first outreach while interest is still fresh.",
        "The goal is a booked consultation, not a vague check-in."
      ],
      "phase-2": [
        "Ask what stood out most or what still feels unsettled.",
        "Translate topic curiosity into personal relevance.",
        "Use the call to move toward the calendar."
      ],
      "phase-3": [
        "Teach one risk topic well instead of several topics badly.",
        "Make the issue feel personal, not generic.",
        "End with an invitation to talk through their situation."
      ],
      "phase-4": [
        "Position the consultation as a first pass, not a giant commitment.",
        "Lower emotional weight before you ask for action again.",
        "Use one-step-at-a-time language."
      ],
      "phase-5": [
        "Ask whether they want to schedule or revisit later.",
        "Make deferment emotionally safe.",
        "A clean no-for-now is better than passive drift."
      ],
      "phase-6": [
        "Use newsletters, invitations, and occasional relevance touches.",
        "Do not restart the pitch from zero.",
        "Stay present without pressure."
      ]
    };

    return seminarRules[phase.id] || phase.advisorRules;
  }

  return phase.advisorRules;
};

const getNextActionText = (phase, segment, friction) => {
  if (state.workflowMode === "seminar") {
    if (state.milestone2) {
      return "Confirm the appointment, send a short agenda, and keep the pre-meeting tone calm and specific to their stated concern.";
    }

    const milestoneLine = state.milestone1
      ? "They have already shown consultation interest, so the move now is to convert interest into a scheduled time."
      : "They have not clearly requested a consultation yet, so the move now is to make the problem personal and the next step easy.";

    const temperatureActions = {
      hot: {
        unclear: "Call first and reference the exact concern they raised, then invite a short meeting to map that issue out together.",
        timing: "Offer a shorter first meeting and two clear scheduling options so the decision feels easy.",
        spouse: "Invite both decision-makers into the first meeting so the concern does not stay secondhand.",
        paperwork: "Remove booking friction by sending a direct calendar link and naming the single outcome of the meeting.",
        risk: "Frame the consultation as a no-pressure clarity conversation rather than a commitment to act immediately.",
        silent: "Send one direct note that asks whether they want to schedule now or would prefer to revisit later."
      },
      warm: {
        unclear: "Use a personalized email that reflects the topic they selected, then ask what still feels unsettled enough to deserve a short conversation.",
        timing: "Make the ask smaller by positioning the meeting as a first pass rather than a full planning process.",
        spouse: "Acknowledge that partner alignment matters and suggest including them in the first conversation.",
        paperwork: "Keep logistics simple with a short booking note, one link, and a specific reason to meet.",
        risk: "Use one planning risk to make the issue personal, then invite the calendar step as a low-pressure next move.",
        silent: "Do one calm follow-up that offers either a short conversation or a clean later revisit."
      },
      cold: {
        unclear: "Send one light-touch email that makes the issue specific, then let them choose whether to engage later.",
        timing: "Assume the priority is low and offer an easy later revisit instead of pressing now.",
        spouse: "Invite them back when both people are ready to look at it together.",
        paperwork: "Keep the ask minimal and remove unnecessary steps so logistics do not become the excuse.",
        risk: "Use one educational point to create relevance, then stop pushing for immediate movement.",
        silent: "Send a clean decision-clarity note and move them to nurture if they do not respond."
      }
    };

    const phaseLine = getPhaseDrivenPrefix(phase);
    const phaseSpecificActions = {
      "phase-1": {
        hot: "Call first, mention the exact issue they raised, and offer two specific meeting windows.",
        warm: "Send a personalized email tied to the topic they selected, then invite a short follow-up conversation.",
        cold: "Use a light-touch email that makes the issue feel personal without pressing for immediate commitment."
      },
      "phase-2": {
        hot: "Call and ask what still feels unsettled, then move directly toward the calendar once that point is clear.",
        warm: "Use a calm question to surface hesitation, then simplify the invitation down to one focused conversation.",
        cold: "Ask one clean clarity question and avoid layering on more pressure."
      },
      "phase-3": {
        hot: "Send one sharp value note that makes the planning risk personal, then invite the meeting while urgency is still grounded in relevance.",
        warm: "Use one educational risk example and connect it back to their stated concern before asking for the appointment.",
        cold: "Offer one useful insight that creates relevance and let that do the work instead of over-following up."
      },
      "phase-4": {
        hot: "Make the booking feel easy with a short agenda, a clear outcome, and a smaller first step.",
        warm: "Reduce the emotional weight of the meeting by positioning it as a first pass, not a giant planning commitment.",
        cold: "Offer a low-pressure next conversation or a later revisit, whichever preserves trust better."
      },
      "phase-5": {
        hot: "Ask directly whether they want to get the consultation on the calendar now.",
        warm: "Give them a clean choice between scheduling and revisiting later so drift does not keep growing.",
        cold: "Use a respectful decision-clarity note and then route them to nurture if they stay inactive."
      },
      "phase-6": {
        hot: "Keep the relationship warm with one useful touchpoint and a clean path back to the calendar.",
        warm: "Move from active pursuit to periodic relevance touches that preserve trust.",
        cold: "Stop chasing and let nurture do the work through education and future invitations."
      }
    };

    const frictionAction = temperatureActions[state.temperature]?.[state.friction] || "Move the attendee toward a clear booking decision or a clean nurture path.";
    const phaseAction = phaseSpecificActions[phase.id]?.[state.temperature] || "Use the phase objective to guide the next outreach.";
    return `${phaseLine} ${milestoneLine} ${phaseAction} ${frictionAction}`;
  }

  if (state.milestone2) {
    return "Move this lead into onboarding and schedule a post-signature reassurance touchpoint.";
  }

  const paperworkLine = state.milestone1
    ? "Paperwork is already out, so the move now is coaching toward a clean decision instead of re-explaining the whole plan."
    : "Get the paperwork out immediately after the consultation so momentum is not lost before hesitation hardens.";

  const temperatureActions = {
    hot: {
      unclear: "Send a short Phase 2 note that asks what one piece still feels unsettled, then answer only that point.",
      timing: "Offer a smaller first step now and give them a simple way to say yes without treating this like one huge decision.",
      spouse: "Propose a brief spouse-alignment call focused on their shared goal and the one decision that still needs agreement.",
      paperwork: "Tell them exactly what to sign, what happens next, and how little time the final step should take.",
      risk: "Reassure them that moving forward is adjustable and that the bigger risk is leaving the current problem untouched.",
      silent: "Send one direct clarity message asking whether they feel ready to proceed or prefer to revisit later."
    },
    warm: {
      unclear: "Use Phase 2 language to surface the specific confusion, then simplify the recommendation back to the client’s original goal.",
      timing: "Reduce commitment friction by offering phased implementation or one account first instead of a full immediate move.",
      spouse: "Pause the chase and invite the other decision-maker into a calm review so hesitation does not stay hidden.",
      paperwork: "Walk them through the paperwork sequence in plain language and remove any uncertainty about process or effort.",
      risk: "Use Phase 3 framing to contrast the risks of staying put with the flexibility of making an adjustable first move.",
      silent: "Do one calm check-in built around clarity, not pursuit, and prepare to route them to a clean later decision if they stay quiet."
    },
    cold: {
      unclear: "Do not over-pursue. Send one simple note asking whether anything still feels unclear before you either close the loop or nurture.",
      timing: "Assume this is not urgent for them and offer a lower-commitment revisit later instead of pressing for action now.",
      spouse: "Acknowledge that partner alignment may need more time and invite them back when both people are ready to review together.",
      paperwork: "Remove the sense of burden by making the next step feel optional, contained, and easy to restart later.",
      risk: "Use a calm risk reframe once, then stop selling and let them choose between later review and nurture.",
      silent: "Send a clean decision-clarity note instead of another casual follow-up, then move them to nurture if there is still no response."
    }
  };

  const phaseLine = getPhaseDrivenPrefix(phase);
  const phaseSpecificActions = {
    "phase-1": {
      hot: "Send the same-day follow-up and make the next step feel immediate, simple, and expected.",
      warm: "Re-anchor the recommendation to the client's original goal before extra hesitation shows up.",
      cold: "Keep the first touch short and calm so the conversation does not immediately feel heavy."
    },
    "phase-2": {
      hot: "Use a short note or call to isolate the one open loop instead of repeating the whole recommendation.",
      warm: "Surface the actual hesitation and respond only to that point.",
      cold: "Use one clean question that invites clarity without sounding needy."
    },
    "phase-3": {
      hot: "Reframe the risk of staying put while keeping the tone grounded and confident.",
      warm: "Use one example of inaction risk to help the client feel why movement matters now.",
      cold: "Offer one calm reminder about the cost of delay, then avoid over-chasing."
    },
    "phase-4": {
      hot: "Shrink the next step and make implementation feel easier than they are imagining.",
      warm: "Offer staged execution or one account first so the path feels less heavy.",
      cold: "Reduce complexity and make the next step feel optional enough to re-engage them."
    },
    "phase-5": {
      hot: "Ask for a clean proceed-or-pause decision instead of keeping the loop open.",
      warm: "Create a simple yes, later, or nurture choice so the lead does not stay in limbo.",
      cold: "Use a respectful decision-clarity note and then release pressure."
    },
    "phase-6": {
      hot: "Move the relationship into occasional reassurance and value touches until timing firms up again.",
      warm: "Use nurture to preserve the relationship without dragging the active sale forward.",
      cold: "Stop active pursuit and shift to long-term relevance."
    }
  };

  const frictionAction = temperatureActions[state.temperature]?.[state.friction] || "Guide the lead to a clear next decision.";
  const phaseAction = phaseSpecificActions[phase.id]?.[state.temperature] || "Use the current phase to guide the next outreach.";
  return `${phaseLine} ${paperworkLine} ${phaseAction} ${frictionAction}`;
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
    const primaryChannel = getPrimaryChannel(phase);
    const fallbackChannel = getFallbackChannel(phase);
    const objective = getPhaseObjective(phase);
    const rules = getPhaseRules(phase);

    return `
      <article class="${isActive ? "border-pine/25 bg-pine/[0.06]" : "border-summit/8 bg-white/75"} rounded-[1.5rem] border p-5 transition">
        <div class="flex flex-col gap-4">
          <div>
            <p class="text-xs font-black uppercase tracking-[0.16em] ${isActive ? "text-pine" : "text-slate"}">${phase.window}</p>
            <h3 class="mt-2 font-display text-2xl font-bold text-summit">${phase.name}</h3>
          </div>
          <span class="${isActive ? "bg-pine text-white" : "bg-glacier text-pine"} inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em]">${isActive ? "Recommended now" : "Use when due"}</span>
        </div>
        <p class="mt-3 text-sm leading-7 text-slate">${objective}</p>
        <div class="mt-4 grid gap-3 sm:grid-cols-2">
          <div class="rounded-2xl bg-parchment/90 p-4">
            <p class="text-[11px] font-black uppercase tracking-[0.14em] text-slate">Primary channel</p>
            <p class="mt-2 text-sm font-semibold text-summit">${primaryChannel}</p>
          </div>
          <div class="rounded-2xl bg-parchment/90 p-4">
            <p class="text-[11px] font-black uppercase tracking-[0.14em] text-slate">Fallback channel</p>
            <p class="mt-2 text-sm font-semibold text-summit">${fallbackChannel}</p>
          </div>
        </div>
        <ul class="mt-4 space-y-2 text-sm leading-7 text-slate">
          ${rules.map((rule) => `<li class="flex gap-3"><span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-trail"></span><span>${rule}</span></li>`).join("")}
        </ul>
      </article>
    `;
  }).join("");
};

const renderTemplates = (phaseId, name) => {
  const phaseTemplate = TEMPLATES[state.workflowMode][phaseId];
  elements.templateSubject.textContent = phaseTemplate.emailSubject;
  elements.templateEmail.textContent = phaseTemplate.emailBody.replaceAll("[specific outcome tied to their goal]", `${name}'s stated planning outcome`);
  elements.templateText.textContent = phaseTemplate.textBody.replaceAll("[specific outcome tied to their goal]", `${name}'s stated planning outcome`);
  elements.templateCall.textContent = phaseTemplate.callPrompt;
};

const renderCRMBoard = (phase) => {
  const mode = getMode();
  const cards = state.workflowMode === "seminar"
    ? [
        {
          stage: "Seminar attended",
          status: "complete",
          note: "The attendee entered the follow-up sequence after the dinner seminar."
        },
        {
          stage: mode.milestone1Label,
          status: state.milestone1 ? "complete" : "pending",
          note: state.milestone1
            ? "The lead has already shown real interest in a follow-up conversation."
            : "Turn general seminar interest into a specific consultation ask."
        },
        {
          stage: mode.crmStage3,
          status: state.milestone2 ? "complete" : "active",
          note: state.milestone2
            ? "The consultation is on the calendar."
            : `${phase.name} is the recommended coaching motion right now to create a clean booking decision.`
        },
        {
          stage: mode.crmStage4,
          status: state.milestone2 ? "complete" : "pending",
          note: state.milestone2
            ? "Booking is confirmed and ready for pre-meeting preparation."
            : "Guide to booked consultation, not now, or nurture with clean language."
        },
        {
          stage: "Nurture track",
          status: state.daysSinceMeeting > 14 && !state.milestone2 ? "active" : "pending",
          note: state.daysSinceMeeting > 14 && !state.milestone2
            ? "Keep the relationship warm with relevance, not pressure."
            : "Use only after a clean booking decision has not happened."
        }
      ]
    : [
        {
          stage: "Consultation completed",
          status: "complete",
          note: "Advisor completed the real planning conversation."
        },
        {
          stage: mode.milestone1Label,
          status: state.milestone1 ? "complete" : "pending",
          note: state.milestone1
            ? "Paperwork is out and ready for action."
            : "Send paperwork immediately after the consultation."
        },
        {
          stage: "Active follow-up phase",
          status: "active",
          note: `${phase.name} is the recommended coaching motion right now.`
        },
        {
          stage: mode.crmStage4,
          status: state.milestone2 ? "complete" : "pending",
          note: state.milestone2
            ? "Signed and ready for implementation."
            : "Guide to yes, not now, or nurture with clean language."
        },
        {
          stage: "Nurture track",
          status: state.daysSinceMeeting > 10 && !state.milestone2 ? "active" : "pending",
          note: state.daysSinceMeeting > 10 && !state.milestone2
            ? "Protect the relationship with low-pressure value touches."
            : "Use only if the lead does not move after decision clarity."
        }
      ];

  elements.crmBoard.innerHTML = cards.map((card) => `
    <article class="rounded-[1.4rem] border ${card.status === "complete" ? "border-pine/20 bg-pine/[0.07]" : card.status === "active" ? "border-trail/35 bg-trail/[0.08]" : "border-summit/8 bg-white/80"} p-5">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 class="text-sm font-black uppercase tracking-[0.14em] text-summit">${card.stage}</h3>
        <span class="${card.status === "complete" ? "bg-pine text-white" : card.status === "active" ? "bg-trail text-summit" : "bg-mist text-slate"} inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em]">${card.status}</span>
      </div>
      <p class="mt-3 text-sm leading-7 text-slate">${card.note}</p>
    </article>
  `).join("");
};

const renderKPIs = () => {
  const mode = getMode();
  elements.kpis.innerHTML = mode.kpis.map((card) => `
    <article class="rounded-[1.4rem] border border-summit/8 bg-white/82 p-5">
      <p class="text-xs font-black uppercase tracking-[0.16em] text-pine">${card.label}</p>
      <p class="mt-3 text-sm leading-7 text-slate">${card.detail}</p>
    </article>
  `).join("");
};

const renderModeUI = () => {
  const mode = getMode();

  elements.daysLabel.textContent = state.workflowMode === "seminar" ? "Days since seminar" : "Days since consultation";
  elements.workflowDescription.textContent = mode.coachDescription;
  elements.milestone1Label.textContent = mode.milestone1Label;
  elements.milestone1Help.textContent = mode.milestone1Help;
  elements.milestone2Label.textContent = mode.milestone2Label;
  elements.milestone2Help.textContent = mode.milestone2Help;
  elements.heroOutcomeTitle.textContent = mode.ctaOutcome;
  elements.heroOutcomeCopy.textContent = state.workflowMode === "seminar"
    ? "Every lead ends in a booked consultation, deferment, or a healthy nurture path."
    : "Every lead ends in a signature, deferment, or a healthy nurture path.";
  elements.coachTopLabel.textContent = mode.topLabel;
  elements.channelLabel.textContent = mode.topStatLabel;
  elements.nextActionLabel.textContent = mode.nextActionLabel;
  elements.advisorPromptLabel.textContent = mode.advisorPromptLabel;
  elements.frictionPlayLabel.textContent = mode.frictionPlayLabel;
  elements.playbookHeading.textContent = state.workflowMode === "seminar"
    ? "A six-phase system from attendance to booked consultation"
    : "A six-phase system from consultation to clear decision";
  elements.playbookCopy.textContent = state.workflowMode === "seminar"
    ? "This system is built to turn seminar relevance into a booked conversation without pressure, urgency theater, or generic check-ins."
    : "This system is built to remove friction between recommendation and action, not to pressure a lead into signing.";
  elements.crmHeading.textContent = state.workflowMode === "seminar"
    ? "Track every lead to a clear booking outcome"
    : "Track every lead to a clear decision outcome";
  elements.kpiHeading.textContent = state.workflowMode === "seminar"
    ? "Measure whether follow-up is actually improving booking"
    : "Measure whether follow-up is actually improving decisions";
};

const render = () => {
  const mode = getMode();
  const phase = getRecommendedPhase();
  const segment = getSegmentView();
  const friction = FRICTION_MAP[state.friction];
  const name = state.leadName.trim() || "Seminar lead";

  renderModeUI();

  elements.coachingLabel.textContent = `${segment.label} ${mode.shortLabel.toLowerCase()} coaching mode`;
  elements.coachingFrame.textContent = segment.coachFrame;
  elements.momentumStat.textContent = segment.momentum;
  elements.riskStat.textContent = segment.defaultRisk;
  elements.phaseStat.textContent = `${mode.phaseStatPrefix} · ${phase.window} · ${phase.name}`;
  elements.channelStat.textContent = getPrimaryChannel(phase);
  elements.nextAction.textContent = getNextActionText(phase, segment, friction);
  elements.advisorPrompt.textContent = segment.tactics.join(" ");
  elements.frictionCue.textContent = friction.cue;
  elements.frictionPlay.textContent = state.workflowMode === "seminar" ? friction.seminarPlay : friction.consultationPlay;

  renderTemperatureButtons();
  renderTimeline(phase.id);
  renderTemplates(phase.id, name);
  renderCRMBoard(phase);
  renderKPIs();
};

const copyTextValue = async (value, button) => {
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

elements.workflowMode.addEventListener("change", (event) => {
  state.workflowMode = event.target.value;
  state.milestone1 = false;
  state.milestone2 = false;
  render();
});

elements.leadName.addEventListener("input", (event) => {
  state.leadName = event.target.value;
  render();
});

elements.daysSinceMeeting.addEventListener("input", (event) => {
  state.daysSinceMeeting = Number(event.target.value || 0);
  render();
});

elements.milestone1.addEventListener("change", (event) => {
  state.milestone1 = event.target.checked;
  render();
});

elements.milestone2.addEventListener("change", (event) => {
  state.milestone2 = event.target.checked;
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

elements.copySubject.addEventListener("click", () => copyTextValue(elements.templateSubject.textContent, elements.copySubject));
elements.copyEmail.addEventListener("click", () => copyTextValue(elements.templateEmail.textContent, elements.copyEmail));
elements.copyText.addEventListener("click", () => copyTextValue(elements.templateText.textContent, elements.copyText));

render();
