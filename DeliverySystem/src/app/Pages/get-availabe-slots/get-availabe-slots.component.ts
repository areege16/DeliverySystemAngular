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
      orderTime: new Date()
    };

    this._ShowProductsService.getAvailableSlots(DeliverySlotRequest).subscribe({
      next: (res) => {
        this.slots = res;
        console.log('Available slots:', res);
      },
      error: (err) => {
        console.error('Error getting slots:', err);
      }
    });
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
// formatUtcTime(utcTime: string): string {
//   const date = new Date(utcTime);
//   return date.toUTCString(); 
// }
  
formatUtcDateTimeRange(startUtc: string, endUtc: string): string {
  const startDate = new Date(startUtc);
  const endDate = new Date(endUtc);

  const day = startDate.getUTCDate().toString().padStart(2, '0');
  const month = (startDate.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = startDate.getUTCFullYear();

  const startHours = startDate.getUTCHours().toString().padStart(2, '0');
  const startMinutes = startDate.getUTCMinutes().toString().padStart(2, '0');

  const endHours = endDate.getUTCHours().toString().padStart(2, '0');
  const endMinutes = endDate.getUTCMinutes().toString().padStart(2, '0');

  return ` ${day}/${month}/${year} : ${startHours}:${startMinutes} - ${endHours}:${endMinutes}  `;
}



}



