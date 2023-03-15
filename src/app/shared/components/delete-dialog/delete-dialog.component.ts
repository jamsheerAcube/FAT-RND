import {
  Component,
  EventEmitter,
  Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild
} from '@angular/core';

import {
  DialogService,
  DialogRef
} from "@progress/kendo-angular-dialog";
@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent implements OnInit, OnChanges {
  @Input() public showDelete: boolean = false;
  @Output() dialogResult: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('dialogContentTemplate')
  dialogContentTemplate!: TemplateRef<any>;

  constructor(private dialogService: DialogService) { }

  private dialog?: DialogRef;

  public showConfirmation(): void {
    this.dialog = this.dialogService.open({
      title: "Delete confirm?",
      content: this.dialogContentTemplate,
      actions: [{ text: "Cancel" }, { text: "Delete", themeColor: "error" }],
      width: 350,
      animation: { duration: 300, direction: 'down', type: 'slide' },
      preventAction: (ev, dialog) => {
        type ObjectKey = keyof typeof ev;
        const myVar = 'text' as ObjectKey;
        if (ev.hasOwnProperty('text')) {
          this.dialogResult.emit(ev[myVar]);
        }
        return false;
      }
    });
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    //console.log(changes);
    if (changes['showDelete'] && !changes['showDelete'].firstChange
      && changes['showDelete'].currentValue != changes['showDelete'].previousValue
      && changes['showDelete'].currentValue == true
    ) {
      this.showConfirmation();
    }
  }
}
