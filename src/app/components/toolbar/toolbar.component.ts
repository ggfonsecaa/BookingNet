import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    MatFormFieldModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent {
    @Output() onToolbarClick: EventEmitter<string> = new EventEmitter();
    @Input() allowAdd!: boolean;
    @Input() allowEdit!: boolean;
    @Input() allowSave!: boolean;
    @Input() allowDelete!: boolean;
    @Input() allowAprove!: boolean;
    @Input() allowDecline!: boolean;

    agregar() : void {
        this.onToolbarClick.emit('agregar');
    }

    eliminar(): void {
        this.onToolbarClick.emit('eliminar');
    }

    guardar(): void {
      this.onToolbarClick.emit('guardar');
    }

    aprobar(): void {
      this.onToolbarClick.emit('aprobar');
    }

    rechazar(): void {
      this.onToolbarClick.emit('rechazar');
    }
}
