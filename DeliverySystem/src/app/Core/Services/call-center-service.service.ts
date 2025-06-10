import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CallCenterServiceService {

  constructor(private _HttpClient:HttpClient) {
   }

   
  getAllProducts():Observable<any>{
    return this._HttpClient.get(`${environment.BaseUrl}api/Product/AllProduct`)
   } 


  getAvailableSlots(request: any): Observable<any> {
    return this._HttpClient.post(`${environment.BaseUrl}api/Delivery/slots`, request);
  }

}
