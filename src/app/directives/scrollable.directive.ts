import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[scrollable]',
})
export class ScrollableDirective {
  @Output() scrollPosition = new EventEmitter();

  constructor(public el: ElementRef) {}

  @HostListener('scroll', ['$event'])
  onScroll(e) {
    try {
      const top = e.target.scrollTop;
      const height = this.el.nativeElement.scrollHeight;
      const offset = this.el.nativeElement.offsetHeight;

      if (-top > height - offset - 1) {
        this.scrollPosition.emit('bottom');
      }

      if (top === 0) {
        this.scrollPosition.emit('top');
      }
    } catch (err) {}
  }
}
