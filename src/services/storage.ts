import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { SavedRepo, AppSettings } from '@/types';

interface Call2ArmsDB extends DBSchema {
  savedRepos: {
    key: number;
    value: SavedRepo;
    indexes: {
      'by-date': number;
    };
  };
  settings: {
    key: string;
    value: AppSettings;
  };
}

const DB_NAME = 'call2arms-db';
const DB_VERSION = 1;

// データベース初期化
const initDB = async (): Promise<IDBPDatabase<Call2ArmsDB>> => {
  return openDB<Call2ArmsDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // リポジトリ保存用のオブジェクトストア
      if (!db.objectStoreNames.contains('savedRepos')) {
        const repoStore = db.createObjectStore('savedRepos', { keyPath: 'id' });
        repoStore.createIndex('by-date', 'savedAt');
      }

      // 設定用のオブジェクトストア
      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings');
      }
    },
  });
};

// 初期設定
const defaultSettings: AppSettings = {
  theme: 'dark', // ダークモードのみをサポート
  resultsPerPage: 10,
  defaultSort: 'stars',
  defaultOrder: 'desc',
};

// リポジトリの保存・取得・削除の関数
export const storageService = {
  /**
   * リポジトリを保存する
   */
  saveRepo: async (repo: SavedRepo): Promise<void> => {
    try {
      const db = await initDB();
      await db.put('savedRepos', {
        ...repo,
        savedAt: repo.savedAt || Date.now(),
      });
    } catch (error) {
      console.error('Failed to save repository:', error);
      throw error;
    }
  },

  /**
   * 保存されたリポジトリを取得する
   */
  getSavedRepos: async (): Promise<SavedRepo[]> => {
    try {
      const db = await initDB();
      return db.getAllFromIndex('savedRepos', 'by-date');
    } catch (error) {
      console.error('Failed to get saved repositories:', error);
      return [];
    }
  },

  /**
   * 特定のリポジトリが保存されているか確認する
   */
  isRepoSaved: async (id: number): Promise<boolean> => {
    try {
      const db = await initDB();
      const repo = await db.get('savedRepos', id);
      return !!repo;
    } catch (error) {
      console.error(`Failed to check if repository ${id} is saved:`, error);
      return false;
    }
  },

  /**
   * 保存されたリポジトリを削除する
   */
  deleteRepo: async (id: number): Promise<void> => {
    try {
      const db = await initDB();
      await db.delete('savedRepos', id);
    } catch (error) {
      console.error(`Failed to delete repository ${id}:`, error);
      throw error;
    }
  },

  /**
   * アプリ設定を取得する
   */
  getSettings: async (): Promise<AppSettings> => {
    try {
      const db = await initDB();
      const settings = await db.get('settings', 'app-settings');
      return settings || defaultSettings;
    } catch (error) {
      console.error('Failed to get settings:', error);
      return defaultSettings;
    }
  },

  /**
   * アプリ設定を保存する
   */
  saveSettings: async (settings: AppSettings): Promise<void> => {
    try {
      const db = await initDB();
      await db.put('settings', settings, 'app-settings');
    } catch (error) {
      console.error('Failed to save settings:', error);
      throw error;
    }
  },
};
