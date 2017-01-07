import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ServicesPage } from '../pages/services/services';
import { SettingsPage } from '../pages/settings/settings';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { PlacesPage} from '../pages/places/places';
import { Storage } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    ServicesPage,
    SettingsPage,
    HomePage,
    PlacesPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ServicesPage,
    SettingsPage,
    HomePage,
    PlacesPage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Storage]
})
export class AppModule {}
