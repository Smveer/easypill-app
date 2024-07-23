import { Injectable, Injector } from '@angular/core';
import { Camera, CameraResultType, CameraSource, GalleryPhoto, Photo } from '@capacitor/camera';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class PhotoService {
  public photos: UserPhoto[] = [];

  constructor(private http: HttpClient, private injector: Injector, private router: Router) {}

  private getHttpClient(): HttpClient {
    if (!this.http) {
      this.http = this.injector.get(HttpClient);
    }
    return this.http;
  }

  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    const savedImageFileEncoded = await this.savePicture(capturedPhoto);
    await this.sendImage(savedImageFileEncoded); 
  }

  private async savePicture(photo: Photo) {
    // Convert photo to base64 format, required by Filesystem API to save
    let base64Data = await this.readAsBase64(photo)
    base64Data = base64Data.replace("data:image/png;base64,", "");
    return base64Data;
 }

 private async sendImage(base64Data: string) {
  if (base64Data.startsWith("data:image/jpeg;base64,")) {
    base64Data = base64Data.replace("data:image/jpeg;base64,", "");
  }
  
  const apiUrl = 'https://easypill-jeb2ncxl6a-ew.a.run.app/detect_text'; // Replace with your FastAPI endpoint
  const postData = {
    image: base64Data
  };

  try {
    const http = this.getHttpClient(); // Use the manual injector to get HttpClient
    const response: any = await http.post(apiUrl, postData).toPromise();
    this.router.navigate(['/drug-selection'], { state: { detectedData: response } });

  } catch (error) {
    console.error('Error uploading image:', error);
  }
}

private convertBlobToBase64 = (blob: Blob): Promise<string> => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.onerror = reject;
  reader.onload = () => {
    resolve(reader.result as string);
  };
  reader.readAsDataURL(blob);
});

 private async readAsBase64(photo: Photo): Promise<string> {

        const response = await fetch(photo.webPath!);
        const blob = await response.blob();

        return await this.convertBlobToBase64(blob);
    }


  public async scanCode(): Promise<string | null> {
    try {
      // Check camera permission
      const status = await BarcodeScanner.checkPermission({ force: true });

      if (status.granted) {
        //await BarcodeScanner.hideBackground(); // Make background transparent

        // Start the scan
        const result = await BarcodeScanner.startScan(); // Start scanning

        if (result.hasContent) {
          console.log('Scanned code', result.content);
          return result.content;
        } else {
          console.log('No content found');
          return null;
        }
      } else {
        console.error('Camera permission denied');
        return null;
      }
    } catch (error) {
      console.error('Error scanning code', error);
      return null;
    } finally {
      BarcodeScanner.showBackground();
      BarcodeScanner.stopScan();
    }
  }
}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}
