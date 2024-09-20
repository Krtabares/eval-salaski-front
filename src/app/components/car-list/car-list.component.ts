import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car.service';


@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];
  newCar: Car = {
    title: '',
    description: '',
    price: 0,
    date: '',
    imageUrl: ''
  };

  page: number = 1;
  limit: number = 10;
  totalCars: number = 0; // Para almacenar el total de carros
  searchTerm: string = ''; // Propiedad para el término de búsqueda

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.getCars();
  }

  // Obtener todos los carros
  getCars(): void {
    this.carService.getCars(this.page, this.limit, this.searchTerm).subscribe((data) => {
      this.cars = data;
    });
  }

  // Cambiar de página
  changePage(newPage: number): void {
    this.page = newPage;
    this.getCars();
  }

  // Método para buscar carros
  searchCars(): void {
    this.getCars();
  }

  getCarsById(id: number | undefined): void {
    if(id){
      this.carService.getCarsById(id).subscribe({
        next: (data:any) => {
          this.newCar = data;
        },
        error: (err) => {
          console.error('Error al obtener los carros:', err);
        }
      });
    }
  }

  // Crear un nuevo carro
  createCar(): void {
    this.carService.createCar(this.newCar).subscribe({
      next: () => {
        this.getCars();
        this.resetNewCar();
      },
      error: (err) => {
        console.error('Error al crear el carro:', err);
      }
    });
  }

  // Actualizar un carro
  updateCar(car: Car): void {
    if (car.id) {
      this.carService.updateCar(car.id, car).subscribe({
        next: () => {
          this.getCars();
        },
        error: (err) => {
          console.error('Error al actualizar el carro:', err);
        }
      });
    }
  }

  // Eliminar un carro
  deleteCar(id: number | undefined): void {
    if (id) {
      this.carService.deleteCar(id).subscribe({
        next: () => {
          this.getCars();
        },
        error: (err) => {
          console.error('Error al eliminar el carro:', err);
        }
      });
    }
  }

  // Reiniciar el formulario para un nuevo carro
  resetNewCar(): void {
    this.newCar = {
      id:undefined,
      title: '',
      description: '',
      price: 0,
      date: '',
      imageUrl: ''
    };
  }
}
