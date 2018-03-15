import { Injectable } from '@angular/core';
import { TooltipContainerComponent } from './tooltip-container.component';

@Injectable()
export class TooltipService {
  private _registeredTooltipContainers: TooltipContainerComponent[] = [];
  private _tooltipContainer: TooltipContainerComponent;
  get tooltipContainer() {
    return this._tooltipContainer;
  }

  deregisterTooltipContainer() {
    this._registeredTooltipContainers.pop();
    this._tooltipContainer = this._registeredTooltipContainers[this._registeredTooltipContainers.length - 1];
  }

  registerTooltipContainer(tooltipContainer: TooltipContainerComponent) {
    this._tooltipContainer = tooltipContainer;
    this._registeredTooltipContainers.push(this._tooltipContainer);
  }
}
