import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { SelectBoxService } from './services/select-box';
import {
    CHECKBOX_DATA_PROVIDER,
    RADIO_GROUP_DATA_PROVIDER,
    SELECTBOX_DATA_PROVIDER,
    TAGBOX_DATA_PROVIDER,
} from '@cnx-dev/angular-devextreme';
import { TagBoxService } from './services/tag-box';
import { CheckBoxService } from './services/check-box';
import { RadioGroupService } from './services/radio-group';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        { provide: SELECTBOX_DATA_PROVIDER, useClass: SelectBoxService },
        { provide: TAGBOX_DATA_PROVIDER, useClass: TagBoxService },
        { provide: CHECKBOX_DATA_PROVIDER, useClass: CheckBoxService },
        { provide: RADIO_GROUP_DATA_PROVIDER, useClass: RadioGroupService },
    ],
};
