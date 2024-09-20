import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';


@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://localhost:3070/cars';  // URL de tu API NestJS

  constructor(private http: HttpClient) { }

  // Obtener  carros por id
  getCarsById(id:number): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl + `/${id}`);
  }

  // Obtener todos los carros
  getCars(page: number = 1, limit: number = 10, search?: string): Observable<Car[]> {
    const params = {
      page: page,
      limit: limit,
      search: search || ''
    };
    return this.http.get<Car[]>(this.apiUrl, { params });
  }

  // Crear un nuevo carro
  createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car);
  }

  // Actualizar un carro
  updateCar(id: number, car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.apiUrl}/${id}`, car);
  }

  // Eliminar un carro
  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
