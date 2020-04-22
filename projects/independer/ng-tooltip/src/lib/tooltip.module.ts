import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipComponent } from './tooltip.component';
import { TooltipContainerComponent } from './tooltip-container.component';
import { TooltipContentComponent } from './tooltip-content.component';
import { TooltipService } from './tooltip.service';
import { WindowSizeService } from './window-size.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    TooltipComponent,
    TooltipContainerComponent,
    TooltipContentComponent
  ],
  declarations: [
    TooltipComponent,
    TooltipContainerComponent,
    TooltipContentComponent
  ],
  entryComponents: [
    TooltipContentComponent
  ],
  providers: [
    WindowSizeService
  ]
})
export class TooltipModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TooltipModule,
      providers: [
        TooltipService,
        WindowSizeService
      ]
    };
  }
}
