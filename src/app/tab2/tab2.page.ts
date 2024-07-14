import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

interface Medicine {
  name: string;
  dosage: string;
  quantity: number;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  medicines: Medicine[] = [
    { name: 'Aspirin', dosage: '100mg', quantity: 20 },
    { name: 'Metformin', dosage: '500mg', quantity: 50 }
  ];

  constructor(private alertController: AlertController) {}

  async addMedicine() {
    const alert = await this.alertController.create({
      header: 'Add Medicine',
      inputs: [
        { name: 'name', type: 'text', placeholder: 'Medicine Name' },
        { name: 'dosage', type: 'text', placeholder: 'Dosage' },
        { name: 'quantity', type: 'number', placeholder: 'Quantity' }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Add', handler: (data) => {
          if (data.name && data.dosage && data.quantity) {
            this.medicines.push({ name: data.name, dosage: data.dosage, quantity: data.quantity });
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
        { name: 'quantity', type: 'number', value: medicine.quantity, placeholder: 'Quantity' }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Save', handler: (data) => {
          if (data.name && data.dosage && data.quantity) {
            medicine.name = data.name;
            medicine.dosage = data.dosage;
            medicine.quantity = data.quantity;
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