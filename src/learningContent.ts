export type DeepBlock = { title: string; body: string };
export type DeepChoice = { id: string; title: string; description: string; feedback: string; integrity: "strong" | "mixed" | "weak"; impact: Partial<Record<"readiness" | "environment" | "evidence" | "delivery", number>> };
export type DeepDecision = { title: string; prompt: string; detail: string; choices: DeepChoice[] };
export type DeepModule = { intro: string; before: DeepBlock[]; checklist: string[]; insights: string[]; decisions: DeepDecision[]; after: DeepBlock[] };
/** Fictional training scenarios, not Airbus operational approvals, measured impacts or certifications. */
export const deepModules: Record<string, DeepModule> = {
  "route": {
    "intro": "A flight-control actuator has a 36-hour delivery deadline. Your task is to compare transport options without concealing readiness, technical eligibility or the full shipment boundary. The figures are simulated, not Airbus operational or environmental records.",
    "before": [
      {
        "title": "Comparable transport choices",
        "body": "A fair comparison uses the same part, quantity, origin, destination, time window and technical acceptance criteria. State how kg CO₂e is estimated, which legs count and how shared transport is allocated. An emissions figure without a documented boundary is not a decision-quality comparison."
      },
      {
        "title": "Operational availability and traceability",
        "body": "An available stock unit must be approved for the aircraft configuration and accompanied by usable traceability records. Alternative stock is not interchangeable just because it appears in a system. Check the deadline, buffer, transport disruption and verified substitution before choosing a lower-impact route."
      },
      {
        "title": "Systemic improvement",
        "body": "Repeated urgent transport may point to inventory visibility, forecasting, repair flow or engineering issues. The permanent improvement is often to remove avoidable urgencies, not to forbid fast transport regardless of mission requirements."
      },
      {
        "title": "Evidence and honest reporting",
        "body": "Distinguish booked, estimated and actual movements; include rebooking and cancellations in the calculation. Claim avoided transport only when the original movement did not occur. Do not report a universal percentage benefit based on mismatched provider quotes."
      }
    ],
    "checklist": [
      "Check required delivery time and part conformity.",
      "Compare the same emissions boundary and allocation.",
      "Verify local stock and cancellation evidence.",
      "Identify recurring system causes."
    ],
    "insights": [
      "Compare credible routes, not isolated emissions numbers.",
      "Changed connections invalidate the original route assumptions; re-evaluate the whole plan.",
      "A claimed saving needs the same calculation boundary.",
      "Urgent movements require transparent exceptions.",
      "Reduce root causes of avoidable express deliveries."
    ],
    "decisions": [
      {
        "title": "Verify transport data",
        "prompt": "Two suppliers quote different CO₂e estimates. One omits an intermediate leg.",
        "detail": "The cheaper result also uses a different shared-load allocation method.",
        "choices": [
          {
            "id": "route-common",
            "title": "Use a common calculation boundary",
            "description": "Re-estimate all legs with consistent allocation and documented assumptions.",
            "feedback": "Good. A like-for-like baseline is essential. The ranking may change after recalculation.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "route-headline",
            "title": "Use the lowest quoted number",
            "description": "Publish the headline reduction without checking its scope.",
            "feedback": "A low number is not evidence if the scopes differ. The claim is unsupported.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "route-dismiss",
            "title": "Ignore emissions completely",
            "description": "Decide only on speed because the quotes are inconsistent.",
            "feedback": "Readiness matters, but the data gap should be resolved or disclosed, not ignored.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      },
      {
        "title": "Handle a justified exception",
        "prompt": "Only urgent airfreight can meet the verified service window.",
        "detail": "Other options fail the approved schedule, even with buffers.",
        "choices": [
          {
            "id": "route-record",
            "title": "Authorise and record the trade-off",
            "description": "Document technical requirements, the reason, the emissions estimate and an improvement action.",
            "feedback": "Correct. A justified exception may be operationally necessary while remaining a real environmental burden.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "route-spin",
            "title": "Describe the express leg as sustainable",
            "description": "Use urgency as proof of a positive environmental outcome.",
            "feedback": "An operational need does not create an environmental benefit. The description is misleading.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "route-risk",
            "title": "Choose slow transport regardless",
            "description": "Overrule the service window to optimise the footprint figure.",
            "feedback": "A lower footprint cannot automatically outweigh an unacceptable readiness or technical consequence.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      },
      {
        "title": "Prevent repeated emergencies",
        "prompt": "This is the third unplanned movement of the same component family.",
        "detail": "Inventory records and forecast timing appear to be recurring contributors.",
        "choices": [
          {
            "id": "route-learn",
            "title": "Review demand, stock visibility and approvals",
            "description": "Assign owners; compare repeat expedites before and after a controlled change.",
            "feedback": "The process is the intervention. Measure avoided emergencies without weakening availability.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "route-ban",
            "title": "Ban all urgent shipments",
            "description": "Apply a single emissions target without a technical exception process.",
            "feedback": "A blanket ban shifts risk to operations and may cause unapproved workarounds.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "route-buy",
            "title": "Buy excess stock everywhere",
            "description": "Assume additional inventory always avoids a worse footprint.",
            "feedback": "Extra stock can create cost and obsolescence. Criticality and demand analysis should come first.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      }
    ],
    "after": [
      {
        "title": "Decision method for an urgent part",
        "body": "Begin with configuration, traceability and an approved service deadline. Compare only feasible transport options under a consistent boundary; show the forecast and disruption assumptions. If only a high-emissions route meets the constraints, log that decision accurately rather than claiming it is an environmental improvement."
      },
      {
        "title": "What would validate progress",
        "body": "Retain shipment and cancellation records, transport legs, mass, dates, allocation and the source of emission factors. Over multiple comparable cases, test whether better stock visibility reduces unplanned freight. A game score cannot itself prove a change in Airbus emissions."
      },
      {
        "title": "Transfer into the workplace",
        "body": "Planning, logistics, configuration management and programme teams should agree ownership for repeat emergencies. The useful output is a controlled decision process that can be challenged and improved, not the 'greenest' looking answer."
      }
    ]
  },
  "energy": {
    "intro": "A service hub must improve energy efficiency as workload and ambient temperatures change. Learn the difference between absolute consumption, intensity indicators and modelled savings before selecting a measure.",
    "before": [
      {
        "title": "Build a meaningful energy baseline",
        "body": "State the metering boundary, floor area, operating period, process load and opening hours. Report absolute kWh alongside kWh per useful activity unit. A declining kWh/m² indicator can coexist with rising total consumption, so one number must not hide the other."
      },
      {
        "title": "Identify significant energy uses",
        "body": "Ventilation, heating, cooling, compressed air and test equipment may behave differently. Safety-related extraction and required process conditions cannot be reduced simply to hit a target. Identify where controls or submetering can distinguish avoidable demand from necessary operation."
      },
      {
        "title": "Verify rather than assume savings",
        "body": "Equipment brochures and engineering models predict a result; post-implementation meter readings test it. Compare similar weather, activity and process requirements, and disclose missing readings. Separate a measured observation from an improvement causally attributed to the change."
      },
      {
        "title": "Do not confuse carbon with efficiency",
        "body": "Renewable electricity, energy-saving controls and carbon accounting address different questions. Even a validated energy-intensity reduction does not justify a broad 'zero carbon' label without the relevant emissions evidence and scope."
      }
    ],
    "checklist": [
      "Show absolute and normalised energy.",
      "Keep safety and process limits.",
      "Identify estimates and meter gaps.",
      "Use comparable post-change conditions."
    ],
    "insights": [
      "Metering plus controlled measures creates auditable evidence.",
      "Improved intensity does not prove reduced total energy.",
      "A missing reading is not zero consumption.",
      "Process safety remains a hard boundary.",
      "Attribution requires a weather- and activity-aware review."
    ],
    "decisions": [
      {
        "title": "Repair the baseline",
        "prompt": "One submeter failed for nine days during the reporting month.",
        "detail": "The upstream meter and operating-hour records can support an estimate.",
        "choices": [
          {
            "id": "energy-gap",
            "title": "Label the gap and recovery method",
            "description": "Recover or estimate using defensible data, showing the uncertainty.",
            "feedback": "Correct: metered and estimated values must remain distinguishable.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "energy-zero",
            "title": "Enter zero for the missing days",
            "description": "Treat missing data as an energy reduction.",
            "feedback": "Missing data is not a saving. It creates false precision.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "energy-omit",
            "title": "Exclude the zone silently",
            "description": "Publish a trend with a changed boundary.",
            "feedback": "A legitimate boundary adjustment must be disclosed and made comparable.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      },
      {
        "title": "Protect extraction requirements",
        "prompt": "Proposed HVAC scheduling may compromise an industrial extraction requirement.",
        "detail": "The process owner has not yet validated the change.",
        "choices": [
          {
            "id": "energy-test",
            "title": "Validate constraints before a trial",
            "description": "Check airflow, extraction, comfort and technical limits; then meter the controlled change.",
            "feedback": "Safety and process limits define what efficiency measures can be tested.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "energy-force",
            "title": "Implement the setback immediately",
            "description": "Trust the model because the saving looks attractive.",
            "feedback": "A projected saving cannot override safe and required airflow.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "energy-abandon",
            "title": "Reject all HVAC changes",
            "description": "Treat every possible intervention as unacceptable.",
            "feedback": "The concern warrants a documented assessment, not the end of improvement.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      },
      {
        "title": "Interpret reported savings",
        "prompt": "Energy intensity fell 8%, but the quarter was milder than the baseline.",
        "detail": "Operating hours also changed during the period.",
        "choices": [
          {
            "id": "energy-adjust",
            "title": "Normalise and state uncertainty",
            "description": "Compare like conditions and report both absolute and adjusted values.",
            "feedback": "Correct. Attribution needs comparable activity and weather.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "energy-claim",
            "title": "Credit the whole 8% to controls",
            "description": "Publish a single percentage without conditions.",
            "feedback": "The observed change has multiple possible causes.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "energy-silent",
            "title": "Report nothing for twelve months",
            "description": "Suppress qualified interim observations.",
            "feedback": "Early qualified data can be useful if it is not treated as final proof.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      }
    ],
    "after": [
      {
        "title": "A defensible measurement plan",
        "body": "Define significant uses and meters, establish a reproducible baseline, set safe operating limits, implement the change and compare results under equivalent conditions. Show kWh and normalised performance, and explain how weather or activity affected the estimate."
      },
      {
        "title": "The typical reporting trap",
        "body": "A 5% intensity target is not a promise of 5% less total electricity. A procurement change that affects an emissions figure does not necessarily represent a change in energy demand. Keep the meaning and evidence of each indicator separate."
      },
      {
        "title": "Practical application",
        "body": "A facilities team can use these questions to design a monitoring and verification plan. The appropriate outcome is data and operating discipline that enable justified decisions—not an unqualified sustainability headline."
      }
    ]
  },
  "packaging": {
    "intro": "An avionics component needs safe packaging and traceable delivery records. Compare material use and digitalisation without sacrificing shock protection, recovery feasibility or controlled documentation.",
    "before": [
      {
        "title": "Compare equivalent protection",
        "body": "A valid functional unit is an intact, conforming unit delivered under defined handling conditions. Weight reductions are not helpful if shock, vibration, cleanliness or moisture protection fails. A damaged part can introduce far greater waste and rework."
      },
      {
        "title": "The real cost of reuse",
        "body": "Reusable cases need tracking, inspection, cleaning, repair, return transport and a reliable number of rotations. Supplier design life is not actual achieved reuse. Include loss and damage when comparing lifecycle burdens."
      },
      {
        "title": "Paperless does not mean uncontrolled",
        "body": "A controlled digital workflow must maintain authenticated records, revisions, signatures, retention and access during outages. Printing, signing and scanning the same documents may increase complexity without reducing paper."
      },
      {
        "title": "Environmental labels are not proof",
        "body": "A claim needs a defined comparison, functional unit, material scope and recovery route. Evaluate the supplier evidence and test the solution; do not present a vague 'eco-pack' description as verified performance."
      }
    ],
    "checklist": [
      "Check packaging qualification.",
      "Assess real reuse cycles and returns.",
      "Keep mandatory document controls.",
      "Compare defined functional units."
    ],
    "insights": [
      "Reuse requires a tested recovery loop.",
      "Controlled digital records are a process change.",
      "Lighter material is irrelevant if protection fails.",
      "Use observed rotations, not promised lifetimes.",
      "Plan an auditable offline contingency."
    ],
    "decisions": [
      {
        "title": "Test the protection",
        "prompt": "A lighter pack has not passed representative vibration tests.",
        "detail": "The unit is sensitive to shocks and damage would cause rework.",
        "choices": [
          {
            "id": "pack-verify",
            "title": "Test and retain the qualified baseline",
            "description": "Release only when protection evidence meets the applicable acceptance criteria.",
            "feedback": "Technical acceptance comes before any claim of reduced lifecycle burden.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "pack-early",
            "title": "Release the lighter pack now",
            "description": "Assume lower mass proves a better result.",
            "feedback": "Potential damage makes the comparison unsound and threatens readiness.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "pack-no",
            "title": "Reject all lighter packaging",
            "description": "Never study possible improvements.",
            "feedback": "Qualification is necessary; banning assessment is not an improvement strategy.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      },
      {
        "title": "Measure actual reuse",
        "prompt": "A case advertised for 20 trips has averaged only four.",
        "detail": "Return transport and cleaning are also needed.",
        "choices": [
          {
            "id": "pack-full",
            "title": "Calculate impact per intact delivery",
            "description": "Include manufacturing, actual rotations, losses, cleaning and return legs.",
            "feedback": "Actual service performance determines the comparison.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "pack20",
            "title": "Claim 20 realised uses",
            "description": "Use design capacity as actual performance.",
            "feedback": "Potential lifespan is not evidence of actual rotation.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "pack-weight",
            "title": "Compare only empty-case mass",
            "description": "Ignore the return and cleaning loop.",
            "feedback": "Weight is relevant but insufficient for a full reuse comparison.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      },
      {
        "title": "Prepare an outage plan",
        "prompt": "The digital record system is offline during a shipment release.",
        "detail": "Configuration and handover records remain mandatory.",
        "choices": [
          {
            "id": "pack-contingency",
            "title": "Use a controlled offline process",
            "description": "Record the required authorisation, protect the data and reconcile it later.",
            "feedback": "Digital resilience preserves traceability when a system is unavailable.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "pack-skip",
            "title": "Release without evidence",
            "description": "Treat digitalisation as permission to remove control.",
            "feedback": "The record requirement has not disappeared.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "pack-allpaper",
            "title": "Restore duplicate paper forever",
            "description": "Make every digital flow a permanent print–scan process.",
            "feedback": "An exceptional contingency does not justify permanent duplication.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      }
    ],
    "after": [
      {
        "title": "Lifecycle comparison in practice",
        "body": "Start with equal protection and traceability. Compare packaging materials, transport, cleaning, return logistics and actual reuse. Report effects per successful shipment, not per kilogram of packaging alone. A reusable label without a functioning return system proves little."
      },
      {
        "title": "Operational controls to retain",
        "body": "Keep vibration/shock qualification, component-specific requirements, revision control, authorised signatures and offline recovery. Measure how much paper truly disappears from the process and whether duplicated tasks were removed."
      },
      {
        "title": "A useful workplace exercise",
        "body": "Test two qualified packaging systems over a comparable number of deliveries, with documented losses and rotations. Analyse which input reverses the result and set a decision gate before wider use."
      }
    ]
  },
  "reach": {
    "intro": "A substitute coating looks promising but technical qualification and regulatory evidence are incomplete. The objective is to make a scoped decision without confusing an SDS, a supplier claim and formal approval.",
    "before": [
      {
        "title": "Identify the duty before the document",
        "body": "Regulatory obligations vary with whether the material is a substance, mixture or article and the relevant actor and use. A safety data sheet is not an all-purpose REACH compliance certificate. Check what duty applies to this application."
      },
      {
        "title": "Compliance and technical quality are distinct",
        "body": "A substitute may have acceptable chemical information yet fail corrosion resistance, compatibility or process qualification. It may also meet performance tests while leaving exposure or regulatory issues open. Both sets of gates must be addressed."
      },
      {
        "title": "Maintain a traceable evidence pack",
        "body": "List composition or controlled disclosure, document version and date, scope of supplier statements, the applicability of restrictions or authorisations, process controls, tests and open responsibilities. Marketing language cannot stand in for the actual dossier."
      },
      {
        "title": "Use conditional decisions properly",
        "body": "A status report should say what has passed, what remains open, who owns each action and what cannot yet be released. It must not call a material unconditionally compliant because some preliminary tests succeeded."
      }
    ],
    "checklist": [
      "Identify product, role and intended use.",
      "Separate engineering and chemical obligations.",
      "Evaluate worker exposure and process constraints.",
      "Document release gates and open owners."
    ],
    "insights": [
      "The first question tests controlled technical and chemical review.",
      "A conditional status should not be inflated to full approval.",
      "An SDS is not universal evidence for every REACH obligation.",
      "Substitution includes process and worker-safety validation.",
      "A useful decision names release boundaries, owners and next gates."
    ],
    "decisions": [
      {
        "title": "Evaluate the dossier",
        "prompt": "A supplier sends an SDS but no evidence connecting it to the proposed use.",
        "detail": "A coating change also requires technical verification.",
        "choices": [
          {
            "id": "reach-specific",
            "title": "Map evidence to the applicable duties",
            "description": "Identify the product, use, obligation, revisions and missing evidence.",
            "feedback": "That makes the evidence auditable and the open questions actionable.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "reach-automatic",
            "title": "Use the SDS as full approval",
            "description": "Treat one document as proof of every obligation.",
            "feedback": "The safety data sheet is not blanket regulatory and engineering approval.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "reach-infinite",
            "title": "Stop the review indefinitely",
            "description": "Avoid naming what documentation is needed.",
            "feedback": "A hold may be justified but should identify responsible next steps.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      },
      {
        "title": "Validate the new process",
        "prompt": "Curing the substitute changes ventilation and worker exposure.",
        "detail": "Process approval and local extraction have not been checked.",
        "choices": [
          {
            "id": "reach-controls",
            "title": "Validate the integrated maintenance process",
            "description": "Check ventilation, exposure controls, technical test conditions and release approvals.",
            "feedback": "Substitution must address the material and the way it is applied.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "reach-field",
            "title": "Test it directly on a live aircraft",
            "description": "Use the supplier's laboratory result as field approval.",
            "feedback": "Laboratory promise cannot replace approved maintenance and safety controls.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "reach-oldonly",
            "title": "Keep the old material forever",
            "description": "Reject any further evaluation.",
            "feedback": "Avoiding the evaluation could create future compliance and supply risk.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      },
      {
        "title": "Set the release gate",
        "prompt": "Qualification testing passed, but a required supplier declaration remains missing.",
        "detail": "Planning needs an answer today.",
        "choices": [
          {
            "id": "reach-status",
            "title": "Issue a conditional status, not release",
            "description": "Name verified items, open evidence, owner and the next decision gate.",
            "feedback": "Conditional status enables planning without pretending approval is complete.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "reach-green",
            "title": "Call the substitution fully compliant",
            "description": "Treat engineering success as sufficient for everything.",
            "feedback": "Qualification and regulatory evidence address different questions.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "reach-hide",
            "title": "Do not share any status",
            "description": "Leave project teams unaware of the open issue.",
            "feedback": "Silence makes cross-functional planning and escalation harder.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      }
    ],
    "after": [
      {
        "title": "How to construct the decision record",
        "body": "Identify the specific material and application, obligations, supplier evidence, technical tests and worker controls. Separate acceptable results from unresolved items, and record the authority responsible for release. Use the appropriate corporate procedures and current ECHA information."
      },
      {
        "title": "Common evidence mistakes",
        "body": "A supplier declaration is evidence to assess, not automatic approval. An SDS does not prove that all duties for a component are satisfied. Technical qualification does not automatically close regulatory questions. Each conclusion needs a date, scope and owner."
      },
      {
        "title": "Practical application",
        "body": "Materials Engineering, Procurement, Quality and Compliance can use the exercise to practise evidence reviews and decision communication. The game is not a substitute for a legally or technically authorised release."
      }
    ]
  },
  "saf": {
    "intro": "A proposed SAF blend requires reliable batch information and a carefully defined lifecycle comparison. This mission distinguishes documented fuel use, eligible accounting claims and atmospheric effects that the data do not cover.",
    "before": [
      {
        "title": "Know what is being compared",
        "body": "Document the blend, batch, fuel pathway, quantity, reference comparator, lifecycle calculation method and reporting period. SAF pathways differ; a generic invoice does not establish a specific lifecycle emissions reduction."
      },
      {
        "title": "Lifecycle is not tailpipe zero",
        "body": "An aircraft burning SAF still produces CO₂ during operation. Lifecycle greenhouse-gas comparisons address defined production and use boundaries, not proof of a zero-emissions flight. Other non-CO₂ climate effects may require separate analysis."
      },
      {
        "title": "Check chain of custody and reporting rights",
        "body": "Confirm whether physical delivery or an approved allocation mechanism supports the claimed benefit. Accounting rules vary; avoid assuming that one purchased quantity can be credited to multiple flights or claimed by different organisations."
      },
      {
        "title": "Report what the evidence supports",
        "body": "Use limited language linked to the actual methodology and batch. Different comparators and accounting periods cannot be averaged into a valid reduction. The absence of data for broader climate effects should be stated."
      }
    ],
    "checklist": [
      "Record batch, blend, pathway and amount.",
      "Verify applicable allocation and chain of custody.",
      "Never equate SAF with zero aircraft emissions.",
      "State scope and uncalculated effects."
    ],
    "insights": [
      "Batch-level evidence is needed for a lifecycle result.",
      "An accurate claim names boundaries, not a 'zero emission' headline.",
      "The allocation framework determines who may claim a benefit.",
      "Use an equivalent comparator and methodology.",
      "Explicitly disclose the effects outside the calculation."
    ],
    "decisions": [
      {
        "title": "Check attribution",
        "prompt": "A purchase claims a fuel benefit, but the allocation method is not described.",
        "detail": "The physical fuel delivery may differ from the stated reporting allocation.",
        "choices": [
          {
            "id": "saf-verify",
            "title": "Verify scheme, allocation and ownership",
            "description": "Confirm unique attribution, eligible rules and appropriate wording.",
            "feedback": "A defensible claim needs evidence that the reported organisation can attribute the benefit.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "saf-multiply",
            "title": "Apply the benefit to all flights",
            "description": "Assume one purchase supports a fleet-wide claim.",
            "feedback": "A benefit cannot be duplicated across activities without an applicable and verified accounting basis.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "saf-ignore",
            "title": "Discard every piece of evidence",
            "description": "Assume no limited statement is possible.",
            "feedback": "A factual, scoped claim may still be possible once the framework is checked.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      },
      {
        "title": "Compare lifecycle estimates",
        "prompt": "Two documents use different fossil baselines and periods.",
        "detail": "Both quote attractive reduction percentages.",
        "choices": [
          {
            "id": "saf-method",
            "title": "Recalculate under one applicable method",
            "description": "Align amount, period, comparator and lifecycle boundary.",
            "feedback": "Only a like-for-like methodology can support the stated difference.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "saf-maximum",
            "title": "Use the highest percentage",
            "description": "Select the most impressive vendor headline.",
            "feedback": "A maximum figure may not apply to this batch or reporting scope.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "saf-mean",
            "title": "Average both percentages",
            "description": "Avoid analysing the inconsistent assumptions.",
            "feedback": "A mean of incompatible estimates has no defensible interpretation.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      },
      {
        "title": "Explain climate limitations",
        "prompt": "The result covers lifecycle greenhouse gases but not validated non-CO₂ impacts.",
        "detail": "The training note is about to be published.",
        "choices": [
          {
            "id": "saf-bounded",
            "title": "Describe the covered scope and omissions",
            "description": "State methods and uncertainty; explain what was not evaluated.",
            "feedback": "This prevents claiming a total-climate effect from partial evidence.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "saf-total",
            "title": "Claim total climate-neutral flying",
            "description": "Treat lifecycle values as the whole physical impact.",
            "feedback": "Combustion emissions and other climate effects are not eliminated by the evidence.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "saf-delete",
            "title": "Omit scope notes",
            "description": "Publish only the positive figure.",
            "feedback": "A factually calculated number can mislead if essential limits are concealed.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      }
    ],
    "after": [
      {
        "title": "Build a defensible fuel record",
        "body": "Document volume, blend, pathway, scheme, custody, reference methodology, comparator, reporting owner and uncertainty. Distinguish eligible, allocated, measured and estimated information. Verify current applicable rules rather than relying on a marketing claim."
      },
      {
        "title": "What a proper statement looks like",
        "body": "Describe the documented fuel quantity and lifecycle boundary; provide only the comparison supported by the specific factor and method. A lifecycle GHG estimate is not evidence of zero emissions at the aircraft or a complete accounting of non-CO₂ effects."
      },
      {
        "title": "Practical application",
        "body": "Use the case to challenge suppliers and internal reporting proposals. Corporate accounting and operational authorisation must follow their own approval processes, not this illustrative simulator."
      }
    ]
  },
  "greenlight": {
    "intro": "A new mobile-maintenance service may help availability, but travel, materials and rework data remain incomplete. Your task is to compare equivalent outcomes and turn the main uncertainties into managed actions.",
    "before": [
      {
        "title": "Define the function of the service",
        "body": "Compare equivalent completed maintenance outcomes at an agreed quality and availability level. Count relevant travel, energy, consumables, replacement parts, waste and repeat activity. A single avoided downtime event does not prove total sustainability."
      },
      {
        "title": "Find decision-relevant impacts",
        "body": "Assess hotspots likely to change the preferred option rather than waiting for every possible measurement. State the boundary and whether evidence is measured, estimated or missing. Significant omissions cannot be hidden by redefining scope."
      },
      {
        "title": "Use transparent assumptions",
        "body": "When original measurements are unavailable, use credible proxy ranges and sensitivity checks. If plausible utilisation or travel patterns reverse the choice, treat those variables as decision-critical and create conditions for additional evidence."
      },
      {
        "title": "Governance makes the evaluation useful",
        "body": "A review should record unresolved questions, assigned owners, authorised gates, specific stop conditions and a re-evaluation date. An optimistic sustainability label is not a technical or business approval."
      }
    ],
    "checklist": [
      "Define equivalent maintenance outcomes.",
      "Show all relevant lifecycle hotspots.",
      "Label proxy estimates and uncertainty.",
      "Set ownership and re-review triggers."
    ],
    "insights": [
      "Proportionate review with accountable gaps is useful.",
      "Missing travel data must not be entered as zero.",
      "Changing boundaries cannot hide material impacts.",
      "Utilisation and repeat journeys may change the ranking.",
      "An approval with estimates needs monitoring and owners."
    ],
    "decisions": [
      {
        "title": "Compare equivalent services",
        "prompt": "One offer assumes a single mobile visit; another includes bench repair and follow-up transport.",
        "detail": "Both solutions may produce different rework outcomes.",
        "choices": [
          {
            "id": "gate-function",
            "title": "Define a comparable service outcome",
            "description": "Compare a qualified completed maintenance event under consistent technical conditions.",
            "feedback": "The functional unit determines which journeys and activities belong in the assessment.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "gate-count",
            "title": "Compare one visit against one repair",
            "description": "Ignore differences in service quality and repeat work.",
            "feedback": "Different outcomes cannot support a fair impact comparison.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "gate-ignore",
            "title": "Exclude technical performance",
            "description": "Treat service quality as irrelevant.",
            "feedback": "Technical acceptability is part of a meaningful sustainability comparison.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      },
      {
        "title": "Test uncertainty",
        "prompt": "Travel is a major estimated impact and utilisation may vary widely.",
        "detail": "The preferred option changes with realistic usage assumptions.",
        "choices": [
          {
            "id": "gate-range",
            "title": "Run low, base and high cases",
            "description": "Record thresholds that reverse the choice and the data needed to resolve them.",
            "feedback": "Sensitivity identifies the uncertainties worth investigating.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "gate-best",
            "title": "Choose the best-case forecast",
            "description": "Use only the scenario that favours the proposal.",
            "feedback": "Selecting optimistic assumptions is not a neutral assessment.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "gate-average",
            "title": "Insert a single unexplained value",
            "description": "Avoid the complexity of scenarios.",
            "feedback": "A central estimate alone hides a material decision risk.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      },
      {
        "title": "Control the post-launch review",
        "prompt": "A conditional review approves the concept for further work.",
        "detail": "Real travel, consumables and repairs can now be recorded.",
        "choices": [
          {
            "id": "gate-owner",
            "title": "Assign indicators, owners and review dates",
            "description": "Compare actual operation with the assumptions and reopen issues when thresholds are exceeded.",
            "feedback": "The assessment becomes an auditable learning process.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "gate-close",
            "title": "Treat the initial assessment as permanent proof",
            "description": "No further evidence will be collected.",
            "feedback": "The original estimate may fail when actual operation differs.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "gate-dashboard",
            "title": "Collect data without decision owners",
            "description": "Create reports but no review authority or triggers.",
            "feedback": "Data without a next action cannot reliably improve operations.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      }
    ],
    "after": [
      {
        "title": "A strong project review",
        "body": "Define the functional unit, significant lifecycle impacts, credible alternatives, evidence quality, boundary, assumptions and decision-critical gaps. Keep technical compliance and sustainability comparison distinct, with accountable approval gates."
      },
      {
        "title": "Managing incomplete evidence",
        "body": "Use estimates and proxies when appropriate, clearly labelled. Test uncertainty that could reverse a choice. A conditional decision needs owners and objective triggers for revisiting an assumption."
      },
      {
        "title": "Practical application",
        "body": "A programme or service-design team can embed this disciplined questioning into a relevant decision gate. The simulation teaches a method; real approvals remain with the competent Airbus functions."
      }
    ]
  }
};
