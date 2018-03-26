import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { matchMediaPolyfill } from './match-media-polyfill';

export interface WindowSize {
  readonly name: string;
  readonly minimumWidth?: number;
  readonly maximumWidth?: number;
}

export interface WindowSizes {
  [key: string]: WindowSize;
  lg: WindowSize;
  md: WindowSize;
  sm: WindowSize;
  xs: WindowSize;
}

export let windowSizes: Readonly<WindowSizes> = {
  lg: {
    name: 'lg',
    minimumWidth: 1200
  },
  md: {
    name: 'md',
    minimumWidth: 992,
    maximumWidth: 1199
  },
  sm: {
    name: 'sm',
    minimumWidth: 768,
    maximumWidth: 991
  },
  xs: {
    name: 'xs',
    maximumWidth: 767
  }
};

@Injectable()
export class WindowSizeService {
  private change: Observable<WindowSize>;
  private rules: { [key: string]: string } = {};
  private changeSubject = new Subject<WindowSize>();

  constructor(private zone: NgZone) {
    if (!!window) {
      matchMediaPolyfill();
      this.constructMatchMediaRules();

      const windowResizeDebounceInMilliseconds = 50;

      // On every resize event (so each pixel) the observable.fromEvent is triggering changeDetection for all subscribers (so possibly hunderds of CD's).
      // For this reason the event is wrapped in zone outside Angular;
      // Whenever a new value comes in - after the debounce time - we trigger the observable that does run in angular;
      // This way, the subscribers will be called only after the debounceTime.
      this.zone.runOutsideAngular(() => {
        let watchThis = fromEvent(window, 'resize')
        .pipe(debounceTime(windowResizeDebounceInMilliseconds));
        watchThis.subscribe(() => {
            this.zone.run(() => {
              this.changeSubject.next();
            });
          }
        );
      });
      this.change = this.changeSubject.asObservable().pipe(map(() => this.getCurrent()), distinctUntilChanged());
    }
  }

  /**
   * Subscribe to the resizing of the window and execute the provided function immediately.
   */
  subscribeAndExecute(f: (windowSize: WindowSize) => void): Subscription {
    f(this.getCurrent());
    return this.subscribe(f);
  }

  /**
   * Subscribe to the resizing of the window.
   */
  subscribe(f: (windowSize: WindowSize) => void): Subscription {
    return this.change.subscribe(f);
  }

  /**
   * Gets the current WindowSize.
   */
  getCurrent(): WindowSize {
    if (!window) {
      return windowSizes.lg;
    }

    for (let property in this.rules) {
      if (this.rules.hasOwnProperty(property)) {
        if (window.matchMedia(this.rules[property]).matches) {
          return windowSizes[property];
        }
      }
    }

    throw new Error('matchMedia rule without paired WindowSize object.');
  }

  private constructMatchMediaRules() {
    for (let property in windowSizes) {
      if (windowSizes.hasOwnProperty(property)) {
        let media = windowSizes[property];
        let result = '';
        if (media.minimumWidth !== undefined) {
          result += `(min-width:${media.minimumWidth}px)`;
        }
        if (media.minimumWidth !== undefined && media.maximumWidth !== undefined) {
          result += ' and ';
        }
        if (media.maximumWidth !== undefined) {
          result += `(max-width:${media.maximumWidth}px)`;
        }

        this.rules[property] = result;
      }
    }
  }
}
