import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { SelectBoxService } from './services/select-box';
import { SELECTBOX_DATA_PROVIDER, TAGBOX_DATA_PROVIDER } from '@cnx-dev/angular-devextreme';
import { TagBoxService } from './services/tag-box';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        { provide: SELECTBOX_DATA_PROVIDER, useClass: SelectBoxService },
        { provide: TAGBOX_DATA_PROVIDER, useClass: TagBoxService },
    ],
};
