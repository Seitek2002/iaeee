import {
  aboutText,
  contactPeople,
  goals,
  members,
  membershipDocuments,
  milestones,
  organization,
  partnershipText,
  presidium,
  principles,
  services,
  standards,
} from "./mock";

export async function getOrganization() {
  return organization;
}

export async function getAbout() {
  return { text: aboutText, principles, goals };
}

export async function getPresidium() {
  return presidium;
}

export async function getContactPeople() {
  return contactPeople;
}

export async function getMembers() {
  return members;
}

export async function getMembership() {
  return { documents: membershipDocuments, partnership: partnershipText };
}

export async function getMilestones() {
  return [...milestones].sort((a, b) => a.year - b.year);
}

export async function getServices() {
  return services;
}

export async function getStandards() {
  return standards;
}
