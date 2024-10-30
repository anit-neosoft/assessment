import { Component } from '@angular/core';
import { MtxGridModule } from '@ng-matero/extensions/grid';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MtxGridModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {}
