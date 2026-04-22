const FOLLOW_UP_PHASES = [
  {
    id: "phase-1",
    window: "Day 0-1",
    name: "Re-anchor",
    objective: "Reconnect the lead to the personal concern that made the seminar matter to them.",
    primaryChannel: "Call or email",
    fallbackChannel: "Text acknowledgement",
    advisorRules: [
      "Tie the outreach to the concern they surfaced, not the event recap.",
      "Make the next step feel personal and easy to accept.",
      "Avoid urgency, pressure, or a broad seminar recap."
    ]
  },
  {
    id: "phase-2",
    window: "Day 2-5",
    name: "Surface friction",
    objective: "Identify the real hesitation before it hardens into drift.",
    primaryChannel: "Personalized email",
    fallbackChannel: "Call",
    advisorRules: [
      "Assume there is one unsettled point, not a wall of objections.",
      "Ask calm questions that pull the real hesitation into the open.",
      "Do not restart the entire presentation."
    ]
  },
  {
    id: "phase-3",
    window: "Day 5-7",
    name: "Reframe risk",
    objective: "Make the cost of inaction more concrete without sounding alarmist.",
    primaryChannel: "Value email",
    fallbackChannel: "Call",
    advisorRules: [
      "Use one focused risk topic, not a long educational download.",
      "Frame inaction as an active choice.",
      "Keep the tone steady, calm, and non-reactive."
    ]
  },
  {
    id: "phase-4",
    window: "Day 7-10",
    name: "Reduce commitment friction",
    objective: "Lower the emotional weight of the next step so action feels smaller and safer.",
    primaryChannel: "Call or email",
    fallbackChannel: "Meeting invite",
    advisorRules: [
      "Offer a smaller first step instead of one huge decision.",
      "Make the path feel reversible and collaborative.",
      "Reduce complexity before you increase urgency."
    ]
  },
  {
    id: "phase-5",
    window: "Day 10-14",
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
    objective: "Maintain relationship equity without restarting the sale from zero.",
    primaryChannel: "Newsletter or event invite",
    fallbackChannel: "Low-pressure check-in",
    advisorRules: [
      "Stay present without chasing.",
      "Keep adding relevance, not pressure.",
      "Use education, invitations, and occasional personal touchpoints."
    ]
  }
];

const WORKFLOW_MODES = {
  seminar: {
    label: "After seminar",
    shortLabel: "Seminar",
    coachHeading: "Seminar attendee conversion coach",
    coachDescription: "Use this when the advisor is following up after attendance and the real goal is to book the first consultation.",
    topLabel: "Recommended seminar mode",
    topStatLabel: "Primary booking channel",
    ctaOutcome: "Booked or nurtured",
    processOutcome: "booked consultation",
    milestone1Label: "Consultation requested",
    milestone1Help: "Did they explicitly ask for or show clear interest in a follow-up conversation?",
    milestone2Label: "Appointment booked",
    milestone2Help: "Has the first consultation actually been scheduled?",
    nextActionLabel: "Next best booking move",
    advisorPromptLabel: "Advisor booking note",
    frictionPlayLabel: "Booking friction play",
    crmStage3: "Consultation booked",
    crmStage4: "Consultation outcome",
    phaseStatPrefix: "Booking track",
    kpis: [
      {
        label: "Booking conversion rate",
        detail: "Track attendees to booked consultations."
      },
      {
        label: "Time to booking",
        detail: "Measure days from seminar attendance to scheduled consultation."
      },
      {
        label: "Response rate by touchpoint",
        detail: "See which call, email, or text moments actually create movement."
      },
      {
        label: "Nurture reactivation",
        detail: "Track attendees who come back after a clean deferment."
      }
    ]
  },
  consultation: {
    label: "After consultation",
    shortLabel: "Consultation",
    coachHeading: "Post-consultation decision coach",
    coachDescription: "Use this when the advisor has already had the real planning conversation and is guiding the lead to paperwork, signature, or nurture.",
    topLabel: "Recommended consultation mode",
    topStatLabel: "Primary decision channel",
    ctaOutcome: "Signed or nurtured",
    processOutcome: "signed paperwork",
    milestone1Label: "Paperwork sent",
    milestone1Help: "Has the advisor already sent the next-step paperwork or implementation materials?",
    milestone2Label: "Signed",
    milestone2Help: "Has the lead already completed the commitment step?",
    nextActionLabel: "Next best decision move",
    advisorPromptLabel: "Advisor decision note",
    frictionPlayLabel: "Decision friction play",
    crmStage3: "Paperwork out",
    crmStage4: "Signature outcome",
    phaseStatPrefix: "Decision track",
    kpis: [
      {
        label: "Signature conversion rate",
        detail: "Track consultation to signed paperwork."
      },
      {
        label: "Time to signature",
        detail: "Measure days from consultation to completion."
      },
      {
        label: "Drop-off rate",
        detail: "Watch where warm intent dies between recommendation and execution."
      },
      {
        label: "Nurture reactivation",
        detail: "Track leads that come back after clean deferment."
      }
    ]
  }
};

const LEAD_SEGMENTS = {
  hot: {
    label: "Hot",
    seminarCoachFrame: "They engaged clearly at the seminar. Your job is to convert that energy into a scheduled consultation before life crowds it out.",
    consultationCoachFrame: "They already see the value. Your job is to keep the path clear and reduce friction.",
    seminarMomentum: "High booking intent",
    consultationMomentum: "High decision intent",
    seminarRisk: "Delay, distraction, or failure to schedule while interest is fresh",
    consultationRisk: "Paperwork hesitation or decision fatigue",
    seminarTactics: [
      "Call first while the seminar concern is still emotionally present.",
      "Invite a specific consultation, not a vague next step.",
      "Use direct, confident booking language."
    ],
    consultationTactics: [
      "Keep follow-up tight and direct.",
      "Prioritize clarity and clean decision language.",
      "Use a short, confident close that reflects their prior yes."
    ]
  },
  warm: {
    label: "Warm",
    seminarCoachFrame: "They saw enough value to stay interested, but they need a more personal bridge from seminar topic to their own situation.",
    consultationCoachFrame: "They like the plan, but they are not fully settled emotionally.",
    seminarMomentum: "Moderate booking intent",
    consultationMomentum: "Moderate decision intent",
    seminarRisk: "General interest that never becomes personally relevant",
    consultationRisk: "Status quo bias and perceived irreversibility",
    seminarTactics: [
      "Personalize the outreach around the topic they selected.",
      "Use email first, then call to surface the real hesitation.",
      "Move them from topic interest to appointment clarity."
    ],
    consultationTactics: [
      "Use clarity, risk, and friction-reduction most heavily.",
      "Normalize hesitation without validating avoidance.",
      "Offer a smaller first step or review conversation."
    ]
  },
  cold: {
    label: "Cold",
    seminarCoachFrame: "They attended, but the priority is low. Preserve trust, create one more chance for relevance, and then nurture cleanly.",
    consultationCoachFrame: "They drifted or cooled off. Preserve trust and move them toward a clear decision or nurture path.",
    seminarMomentum: "Low booking intent",
    consultationMomentum: "Low decision intent",
    seminarRisk: "Silence, low urgency, or a generic seminar memory that fades fast",
    consultationRisk: "Silence, avoidance, or low priority",
    seminarTactics: [
      "Keep the tone light and dignified.",
      "Avoid over-pursuing with repeated nudges.",
      "Offer a simple next conversation or a clean nurture path."
    ],
    consultationTactics: [
      "Use decision clarity and nurture logic early.",
      "Avoid frequent check-ins that sound needy.",
      "Protect dignity and invite a clean later decision."
    ]
  }
};

const FRICTION_MAP = {
  unclear: {
    label: "Something is unclear",
    cue: "Clarity gap",
    seminarPlay: "Ask what topic still feels fuzzy and pull the conversation back to the one issue they care about most.",
    consultationPlay: "Ask what still feels unsettled and isolate the one unresolved point."
  },
  timing: {
    label: "Bad timing",
    cue: "Timing hesitation",
    seminarPlay: "Reduce the ask to a short first conversation instead of a major planning commitment.",
    consultationPlay: "Reduce the size of the first implementation step and offer staged execution."
  },
  spouse: {
    label: "Needs spouse or partner alignment",
    cue: "Stakeholder friction",
    seminarPlay: "Invite both people into the first consultation so the concern becomes shared instead of secondhand.",
    consultationPlay: "Suggest a short alignment call focused on goals, not a repeat presentation."
  },
  paperwork: {
    label: "Paperwork friction",
    cue: "Execution friction",
    seminarPlay: "Make the calendar step feel easy and specific so logistics do not kill the booking.",
    consultationPlay: "Simplify the next action and tell them exactly what happens after signature."
  },
  risk: {
    label: "Fear of making the wrong move",
    cue: "Loss aversion",
    seminarPlay: "Frame the consultation as a clarity conversation, not a commitment to change everything.",
    consultationPlay: "Reframe doing nothing as a decision and emphasize adjustability."
  },
  silent: {
    label: "No response / silence",
    cue: "Unstated hesitation",
    seminarPlay: "Move to one clean decision-clarity message, then stop chasing and nurture appropriately.",
    consultationPlay: "Move toward a clean clarity message and stop repeated nudges."
  }
};

const TEMPLATES = {
  seminar: {
    "phase-1": {
      emailSubject: "Quick follow-up from the seminar",
      emailBody:
`It was great having you at the seminar.

You mentioned wanting more clarity around [specific outcome tied to their goal], and that is usually where the biggest planning gaps show up.

If it would help, we can set up a short conversation and walk through that one issue together.`,
      textBody:
`Thanks again for coming to the seminar. If you want, we can set up a quick conversation around [specific outcome tied to their goal].`,
      callPrompt:
`Call first for hot leads. Tie back to the concern they surfaced and invite a simple first consultation.`
    },
    "phase-2": {
      emailSubject: "One quick question after the seminar",
      emailBody:
`After a seminar like this, most people realize there is one area they are still not fully confident about.

Is there one part of your retirement plan that still feels unsettled or unclear?

If so, we can use a short conversation to make that specific.`,
      textBody:
`Quick question after the seminar: is there one part of your plan that still feels unsettled?`,
      callPrompt:
`Ask what stood out most and where they still want clarity. The goal is a booked conversation, not a full re-presentation.`
    },
    "phase-3": {
      emailSubject: "One thing many retirees miss",
      emailBody:
`One issue that matters more than most people realize is what happens if an important planning gap goes unaddressed for too long.

That is why these conversations work best when we make the risk personal instead of leaving it abstract.

If you want, we can look at how [specific outcome tied to their goal] applies in your situation.`,
      textBody:
`One reminder: the biggest risks are usually the ones that stay abstract. We can make this specific to you if helpful.`,
      callPrompt:
`Use one focused risk topic to make the issue personal and relevant, then invite the appointment.`
    },
    "phase-4": {
      emailSubject: "We do not have to make this complicated",
      emailBody:
`If a full planning process feels like too much right now, we do not have to treat this as one big commitment.

We can simply start with a review of the one issue that matters most and decide what makes sense from there.`,
      textBody:
`We can keep this simple and start with one focused conversation if that feels easier.`,
      callPrompt:
`Reduce the weight of booking. Make the consultation feel like a clear first pass, not a giant commitment.`
    },
    "phase-5": {
      emailSubject: "Quick question",
      emailBody:
`At this stage, most people either decide to book a conversation or set it aside for now, and both are completely fine.

My job is just to make sure you have clarity.

Would you like to set up the conversation, or would you rather revisit this later?`,
      textBody:
`Would you like to set up the conversation, or would you rather revisit this later? Either is completely fine.`,
      callPrompt:
`Ask for a clean booking decision, a deferment, or permission to nurture without sounding disappointed.`
    },
    "phase-6": {
      emailSubject: "Keeping the door open",
      emailBody:
`I wanted to keep the conversation open and send along something useful.

No action needed now. If priorities shift or you want to revisit [specific outcome tied to their goal] later, I am here.`,
      textBody:
`Keeping the door open. No pressure. If the topic becomes more relevant later, I’m here.`,
      callPrompt:
`Stay present without restarting the sale. Offer relevance, education, or another seminar invitation.`
    }
  },
  consultation: {
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
  }
};

const EMAIL_VARIANTS = {
  seminar: {
    "phase-1": {
      hot: {
        default: {
          subject: "A quick follow-up while this is still fresh",
          intro: "You were clearly engaged at the seminar, so I wanted to follow up while the concern is still fresh."
        }
      },
      warm: {
        default: {
          subject: "A quick follow-up on the topic you flagged",
          intro: "You indicated there was a specific planning area you wanted to think through more carefully."
        }
      },
      cold: {
        default: {
          subject: "One quick thought after the seminar",
          intro: "Most people leave a seminar with one issue in the back of their mind, even if they are not ready to act right away."
        }
      }
    },
    "phase-2": {
      hot: {
        unclear: {
          subject: "One point worth clearing up",
          intro: "Usually at this stage there is just one thing that still does not feel fully settled."
        },
        spouse: {
          subject: "It may help to look at this together",
          intro: "Sometimes the next step becomes easier when both people can react to the same conversation at the same time."
        },
        default: {
          subject: "One quick question after the seminar",
          intro: "Before this turns into delay, it helps to identify the one thing that still feels open."
        }
      },
      warm: {
        unclear: {
          subject: "What still feels unsettled?",
          intro: "Most hesitation at this point is not a lack of interest, just one issue that still feels unclear."
        },
        timing: {
          subject: "We can keep the next step simple",
          intro: "If timing is the issue, the next conversation does not have to feel like a major commitment."
        },
        default: {
          subject: "A quick follow-up question",
          intro: "There is usually one thing standing between interest and action, and it helps to make that visible."
        }
      },
      cold: {
        silent: {
          subject: "No pressure at all",
          intro: "I know this may not be a top priority right now, so I wanted to keep this simple."
        },
        default: {
          subject: "If one question would help",
          intro: "If there is one issue you would want clarified before doing anything further, that is usually the right place to start."
        }
      }
    },
    "phase-3": {
      hot: {
        risk: {
          subject: "Why waiting can quietly create risk",
          intro: "One reason people act now is that planning gaps rarely stay neutral over time."
        },
        default: {
          subject: "One thing worth looking at now",
          intro: "This is the stage where making the issue personal matters more than adding more information."
        }
      },
      warm: {
        risk: {
          subject: "One risk most people underestimate",
          intro: "What matters is not just the topic itself, but how it affects your situation if it stays unaddressed."
        },
        default: {
          subject: "One thing many retirees miss",
          intro: "A focused planning risk is often the easiest way to decide whether a conversation is worth having."
        }
      },
      cold: {
        default: {
          subject: "One useful idea to keep in mind",
          intro: "If nothing else, I wanted to leave you with one point that tends to matter more over time."
        }
      }
    },
    "phase-4": {
      hot: {
        default: {
          subject: "We can make the next step easy",
          intro: "If the hesitation is about making this feel too big, we can narrow the conversation down to one clear objective."
        }
      },
      warm: {
        timing: {
          subject: "This does not have to be a big step",
          intro: "A first conversation can stay small and focused without turning into an all-at-once planning process."
        },
        default: {
          subject: "We can keep this simple",
          intro: "The next step does not need to feel heavy for it to be worthwhile."
        }
      },
      cold: {
        default: {
          subject: "If a smaller next step would help",
          intro: "Sometimes the right move is simply a lighter first conversation instead of a full planning commitment."
        }
      }
    },
    "phase-5": {
      hot: {
        default: {
          subject: "Would it make sense to get this scheduled?",
          intro: "At this point, the cleanest move is usually to either get the conversation on the calendar or set it aside for now."
        }
      },
      warm: {
        default: {
          subject: "A simple next-step question",
          intro: "Usually by this stage it helps to choose between scheduling the conversation and revisiting later."
        }
      },
      cold: {
        default: {
          subject: "Completely fine either way",
          intro: "There is no pressure here. My only goal is to help you make a clear decision instead of leaving it vague."
        }
      }
    },
    "phase-6": {
      hot: {
        default: {
          subject: "Keeping the conversation open",
          intro: "I wanted to keep this on your radar without turning it into pressure."
        }
      },
      warm: {
        default: {
          subject: "Staying in touch in a useful way",
          intro: "Even when timing is not right, it still helps to keep the right information nearby."
        }
      },
      cold: {
        default: {
          subject: "Whenever this becomes relevant again",
          intro: "No action needed now. I just wanted to leave the door open if the topic becomes more important later."
        }
      }
    }
  },
  consultation: {
    "phase-1": {
      hot: {
        default: {
          subject: "Everything is ready on my side",
          intro: "Because the direction already felt clear in our conversation, I wanted to keep momentum simple and steady."
        }
      },
      warm: {
        default: {
          subject: "A quick note after our conversation",
          intro: "Often the first follow-up works best when it simply reconnects the recommendation to the goal you outlined."
        }
      },
      cold: {
        default: {
          subject: "No pressure, just a clean next step",
          intro: "I wanted to make the next step easy without adding any pressure."
        }
      }
    },
    "phase-2": {
      hot: {
        paperwork: {
          subject: "A quick note on the paperwork",
          intro: "Usually at this stage the issue is not the strategy, just making the mechanics feel easier."
        },
        default: {
          subject: "One point worth clarifying",
          intro: "If anything is holding this up, it is usually one unsettled point rather than the whole recommendation."
        }
      },
      warm: {
        unclear: {
          subject: "What still feels unsettled?",
          intro: "When someone pauses here, it is usually because one part of the recommendation still feels unresolved."
        },
        spouse: {
          subject: "It may help to align on this together",
          intro: "Sometimes the real pause is not disagreement, just needing a shared conversation around the decision."
        },
        default: {
          subject: "A quick check-in",
          intro: "Before more time goes by, it helps to identify what is actually creating hesitation."
        }
      },
      cold: {
        silent: {
          subject: "No pressure from my side",
          intro: "I know silence at this stage often means something feels unresolved, not necessarily that the whole idea is off the table."
        },
        default: {
          subject: "One quick question",
          intro: "If there is one thing making this harder to act on, that is the most useful thing to surface."
        }
      }
    },
    "phase-3": {
      hot: {
        risk: {
          subject: "Why waiting is still a decision",
          intro: "At this stage the biggest risk is often assuming that no move means no consequence."
        },
        default: {
          subject: "One thing to keep in mind",
          intro: "This is the point where it helps to re-anchor the cost of delay without creating pressure."
        }
      },
      warm: {
        risk: {
          subject: "The part of this decision people underestimate",
          intro: "Often the real issue is not whether the plan is perfect, but what happens if the current risk stays untouched."
        },
        default: {
          subject: "One planning reminder",
          intro: "A steady reminder about inaction risk often makes the next step easier to evaluate clearly."
        }
      },
      cold: {
        default: {
          subject: "A calm perspective to consider",
          intro: "I wanted to offer one perspective that may help if the decision still feels heavy."
        }
      }
    },
    "phase-4": {
      hot: {
        default: {
          subject: "We can make the next step lighter",
          intro: "If what is slowing this down is how big it feels, we can shrink the implementation step without losing progress."
        }
      },
      warm: {
        timing: {
          subject: "This does not have to be all at once",
          intro: "If timing is part of the hesitation, it may help to think in stages instead of one large move."
        },
        default: {
          subject: "A smaller first step may be enough",
          intro: "At this point the most useful move is often to reduce the emotional weight of implementation."
        }
      },
      cold: {
        default: {
          subject: "If the next step feels too big",
          intro: "Sometimes the best way forward is to narrow the decision down until it feels manageable again."
        }
      }
    },
    "phase-5": {
      hot: {
        default: {
          subject: "Are you ready to move forward?",
          intro: "At this stage, what usually helps most is a clean decision rather than more open-ended follow-up."
        }
      },
      warm: {
        default: {
          subject: "A simple next-step question",
          intro: "Usually by this point it is better to decide whether to move forward now or revisit later."
        }
      },
      cold: {
        default: {
          subject: "Either path is completely fine",
          intro: "There is no pressure from me. My goal is just to help you make a clear decision instead of letting this hang open."
        }
      }
    },
    "phase-6": {
      hot: {
        default: {
          subject: "Keeping the door open",
          intro: "I wanted to stay present without turning this into pressure."
        }
      },
      warm: {
        default: {
          subject: "Staying connected without pressure",
          intro: "If this is a later conversation, that is completely fine. I just want to keep the relationship useful."
        }
      },
      cold: {
        default: {
          subject: "If priorities shift later",
          intro: "No action needed now. I just wanted to leave the path open if the timing changes."
        }
      }
    }
  }
};
