import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() tableData: any;
  displayedColumns: string[];
  constructor() { }

  ngOnInit(): void {

  }
  ngOnChanges(): void {
    if (this.tableData) {
      this.displayedColumns = Object.keys(this.tableData[0]);
    }
  }
}
