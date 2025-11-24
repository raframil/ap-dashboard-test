export interface Location {
  id: string;
  name: string;
  type: string;
  dimension: string;
  residents: Array<{
    id: string;
    name: string;
  }>;
  created: string;
}

export interface LocationsResponse {
  locations: {
    info: {
      count: number;
      pages: number;
      next: number | null;
      prev: number | null;
    };
    results: Location[];
  };
}

export interface LocationStats {
  name: string;
  residentCount: number;
  dimension: string;
}
