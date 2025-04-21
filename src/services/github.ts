import axios from 'axios';
import { GitHubSearchResult, SearchParams, GitHubRepo } from '@/types';

const BASE_URL = 'https://api.github.com';

// レート制限対策のために環境変数からGitHub APIのトークンを取得
// 実際のアプリケーションで使用する場合は、何らかの方法でToken管理が必要
const getAuthHeaders = () => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  return token ? { Authorization: `token ${token}` } : {};
};

/**
 * GitHubリポジトリを検索する
 */
export const searchRepositories = async (params: SearchParams): Promise<GitHubSearchResult> => {
  const { q, sort = '', order = 'desc', per_page = 10, page = 1 } = params;
  
  const queryParams = new URLSearchParams();
  if (sort) queryParams.append('sort', sort);
  queryParams.append('order', order);
  queryParams.append('per_page', per_page.toString());
  queryParams.append('page', page.toString());
  
  try {
    const response = await axios.get<GitHubSearchResult>(
      `${BASE_URL}/search/repositories?q=${encodeURIComponent(q)}&${queryParams.toString()}`,
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to search repositories:', error);
    throw error;
  }
};

/**
 * 特定のGitHubリポジトリの詳細を取得する
 */
export const getRepository = async (owner: string, repo: string): Promise<GitHubRepo> => {
  try {
    const response = await axios.get<GitHubRepo>(
      `${BASE_URL}/repos/${owner}/${repo}`,
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to get repository ${owner}/${repo}:`, error);
    throw error;
  }
};

/**
 * ユーザーのリポジトリを取得する
 */
export const getUserRepositories = async (username: string, page = 1, per_page = 10): Promise<GitHubRepo[]> => {
  try {
    const response = await axios.get<GitHubRepo[]>(
      `${BASE_URL}/users/${username}/repos?page=${page}&per_page=${per_page}`,
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to get user repositories for ${username}:`, error);
    throw error;
  }
};
