import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.scss']
})
export class LeftSideBarComponent implements OnInit {
  sidebar = document.getElementsByClassName('sidebar-left');
  closeBtn = document.querySelector('#btn');
  searchBtn = document.querySelector('.bx-search');
  stateOpenSideBar = false;
  toolBar = false;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.sidebar = document.getElementsByClassName('sidebar-left');
  }

  openSidebar() {
    if (this.sidebar != null) {
      for (let i = 0; i < this.sidebar.length; i++) {
        this.sidebar[i].classList.contains('open')
          ? this.sidebar[i].classList.remove('open')
          : this.sidebar[i].classList.add('open');
      }
    }
    this.menuBtnChange();
  }

  menuBtnChange() {
    if (this.sidebar != null && this.closeBtn != null) {
      for (let i = 0; i < this.sidebar.length; i++) {
        if (this.sidebar[i].classList.contains('open')) {
          this.closeBtn.classList.replace('bx-menu', 'bx-menu-alt-right');
        } else {
          this.closeBtn.classList.replace('bx-menu-alt-right', 'bx-menu');
        }
      }
    }
  }

}
