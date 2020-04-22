import { Component, ElementRef, OnDestroy, OnInit, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { WindowSizeService, WindowSize, windowSizes } from './window-size.service';
import { offset, position } from './dom-helpers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ind-tooltip-content',
  templateUrl: './tooltip-content.component.html',
  styleUrls: ['./tooltip-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipContentComponent implements OnDestroy, OnInit {
  // Input passed from tooltip.component
  tooltipRef: ElementRef;
  content: string | undefined;
  header: string | undefined;
  hasCustomTrigger: boolean;
  tooltipContentTemplateRef: TemplateRef<any>;
  isTooltipWide = false;
  size: string | undefined;

  private _isShown = false;
  private _isShowing = false; // The animation state of fading out of the tooltip
  private windowSizeChangeSubscription: Subscription;

  private left?: number; private right?: number; private top?: number; private bottom?: number; private arrowLeft?: number; private arrowRight?: number;

  constructor(
    private windowSizeService: WindowSizeService,
    private changeDetector: ChangeDetectorRef
  ) { }

  get leftPosition() { return this.left ? `${this.left}px` : 'auto'; }
  get rightPosition() { return this.right ? `${this.right}px` : 'auto'; }
  get topPosition() { return this.top ? `${this.top}px` : 'auto'; }
  get bottomPosition() { return this.bottom ? `${this.bottom}px` : 'auto'; }
  get arrowLeftPosition() { return this.arrowLeft ? `${this.arrowLeft}px` : 'auto'; }
  get arrowRightPosition() { return this.arrowRight ? `${this.arrowRight}px` : 'auto'; }

  get isShown() { return this._isShown; }
  set isShown(value) {
    this._isShown = value;
    this.changeDetector.markForCheck();
  }

  get isShowing() { return this._isShowing; }
  set isShowing(value) {
    this._isShowing = value;
    this.changeDetector.markForCheck();
  }

  ngOnDestroy() {
    this.unsubscribeFromWindowSizeChange();
  }

  ngOnInit() {
    this.show();
  }

  // Methods
  // -------
  toggle(event: Event): void {
    !this.isShown ? this.show() : this.hide();
  }

  hide(): void {
    this.isShown = false;
    this.unsubscribeFromWindowSizeChange();
    setTimeout(() => { // waiting for the fade-out animation to finish...
      this.isShowing = false;
    }, 400);
  }

  private show(): void {
    this.isShowing = true;
    this.setTooltipPosition(this.windowSizeService.getCurrent());
    this.subscribeToWindowSizeChange();
    setTimeout(() => { // settimeout to make fade-in works (can not set both opacity animation and display at the same time)
      this.isShown = true;
    }, 0);
  }

  private subscribeToWindowSizeChange() {
    this.windowSizeChangeSubscription = this.windowSizeService.subscribeAndExecute((windowSize: WindowSize) => this.setTooltipPosition(windowSize));
  }

  private unsubscribeFromWindowSizeChange() {
    if (this.windowSizeChangeSubscription) {
      this.windowSizeChangeSubscription.unsubscribe();
    }
  }

  private setTooltipPosition(windowSize: WindowSize) {
    if ((!this.isShowing && !this.isShown) || !window) {
      // No tooltip is shown OR run in SSR, thus positioning is not needed.
      return;
    }

    let offsetTooltipEl = position(this.tooltipRef.nativeElement, document.body);
    let offsetParentEl = offset(document.body);

    // Tooltip horizontal position
    // ---------------------------
    const tooltipArrowWidth = 26;
    if (windowSize === windowSizes.xs) {
      // MOBILE
      this.left = 15;
      this.tooltipRef.nativeElement.width = offsetParentEl.width - 30;

      let arrowOffsetHorizontalFromSize = () => { if (this.size === 'lg') { return 10; } else if (this.size === 'md') { return 5; } else { return 0; } };
      this.arrowLeft = offsetTooltipEl.left - this.left + arrowOffsetHorizontalFromSize() + (this.hasCustomTrigger ? ((offsetTooltipEl.width / 2) - (tooltipArrowWidth / 2)) : -(offsetTooltipEl.width / 2));
    }
    else {
      // TABLET AND UP
      const tooltipWidth = 320; // have to match with scss

      let arrowOffsetHorizontalFromSize = () => { if (this.size === 'lg') { return 4; } else if (this.size === 'md') { return 2; } else { return 0; } };
      if (offsetTooltipEl.left + offsetParentEl.left < offsetParentEl.width / 2) {
        //  tooltip from left
        this.left = offsetTooltipEl.left - 20;
        this.arrowLeft = (tooltipArrowWidth / 2) + arrowOffsetHorizontalFromSize();
        this.arrowRight = undefined;
      }
      else {
        //  tooltip from right
        this.left = offsetTooltipEl.left - tooltipWidth + offsetTooltipEl.width - 40;
        this.arrowRight = (tooltipArrowWidth / 2) + (arrowOffsetHorizontalFromSize() * 2);
        this.arrowLeft = undefined;
      }
    }

    // Tooltip vertical position
    // -------------------------
    const tooltipArrowHeight = 14;
    this.top = offsetTooltipEl.top + offsetTooltipEl.height + tooltipArrowHeight;

    this.changeDetector.markForCheck();
  }



}
