import { Component, OnInit } from '@angular/core';
import {BsModalService, BsModalRef,} from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-appointment-new',
  templateUrl: './appointment-new.component.html',
  styleUrls: ['./appointment-new.component.scss']
})
export class AppointmentNewComponent implements OnInit {
  title: string;
  // closeBtnName: string;
  list: any[] = [];
  constructor(
    public bsModalRef: BsModalRef
    ) {}

  ngOnInit() {
   
  }
  closeModalBox(){
    this.bsModalRef.hide();
  }

}
