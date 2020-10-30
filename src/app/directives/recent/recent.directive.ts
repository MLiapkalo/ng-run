import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appRecent]'
})
export class RecentDirective implements OnInit {
  @Input('appRecent')
  date: Date;
  @Input()
  recentHighlightColor: string;
  @Input()
  upcomingHighlightColor: string;

  constructor(private el: ElementRef) { }

  /*
    12096e5 is a kind of magic number
    It is the result of 1000[ms] * 60[s] * 60[m] * 24[h] * 14[d] saved in exponential notation
  */
  private get isRecent(): boolean {
    const twoWeeksAgo = new Date(Date.now() - 12096e5);
    return this.date.valueOf() < Date.now() && this.date >= twoWeeksAgo;
  }

  private get isUpcoming(): boolean {
    return this.date.valueOf() > Date.now();
  }

  ngOnInit(): void {
    let highlightColor;

    if (this.isRecent) {
      highlightColor = this.recentHighlightColor;
    } else if (this.isUpcoming) {
      highlightColor = this.upcomingHighlightColor;
    }

    if (highlightColor) {
      this.el.nativeElement.style.boxShadow = `0px 0px 20px -8px ${highlightColor}`;
    }
  }
}
