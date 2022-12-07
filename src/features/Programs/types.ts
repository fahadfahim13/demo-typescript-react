export interface Program {
  id: number;
  identifier: string;
  created_at: string;
  updated_at: string;
  name: string | null;
  financing_products?: any;
}

export interface ProgramResponse {
  "isSuccess": boolean;
  "isFailure": boolean;
  "responseCode": {
      "code": string;
  },
  data: Program[];
}

export interface SponsorResponse {
  "isSuccess": boolean;
  "isFailure": boolean;
  "responseCode": {
      "code": string;
  },
  data: Program[];
}