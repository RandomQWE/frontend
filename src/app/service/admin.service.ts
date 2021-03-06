import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Http, Response, RequestOptions,Headers } from '@angular/http';  
import { Observable, of, throwError, pipe} from "rxjs"
import { map, filter, catchError, mergeMap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public apiURL:string="http://localhost:8080/buildMyPc/Admin/addProduct";
  constructor(private http:Http) {this.http=http; }

  AddProduct (product:any)
  { 
    const headers = new Headers({'Content-Type':'application/json'});
    const requestOptions= new RequestOptions({headers :headers});
    return this.http.post(this.apiURL,product,requestOptions)
    .pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }
  errorHandler(error: Response) {  
    console.log(error);  
    return throwError(error);  
} 
  
public apiURL2:string="http://localhost:8080/buildMyPc/common/product";
displayProduct(category:any){  
  const headers = new Headers({'Content-Type':'application/json'});
  //  let search = new URLSearchParams();
  //  search.set("category",category);
   return this.http.get(this.apiURL2+"/"+category);
}

public apiURL3:string="http://localhost:8080/buildMyPc/Admin/delete";
  deleteProduct(id:number){
    const headers = new Headers({'Content-Type':'application/json'});
   return this.http.delete(this.apiURL3+"/"+id);

  }
public apiURL4:string="http://localhost:8080/buildMyPc/Admin/product";
adminupdateProduct(update:any,id:number){
  console.log("in admin update product");
  const headers = new Headers({'Content-Type':'application/json'});
  const requestOptions= new RequestOptions({headers :headers});
  return this.http.put(this.apiURL4+"/"+id,update,requestOptions);

  } 
  public apiURL5:string="http://localhost:8080/buildMyPc/common/";
displayorder(){
  return this.http.get(this.apiURL5);
}  


public apiURL6:string="http://localhost:8080/buildMyPc/User/placeOrder";
orderCustomer(order:any){
  const headers = new Headers({'Content-Type':'application/json'});
    const requestOptions= new RequestOptions({headers :headers});
    return this.http.post(this.apiURL6,order,requestOptions);
}

public apiURL7:string="http://localhost:8080/buildMyPc/Admin/contactUs";
displayMessage(){
  return this.http.get(this.apiURL7);
}
}