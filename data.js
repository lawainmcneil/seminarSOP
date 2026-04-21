const FOLLOW_UP_PHASES = [
  {
    id: "phase-1",
    window: "Day 0-1",
    name: "Re-anchor",
    objective: "Reinforce the decision already made and keep momentum calm.",
    primaryChannel: "Email",
    fallbackChannel: "Text acknowledgement",
    advisorRules: [
      "Affirm the meeting and their stated goal.",
      "Restate the outcome they said yes to.",
      "Avoid urgency, pressure, or extra explanation."
    ]
  },
  {
    id: "phase-2",
    window: "Day 2-3",
    name: "Surface friction",
    objective: "Identify the hidden hesitation instead of guessing at it.",
    primaryChannel: "Personalized email",
    fallbackChannel: "Call",
    advisorRules: [
      "Assume there is one unsettled point, not an objection wall.",
      "Invite clarity with a calm question.",
      "Do not restart the full presentation."
    ]
  },
  {
    id: "phase-3",
    window: "Day 5-7",
    name: "Reframe risk",
    objective: "Correct distorted risk perception around doing nothing.",
    primaryChannel: "Email",
    fallbackChannel: "Call",
    advisorRules: [
      "Frame inaction as an active choice.",
      "Remind them the plan can be adjusted later.",
      "Keep the tone steady and non-reactive."
    ]
  },
  {
    id: "phase-4",
    window: "Day 5-7",
    name: "Reduce commitment friction",
    objective: "Lower the psychological weight of the next step.",
    primaryChannel: "Call or email",
    fallbackChannel: "Meeting invite",
    advisorRules: [
      "Offer staged implementation or one-piece-at-a-time execution.",
      "Anchor with a post-implementation review.",
      "Make the next step feel smaller and reversible."
    ]
  },
  {
    id: "phase-5",
    window: "Day 7-10",
    name: "Decision clarity",
    objective: "Guide the lead to a clean yes, not now, or nurture path.",
    primaryChannel: "Call or concise email",
    fallbackChannel: "Calendar invite",
    advisorRules: [
      "Present moving forward and holding off as equally acceptable.",
      "Ask for clarity, not compliance.",
      "Route unresolved leads to nurture without emotional leakage."
    ]
  },
  {
    id: "phase-6",
    window: "Day 30+",
    name: "Nurture track",
    objective: "Maintain relationship equity without restarting the sale.",
    primaryChannel: "Newsletter or event invite",
    fallbackChannel: "Low-pressure check-in",
    advisorRules: [
      "Stay present without chasing.",
      "Continue the conversation, do not reopen the pitch from zero.",
      "Use education, invitations, and occasional personal touchpoints."
    ]
  }
];

const LEAD_SEGMENTS = {
  hot: {
    label: "Hot",
    coachFrame: "They already see the value. Your job is to keep the path clear and reduce friction.",
    momentum: "High intent",
    defaultRisk: "Paperwork hesitation or decision fatigue",
    tactics: [
      "Keep follow-up tight and direct.",
      "Prioritize Phase 1, 2, and 5 language.",
      "Use a short, confident close that reflects their prior yes."
    ]
  },
  warm: {
    label: "Warm",
    coachFrame: "They like the plan, but they are not fully settled emotionally.",
    momentum: "Moderate intent",
    defaultRisk: "Status quo bias and perceived irreversibility",
    tactics: [
      "Use Phase 2, 3, and 4 most heavily.",
      "Normalize hesitation without validating avoidance.",
      "Offer a smaller first step or review conversation."
    ]
  },
  cold: {
    label: "Cold",
    coachFrame: "They drifted or cooled off. Preserve trust and move them toward a clear decision or nurture path.",
    momentum: "Low intent",
    defaultRisk: "Silence, avoidance, or low priority",
    tactics: [
      "Use Phase 3, 5, and 6 logic.",
      "Avoid frequent check-ins that sound needy.",
      "Protect dignity and invite a clean later decision."
    ]
  }
};

const FRICTION_MAP = {
  unclear: {
    label: "Something is unclear",
    cue: "Clarity gap",
    play: "Ask what still feels unsettled and isolate the one unresolved point."
  },
  timing: {
    label: "Bad timing",
    cue: "Timing hesitation",
    play: "Reduce the size of the first step and offer staged implementation."
  },
  spouse: {
    label: "Needs spouse or partner alignment",
    cue: "Stakeholder friction",
    play: "Suggest a short alignment call focused on goals, not a repeat presentation."
  },
  paperwork: {
    label: "Paperwork friction",
    cue: "Execution friction",
    play: "Simplify the next action and tell them exactly what happens after signature."
  },
  risk: {
    label: "Fear of making the wrong move",
    cue: "Loss aversion",
    play: "Reframe doing nothing as a decision and emphasize adjustability."
  },
  silent: {
    label: "No response / silence",
    cue: "Unstated hesitation",
    play: "Move toward a clean clarity message and stop repeated nudges."
  }
};

const TEMPLATES = {
  "phase-1": {
    emailSubject: "Next steps",
    emailBody:
`It was great walking through everything with you.

Based on our conversation, moving forward allows us to [specific outcome tied to their goal].

I have everything ready on my end. Happy to finalize whenever you feel comfortable.`,
    textBody:
`Great meeting today. I have the next step ready whenever you're comfortable moving forward.`,
    callPrompt:
`Reinforce the decision they already made. Restate the goal. Keep it short and pressure-free.`
  },
  "phase-2": {
    emailSubject: "Quick check-in",
    emailBody:
`Quick check-in: when people pause at this stage, it is usually because one piece does not feel fully clear or settled.

Is there anything you would want to revisit before we finalize?`,
    textBody:
`Quick question: is there one piece that still feels unsettled before we finalize?`,
    callPrompt:
`Assume there is one friction point. Ask for the specific piece that needs clarity.`
  },
  "phase-3": {
    emailSubject: "One thing to keep in mind",
    emailBody:
`One thing I remind clients at this stage: doing nothing keeps the current risks exactly where they are.

The plan we discussed is not a one-time, locked-in decision. We can adjust as life and markets change.

If it helps, I am happy to walk through that again together.`,
    textBody:
`One reminder: doing nothing keeps the current risks in place. The plan is adjustable as life changes.`,
    callPrompt:
`Reframe the risk of inaction and reduce the fear of permanence.`
  },
  "phase-4": {
    emailSubject: "We can make this smaller",
    emailBody:
`If it helps, we do not have to treat this as one big step.

We can move one piece first and walk through it together, then build from there.

If you want, we can map out that smaller first move.`,
    textBody:
`We can make this a smaller first step if that feels easier.`,
    callPrompt:
`Offer a phased start, partial transfer, or scheduled review to reduce commitment friction.`
  },
  "phase-5": {
    emailSubject: "Clarity on next step",
    emailBody:
`At this stage, it usually comes down to either moving forward or holding off, and both are completely fine.

My job is simply to make sure you have clarity.

Do you feel ready to proceed, or would you prefer to revisit this later on?`,
    textBody:
`Do you feel ready to move forward, or would you rather revisit this later? Either is completely fine.`,
    callPrompt:
`Ask for a clean yes, not now, or later decision without sounding disappointed.`
  },
  "phase-6": {
    emailSubject: "Keeping the conversation open",
    emailBody:
`I wanted to keep the conversation open and send along something useful.

No action needed now. If priorities shift or it makes sense to revisit the plan later, I am here.`,
    textBody:
`Keeping the door open. No pressure. If priorities shift later, I'm here.`,
    callPrompt:
`Stay present without restarting the sale. Offer value, not pursuit.`
  }
};

const KPI_CARDS = [
  {
    label: "Signature conversion rate",
    detail: "Track verbal yes to signed paperwork."
  },
  {
    label: "Time to signature",
    detail: "Measure days from meeting to completion."
  },
  {
    label: "Drop-off rate",
    detail: "Watch where warm intent dies in the pipeline."
  },
  {
    label: "Nurture reactivation",
    detail: "Track leads that come back after clean deferment."
  }
];
