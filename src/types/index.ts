// GitHub API関連の型定義
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  license: {
    key: string;
    name: string;
    url: string;
  } | null;
  topics: string[];
  owner: {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
  };
}

export interface GitHubSearchResult {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubRepo[];
}

// お気に入りのリポジトリの型定義
export interface SavedRepo extends GitHubRepo {
  savedAt: number; // UnixタイムスタンプでローカルDBに保存した日時
  notes?: string; // ユーザーが追加できるメモ
}

// 検索パラメータの型定義
export interface SearchParams {
  q: string;
  sort?: 'stars' | 'forks' | 'updated' | '';
  order?: 'desc' | 'asc';
  per_page?: number;
  page?: number;
}

// アプリケーションの設定項目の型定義
export interface AppSettings {
  theme: 'dark';
  resultsPerPage: number;
  defaultSort: 'stars' | 'forks' | 'updated' | '';
  defaultOrder: 'desc' | 'asc';
}
