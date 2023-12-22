import AsyncStorage from '@react-native-async-storage/async-storage';
import { Service } from '@class/Service';

const SMARTWATCH_IP_ADDRESS_KEY = 'SMARTWATCH_IP_ADDRESS_KEY';
const SERVER_IP_ADDRESS_KEY = 'SERVER_IP_ADDRESS_KEY';

class PersistantDataService implements Service {

  initialize(): void { };
  destroy(): void { };

  async loadServerIpAddress(): Promise<string | null> {
    const ipAddress = await this.load(SERVER_IP_ADDRESS_KEY);
    return ipAddress ? (ipAddress as string) : null;
  }

  async loadSmartwatchIpAddress(): Promise<string | null> {
    const ipAddress = await this.load(SMARTWATCH_IP_ADDRESS_KEY);
    return ipAddress ? (ipAddress as string) : null;
  }

  async saveServerIpAddress(ipAddress: string): Promise<void> {
    this.save(SERVER_IP_ADDRESS_KEY, ipAddress);
  }

  async saveSmartwatchIpAddress(ipAddress: string): Promise<void> {
    this.save(SMARTWATCH_IP_ADDRESS_KEY, ipAddress);
  }

  private async clearPersistantData() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      // Error clearing data
      console.error(error);
    }
  }

  private async load(key: string, defautlValue?: unknown): Promise<unknown | null> {
    try {
      const stringValue = await AsyncStorage.getItem(key);
      if (stringValue === null) return defautlValue;
      return JSON.parse(stringValue);
    } catch (error) {
      // Error retrieving data
      console.error(error);
      return null;
    }
  }

  private async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      // Error removing data
      console.error(error);
    }
  }

  private async save(key: string, value: unknown): Promise<void> {
    try {
      const stringValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, stringValue);
    } catch (error) {
      // Error saving data
      console.error(error);
    }
  }
}

const persistantDataService = new PersistantDataService()
export { persistantDataService }