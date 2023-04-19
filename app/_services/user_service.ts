import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  url = "https://dummyjson.com/users";

  getUserInfo() {
    return this.http.get(this.url);
  }
}
