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

  /* The amount of time (in ms) after which the tooltip is shown - TBD */
  @Input() tooltipDelay? = 190;

  /* The background color of the tooltip */
  @Input() tooltipBgColor? = '';

  /* The color of the tooltip text */
  @Input() tooltipTextColor = '';

  private myPopup: HTMLDivElement;
  private timer: number;

  constructor(private el: ElementRef) {}

  /* Remove the tooltip */
  ngOnDestroy(): void {
    if (this.myPopup) {
      this.myPopup.remove();
    }
  }

  /* Listen for the mouse enter event to show the tooltip */
  @HostListener('mouseenter', ['$event']) onMouseEnter(event: Event) {
    const currentElement = event.target as Element;
    const parentEl = currentElement.parentElement;
    let x =
      this.el.nativeElement.getBoundingClientRect().left +
      this.el.nativeElement.offsetWidth / 2 -
      this.el.nativeElement.offsetWidth / 2;
    let y =
      this.el.nativeElement.getBoundingClientRect().top +
      this.el.nativeElement.offsetHeight +
      3;
    this.createTooltipPopup(parentEl, x, y);
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
    popup.setAttribute('class', 'tooltip');
    popup.textContent = this.tooltip;
    popup.style.backgroundColor = this.tooltipBgColor;
    popup.style.color = this.tooltipTextColor;
    popup.style.left = `${x.toString()}px`;
    popup.style.top = `${y.toString()}px`;
    containerElement.appendChild(popup);
    this.myPopup = popup;
    document.querySelector('.tooltip').classList.add('show');
    this.removeTooltip(this.myPopup);
  }

  /* Listen for the mouse leave event to hide the tooltip */
  @HostListener('mouseleave') onMouseLeave() {
    if (this.timer) clearTimeout(this.timer);
    if (this.myPopup) {
      this.myPopup.remove();
    }
  }

  /**
   * Hide the tooltip after some given time
   * @param tooltip - the previously created tooltip element
   */
  private removeTooltip(tooltip: HTMLDivElement) {
    const removeTooltipDelay = 5000;
    setTimeout(() => {
      if (tooltip) tooltip.remove();
    }, removeTooltipDelay);
  }
}
