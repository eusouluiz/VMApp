import { Injectable } from '@angular/core';
import { LocalNotifications, LocalNotificationSchema } from '@capacitor/local-notifications';
import { addSeconds, format, parse, setHours, subDays } from 'date-fns';
import { isAfter, parseISO } from 'date-fns/esm';
import { Subject } from 'rxjs';
import { AppNotification } from '../../state/notification/notification.interface';
import { PlatformService } from '../platform/platform.service';
import { AvisoRepository } from '../../state/aviso/aviso.repository';
import { SessionRepository } from '../../state/session/session.repository';

@Injectable({
  providedIn: 'root',
})
export class LocalNotificationsService {
  public notificacoes$ = new Subject<AppNotification>();

  // private notificacoes: LocalNotificationSchema[] = [];

  private initialized = false;

  constructor(
    private platformService: PlatformService,
    private avisoRepository: AvisoRepository,
    private sessionRepository: SessionRepository
  ) {}

  init() {
    if (this.initialized || !this.platformService.isNative()) {
      return;
    }

    LocalNotifications.checkPermissions().then((permission) => {
      if (permission.display !== 'granted') {
        LocalNotifications.requestPermissions().then((permissionRequest) => {
          if (permissionRequest.display !== 'granted') {
            return;
          }
        });
      }
    });

    this.initialized = true;
    if (this.platformService.isAndroid()) {
      LocalNotifications.createChannel({
        id: 'default',
        name: 'VMApp Notifications',
        importance: 3,
        visibility: 1,
        lights: true,
        lightColor: '#f88b33',
        vibration: true,
      });
    }

    LocalNotifications.addListener('localNotificationActionPerformed', (notificationAction) => {
      const notification = notificationAction?.notification;
      const appNotification: AppNotification = {
        title: notification?.title,
        type: 'local',
        trigger: 'clicked',
      };

      appNotification.redirectRoute = ['/app/avisos'];

      this.notificacoes$.next(appNotification);
    });
  }

  async criarNotificacoes() {
    if (!this.platformService.isNative()) {
      return;
    }

    // this.notificacoes = [];
    // this.setNotificacoes(this.notificacoes);

    await this.criarNotificacoesAvisos();
  }

  async criarNotificacoesAvisos(): Promise<void> {
    this.avisoRepository.avisos$.subscribe((avisos) => {
      const avisosNotificaveis = avisos.filter((aviso) => {
        let turmas = this.sessionRepository.userInfo()?.responsavel?.alunos?.map((aluno) => {
          return aluno.turma_id;
        });

        if (!turmas?.length) {
          return;
        }

        return aviso.turmas?.some((turma) => turmas?.includes(turma.turma_id));
      });

      const notificacoes = avisosNotificaveis.map((aviso, index) => {
        const inAMoment = addSeconds(new Date(), 10);
        const notificacao: LocalNotificationSchema = {
          id: index + 1,
          title: aviso.titulo,
          body: aviso.texto,
          schedule: { at: inAMoment },
          extra: {
            source: 'aviso',
          },
        };
        return notificacao;
      });

      return this.setNotificacoes(notificacoes);
    });
  }

  async removeNotificacoes() {
    return this.criarNotificacoes();
  }

  // eslint-disable-next-line
  private async setNotificacoes(notificacoes: LocalNotificationSchema[]) {
    // Remove the comments below to schedule a notification for 10 seconds after the app opens

    // const inAMoment = addSeconds(new Date(), 10);
    // const debugNotification: LocalNotificationSchema = {
    //   id: 0,
    //   title: 'Teste',
    //   body: 'teste',
    //   schedule: { at: inAMoment },
    //   extra: {
    //     source: 'teste',
    //   },
    // };
    // notificacoes.push(debugNotification);

    try {
      const pendingNotifications = await LocalNotifications.getPending();
      if (pendingNotifications?.notifications?.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        LocalNotifications.cancel({ notifications: pendingNotifications.notifications });
      }

      await LocalNotifications.schedule({ notifications: notificacoes });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      console.info('Notificações não permitidas.', 'notificacoes');
    }
  }
}
