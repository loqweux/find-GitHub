export interface Repo {
  id: number;
  name: string;
  language: string | null;
  forks_count: number;
  stargazers_count: number;
  updated_at: string;
  description: string | null;
  license: { name: string } | null;
}
export interface RepoListResponse {
  total_count: number;
  items: Repo[];
}
