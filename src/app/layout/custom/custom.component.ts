import { Component, OnInit,Input } from '@angular/core';
import { routerTransition } from '../../router.animatons';
import { FetchinfoService } from 'src/app/service/fetchinfo.service';
import { FormBuilder , FormGroup, Validators, FormControl } from '@angular/forms';
import {Product} from '../../models/productModel';
import {Order} from '../../models/orderModel';
import {NgbPanelChangeEvent,NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../service/admin.service';

var storeList:String[]=[];
//var count:number=0;


@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss'],
  animations:[routerTransition()],
  providers:[FetchinfoService],
})




export class CustomComponent implements OnInit {
  showproductresponse:any;
  // progress:number=20;
  //answer:String[]=["Intel","Amd","Nvidia"] ;
  // @Input() answe:String="default";
  // s_ans:String;
  // public ques:String[]=["CPU","MOTHERBOARD","RAM","GRAPHIC CARD"];
  // public count:number=0;
   public pan:String;


  product: Product[]; //displaying data in form
  titlearr:string[]=["CPU","Motherboard","RAM","Harddisk","Keyboard","Mouse","Display"];
  addressForm:FormGroup;
  orderInputs:Order;//Sending this object to server
  
  itemList:Map<string,any>=new Map<string,any>();
  itemtemp:Product[]=[];

  catstring:string[]=[];

  
  


  constructor(private fetchinfoService:FetchinfoService,private fb:FormBuilder,private modalService: NgbModal,private adminService:AdminService) {  
    //this.fetchProduct();
    this.product=[{productName:"Test-Name",productId:0,price:0,brand:"Test-Brand",description:"",quantity:0,category:"CPU"}];
    this.orderInputs={address:"",doo:new Date(),email:"",orderID:1,products:this.product,total:1000};
   }

  ngOnInit() {
    // this.fetchProduct();
    this.addressForm = this.fb.group({
      address:  ['', Validators.required],
    });

  }

fetchProduct() {

   console.log(this.pan);  
    this.fetchinfoService.fetchProduct(this.pan).subscribe((result)=>{
      this.showproductresponse=result;
    },error=>{},()=>{this.product=this.showproductresponse.json();
    
    }
    );  
        
  }

  // onClick(){
  //   storeList.push(this.s_ans);
  //   this.count=this.count+1;
  //   console.log(storeList);
  // }

  // onSelects(abc:string){
  //   this.s_ans=abc;
  //   console.log(abc);
  //   console.log('in select');
  // }
  
  rowSelected(item:any,category:String){
    console.log(item.price);
    console.log(category);
    //category="CPU";
    for (let index = 0; index < this.titlearr.length; index++) {
      
      if(this.titlearr[index]==category)
      {
        //this.titlearr[index]=this.titlearr[index]+":------- "+item.productName;
        this.catstring[index]=item.productName;
      }
      
    }

    this.itemList.set(item.category,item);
    
  

   // console.log(itemList);
    
  }

  public beforeChange($event: NgbPanelChangeEvent) {

     
     if ( $event.nextState === true) {
      this.pan=$event.panelId;
    }
     //console.log(this.pan);
     this.fetchProduct();
   
  }

  totalcalc:number=0;
  placeOrder(){

    this.adminService.orderCustomer(this.orderInputs).subscribe((response)=>{
      if(response.status === 200){
            // this.reloadProduct();
            console.log("ok");
           }},error =>{

           },()=>{

           }
    );
  }

  openlet(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.orderInputs['address']=this.addressForm.value;
    this.itemList.forEach((value: any, key: string) => {
      this.itemtemp.push(value);
  });
    this.orderInputs['products']=this.itemtemp;
    this.itemtemp.forEach(element => {
      // this.total=this.total+element.price;
      console.log(element.price);
      this.totalcalc=this.totalcalc+element.price;
    });
    this.orderInputs['total']=this.totalcalc;
    this.orderInputs['email']=localStorage.getItem('email');
    console.log(this.totalcalc);
    console.log(this.orderInputs);
    
 
  
  }
}
