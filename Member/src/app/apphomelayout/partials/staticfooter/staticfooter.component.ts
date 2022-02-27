import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-staticfooter',
  templateUrl: './staticfooter.component.html',
  styleUrls: ['./staticfooter.component.scss']
})
export class StaticfooterComponent implements OnInit {

  // registerArr =[];
  message:any;
  public id:any;

  public register = {
    _id:'',
    phonenumber:'', 
    emailaddress:'',
    password:'',
    confirmpassword:'',
    verificationcode:'',
    names:'',
    usernames:'',
    address1:'',
    address2:'',
    address3:'',
    state:'',
    city:'',
    postcode:'',
    pointscollect:'',
    pointsredeem:''
  }
  constructor(private http: HttpClient, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getRegister();
    
    var url= document.URL;
    const myArray = url.split("=");
    this.id = myArray[1];
  }

  lol = [];
  public currentmemberid: any;
  registerArr = ['_id'];
  
  getRegister()
  {
    this.http.get('http://165.22.50.213:3001/getregister').subscribe((res:any) => 
    {
      this.lol = res['data'];
      var memberid = JSON.parse(localStorage.getItem('Memberlogin')!);
      this.currentmemberid = memberid[0]._id
      for (let i = 0; i < this.lol.length; i++) {
        if (this.currentmemberid == this.lol[i]['_id']) {
          this.registerArr[0] = this.lol[i];
        }
      }
    });
  }
  
  open(profileqr: any)
  {    
    const pqrurl = "/profileqr?id=" + this.registerArr[0]['_id'];
    console.log(pqrurl)
    this.router.navigateByUrl(pqrurl)
    this.selectedLink = profileqr;
  }

  selectedLink = 'b';

  goBooking(booking: any)
  {
    const bhurl = "/bookinghistory?id=" + this.registerArr[0]['_id'];
    this.router.navigateByUrl(bhurl)
    this.selectedLink = booking;
    console.log(bhurl)
  }

  game(gamewheel: any)
  {
    const gurl = "/gamificationhome?id=" + this.registerArr[0]['_id'];
    console.log(gurl)
    this.router.navigateByUrl(gurl)
    this.selectedLink = gamewheel;
  }
  

}
