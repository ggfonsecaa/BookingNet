import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    CommonModule,
    ImageComponent
  ],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})

export class ButtonComponent {
  @Input() imgSrc: string = '';
}