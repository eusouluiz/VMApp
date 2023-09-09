import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';

/*
  Please check the article below for understanding how to structure modules
  https://medium.com/swlh/angular-organizing-features-and-modules-e582611a720e
*/

const routes: Routes = [
  { path: '', redirectTo: 'mensagem', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./modules/example-feature/example-feature.module').then((m) => m.HomePageModule),
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./modules/cadastro/cadastro.module').then((m) => m.CadastroModule),
  },
  {
    path: 'mensagem',
    loadChildren: () => import('./modules/mensagem/mensagem.module').then((m) => m.MensagemModule),
  },
  {
    path: 'aviso',
    loadChildren: () => import('./modules/aviso/aviso.module').then((m) => m.AvisoModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(
    [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule)
      },
      // necessario essa separacao por conta das tabs
      {
        path: 'app',
        component: FooterComponent,
        children:routes,
      }
    ],
    { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
