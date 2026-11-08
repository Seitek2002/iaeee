import {
  awardRules,
  awards,
  conference,
  conferenceCommittee,
  conferenceDays,
  conferenceEditions,
  conferenceSessions,
  donation,
} from "./mock";

export async function getConference() {
  return { ...conference, committee: conferenceCommittee };
}

export async function getConferenceProgram() {
  return { days: conferenceDays, sessions: conferenceSessions };
}

export async function getConferenceEditions() {
  return conferenceEditions;
}

export async function getAwards() {
  return { awards, rules: awardRules, donation };
}
