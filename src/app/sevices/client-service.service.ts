import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Client } from '../classes/client';
import { ClientInterface } from '../classes/client-interface';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  constructor(private httpClient:HttpClient) { }


  public url=environment.apiUrl;

  private baseUrl=this.url+'users';



  public getClients(): Observable<Client[]>{
    return this.httpClient.get<GetResponseProducts>(this.baseUrl).pipe(
      map(response => response._embedded.users)
    );
  }
  /*public getLatest():Observable<Client[]>{
    return this.httpClient.get<GetResponseProducts>(this.clients).pipe(
      map(response=>response._embedded.clients)
    );
  }*/

  getProductById(theProductId: number): Observable<Client> {

    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Client>(productUrl);
  }

  
  
 public AddClient(client: ClientInterface): Observable<any> {
    return this.httpClient.post<Client>(this.baseUrl, client);    
  }
  /*
  AddClient(formData: FormData): Observable<Client> {
    return this.httpClient.post<Client>(this.baseUrl+'/save', formData);    
  }
  UpdateClient(theProductId:any,product: Client): Observable<any> {
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.put<Client>(productUrl, product);    
  }
  */
  DeleteClient(theProductId:number){
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.delete(productUrl);
  }
 
  


}

 
interface GetResponseProducts {
  _embedded: {
    users: Client[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}





