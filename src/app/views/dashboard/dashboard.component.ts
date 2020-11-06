import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import {BsModalService, BsModalRef,} from 'ngx-bootstrap/modal'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AppointmentNewComponent } from '../appointment-new/appointment-new.component';


@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  modalRef:BsModalRef;
  token: string;
  constructor(
    private router: Router,
    private modalService:BsModalService
  ) { }
  ngOnInit(): void {
  }

  public openModal(template:TemplateRef<any>){
    this.modalRef=this.modalService.show(template)
  };

  openModalWithComponent() {
    const initialState = {
      title: 'New Appointment'
    };
    this.modalRef = this.modalService.show(AppointmentNewComponent, {initialState});
    // this.modalRef.content.closeBtnName = 'Close';
  }

}
