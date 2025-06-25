export interface TLHEvent {
  id: string
  name: string
  category: string
  description: string
  outputFormat: string
  mentorPersona: string
}

export interface EventCategory {
  name: string
  description: string
  events: TLHEvent[]
}

export const eventCategories: EventCategory[] = [
  {
    name: "Legal & Policy Simulation",
    description: "Moot courts, negotiations, and policy simulations",
    events: [
      {
        id: "moot-court",
        name: "Moot Court",
        category: "Legal & Policy Simulation",
        description: "Legal case simulation and advocacy",
        outputFormat:
          "Legal memorials, case briefs, oral argument structures with proper legal citations and precedent analysis",
        mentorPersona: "Experienced legal advocate and moot court coach",
      },
      {
        id: "client-counselling",
        name: "Client Counselling",
        category: "Legal & Policy Simulation",
        description: "Legal client advisory simulation",
        outputFormat: "Client interview frameworks, legal advice structures, and counselling session plans",
        mentorPersona: "Senior legal practitioner specializing in client relations",
      },
      {
        id: "negotiation",
        name: "Negotiation",
        category: "Legal & Policy Simulation",
        description: "Legal and commercial negotiation",
        outputFormat: "Negotiation strategies, BATNA analysis, and settlement frameworks",
        mentorPersona: "Expert negotiator and mediation specialist",
      },
      {
        id: "arbitration-mediation",
        name: "Arbitration/Mediation",
        category: "Legal & Policy Simulation",
        description: "Alternative dispute resolution",
        outputFormat: "Arbitration awards, mediation proposals, and ADR procedural guidance",
        mentorPersona: "Certified arbitrator and mediation expert",
      },
    ],
  },
  {
    name: "Diplomacy & Global Governance",
    description: "Model UN, parliamentary debates, and diplomatic simulations",
    events: [
      {
        id: "model-un",
        name: "Model UN",
        category: "Diplomacy & Global Governance",
        description: "United Nations simulation",
        outputFormat: "Position papers, resolution drafts, diplomatic statements, and committee-specific formats",
        mentorPersona: "Experienced MUN director and international relations expert",
      },
      {
        id: "youth-parliament",
        name: "Youth Parliament",
        category: "Diplomacy & Global Governance",
        description: "Parliamentary procedure simulation",
        outputFormat: "Parliamentary speeches, bill drafts, and procedural motions",
        mentorPersona: "Parliamentary procedure expert and debate coach",
      },
      {
        id: "model-g20",
        name: "Model G20/EU/ASEAN",
        category: "Diplomacy & Global Governance",
        description: "International organization simulation",
        outputFormat: "Policy briefs, communiqués, and multilateral negotiation frameworks",
        mentorPersona: "International policy analyst and diplomatic advisor",
      },
      {
        id: "wsdc-debate",
        name: "WSDC-style Debates",
        category: "Diplomacy & Global Governance",
        description: "World Schools Debating Championship format",
        outputFormat: "Structured arguments, rebuttals, and reply speech frameworks",
        mentorPersona: "World Schools debate champion and coach",
      },
    ],
  },
  {
    name: "Speech & Discourse",
    description: "Parliamentary debates, public speaking, and discourse events",
    events: [
      {
        id: "british-parliamentary",
        name: "British Parliamentary",
        category: "Speech & Discourse",
        description: "BP format debate",
        outputFormat: "Opening/closing government/opposition cases, extensions, and whip speeches",
        mentorPersona: "British Parliamentary debate expert and tournament judge",
      },
      {
        id: "asian-parliamentary",
        name: "Asian Parliamentary",
        category: "Speech & Discourse",
        description: "AP format debate",
        outputFormat: "Government and opposition cases with Asian Parliamentary structure",
        mentorPersona: "Asian Parliamentary debate specialist and adjudicator",
      },
      {
        id: "public-speaking",
        name: "Public Speaking",
        category: "Speech & Discourse",
        description: "Prepared and impromptu speaking",
        outputFormat: "Speech outlines, rhetorical structures, and delivery techniques",
        mentorPersona: "Professional public speaking coach and rhetorician",
      },
      {
        id: "jam",
        name: "JAM (Just A Minute)",
        category: "Speech & Discourse",
        description: "Impromptu speaking challenge",
        outputFormat: "Quick speech structures, topic development techniques, and timing strategies",
        mentorPersona: "JAM competition expert and impromptu speaking coach",
      },
    ],
  },
  {
    name: "Legal & Academic Research",
    description: "Research-based legal and academic writing",
    events: [
      {
        id: "legal-essay",
        name: "Legal Essays",
        category: "Legal & Academic Research",
        description: "Academic legal writing",
        outputFormat: "Legal essay structure, thesis development, and scholarly citation format",
        mentorPersona: "Legal academic and scholarly writing expert",
      },
      {
        id: "case-commentary",
        name: "Case Commentaries",
        category: "Legal & Academic Research",
        description: "Legal case analysis",
        outputFormat: "Case analysis framework, legal reasoning critique, and commentary structure",
        mentorPersona: "Legal scholar specializing in case law analysis",
      },
    ],
  },
  {
    name: "Skill-Based Competitions",
    description: "Think tanks, exhibitions, and changemaker platforms",
    events: [
      {
        id: "youth-think-tank",
        name: "Youth Think Tanks",
        category: "Skill-Based Competitions",
        description: "Policy research and analysis",
        outputFormat: "Policy papers, research briefs, and think tank reports",
        mentorPersona: "Policy research expert and think tank analyst",
      },
      {
        id: "law-fest-exhibit",
        name: "Law Fest Exhibits",
        category: "Skill-Based Competitions",
        description: "Legal exhibition and presentation",
        outputFormat: "Exhibition proposals, presentation structures, and visual aid frameworks",
        mentorPersona: "Legal education specialist and exhibition curator",
      },
      {
        id: "changemaker-platform",
        name: "Global Changemaker Platforms",
        category: "Skill-Based Competitions",
        description: "Social impact and innovation",
        outputFormat: "Impact proposals, solution frameworks, and changemaker presentations",
        mentorPersona: "Social innovation expert and changemaker mentor",
      },
    ],
  },
]
