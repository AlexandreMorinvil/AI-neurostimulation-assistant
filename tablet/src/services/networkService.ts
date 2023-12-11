import NetInfo, { NetInfoState, NetInfoSubscription } from '@react-native-community/netinfo';
import { Service } from "@class/Service";
import { Subject, Subscription } from 'rxjs';

class NetworkService implements Service {

  isConnected: boolean = false;
  private connectionStatusSubject: Subject<boolean> = new Subject;
  private unsubscribe!: NetInfoSubscription;

  constructor() {
    NetInfo.fetch().then((state: NetInfoState): void => {
      this.updateNetowrkInformationState(state);
    });
  }
  
  destroy(): void {
    if(this.unsubscribe) this.unsubscribe();
  }
  
  initialize(): void {
    this.unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      this.updateNetowrkInformationState(state);
    });
  }

  subscribeToConnectionStatus(callback: (connectionStatus: boolean) => void): Subscription {
    return this.connectionStatusSubject.subscribe(callback);
  }

  private updateNetowrkInformationState(state: NetInfoState): void {
    this.isConnected = state.isConnected || false;
    this.connectionStatusSubject.next(this.isConnected);
  }
}

const networkService = new NetworkService();
export { networkService }