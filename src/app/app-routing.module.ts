import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

/*
  Please check the article below for understanding how to structure modules
  https://medium.com/swlh/angular-organizing-features-and-modules-e582611a720e
*/

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  // {
  //   path: 'gerenciamento',
  //   loadChildren: () => import('./modules/gerenciamento/gerenciamento.module').then((m) => m.GerenciamentoModule),
  // },
  // {
  //   path: 'mensagem',
  //   loadChildren: () => import('./modules/mensagem/mensagem.module').then((m) => m.MensagemModule),
  // },
  // {
  //   path: 'aviso',
  //   loadChildren: () => import('./modules/aviso/aviso.module').then((m) => m.AvisoModule),
  // },
  {
    path: 'app',
    loadChildren: () => import('./modules/tabs/tabs.module').then((m) => m.TabsModule),
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
