export default interface Service {
    initialize: () => void;
    destroy: () => void;
}