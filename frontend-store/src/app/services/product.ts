import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // GIỮ NGUYÊN có /api để Angular kích hoạt Proxy bộ lọc
  private apiUrl = '/api/products'; 

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<any[]>(this.apiUrl);
  }

  addProduct(product: any) {
    return this.http.post(this.apiUrl, product);
  }

  updateProduct(product: any) {
    // Sẽ tạo ra đường dẫn dạng: /api/products/1
    return this.http.put(`${this.apiUrl}/${product.id}`, product); 
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}