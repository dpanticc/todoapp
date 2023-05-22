import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[priorityHighlight]'
})
export class PriorityHighlightDirective {
  @Input('priorityHighlight') priority!: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.highlightPriority();
  }

  private highlightPriority() {
    switch (this.priority) {
      case 'High':
        this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'rgba(255, 0, 0, 0.1)'); // Red with 50% opacity
        break;
      case 'Medium':
        this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'rgba(255, 255, 0, 0.2)'); // Yellow with 50% opacity
        break;
      case 'Low':
        this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'rgba(0, 128, 0, 0.1)'); // Green with 50% opacity
        break;
      default:
        break;
    }
    }
  }
