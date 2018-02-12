import { async, TestBed } from '@angular/core/testing';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

describe('MyApp Component', () => {
  let fixture;
  let component;
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [MyApp],
        imports: [IonicModule.forRoot(MyApp)],
        providers: [StatusBar, SplashScreen],
      });
    }),
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(MyApp);
    component = fixture.componentInstance;
  });
  it('should be created', () => {
    expect(component instanceof MyApp).toBe(true);
  });
});
