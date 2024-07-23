import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {

  isScanning = false;

  constructor(public photoService: PhotoService) { }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
    this.isScanning = true
  }

  scanCode() {
    this.isScanning = true; // Show the camera preview

    try {
      this.photoService.scanCode();
    } catch (error) {
      console.error('Error scanning code', error);
    } finally {
      this.isScanning = false; // Hide the camera preview
    }
  }

}
