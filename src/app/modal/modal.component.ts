import { Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { VirtualTimeScheduler } from 'rxjs';
import { ModalService } from './modal.service';

@Component({
  selector: 'jw-wrapper',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit, OnDestroy {

  @Input() id: string;
  private element: any;
  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    if (!this.id) {
      console.error("modal must have an id");
      return;
    }
    document.body.appendChild(this.element);

    this.element.addEventListener('click', el => {
      if (el.target.className === 'jw-wrapper') {
        this.close();
      }
    });
    this.modalService.add(this);
    this.element.style.display = "none"
  }

  ngOnDestroy() : void{
    this.modalService.remove(this.id);
    this.element.remove();
  }
  open():void {
    // this.element.style.display = "block";
   this.element.style.display = "block";
    document.body.classList.add("jw-modal-open");
  }

  close():void{
    this.element.style.display = "none";
    document.body.classList.remove("jw-modal-open");
  }

}
