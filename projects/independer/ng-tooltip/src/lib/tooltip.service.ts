import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';
import { ComponentPortal, DomPortalHost } from '@angular/cdk/portal';
import { TooltipContentComponent } from './tooltip-content.component';
import { TooltipComponent } from './tooltip.component';

@Injectable()
export class TooltipService {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  showTooltip(tooltipComponent: TooltipComponent) {
    const tooltipContentPortal = new ComponentPortal(TooltipContentComponent);

    const bodyPortalHost = new DomPortalHost(
      document.body,
      this.componentFactoryResolver,
      this.appRef,
      this.injector);

    bodyPortalHost.attach(tooltipContentPortal);

    tooltipContentPortal.component.prototype.header = tooltipComponent.header;
    tooltipContentPortal.component.prototype.content = tooltipComponent.content;
    tooltipContentPortal.component.prototype.tooltipContentTemplateRef = tooltipComponent.tooltipContentTemplateRef;
    tooltipContentPortal.component.prototype.tooltipRef = tooltipComponent.elementRef;
    tooltipContentPortal.component.prototype.hasCustomTrigger = tooltipComponent.hasCustomTrigger;
    tooltipContentPortal.component.prototype.isTooltipWide = tooltipComponent.isTooltipWide;
    tooltipContentPortal.component.prototype.size = tooltipComponent.size;
    tooltipContentPortal.component.prototype.windowSizeService = tooltipComponent.windowSizeService;
    tooltipContentPortal.component.prototype.changeDetector = tooltipComponent.changeDetector;

    return () => bodyPortalHost.detach();
  }
}
