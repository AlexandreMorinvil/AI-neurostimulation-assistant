export interface Service {
  initialize: () => void;
  destroy: () => void;
}