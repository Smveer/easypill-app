import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

interface Medicine {
  name: string;
  dosage: string;
  quantity: number;
  pillsPerTake: number;
  timesPerDay: number;
  comment: string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  medicines: Medicine[] = [
    { name: 'Aspirin', dosage: '100mg', quantity: 20, pillsPerTake: 1, timesPerDay: 3, comment: 'For pain relief' },
    { name: 'Metformin', dosage: '500mg', quantity: 50, pillsPerTake: 2, timesPerDay: 2, comment: 'For diabetes' }
  ];

  constructor(private alertController: AlertController) {}

  async addMedicine() {
    const alert = await this.alertController.create({
      header: 'Add Medicine',
      inputs: [
        { name: 'name', type: 'text', placeholder: 'Medicine Name' },
        { name: 'dosage', type: 'text', placeholder: 'Dosage' },
        { name: 'quantity', type: 'number', placeholder: 'Quantity' },
        { name: 'pillsPerTake', type: 'number', placeholder: 'Pills per Take' },
        { name: 'timesPerDay', type: 'number', placeholder: 'Times per Day' },
        { name: 'comment', type: 'text', placeholder: 'Comment' }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Add', handler: (data) => {
          if (data.name && data.dosage && data.quantity && data.pillsPerTake && data.timesPerDay) {
            this.medicines.push({
              name: data.name,
              dosage: data.dosage,
              quantity: data.quantity,
              pillsPerTake: data.pillsPerTake,
              timesPerDay: data.timesPerDay,
              comment: data.comment
            });
          }
        }}
      ]
    });

    await alert.present();
  }

  async editMedicine(medicine: Medicine) {
    const alert = await this.alertController.create({
      header: 'Edit Medicine',
      inputs: [
        { name: 'name', type: 'text', value: medicine.name, placeholder: 'Medicine Name' },
        { name: 'dosage', type: 'text', value: medicine.dosage, placeholder: 'Dosage' },
        { name: 'quantity', type: 'number', value: medicine.quantity, placeholder: 'Quantity' },
        { name: 'pillsPerTake', type: 'number', value: medicine.pillsPerTake, placeholder: 'Pills per Take' },
        { name: 'timesPerDay', type: 'number', value: medicine.timesPerDay, placeholder: 'Times per Day' },
        { name: 'comment', type: 'text', value: medicine.comment, placeholder: 'Comment' }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Save', handler: (data) => {
          if (data.name && data.dosage && data.quantity && data.pillsPerTake && data.timesPerDay) {
            medicine.name = data.name;
            medicine.dosage = data.dosage;
            medicine.quantity = data.quantity;
            medicine.pillsPerTake = data.pillsPerTake;
            medicine.timesPerDay = data.timesPerDay;
            medicine.comment = data.comment;
          }
        }}
      ]
    });

    await alert.present();
  }

  deleteMedicine(medicine: Medicine) {
    this.medicines = this.medicines.filter(m => m !== medicine);
  }
}