import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teamlist',
  templateUrl: './teamlist.component.html',
  styleUrls: ['./teamlist.component.css']
})
export class TeamlistComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  addTeam(name: string, mail: string, comment: string) {
    alert("Name: " + name +
      "\nEmail: " + mail +
      "\nComment: " + comment)
  }

}
