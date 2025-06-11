import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CallCenterServiceService } from '../../Core/Services/call-center-service.service';
import { IProduct } from '../../Core/interfaces/Iproduct';
import { CommonModule } from '@angular/common';
import { ISlot } from '../../Core/interfaces/islot';

@Component({
  selector: 'app-get-availabe-slots',
  imports: [
    FormsModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './get-availabe-slots.component.html',
  styleUrl: './get-availabe-slots.component.css'
})
export class GetAvailabeSlotsComponent implements OnInit {

  products: IProduct[] = []
  slots: ISlot[] = [];
  searchText: string = ''
  filteredProducts: IProduct[] = [];
  pageNumber: number = 1;
  pageSize: number = 14;

  constructor(private _ShowProductsService: CallCenterServiceService) { }

  ngOnInit(): void {
    this._ShowProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res;
    this.filteredProducts = [...this.products];

        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  TypeName(type: number): string {
    switch (type) {
      case 0:
        return 'InStock';
      case 1:
        return 'Fresh';
      case 2:
        return 'External';
      default:
        return 'Unknown';
    }
  }


  showSelectedSlots(): void {
    const selectedProducts = this.products
      .filter(p => p.selected)

    console.log('Selected Products:', selectedProducts);

  if (selectedProducts.length === 0) {
      alert('Please select at least one product');
      return;
    }

    const DeliverySlotRequest = {
      products: selectedProducts,
      orderTime: new Date().toISOString(),
      pageNumber: this.pageNumber,
       pageSize: this.pageSize
    };

    this._ShowProductsService.getAvailableSlots(DeliverySlotRequest).subscribe({
      next: (res) => {
      if (res.length === 0 && this.pageNumber > 1) {
      this.pageNumber--;
    } else {
      this.slots = res;
    }
        console.log('Available slots:', res);
      },
      error: (err) => {
        console.error('Error getting slots:', err);
      }
    });
  }

  
  nextPage() {
    this.pageNumber++;
    this.showSelectedSlots();
  }

  prevPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.showSelectedSlots();
    }
  }

onSearch() {
    if (!this.searchText.trim()) {
      this.filteredProducts = [...this.products];
      return;
    }

    const searchTerm = this.searchText.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(searchTerm)
    );
  }

calcTime(date: Date): Date {
  const TimeNow = new Date(date);
  TimeNow.setHours(TimeNow.getHours() - 3); 
  return TimeNow;
}

}



