import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-drug-selection',
  templateUrl: './drug-selection.page.html',
  styleUrls: ['./drug-selection.page.scss']
})
export class DrugSelectionPage implements OnInit {
  detectedData: string[] = [];

  constructor(private router: Router, private http: HttpClient) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { detectedData: any };

    console.log('Navigation state:', state);

    if (state && state.detectedData && Array.isArray(state.detectedData.detected_text)) {
      this.detectedData = state.detectedData.detected_text;
    } else {
      console.error('Detected data is not correctly structured:', state?.detectedData);
    }
  }
  ngOnInit(): void {}

  onItemClick(item: string): void {
    const apiUrl = 'https://easypill-jeb2ncxl6a-ew.a.run.app/selected_med'; // Replace with your actual endpoint
    const postData = { item };

    this.http.post(apiUrl, postData).subscribe(
      (response: any) => {
        console.log('API response:', response);
        // Handle the response as needed
        this.router.navigate(['/tabs/tab2'], { state: { medInfo: response } });
      },
      (error: any) => {
        console.error('Error making API call:', error);
      }
    );
  }
}
