export interface Member {
  name: string;
  year: number;
  github: string; // username only, no URL
  portfolio?: string;
  leetcode?: string;
}