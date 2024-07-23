import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { filter } from 'rxjs/operators';

interface Medicine {
  code_cis: string;
  date_amm: string;
  denomination_du_medicament: string;
  etat_de_commercialisation: string;
  forme_pharmaceutique: string;
  numero_autorisation_europeenne: string | null;
  statut_administratif_autorisation_de_mise_sur_le_marche: string;
  statutbdm: string | null;
  surveillance_renforcee: string;
  titulaire: string;
  type_de_procedure_autorisation_de_mise_sur_le_marche: string;
  voies_administration: string;
  nb_pills: number;  // Add this line
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  medicines: Medicine[] = [];
  medInfo: Medicine | null = null;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.initializeMedInfo();
    });
  }

  initializeMedInfo() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { medInfo?: Medicine | Medicine[] };

    console.log('Navigation state:', state);

    if (state && state.medInfo) {
      if (Array.isArray(state.medInfo)) {
        console.log('Received array of medicines:', state.medInfo);
        if (state.medInfo.length > 0) {
          // Add the first item if it's an array
          this.medicines.push({ ...state.medInfo[0], nb_pills: state.medInfo[0].nb_pills || 0 });
        }
      } else {
        console.log('Received single medicine object:', state.medInfo);
        this.medicines.push({ ...state.medInfo, nb_pills: state.medInfo.nb_pills || 0 });
      }

      this.cdRef.detectChanges(); // Force change detection
    } else {
      console.log('No medInfo found in state.');
    }
  }

  async addMedicine() {
    const alert = await this.alertController.create({
      header: 'Add Medicine',
      inputs: [
        { name: 'denomination_du_medicament', type: 'text', placeholder: 'Medicine Name' },
        { name: 'forme_pharmaceutique', type: 'text', placeholder: 'Pharmaceutical Form' },
        { name: 'code_cis', type: 'text', placeholder: 'Code CIS' },
        { name: 'date_amm', type: 'text', placeholder: 'Date AMM' },
        { name: 'etat_de_commercialisation', type: 'text', placeholder: 'Commercialisation Status' },
        { name: 'numero_autorisation_europeenne', type: 'text', placeholder: 'Authorization Number' },
        { name: 'statut_administratif_autorisation_de_mise_sur_le_marche', type: 'text', placeholder: 'Administrative Status' },
        { name: 'surveillance_renforcee', type: 'text', placeholder: 'Surveillance' },
        { name: 'titulaire', type: 'text', placeholder: 'Holder' },
        { name: 'type_de_procedure_autorisation_de_mise_sur_le_marche', type: 'text', placeholder: 'Authorization Procedure' },
        { name: 'voies_administration', type: 'text', placeholder: 'Administration Routes' },
        { name: 'nb_pills', type: 'number', placeholder: 'Number of Pills', value: 0 } // Add this line
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Add', handler: (data) => {
          if (data.denomination_du_medicament && data.forme_pharmaceutique && data.code_cis) {
            this.medicines.push({
              code_cis: data.code_cis,
              date_amm: data.date_amm,
              denomination_du_medicament: data.denomination_du_medicament,
              etat_de_commercialisation: data.etat_de_commercialisation,
              forme_pharmaceutique: data.forme_pharmaceutique,
              numero_autorisation_europeenne: data.numero_autorisation_europeenne,
              statut_administratif_autorisation_de_mise_sur_le_marche: data.statut_administratif_autorisation_de_mise_sur_le_marche,
              statutbdm: null,
              surveillance_renforcee: data.surveillance_renforcee,
              titulaire: data.titulaire,
              type_de_procedure_autorisation_de_mise_sur_le_marche: data.type_de_procedure_autorisation_de_mise_sur_le_marche,
              voies_administration: data.voies_administration,
              nb_pills: data.nb_pills || 0 // Set default value if not provided
            });
            this.cdRef.detectChanges(); // Force change detection after adding
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
        { name: 'denomination_du_medicament', type: 'text', value: medicine.denomination_du_medicament, placeholder: 'Medicine Name' },
        { name: 'forme_pharmaceutique', type: 'text', value: medicine.forme_pharmaceutique, placeholder: 'Pharmaceutical Form' },
        { name: 'code_cis', type: 'text', value: medicine.code_cis, placeholder: 'Code CIS' },
        { name: 'date_amm', type: 'text', value: medicine.date_amm, placeholder: 'Date AMM' },
        { name: 'etat_de_commercialisation', type: 'text', value: medicine.etat_de_commercialisation, placeholder: 'Commercialisation Status' },
        { name: 'numero_autorisation_europeenne', type: 'text', value: medicine.numero_autorisation_europeenne, placeholder: 'Authorization Number' },
        { name: 'statut_administratif_autorisation_de_mise_sur_le_marche', type: 'text', value: medicine.statut_administratif_autorisation_de_mise_sur_le_marche, placeholder: 'Administrative Status' },
        { name: 'surveillance_renforcee', type: 'text', value: medicine.surveillance_renforcee, placeholder: 'Surveillance' },
        { name: 'titulaire', type: 'text', value: medicine.titulaire, placeholder: 'Holder' },
        { name: 'type_de_procedure_autorisation_de_mise_sur_le_marche', type: 'text', value: medicine.type_de_procedure_autorisation_de_mise_sur_le_marche, placeholder: 'Authorization Procedure' },
        { name: 'voies_administration', type: 'text', value: medicine.voies_administration, placeholder: 'Administration Routes' },
        { name: 'nb_pills', type: 'number', value: medicine.nb_pills, placeholder: 'Number of Pills' } // Add this line
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Save', handler: (data) => {
          if (data.denomination_du_medicament && data.forme_pharmaceutique && data.code_cis) {
            Object.assign(medicine, {
              code_cis: data.code_cis,
              date_amm: data.date_amm,
              denomination_du_medicament: data.denomination_du_medicament,
              etat_de_commercialisation: data.etat_de_commercialisation,
              forme_pharmaceutique: data.forme_pharmaceutique,
              numero_autorisation_europeenne: data.numero_autorisation_europeenne,
              statut_administratif_autorisation_de_mise_sur_le_marche: data.statut_administratif_autorisation_de_mise_sur_le_marche,
              statutbdm: null,
              surveillance_renforcee: data.surveillance_renforcee,
              titulaire: data.titulaire,
              type_de_procedure_autorisation_de_mise_sur_le_marche: data.type_de_procedure_autorisation_de_mise_sur_le_marche,
              voies_administration: data.voies_administration,
              nb_pills: data.nb_pills || 0 // Set default value if not provided
            });
            this.cdRef.detectChanges(); // Force change detection after editing
          }
        }}
      ]
    });

    await alert.present();
  }

  deleteMedicine(medicine: Medicine) {
    this.medicines = this.medicines.filter(m => m !== medicine);
    this.cdRef.detectChanges(); // Force change detection after deleting
  }
}
