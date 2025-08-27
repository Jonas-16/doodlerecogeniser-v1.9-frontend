// Centralized configuration for the frontend
export class Config {
  // Use environment variable in production, fallback to local dev server
  static BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000";
}

export default Config;