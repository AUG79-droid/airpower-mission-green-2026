"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { deepModules } from "./learningContent";

type Screen = "welcome" | "map" | "theory" | "mission" | "postlesson" | "debrief" | "final";
type MetricKey = "readiness" | "environment" | "evidence" | "delivery";

type Impact = Partial<Record<MetricKey, number>>;

type Choice = {
  id: string;
  title: string;
  description: string;
  impact: Impact;
  integrity: "strong" | "mixed" | "weak";
  feedback: string;
};

type Decision = {
  title: string;
  prompt: string;
  detail: string;
  choices: Choice[];
};

type Mission = {
  id: string;
  number: string;
  short: string;
  title: string;
  location: string;
  discipline: string;
  objective: string;
  target: string;
  briefing: string;
  symbol: string;
  accent: string;
  decisions: Decision[];
  learning: string[];
  claimCheck: string;
};

type Metrics = Record<MetricKey, number>;

type Completion = {
  choices: string[];
  delta: Metrics;
};

const ZERO_DELTA: Metrics = {
  readiness: 0,
  environment: 0,
  evidence: 0,
  delivery: 0,
};

const INITIAL_METRICS: Metrics = {
  readiness: 52,
  environment: 48,
  evidence: 50,
  delivery: 54,
};

const metricMeta: Record<MetricKey, { label: string; short: string }> = {
  readiness: { label: "Operational readiness", short: "Readiness" },
  environment: { label: "Climate & resource performance", short: "Climate / resources" },
  evidence: { label: "Compliance & evidence", short: "Evidence" },
  delivery: { label: "Cost & delivery control", short: "Cost / delivery" },
};

const missions: Mission[] = [
  {
    id: "route",
    number: "01",
    short: "Smart Spare Route",
    title: "Move the part, not the problem",
    location: "Logistics network",
    discipline: "CO₂ logistics",
    objective: "Reduce emissions from spare-parts transport while protecting service commitments.",
    target: "Compare feasible routes, disclose emissions assumptions and investigate avoidable urgent movements.",
    briefing:
      "A flight-control actuator must reach an operating base within 36 hours. An aircraft may remain unavailable if the part arrives late.",
    symbol: "↗",
    accent: "cyan",
    decisions: [
      {
        title: "Select the transport plan",
        prompt: "Which route do you authorise?",
        detail:
          "The figures are scenario estimates. They use the same shipment boundary, but they do not yet include disruption risk.",
        choices: [
          {
            id: "direct-air",
            title: "Direct air express",
            description: "Fastest route, dedicated uplift, highest estimated emissions and cost.",
            impact: { readiness: 14, environment: -13, evidence: 2, delivery: -9 },
            integrity: "mixed",
            feedback:
              "The operational case is strong, but the environmental trade-off must remain visible. Urgency is not an emissions reduction claim.",
          },
          {
            id: "consolidated-air",
            title: "Consolidated scheduled air",
            description: "Share capacity with another shipment and retain an eight-hour buffer.",
            impact: { readiness: 7, environment: 7, evidence: 6, delivery: 5 },
            integrity: "strong",
            feedback:
              "This balances the service window and load utilisation. The claimed benefit still depends on the chosen allocation method.",
          },
          {
            id: "multimodal",
            title: "Road–rail multimodal",
            description: "Lower scenario emissions and cost, but only two hours of delivery margin.",
            impact: { readiness: -6, environment: 12, evidence: 5, delivery: 7 },
            integrity: "mixed",
            feedback:
              "A lower-impact route is not automatically the responsible choice if it creates an unacceptable operational risk.",
          },
        ],
      },
      {
        title: "Respond to a network disruption",
        prompt: "A connection is cancelled. What is your next move?",
        detail: "A regional service centre has one compatible unit, but its records require confirmation.",
        choices: [
          {
            id: "regional-stock",
            title: "Validate and use regional stock",
            description: "Confirm configuration and traceability, then cancel the long-distance movement.",
            impact: { readiness: 11, environment: 10, evidence: 8, delivery: 7 },
            integrity: "strong",
            feedback:
              "Avoided transport is credible only after confirming that the substitute is compatible and the original shipment is actually cancelled.",
          },
          {
            id: "rebook-express",
            title: "Rebook another express leg",
            description: "Protect the deadline immediately and document the reason for the exception.",
            impact: { readiness: 10, environment: -9, evidence: 5, delivery: -8 },
            integrity: "mixed",
            feedback:
              "Documenting an operational exception is transparent. It does not turn the additional transport into an environmental improvement.",
          },
          {
            id: "ignore-disruption",
            title: "Keep the original plan",
            description: "Assume the carrier will recover the connection without changing the estimate.",
            impact: { readiness: -13, environment: -2, evidence: -10, delivery: -8 },
            integrity: "weak",
            feedback:
              "Ignoring changed conditions makes both the delivery forecast and the environmental comparison unreliable.",
          },
        ],
      },
    ],
    learning: [
      "Report both absolute emissions and an intensity metric such as kgCO₂e (kilograms of carbon dioxide equivalent) per tonne-kilometre.",
      "Define the baseline, shipment boundary, allocation method and reporting period.",
      "An avoided-emissions statement needs a documented counterfactual, not only a better route estimate.",
    ],
    claimCheck:
      "Say “lower estimated transport emissions under the stated route assumptions”, not “green delivery”.",
  },
  {
    id: "energy",
    number: "02",
    short: "Hub Energy",
    title: "Reduce intensity without hiding demand",
    location: "International Services Hub",
    discipline: "Energy efficiency",
    objective: "Improve energy efficiency while maintaining safe and reliable operations.",
    target: "Establish comparable energy baselines and verify changes within safe operating limits.",
    briefing:
      "The hub has a fixed investment budget. Activity is expected to grow, and a hotter summer may increase cooling demand.",
    symbol: "ϟ",
    accent: "yellow",
    decisions: [
      {
        title: "Choose the first intervention package",
        prompt: "Where do you invest first?",
        detail: "All savings are modelled estimates until metered and verified after implementation.",
        choices: [
          {
            id: "meter-controls",
            title: "Metering + HVAC (heating, ventilation and air conditioning) controls",
            description: "Sub-meter priority zones, tune schedules and verify comfort and operational constraints.",
            impact: { readiness: 5, environment: 11, evidence: 10, delivery: 5 },
            integrity: "strong",
            feedback:
              "Measurement makes later claims testable. Controls can reduce consumption without assuming every zone behaves the same way.",
          },
          {
            id: "solar-only",
            title: "On-site generation only",
            description: "Install generation but postpone demand-side analysis and sub-metering.",
            impact: { readiness: 4, environment: 6, evidence: -2, delivery: -5 },
            integrity: "mixed",
            feedback:
              "Renewable generation can help, but it does not demonstrate energy efficiency or reveal avoidable consumption.",
          },
          {
            id: "behaviour-poster",
            title: "Awareness campaign only",
            description: "Ask teams to save energy without a quantified baseline or operational changes.",
            impact: { readiness: 1, environment: 1, evidence: -8, delivery: 8 },
            integrity: "weak",
            feedback:
              "Awareness can support a programme, but unmeasured behavioural claims should not be presented as achieved savings.",
          },
        ],
      },
      {
        title: "Interpret the first reporting month",
        prompt: "Energy per m² is down 6%, but total energy is up 2% as activity grows. What do you report?",
        detail: "Both values use the same reporting period and validated meters.",
        choices: [
          {
            id: "report-both",
            title: "Report both values with context",
            description: "Show the intensity improvement, absolute increase, activity change and weather note.",
            impact: { readiness: 4, environment: 6, evidence: 13, delivery: 3 },
            integrity: "strong",
            feedback:
              "This is the clearest account: the intensity target improved, while total demand did not fall.",
          },
          {
            id: "only-intensity",
            title: "Publish the 6% reduction only",
            description: "Lead with the target metric and omit the total-energy increase.",
            impact: { readiness: 1, environment: 3, evidence: -13, delivery: 4 },
            integrity: "weak",
            feedback:
              "A technically correct figure can still mislead when a material part of the result is omitted.",
          },
          {
            id: "call-zero-carbon",
            title: "Call the hub “zero-carbon ready”",
            description: "Use the intensity result as a broad environmental headline.",
            impact: { readiness: -2, environment: -2, evidence: -16, delivery: 2 },
            integrity: "weak",
            feedback:
              "The scenario provides no evidence for a zero-carbon claim. Efficiency and carbon accounting are different questions.",
          },
        ],
      },
    ],
    learning: [
      "Energy intensity and absolute energy use answer different questions; show both when activity changes.",
      "Forecast savings should be labelled as estimates until verified with comparable metered data.",
      "Weather, occupancy, operating hours and production levels can materially affect comparisons.",
    ],
    claimCheck: "Say “measured energy intensity decreased 6% in the period”; do not expand that into a zero-carbon claim.",
  },
  {
    id: "packaging",
    number: "03",
    short: "Pack & Paper",
    title: "Protect the component and the evidence",
    location: "Central warehouse",
    discipline: "Materials & waste",
    objective: "Reduce delivery paper and evaluate lower-impact packaging options.",
    target: "Reduce avoidable paperwork and compare technically qualified packaging systems.",
    briefing:
      "A sensitive avionics unit needs a new delivery pack. The solution must protect the part, preserve traceability and reduce resource use.",
    symbol: "□",
    accent: "lime",
    decisions: [
      {
        title: "Build the packaging concept",
        prompt: "Which design moves to the pilot?",
        detail: "Supplier claims have different levels of evidence and the return network is not yet universal.",
        choices: [
          {
            id: "reusable-pilot",
            title: "Reusable case pilot",
            description: "Test durability, return rate, cleaning, reverse logistics and loss before scaling.",
            impact: { readiness: 7, environment: 10, evidence: 11, delivery: 1 },
            integrity: "strong",
            feedback:
              "A controlled pilot tests whether repeated use actually occurs. Reusability alone does not guarantee lower lifecycle impact.",
          },
          {
            id: "lightweight-single",
            title: "Lightweight single-use pack",
            description: "Reduce mass and material, with validated protection but no recovery pathway.",
            impact: { readiness: 8, environment: 4, evidence: 6, delivery: 8 },
            integrity: "mixed",
            feedback:
              "This may reduce material and transport burden, but it should not be described as circular without a recovery loop.",
          },
          {
            id: "eco-label",
            title: "Supplier “eco-pack”",
            description: "Select the option based on a generic label without composition or lifecycle evidence.",
            impact: { readiness: 3, environment: -4, evidence: -15, delivery: 5 },
            integrity: "weak",
            feedback:
              "A vague label is not evidence. Ask what is reduced, compared with what, over which lifecycle stages and how it was verified.",
          },
        ],
      },
      {
        title: "Redesign the delivery record",
        prompt: "How do you reduce paper without weakening traceability?",
        detail: "The warehouse needs signatures, revision control and access during system interruptions.",
        choices: [
          {
            id: "digital-controlled",
            title: "Controlled digital workflow",
            description: "Use authenticated records, version control and an offline contingency, then measure paper avoided.",
            impact: { readiness: 7, environment: 7, evidence: 12, delivery: 8 },
            integrity: "strong",
            feedback:
              "This changes the process rather than simply scanning paper. The benefit can be measured against the former workflow.",
          },
          {
            id: "scan-paper",
            title: "Print, sign and scan",
            description: "Create a digital copy while keeping the existing paper process unchanged.",
            impact: { readiness: 6, environment: -2, evidence: 3, delivery: 1 },
            integrity: "mixed",
            feedback:
              "Digitisation is not automatically dematerialisation. The process still consumes paper and adds storage duplication.",
          },
          {
            id: "remove-record",
            title: "Remove the document",
            description: "Stop producing the record before confirming traceability and retention requirements.",
            impact: { readiness: -10, environment: 5, evidence: -16, delivery: 6 },
            integrity: "weak",
            feedback:
              "Resource reduction cannot override safety, traceability or legal requirements. Redesign the control, not its purpose.",
          },
        ],
      },
    ],
    learning: [
      "A packaging claim must define material, scope, comparison, recovery route and expected number of uses.",
      "Protection failure, cleaning, returns and lost cases can reverse an apparent material benefit.",
      "Digital records reduce paper only when the underlying process changes and remains controlled.",
    ],
    claimCheck: "Use precise statements such as “20% less packaging mass in the validated design”, never an undefined “eco-pack”.",
  },
  {
    id: "reach",
    number: "04",
    short: "REACH (Registration, Evaluation, Authorisation and Restriction of Chemicals) Signal",
    title: "Find the evidence before release",
    location: "Engineering support cell",
    discipline: "REACH (Registration, Evaluation, Authorisation and Restriction of Chemicals) & VERUS",
    objective: "Support end-to-end REACH (Registration, Evaluation, Authorisation and Restriction of Chemicals) compliance without creating unsupported assurances.",
    target: "Evaluate chemical and engineering compliance evidence before any substitute coating release.",
    briefing:
      "A supplier proposes a substitute coating for a maintenance task. Performance data is promising, but the regulatory dossier is incomplete.",
    symbol: "⌁",
    accent: "orange",
    decisions: [
      {
        title: "Handle the proposed substitute",
        prompt: "What do you authorise?",
        detail: "This simulation does not replace the applicable Airbus, ECHA (European Chemicals Agency) or programme compliance process.",
        choices: [
          {
            id: "controlled-review",
            title: "Controlled technical review",
            description: "Hold release, request composition and regulatory evidence, and assess performance and worker exposure.",
            impact: { readiness: -2, environment: 5, evidence: 15, delivery: -3 },
            integrity: "strong",
            feedback:
              "A short hold protects the integrity of the decision. Substitution must consider compliance, safety and technical performance together.",
          },
          {
            id: "supplier-declaration",
            title: "Accept the supplier statement",
            description: "Proceed because the product is marketed as “safer” and “environmentally responsible”.",
            impact: { readiness: 5, environment: -3, evidence: -16, delivery: 7 },
            integrity: "weak",
            feedback:
              "Marketing language is not a regulatory dossier. The claim lacks the substance, scope and verification needed for release.",
          },
          {
            id: "reject-forever",
            title: "Reject all substitutes",
            description: "Avoid evaluation and keep the current material indefinitely.",
            impact: { readiness: 2, environment: -5, evidence: 2, delivery: 3 },
            integrity: "mixed",
            feedback:
              "Avoiding every alternative may preserve the status quo but does not support informed substitution or future compliance.",
          },
        ],
      },
      {
        title: "Communicate the decision",
        prompt: "The review is positive but conditional. How do you describe it?",
        detail: "Qualification testing and a supplier evidence item remain open.",
        choices: [
          {
            id: "conditional-status",
            title: "State the conditions and open evidence",
            description: "Report what has passed, what remains open, the owner and the next decision gate.",
            impact: { readiness: 5, environment: 3, evidence: 14, delivery: 4 },
            integrity: "strong",
            feedback:
              "A conditional status is useful when it is specific. It avoids both false reassurance and unnecessary alarm.",
          },
          {
            id: "fully-compliant",
            title: "Announce “fully compliant”",
            description: "Treat the positive review as completion of every requirement.",
            impact: { readiness: -2, environment: 0, evidence: -17, delivery: 4 },
            integrity: "weak",
            feedback:
              "The evidence does not support an absolute claim while qualification and supplier information remain open.",
          },
          {
            id: "no-update",
            title: "Share no status until final closure",
            description: "Keep the project team unaware of current conditions and next actions.",
            impact: { readiness: -7, environment: 0, evidence: -4, delivery: -5 },
            integrity: "mixed",
            feedback:
              "Silence reduces coordination. Transparent interim status is not the same as premature approval.",
          },
        ],
      },
    ],
    learning: [
      "Environmental preference does not override product performance, worker protection or regulatory evidence.",
      "A supplier declaration and a verified compliance assessment are not interchangeable.",
      "Conditional decisions should name open evidence, ownership, timing and the next gate.",
    ],
    claimCheck: "Use “reviewed against the listed requirements, with two actions open”, not an unsupported “fully compliant”.",
  },
  {
    id: "saf",
    number: "05",
    short: "SAF (sustainable aviation fuel) Flight File",
    title: "Account for the fuel, not the headline",
    location: "Training operations",
    discipline: "SAF (sustainable aviation fuel) investigation",
    objective: "Evaluate potential SAF (sustainable aviation fuel) use for training activity using lifecycle evidence.",
    target: "Investigate SAF lifecycle evidence and bounded, defensible reporting statements.",
    briefing:
      "A training flight may use a SAF (sustainable aviation fuel) blend. Procurement can secure a batch, but the pathway, chain of custody and lifecycle value must be recorded.",
    symbol: "△",
    accent: "violet",
    decisions: [
      {
        title: "Build the evidence file",
        prompt: "What information is required before making an emissions statement?",
        detail: "SAF (sustainable aviation fuel) lifecycle performance varies by pathway and must not be confused with zero tailpipe emissions.",
        choices: [
          {
            id: "verified-batch",
            title: "Verified batch evidence",
            description: "Record fuel amount, blend, pathway, certification, chain of custody and lifecycle value.",
            impact: { readiness: 5, environment: 10, evidence: 15, delivery: -2 },
            integrity: "strong",
            feedback:
              "This creates a defined basis for a lifecycle comparison. The result still applies only to the recorded fuel and boundary.",
          },
          {
            id: "generic-saf",
            title: "Generic SAF (sustainable aviation fuel) invoice",
            description: "Record that SAF (sustainable aviation fuel) was purchased but not the batch pathway, blend or lifecycle value.",
            impact: { readiness: 6, environment: 3, evidence: -8, delivery: 4 },
            integrity: "mixed",
            feedback:
              "Fuel use may be real, but the evidence is insufficient for a specific lifecycle reduction claim.",
          },
          {
            id: "marketing-label",
            title: "Rely on “green fuel” wording",
            description: "Use the supplier headline without checking certification or chain of custody.",
            impact: { readiness: 3, environment: -4, evidence: -17, delivery: 6 },
            integrity: "weak",
            feedback:
              "A broad environmental label does not establish eligibility, lifecycle performance or ownership of the claim.",
          },
        ],
      },
      {
        title: "Publish the learning note",
        prompt: "Which sentence is supportable?",
        detail: "The verified batch has a documented lifecycle value, but the aircraft still combusted fuel during the flight.",
        choices: [
          {
            id: "bounded-lifecycle",
            title: "Use a bounded lifecycle statement",
            description: "Describe the recorded blend and estimated lifecycle difference under the cited methodology.",
            impact: { readiness: 4, environment: 5, evidence: 14, delivery: 3 },
            integrity: "strong",
            feedback:
              "The statement identifies the amount, boundary and methodology instead of implying a zero-emission flight.",
          },
          {
            id: "zero-flight",
            title: "Call it a zero-emission flight",
            description: "Use SAF (sustainable aviation fuel) participation as proof that the flight caused no emissions.",
            impact: { readiness: -3, environment: -3, evidence: -18, delivery: 1 },
            integrity: "weak",
            feedback:
              "This is not supported. SAF (sustainable aviation fuel) claims concern lifecycle performance under defined conditions, not zero emissions at the aircraft.",
          },
          {
            id: "saf-only",
            title: "Say only “we used SAF (sustainable aviation fuel)”",
            description: "Omit blend, amount, pathway, reporting period and the nature of the claimed benefit.",
            impact: { readiness: 2, environment: 2, evidence: -7, delivery: 4 },
            integrity: "mixed",
            feedback:
              "The statement may be literally true but leaves out information needed to understand its significance.",
          },
        ],
      },
    ],
    learning: [
      "SAF (sustainable aviation fuel)-related emissions statements depend on lifecycle values, pathway, amount and chain of custody.",
      "A lifecycle reduction is not the same as eliminating combustion emissions during a flight.",
      "State whether a value is measured, certified, estimated or assumed.",
    ],
    claimCheck: "Describe the verified fuel batch and lifecycle boundary; never call a SAF (sustainable aviation fuel) flight “zero emission”.",
  },
  {
    id: "greenlight",
    number: "06",
    short: "Project Greenlight",
    title: "Make a decision with incomplete data",
    location: "Service design review",
    discipline: "Data & transparency",
    objective: "Assess sustainability in new service projects and turn gaps into owned actions.",
    target: "Assess new service projects using lifecycle context, explicit uncertainty and controlled decision gates.",
    briefing:
      "A mobile maintenance service is approaching approval. It may reduce aircraft downtime, but travel, energy, consumables and end-of-life data are incomplete.",
    symbol: "◎",
    accent: "blue",
    decisions: [
      {
        title: "Choose the assessment approach",
        prompt: "How do you bring sustainability into the gate?",
        detail: "The project team has two weeks before the design review.",
        choices: [
          {
            id: "material-assessment",
            title: "Material assessment + actions",
            description: "Assess significant impacts now, document assumptions and assign owners for decision-critical gaps.",
            impact: { readiness: 7, environment: 9, evidence: 14, delivery: 5 },
            integrity: "strong",
            feedback:
              "This supports a decision without pretending the evidence is complete. Material gaps become managed actions.",
          },
          {
            id: "perfect-data",
            title: "Wait for perfect data",
            description: "Delay every decision until all lifecycle information is available.",
            impact: { readiness: -10, environment: 3, evidence: 5, delivery: -11 },
            integrity: "mixed",
            feedback:
              "More evidence is valuable, but indefinite delay can prevent proportionate action. Prioritise decision-relevant uncertainty.",
          },
          {
            id: "good-intention",
            title: "Approve on good intention",
            description: "Assume reduced downtime makes the entire service sustainable.",
            impact: { readiness: 8, environment: -5, evidence: -16, delivery: 8 },
            integrity: "weak",
            feedback:
              "One potential benefit cannot represent the whole service. Travel, resources, waste and rebound effects still matter.",
          },
        ],
      },
      {
        title: "Close the data gap",
        prompt: "Travel emissions are not yet measured. What enters the review?",
        detail: "A comparable service provides a usable range, but not an exact value for this project.",
        choices: [
          {
            id: "range-uncertainty",
            title: "Use a range with uncertainty",
            description: "Apply a transparent proxy, run a sensitivity check and schedule replacement with measured data.",
            impact: { readiness: 6, environment: 5, evidence: 13, delivery: 6 },
            integrity: "strong",
            feedback:
              "A transparent range can be decision-useful. The source, proxy and uncertainty remain visible.",
          },
          {
            id: "enter-zero",
            title: "Enter zero until measured",
            description: "Keep the dashboard complete by treating missing travel data as no impact.",
            impact: { readiness: 1, environment: -7, evidence: -18, delivery: 5 },
            integrity: "weak",
            feedback:
              "Missing data is not zero. This creates false precision and biases the decision.",
          },
          {
            id: "hide-project",
            title: "Remove travel from the boundary",
            description: "Define the service assessment so that the unavailable category is excluded without explanation.",
            impact: { readiness: 3, environment: -6, evidence: -16, delivery: 6 },
            integrity: "weak",
            feedback:
              "A boundary can be legitimate, but changing it to hide a material impact makes the comparison misleading.",
          },
        ],
      },
    ],
    learning: [
      "Missing data must be labelled as missing, estimated or proxied—never silently entered as zero.",
      "Assessment boundaries should follow the decision, not be changed to improve the result.",
      "A credible gate records material impacts, assumptions, uncertainty, actions, owners and review dates.",
    ],
    claimCheck: "Say “provisionally assessed with the listed assumptions and data gaps”, not “sustainable by design”.",
  },
];

// Extend every mission with three new evidence-led decisions: 5 questions per mission.
missions.forEach((mission) => {
  const extension = deepModules[mission.id];
  if (extension) mission.decisions.push(...extension.decisions);
});

const integrityRules = [
  "Truthful and accurate",
  "Clear and unambiguous",
  "No material omissions",
  "Fair, like-for-like comparisons",
  "Relevant lifecycle considered",
  "Claims supported by evidence",
];

function clamp(value: number) {
  return Math.max(0, Math.min(100, value));
}

function addImpact(base: Metrics, impact: Impact): Metrics {
  return {
    readiness: base.readiness + (impact.readiness ?? 0),
    environment: base.environment + (impact.environment ?? 0),
    evidence: base.evidence + (impact.evidence ?? 0),
    delivery: base.delivery + (impact.delivery ?? 0),
  };
}

function deltaClass(value: number) {
  if (value > 0) return "positive";
  if (value < 0) return "negative";
  return "neutral";
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [callSign, setCallSign] = useState("Falcon Team");
  const [mode, setMode] = useState<"team" | "solo">("team");
  const [metrics, setMetrics] = useState<Metrics>(INITIAL_METRICS);
  const [completed, setCompleted] = useState<Record<string, Completion>>({});
  const [activeMissionId, setActiveMissionId] = useState<string | null>(null);
  const [decisionIndex, setDecisionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [runDelta, setRunDelta] = useState<Metrics>(ZERO_DELTA);
  const [runChoices, setRunChoices] = useState<string[]>([]);
  const [showEvidence, setShowEvidence] = useState(false);
  const [showBriefing, setShowBriefing] = useState(false);

  const activeMission = missions.find((mission) => mission.id === activeMissionId) ?? null;
  const completedCount = Object.keys(completed).length;
  const progress = Math.round((completedCount / missions.length) * 100);

  const currentDecision = activeMission?.decisions[decisionIndex] ?? null;

  const averageScore = useMemo(() => {
    const values = Object.values(metrics);
    return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
  }, [metrics]);

  function begin() {
    setCallSign((value) => value.trim() || (mode === "team" ? "Falcon Team" : "Falcon One"));
    setScreen("map");
    setShowBriefing(true);
  }

  function openMission(missionId: string) {
    setActiveMissionId(missionId);
    setDecisionIndex(0);
    setSelectedChoice(null);
    setRunDelta(ZERO_DELTA);
    setRunChoices([]);
    setScreen(completed[missionId] ? "debrief" : "theory");
  }

  function choose(choice: Choice) {
    if (selectedChoice) return;
    setSelectedChoice(choice);
    setRunDelta((current) => addImpact(current, choice.impact));
    setRunChoices((current) => [...current, choice.id]);
  }

  function continueDecision() {
    if (!activeMission || !selectedChoice) return;
    if (decisionIndex < activeMission.decisions.length - 1) {
      setDecisionIndex((value) => value + 1);
      setSelectedChoice(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setScreen("postlesson");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function completeMission() {
    if (!activeMission) return;
    if (!completed[activeMission.id]) {
      setMetrics((current) => ({
        readiness: clamp(current.readiness + runDelta.readiness),
        environment: clamp(current.environment + runDelta.environment),
        evidence: clamp(current.evidence + runDelta.evidence),
        delivery: clamp(current.delivery + runDelta.delivery),
      }));
      setCompleted((current) => ({
        ...current,
        [activeMission.id]: { choices: runChoices, delta: runDelta },
      }));
    }
    setScreen("map");
    setActiveMissionId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetSimulation() {
    setMetrics(INITIAL_METRICS);
    setCompleted({});
    setActiveMissionId(null);
    setDecisionIndex(0);
    setSelectedChoice(null);
    setRunDelta(ZERO_DELTA);
    setRunChoices([]);
    setScreen("welcome");
  }

  function goToFinal() {
    setScreen("final");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      {screen !== "welcome" && (
        <header className="topbar">
          <button className="brand-button" onClick={() => setScreen("map")} aria-label="Return to mission map">
            <span className="brand-mark">M26</span>
            <span>
              <strong>AIRPOWER</strong>
              <small>SUSTAINABILITY CHALLENGE</small>
            </span>
          </button>
          <div className="topbar-right">
            <span className="simulation-chip">TRAINING SIMULATION</span>
            <button className="text-button" onClick={() => setShowEvidence(true)}>
              Evidence protocol
            </button>
            <div className="operator-chip">
              <span className="operator-dot" />
              {callSign}
            </div>
          </div>
        </header>
      )}

      {screen === "welcome" && (
        <section className="welcome-screen">
          <nav className="welcome-nav">
            <div className="wordmark">
              <span className="brand-mark large">M26</span>
              <span>
                <strong>AIRPOWER</strong>
                <small>LEARNING EXPERIENCE</small>
              </span>
            </div>
            <button className="text-button" onClick={() => setShowEvidence(true)}>
              No-greenwashing protocol ↗
            </button>
          </nav>

          <div className="welcome-grid">
            <div className="hero-copy">
              <div className="eyebrow"><span /> SUSTAINABILITY DECISION LAB</div>
              <h1>
                Every decision
                <br />
                <em>changes the mission.</em>
              </h1>
              <p className="hero-lede">
                Work through six aerospace scenarios, 30 decisions and substantial theory. Protect operational readiness while examining lifecycle, resource, compliance and evidence trade-offs.
              </p>

              <div className="launch-panel">
                <div className="mode-switch" role="group" aria-label="Simulation mode">
                  <button className={mode === "team" ? "active" : ""} onClick={() => setMode("team")}>Team mission</button>
                  <button className={mode === "solo" ? "active" : ""} onClick={() => setMode("solo")}>Solo mission</button>
                </div>
                <label>
                  <span>{mode === "team" ? "Team call sign" : "Your call sign"}</span>
                  <input value={callSign} onChange={(event) => setCallSign(event.target.value)} maxLength={28} />
                </label>
                <button className="primary-button launch-button" onClick={begin}>
                  Launch mission <span>→</span>
                </button>
              </div>

              <p className="micro-disclaimer">
                Illustrative learning scenarios. Scores are not Airbus environmental performance data or certification.
              </p>
            </div>

            <div className="mission-orbit" aria-label="Mission disciplines preview">
              <div className="orbit-header">
                <span>MISSION SYSTEM</span>
                <span className="live-dot">READY</span>
              </div>
              <div className="radar">
                <div className="radar-sweep" />
                <div className="radar-core">
                  <strong>6</strong>
                  <span>MISSIONS</span>
                </div>
                {missions.map((mission, index) => (
                  <div key={mission.id} className={`orbit-node node-${index + 1}`}>
                    <span>{mission.symbol}</span>
                    <small title={mission.discipline} aria-label={mission.discipline}>{mission.id === "reach" ? "REACH / VERUS" : mission.id === "saf" ? "SAF" : mission.discipline}</small>
                  </div>
                ))}
              </div>
              <div className="integrity-strip">
                <span className="shield-icon">◇</span>
                <div>
                  <small>INTEGRITY RULE</small>
                  <strong>Evidence before claims</strong>
                </div>
                <span className="status-ok">ACTIVE</span>
              </div>
            </div>
          </div>

          <div className="welcome-objectives">
            <span>CO₂ LOGISTICS</span><i />
            <span>ENERGY</span><i />
            <span>MATERIALS</span><i />
            <span>REACH (Registration, Evaluation, Authorisation and Restriction of Chemicals)</span><i />
            <span>SAF (sustainable aviation fuel)</span><i />
            <span>DATA</span>
          </div>
        </section>
      )}

      {screen === "map" && (
        <section className="map-screen page-width">
          <div className="map-heading">
            <div>
              <div className="eyebrow"><span /> MISSION CONTROL / SIX MISSIONS</div>
              <h1>Choose your next decision zone.</h1>
              <p>Each mission includes a complete learning introduction, five applied decisions with explanations and a post-mission theory chapter. Complete all six to unlock the final review.</p>
            </div>
            <div className="progress-module" style={{ "--progress": `${progress * 3.6}deg` } as CSSProperties}>
              <div className="progress-ring"><span>{progress}%</span></div>
              <div>
                <small>MISSION PROGRESS</small>
                <strong>{completedCount} / {missions.length} complete</strong>
                <span>{completedCount === missions.length ? "Final debrief unlocked" : `${missions.length - completedCount} decision zones remaining`}</span>
              </div>
            </div>
          </div>

          <div className="scoreboard">
            {(Object.keys(metricMeta) as MetricKey[]).map((key) => (
              <div className="score-item" key={key}>
                <div className="score-label"><span>{metricMeta[key].label}</span><strong>{metrics[key]}</strong></div>
                <div className="score-track"><i style={{ width: `${metrics[key]}%` }} /></div>
              </div>
            ))}
            <button className="info-button" onClick={() => setShowEvidence(true)} aria-label="How scoring works">?</button>
          </div>

          <div className="mission-grid">
            {missions.map((mission) => {
              const isComplete = Boolean(completed[mission.id]);
              return (
                <article className={`mission-card accent-${mission.accent} ${isComplete ? "complete" : ""}`} key={mission.id}>
                  <div className="card-topline">
                    <span className="mission-number">M-{mission.number}</span>
                    <span className="mission-status">{isComplete ? "COMPLETE" : "AVAILABLE"}</span>
                  </div>
                  <div className="mission-symbol">{isComplete ? "✓" : mission.symbol}</div>
                  <small className="mission-location">{mission.location}</small>
                  <h2>{mission.short}</h2>
                  <p>{mission.objective}</p>
                  <div className="target-line"><span>TARGET</span>{mission.target.replace("2026 objective: ", "")}</div>
                  <button onClick={() => openMission(mission.id)}>
                    {isComplete ? "Review learning" : `Study & enter · ${mission.decisions.length} decisions`} <span>→</span>
                  </button>
                </article>
              );
            })}
          </div>

          <div className="map-footer">
            <div>
              <span className="shield-icon">◇</span>
              <p><strong>Integrity protocol active.</strong> Vague claims reduce the compliance & evidence score—even when they sound positive.</p>
            </div>
            <button className="secondary-button" disabled={completedCount < missions.length} onClick={goToFinal}>
              Open final debrief {completedCount < missions.length ? `· ${missions.length - completedCount} remaining` : "→"}
            </button>
          </div>
        </section>
      )}

      {screen === "theory" && activeMission && deepModules[activeMission.id] && (
        <section className="learning-screen page-width">
          <button className="back-button" onClick={() => setScreen("map")}>← Mission control</button>
          <div className="learning-heading">
            <div className="eyebrow"><span /> MISSION {activeMission.number} · THEORY BEFORE PRACTICE</div>
            <h1>{activeMission.short}</h1>
            <p>{deepModules[activeMission.id].intro}</p>
            <strong className="learning-path-badge">4 theory chapters · {activeMission.decisions.length} applied decisions · full theoretical review</strong>
          </div>
          <div className="learning-chapters">
            {deepModules[activeMission.id].before.map((block) => (
              <article className="learning-chapter" key={block.title}>
                <h2>{block.title}</h2><p>{block.body}</p>
              </article>
            ))}
          </div>
          <div className="learning-checklist">
            <h2>Before you decide, verify:</h2>
            <ul>{deepModules[activeMission.id].checklist.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className="learning-actions"><button className="primary-button" onClick={() => { setScreen("mission"); window.scrollTo({top:0,behavior:"smooth"}); }}>Continue to decision {decisionIndex + 1} of {activeMission.decisions.length} →</button></div>
        </section>
      )}

      {screen === "mission" && activeMission && currentDecision && (
        <section className="mission-screen page-width">
          <div className="learning-nav"><button className="back-button" onClick={() => setScreen("map")}>← Exit to mission control</button><button className="text-button" onClick={() => setScreen("theory")}>Review the theory ↗</button></div>
          <div className="mission-header">
            <div className={`large-symbol accent-${activeMission.accent}`}>{activeMission.symbol}</div>
            <div>
              <div className="eyebrow"><span /> MISSION {activeMission.number} / {activeMission.discipline}</div>
              <h1>{activeMission.title}</h1>
              <p>{activeMission.briefing}</p>
            </div>
            <div className="mission-objective-box">
              <small>LEARNING TARGET</small>
              <strong>{activeMission.target.replace("2026 objective: ", "")}</strong>
              <span>Training scenario · illustrative values</span>
            </div>
          </div>

          <div className="decision-layout">
            <aside className="decision-rail">
              <span className="rail-label">DECISION PATH</span>
              {activeMission.decisions.map((decision, index) => (
                <div className={`rail-step ${index === decisionIndex ? "active" : ""} ${index < decisionIndex ? "done" : ""}`} key={decision.title}>
                  <span>{index < decisionIndex ? "✓" : index + 1}</span>
                  <div><small>STEP {index + 1}</small><strong>{decision.title}</strong></div>
                </div>
              ))}
              <div className="rail-rule">
                <small>CLAIM INTEGRITY</small>
                <p>Choose what the available evidence can actually support.</p>
              </div>
            </aside>

            <div className="decision-main">
              <div className="decision-context">
                <div><span>STEP {decisionIndex + 1} OF {activeMission.decisions.length}</span><h2>{currentDecision.prompt}</h2></div>
                <p>{currentDecision.detail}</p>
              </div>

              <div className="choice-list">
                {currentDecision.choices.map((choice, index) => {
                  const isSelected = selectedChoice?.id === choice.id;
                  const isMuted = Boolean(selectedChoice && !isSelected);
                  return (
                    <button
                      key={choice.id}
                      className={`choice-card ${isSelected ? `selected integrity-${choice.integrity}` : ""} ${isMuted ? "muted" : ""}`}
                      onClick={() => choose(choice)}
                      disabled={Boolean(selectedChoice)}
                    >
                      <span className="choice-index">{String.fromCharCode(65 + index)}</span>
                      <span className="choice-copy"><strong>{choice.title}</strong><small>{choice.description}</small></span>
                      <span className="choice-arrow">{isSelected ? "✓" : "→"}</span>
                    </button>
                  );
                })}
              </div>

              {selectedChoice && (
                <div className={`consequence-panel integrity-${selectedChoice.integrity}`}>
                  <div className="consequence-top">
                    <div>
                      <small>DECISION EFFECT</small>
                      <strong>{selectedChoice.integrity === "strong" ? "Evidence holds" : selectedChoice.integrity === "mixed" ? "Trade-off requires context" : "Claim integrity warning"}</strong>
                    </div>
                    <div className="impact-chips">
                      {(Object.keys(metricMeta) as MetricKey[]).map((key) => {
                        const value = selectedChoice.impact[key] ?? 0;
                        return <span key={key} className={deltaClass(value)}>{metricMeta[key].short} {value > 0 ? "+" : ""}{value}</span>;
                      })}
                    </div>
                  </div>
                  <p>{selectedChoice.feedback}</p>
                  <div className="learning-explanation">
                    <small>WHY THIS MATTERS</small>
                    <p>{deepModules[activeMission.id]?.insights[decisionIndex] ?? "Check the evidence, the operational constraints and the decision boundary."}</p>
                    {selectedChoice.integrity !== "strong" && currentDecision.choices.some(c => c.integrity === "strong") && (
                      <div className="stronger-answer"><strong>What a more robust decision considers</strong><p>{currentDecision.choices.find(c => c.integrity === "strong")?.feedback}</p></div>
                    )}
                  </div>
                  <button className="primary-button" onClick={continueDecision}>
                    {decisionIndex < activeMission.decisions.length - 1 ? "Continue mission" : "Open full theory review"} <span>→</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {screen === "postlesson" && activeMission && deepModules[activeMission.id] && (
        <section className="learning-screen page-width">
          <button className="back-button" onClick={() => setScreen("map")}>← Mission control</button>
          <div className="learning-heading">
            <div className="eyebrow"><span /> MISSION {activeMission.number} · COMPLETE THEORY AFTER PRACTICE</div>
            <h1>What the five decisions teach us</h1>
            <p>Review the reasoning, the required evidence and the limits of the conclusions before recording this mission.</p>
          </div>
          <div className="learning-chapters after">
            {deepModules[activeMission.id].after.map((block) => (
              <article className="learning-chapter" key={block.title}><h2>{block.title}</h2><p>{block.body}</p></article>
            ))}
          </div>
          <div className="learning-checklist">
            <h2>Decision principles to retain</h2>
            <ul>{deepModules[activeMission.id].checklist.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className="learning-actions"><button className="primary-button" onClick={() => {setScreen("debrief"); window.scrollTo({top:0,behavior:"smooth"});}}>See your decision balance and debrief →</button></div>
        </section>
      )}

      {screen === "debrief" && activeMission && (
        <section className="debrief-screen page-width">
          <button className="back-button" onClick={() => setScreen("map")}>← Mission control</button>
          <div className="debrief-hero">
            <div className={`debrief-icon accent-${activeMission.accent}`}>{completed[activeMission.id] ? "✓" : activeMission.symbol}</div>
            <div>
              <div className="eyebrow"><span /> MISSION {activeMission.number} / DEBRIEF</div>
              <h1>{activeMission.short}</h1>
              <p>{completed[activeMission.id] ? "Review the evidence rules from this completed mission." : "The scenario is complete. Convert the decision into reusable knowledge."}</p>
            </div>
            <div className="debrief-stamp"><span>{completed[activeMission.id] ? "REVIEW" : "DECISION"}</span><strong>{completed[activeMission.id] ? "LOGGED" : "COMPLETE"}</strong></div>
          </div>

          <div className="debrief-grid">
            <div className="learning-panel">
              <small className="panel-kicker">WHAT TO CARRY INTO THE JOB</small>
              <h2>Three things that matter.</h2>
              <ol>
                {activeMission.learning.map((item, index) => (
                  <li key={item}><span>0{index + 1}</span><p>{item}</p></li>
                ))}
              </ol>
            </div>
            <div className="claim-panel">
              <div className="claim-header"><span className="shield-icon">◇</span><small>NO-GREENWASHING CHECK</small></div>
              <h2>Make only the claim the evidence supports.</h2>
              <blockquote>{activeMission.claimCheck}</blockquote>
              <div className="claim-rules">
                <span>BASELINE</span><span>BOUNDARY</span><span>METHOD</span><span>DATE</span><span>UNCERTAINTY</span>
              </div>
            </div>
          </div>

          {!completed[activeMission.id] && (
            <div className="delta-summary">
              <div><small>MISSION IMPACT / SIMULATED</small><strong>Your decision balance</strong></div>
              {(Object.keys(metricMeta) as MetricKey[]).map((key) => (
                <span key={key} className={deltaClass(runDelta[key])}>{metricMeta[key].short}<strong>{runDelta[key] > 0 ? "+" : ""}{runDelta[key]}</strong></span>
              ))}
            </div>
          )}

          <div className="debrief-actions">
            <p>This completion records learning progress only. It is not an environmental certification or operational approval.</p>
            <button className="primary-button" onClick={completeMission}>{completed[activeMission.id] ? "Return to mission map" : "Log mission and continue"} <span>→</span></button>
          </div>
        </section>
      )}

      {screen === "final" && (
        <section className="final-screen page-width">
          <div className="final-orbit"><div className="final-core"><span>6/6</span><small>MISSIONS</small></div></div>
          <div className="eyebrow centered"><span /> FINAL LEARNING DEBRIEF</div>
          <h1>Mission complete.<br /><em>Evidence remains active.</em></h1>
          <p className="final-lede">{callSign} completed the sustainability decision-learning experience with an overall scenario balance of <strong>{averageScore}/100</strong>.</p>

          <div className="final-scores">
            {(Object.keys(metricMeta) as MetricKey[]).map((key) => (
              <div key={key}>
                <small>{metricMeta[key].label}</small>
                <strong>{metrics[key]}</strong>
                <div><i style={{ width: `${metrics[key]}%` }} /></div>
              </div>
            ))}
          </div>

          <div className="final-message">
            <span className="shield-icon">◇</span>
            <div><small>YOUR OPERATING RULE</small><strong>Specific beats impressive. Evidence beats intention. Context beats a headline.</strong></div>
          </div>

          <p className="final-disclaimer">Training completion only. This result is not proof of environmental performance, compliance status or professional qualification.</p>
          <div className="final-actions">
            <button className="secondary-button" onClick={() => setScreen("map")}>Review mission map</button>
            <button className="primary-button" onClick={resetSimulation}>Start a new simulation <span>↻</span></button>
          </div>
        </section>
      )}

      {showBriefing && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Mission briefing">
          <div className="briefing-modal">
            <button className="modal-close" onClick={() => setShowBriefing(false)} aria-label="Close briefing">×</button>
            <div className="briefing-code">BRIEF / DECISION LAB</div>
            <h2>Your mission is not to choose the option that sounds green.</h2>
            <p>Protect the service while making decisions that can withstand scrutiny. Every scenario tests four dimensions.</p>
            <div className="briefing-metrics">
              {(Object.keys(metricMeta) as MetricKey[]).map((key, index) => (
                <div key={key}><span>0{index + 1}</span><strong>{metricMeta[key].label}</strong></div>
              ))}
            </div>
            <div className="briefing-rule"><span className="shield-icon">◇</span><p><strong>No-greenwashing protocol:</strong> claims must be specific, bounded and supported. Important trade-offs may not be hidden.</p></div>
            <button className="primary-button full" onClick={() => setShowBriefing(false)}>Acknowledge and enter mission control <span>→</span></button>
          </div>
        </div>
      )}

      {showEvidence && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Evidence protocol">
          <div className="evidence-modal">
            <button className="modal-close" onClick={() => setShowEvidence(false)} aria-label="Close evidence protocol">×</button>
            <div className="eyebrow"><span /> CLAIM INTEGRITY PROTOCOL</div>
            <h2>Environmental language must not outrun the evidence.</h2>
            <p className="modal-intro">The simulation uses six principles adapted from recognised green-claims guidance.</p>
            <div className="rule-grid">
              {integrityRules.map((rule, index) => <div key={rule}><span>0{index + 1}</span><strong>{rule}</strong></div>)}
            </div>
            <div className="evidence-note">
              <strong>Inside this simulation</strong>
              <p>All operational figures are illustrative. They do not represent Airbus performance. REACH (Registration, Evaluation, Authorisation and Restriction of Chemicals) decisions must follow the applicable company and regulatory process. SAF (sustainable aviation fuel) comparisons require a defined lifecycle methodology and evidence chain.</p>
            </div>
            <div className="source-links">
              <a href="https://www.gov.uk/government/publications/green-claims-code-making-environmental-claims/environmental-claims-on-goods-and-services" target="_blank" rel="noreferrer">CMA (Competition and Markets Authority) Green Claims Code ↗</a>
              <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024L0825" target="_blank" rel="noreferrer">EU (European Union) Directive 2024/825 ↗</a>
              <a href="https://chem.echa.europa.eu/obligation-lists/candidateList" target="_blank" rel="noreferrer">ECHA (European Chemicals Agency) Candidate List ↗</a>
              <a href="https://www.icao.int/CORSIA/fuels-lifecycle" target="_blank" rel="noreferrer">ICAO (International Civil Aviation Organization) SAF (sustainable aviation fuel) lifecycle ↗</a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
