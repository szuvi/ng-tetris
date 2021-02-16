import { Component, Input } from '@angular/core';

@Component({
  selector: 'info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.css'],
})
export class InfoBoxComponent {
  @Input() message: string;
  @Input() border: boolean;
  @Input() centered: boolean;
  @Input() title: string;
}
