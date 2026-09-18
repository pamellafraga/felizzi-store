export type NavItem = {
  href: string;
  label: string;
};

export type SocialLink = {
  label: string;
  href: string;
  handle?: string;
};

export type Address = {
  street: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  countryCode: "BR";
};

export type OpeningHoursEntry = {
  days: string;
  time: string;
};

export type Milestone = {
  id: string;
  kicker: string;
  title: string;
  text: string;
  year?: string;
};
