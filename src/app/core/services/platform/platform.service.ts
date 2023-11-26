import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  private platform!: 'android' | 'ios' | 'electron' | 'web';

  constructor() {
    this.getDevice();
  }

  public isNative() {
    return this.platform === 'android' || this.platform === 'ios';
  }

  public isWeb() {
    return this.platform === 'web';
  }

  public isAndroid() {
    return this.platform === 'android';
  }

  public isIos() {
    return this.platform === 'ios';
  }

  private async getDevice() {
    const deviceInfo = await Device.getInfo();
    this.platform = deviceInfo.platform;
  }
}
