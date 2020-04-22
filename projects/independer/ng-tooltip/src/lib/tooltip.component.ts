import { Component, ViewChild, ElementRef, Input, HostBinding, ComponentFactoryResolver, TemplateRef, ContentChild, AfterContentInit, ChangeDetectorRef } from '@angular/core';

import { TooltipService } from './tooltip.service';
import { WindowSizeService } from './window-size.service';

@Component({
  selector: 'ind-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator // @HostListener doesn't work with server-side rendering (creates a reference to a browser-only event type)
  host: {
    '(focusout)': 'onFocusout($event)',
    '(click)': 'onClick($event)'
  },
  queries: {
    tooltipContentTemplateRef: new ContentChild('tooltipContentTemplate')
  }
})
export class TooltipComponent implements AfterContentInit {
  @HostBinding('tabindex') tabIndex = -1;

  @Input() content: string;
  @Input() header: string;
  @Input() isTooltipWide: boolean;
  @Input() size: 'sm' | 'md' | 'lg' = 'sm'; // default to 'sm'

  @ViewChild('trigger', { static: true }) trigger: ElementRef;
  @ViewChild('customTrigger', { static: true }) customTrigger: ElementRef;

  tooltipContentTemplateRef: TemplateRef<any>;
  hasCustomTrigger: boolean;

  private tooltipContentComponentHideFn: Function;
  private isTooltipShown: boolean;

  constructor(
    private tooltipService: TooltipService,
    public elementRef: ElementRef,
    public cfr: ComponentFactoryResolver,
    public windowSizeService: WindowSizeService,
    public changeDetector: ChangeDetectorRef
  ) { }

  ngAfterContentInit() {
    setTimeout(() => {
      this.hasCustomTrigger = this.customTrigger?.nativeElement?.children?.length > 0;
      this.changeDetector.markForCheck();
    });
  }

  onFocusout(event: Event): boolean {
    this.hide();
    return this.stopPropagation(event);
  }

  onClick(event: Event): boolean {
    const isAnchor = (event.target || event.srcElement) instanceof HTMLAnchorElement;
    return isAnchor || this.stopPropagation(event);
  }

  toggle(event: Event): void {
    !this.isTooltipShown ? this.show() : this.hide();
  }

  hide(): void {
    if (this.tooltipContentComponentHideFn) {
      this.tooltipContentComponentHideFn();
      this.isTooltipShown = false;
    }
  }

  private show(): void {
    this.tooltipContentComponentHideFn = this.tooltipService.showTooltip(this);
    this.isTooltipShown = true;
  }

  private stopPropagation(event: Event): boolean {
    // perevents the default action and click event from bubbling outside of the tooltip component
    event.preventDefault();
    event.stopImmediatePropagation();
    return false;
  }

}
