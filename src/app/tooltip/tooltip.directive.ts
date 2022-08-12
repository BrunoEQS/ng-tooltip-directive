import {
  Directive,
  Input,
  OnDestroy,
  HostListener,
  ElementRef,
} from '@angular/core';

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective implements OnDestroy {
  /* The text of the tooltip */
  @Input() tooltip = '';

  /* The amount of time (in ms) after which the tooltip is shown */
  @Input() showTooltipDelay? = 100;

  /* The background color of the tooltip */
  @Input() tooltipBgColor? = '';

  /* The color of the tooltip text */
  @Input() tooltipTextColor? = '';

  @Input() removeTooltipDelay? = 1000;

  createTooltipTimeout: number;

  removeTooltipTimeout: number;

  private myPopup: HTMLDivElement;

  constructor(private el: ElementRef) {}

  /* Remove the tooltip */
  ngOnDestroy(): void {
    if (this.myPopup) {
      this.myPopup.remove();
    }
  }

  /* Cancel the previously set timeouts */
  cancelTimeout(timeout: number) {
    clearTimeout(timeout);
  }

  /* Read element size and then create the tooltip */
  getElementSize() {}

  /* Listen for the mouse enter event to show the tooltip */
  @HostListener('mouseenter', ['$event']) onMouseEnter(event: Event) {
    const currentElement = event.target as Element;
    const parentEl = currentElement.parentElement;
    const hostElement: HTMLElement = this.el.nativeElement;
    let x =
      hostElement.getBoundingClientRect().left +
      hostElement.offsetWidth / 2 -
      hostElement.offsetWidth / 2;
    let y =
      hostElement.getBoundingClientRect().top + hostElement.offsetHeight + 3;
    this.createTooltipTimeout = setTimeout(() => {
      this.createTooltipPopup(parentEl, x, y);
    }, this.showTooltipDelay);
  }

  /* Listen for the mouse leave event to hide the tooltip */
  @HostListener('mouseleave') onMouseLeave() {
    if (this.myPopup) {
      this.removeTooltip(this.myPopup);
    }
    this.cancelTimeout(this.createTooltipTimeout);
  }

  /**
   * Create the tooltip element
   * @param containerElement - the element the tooltip will be appended to
   * @param x - the total width of the hovered element
   * @param y - the total height of the hovered element
   */
  private createTooltipPopup(
    containerElement: HTMLElement,
    x: number,
    y: number
  ) {
    const popup = document.createElement('div');
    popup.setAttribute('class', 'tooltip show');
    popup.textContent = this.tooltip;
    popup.style.backgroundColor = this.tooltipBgColor;
    popup.style.color = this.tooltipTextColor;
    popup.style.left = `${x.toString()}px`;
    popup.style.top = `${y.toString()}px`;
    containerElement.appendChild(popup);
    this.myPopup = popup;
  }

  /**
   * Hide the tooltip after some given time
   * @param tooltip - the previously created tooltip element
   */
  private removeTooltip(tooltip: HTMLDivElement) {
    this.removeTooltipTimeout = setTimeout(() => {
      if (tooltip) tooltip.remove();
    }, this.removeTooltipDelay);
  }
}
