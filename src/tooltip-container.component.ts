import { Component, OnInit, OnDestroy, ViewContainerRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { TooltipService } from './tooltip.service';
import { TooltipContentComponent } from './tooltip-content.component';
import { TooltipComponent } from './tooltip.component';

@Component({
  selector: 'ind-tooltip-container',
  template: `<ng-template #tooltipContainer></ng-template>`,
  styles: [`:host { display: block; }`]
})
export class TooltipContainerComponent implements OnInit, OnDestroy {
  @ViewChild('tooltipContainer', { read: ViewContainerRef }) tooltipContainerEl: ViewContainerRef;

  constructor(private tooltipService: TooltipService) { }

  ngOnInit() {
    this.tooltipService.registerTooltipContainer(this);
  }

  ngOnDestroy() {
    this.tooltipService.deregisterTooltipContainer();
  }

  open<T extends TooltipContentComponent>(tooltipComponent: TooltipComponent): TooltipContentComponent {
    let componentFactory = (<ComponentFactoryResolver>tooltipComponent.cfr).resolveComponentFactory(TooltipContentComponent);

    let componentRef = this.tooltipContainerEl.createComponent(componentFactory);

    componentRef.instance.header = tooltipComponent.header;
    componentRef.instance.content = tooltipComponent.content;
    componentRef.instance.tooltipContentTemplateRef = tooltipComponent.tooltipContentTemplateRef;
    componentRef.instance.tooltipRef = tooltipComponent.elementRef;
    componentRef.instance.hasCustomTrigger = tooltipComponent.hasCustomTrigger;
    componentRef.instance.isTooltipWide = tooltipComponent.isTooltipWide;
    componentRef.instance.size = tooltipComponent.size;
    componentRef.instance.closed.subscribe(() => {
      componentRef.destroy();
    });

    return componentRef.instance;
  }
}
