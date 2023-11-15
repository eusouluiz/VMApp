import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './pages/tabs/tabs.page';
import { AuthGuardService } from '../../core/guards/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'mensagem',
        loadChildren: () => import('../mensagem/mensagem.module').then((m) => m.MensagemModule),
        canActivate: [AuthGuardService],
      },
      {
        path: 'aviso',
        loadChildren: () => import('../aviso/aviso.module').then((m) => m.AvisoModule),
        canActivate: [AuthGuardService],
      },
      {
        path: 'gerenciamento',
        loadChildren: () => import('../gerenciamento/gerenciamento.module').then((m) => m.GerenciamentoModule),
        canActivate: [AuthGuardService],
      },
      {
        path: '**',
        redirectTo: 'mensagem',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsRoutingModule {}
