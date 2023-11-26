export interface AppNotification {
  type: 'local';
  trigger?: string;
  title?: string;
  sourceIds?: string[];
  redirectRoute?: string[];
}
