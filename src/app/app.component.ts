import { Component, OnInit } from '@angular/core';

// import AngularFirestore to import data from firebase
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ecommerce-angular-app';

  // inicialize the firestore
  constructor(private fs: AngularFirestore){}

  ngOnInit(){
    // read the data from firebase
    this.fs.collection('test').snapshotChanges().subscribe(personas => {
      console.log(personas.map(x => x.payload.doc.data()));
    });
  }
}
