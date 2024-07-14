import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PhotoService {
  public photos: UserPhoto[] = [];

  constructor(private http: HttpClient) { }

  public async addToGallery(photo: Photo) {
    // Save the picture and add it to photo collection
    const savedImageFile = await this.checkPhoto(photo);
    this.photos.unshift(savedImageFile);
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  private async readAsBase64(photo: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
  
    return await this.convertBlobToBase64(blob) as string;
  }

  private async checkPhoto(photo: Photo) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(photo);

    // Write the file to the data directory
    const fileName = Date.now() + '.jpeg';

    try {
      /*const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Data
      });
  
      console.log('Image saved : ', savedFile);*/
      
      // Prepare the form data
      const formData = new FormData();
      formData.append('file', base64Data);
      formData.append('filename', `${Date.now()}.jpeg`);
      

      // Replace 'your-api-endpoint' with your actual API endpoint
      const apiUrl = '';

      try {
        const response = await this.http.post(apiUrl, formData).toPromise();
        console.log('Upload successful', response);
      } catch (error) {
        console.error('Upload failed', error);
      }
  
      return {
        filepath: fileName,
        webviewPath: photo.webPath
      };
    } catch (error) {
      console.error('Error image not saved : ', error);
      throw error;
    }

  }

  public async takePhoto() {
    try {
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100
      });
      
      if (!capturedPhoto || !capturedPhoto.webPath) {
        throw new Error('No photo taken');
      }

      await this.addToGallery(capturedPhoto);
    } catch (error) {
      console.error('Error taking picture', error);
    }
  }

  public async selectPhoto() {
    try {
      /*onst selectedPhotos = await Camera.pickImages({
        quality: 100
      });

      if (!selectedPhotos || selectedPhotos.photos.length === 0) {
        throw new Error('No photos selected');
      }

      const savedImages: UserPhoto[] = [];
      for (const galleryPhoto of selectedPhotos.photos) {
        const photo: Photo = {
          format: galleryPhoto.format,
          webPath: galleryPhoto.webPath,
          path: galleryPhoto.path,
          exif: null,
          base64String: "",
          saved: false
        };
        const savedImageFile = await this.addToGallery(photo);
      }*/

      const selectedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos,
        quality: 100
      });

      if (!selectedPhoto || !selectedPhoto.webPath) {
        throw new Error('No photo selected');
      }

      await this.addToGallery(selectedPhoto);

    } catch (error) {
      console.error('Error selecting photo', error);
    }
  }

  public async scanCode(): Promise<string | null> {
    try {
      // Implement code scanning logic here
      const scannedCode = 'EXAMPLE_CODE';
      return scannedCode;
    } catch (error) {
      console.error('Error scanning code', error);
      return null;
    }
  }
}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}
