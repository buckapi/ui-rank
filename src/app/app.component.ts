import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '@app/components/login/login.component'; // Adjust the path as necessary
import { HomeComponent } from './components/home/home.component';
import { virtualRouter } from './services/virtualRouter.service'; // Asegúrate de que la ruta sea correcta
import { GlobalService } from './services/global.service'; // Asegúrate de que la ruta sea correcta
import { ScriptService } from './services/script.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BhomeComponent } from './components/bhome/bhome.component';
import { AssetsmentsComponent } from './components/assetsments/assetsments.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { PodiumComponent } from './components/podium/podium.component';
// import { CardsComponent } from './components/cards/cards.component';

//  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    //  BrowserAnimationsModule,
    NgxSpinnerModule,
    CommonModule, 
    RouterOutlet,
    AddOrderComponent,
    LoginComponent,
    HomeComponent,
    BhomeComponent,
    ProfileComponent,
    AssetsmentsComponent,
    RankingComponent,
    PodiumComponent
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'c2o-v17';

  deviceInfo: any = null
  constructor(
    private deviceService: DeviceDetectorService,
    public script: ScriptService,
    public virtualRouter: virtualRouter,
    public global: GlobalService
    ) {

    this.script.load(
      'swiper',
      'custom-swiper',
      'feather',
      'custom-feather',
      'iconsax',
      'bootstrap',
      'homescreen-popup',
      'offcanvas-popup',
      'script',
    )
      .then(() => {
        console.log('Todos los scripts se cargaron correctamente');
      })
      .catch(error => console.log(error));

      this.epicFunction();

    }
    ngOnInit(): void {
      this.global.getCategories().subscribe(
        (data) => {
          this.global.categories = data.items; // Asigna los registros obtenidos a la variable 'registros'
          console.log(data); // Puedes hacer lo que quieras con los datos recibidos
        },
        (error) => {
          console.error(error); // Manejo de errores si la solicitud falla
        }
      );
      this.global.getInffo().subscribe(
        (data) => {
          this.global.info = data.items; // Asigna los registros obtenidos a la variable 'registros'
          console.log(data); // Puedes hacer lo que quieras con los datos recibidos
        },
        (error) => {
          console.error(error); // Manejo de errores si la solicitud falla
        }
      );
      this.global.getAssetments().subscribe(
        (data) => {
          this.global.assetments = data.items; // Asigna los registros obtenidos a la variable 'registros'
          console.log(data); // Puedes hacer lo que quieras con los datos recibidos
        },
        (error) => {
          console.error(error); // Manejo de errores si la solicitud falla
        }
      );
      this.epicFunction();
    }
    epicFunction() {
      this.deviceInfo = this.deviceService.getDeviceInfo();
      const isMobile = this.deviceService.isMobile();
      const isTablet = this.deviceService.isTablet();
      const isDesktopDevice = this.deviceService.isDesktop();
      if (isMobile) {
        this.global.deviceType = "Mobile";
        console.log("Mobile");
        //  this.global.grid=false;
        //  this.global.list=true;
      };
      if (isTablet) {
        this.global.deviceType = "Tablet";
        //  this.global.grid=false;
        //  this.global.list=false
      };
      if (isDesktopDevice) {
        this.global.deviceType = "Desktop";
        console.log("Desktop");
        // this.global.grid=true;
        // this.global.list=false
      };
  
    }
}
